<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <div class="d-flex justify-content-center mb-3">
                <base-button
                  :type="loginMode === 'credentials' ? 'primary' : 'secondary'"
                  class="mr-2"
                  @click="loginMode = 'credentials'"
                  :disabled="loading"
                  size="sm"
                >
                  Email/Phone + Password
                </base-button>
                <base-button
                  :type="loginMode === 'code' ? 'primary' : 'secondary'"
                  class="mr-2"
                  @click="loginMode = 'code'"
                  :disabled="loading"
                  size="sm"
                >
                  Code
                </base-button>
              </div>
              <form
                v-if="loginMode === 'credentials'"
                role="form"
                @submit.prevent="handleLogin"
              >
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Phone"
                  addon-left-icon="ni ni-mobile-button"
                  v-model="form.mobile"
                  :disabled="loading"
                  type="text"
                  required
                />
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="form.password"
                  :disabled="loading"
                  required
                />
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    native-type="submit"
                    :loading="loading"
                    :disabled="loading"
                  >
                    <span v-if="loading">
                      <i class="fa fa-spinner fa-spin"></i> Signing In...
                    </span>
                    <span v-else> Sign In </span>
                  </base-button>
                </div>
              </form>
              <form
                v-else-if="loginMode === 'code'"
                role="form"
                @submit.prevent="handleCodeLogin"
              >
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Enter your login code"
                  addon-left-icon="ni ni-key-25"
                  v-model="form.code"
                  :disabled="loading"
                  type="text"
                  required
                />
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    native-type="submit"
                    :loading="loading"
                    :disabled="loading"
                  >
                    <span v-if="loading">
                      <i class="fa fa-spinner fa-spin"></i> Signing In...
                    </span>
                    <span v-else> Sign In with Code </span>
                  </base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="/register" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RequestService from "@/tools/requestService";
import { mapActions } from "vuex";
// import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      form: {
        mobile: "", // email or phone
        password: "",
        code: "",
      },
      loading: false,

      loginMode: "credentials", // 'credentials' | 'code' | 'qrcode'
    };
  },
  methods: {
    ...mapActions(["saveTokens"]),
    showError(message) {
      if (this.$toast && this.$toast.error) {
        this.$toast.error(message);
      }
    },

    async handleLogin() {
      this.loading = true;
      try {
        const credentials = {
          mobile: this.form.mobile,
          password: this.form.password,
        };
        // You may want to validate mobile (email or phone) here
        const response = await RequestService.login(credentials);
        // Expecting response like { token, refreshToken, user }
        await this.saveTokens({
          token: response.auth_token,
          user: response.user,
        });
        console.log(response);
        this.$router.replace({ name: "home" }).catch(() => {});
        if (this.$toast && this.$toast.success) {
          this.$toast.success("Connexion réussie");
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.showError(err.response.data.message);
        } else {
          this.showError("Login failed. Please check your credentials.");
        }
      } finally {
        this.loading = false;
      }
    },
    async handleCodeLogin() {
      this.loading = true;
      try {
        const codePayload = {
          code: this.form.code,
        };
        // You may want to implement a dedicated endpoint for code login
        const response = await RequestService.loginByCode(codePayload);
        await this.saveTokens({
          token: response.token || response.accessToken,

          user: response.user,
        });
        this.$router.replace({ name: "home" }).catch(() => {});
        if (this.$toast && this.$toast.success) {
          this.$toast.success("Connexion par code réussie");
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.showError(err.response.data.message);
        } else {
          this.showError("Login with code failed. Please check your code.");
        }
      } finally {
        this.loading = false;
      }
    },
    async handleQrCodeLogin() {
      this.loading = true;
      try {
        // Simulate QR code login, replace with actual implementation
        // For example, poll the backend for QR code scan status
        setTimeout(() => {
          this.loading = false;
          this.$emit("login-success", { method: "qrcode" });
        }, 2000);
      } catch (err) {
        this.showError("QR code login failed.");
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* Optionally, add a spinner style if not provided by your UI kit */
.fa-spinner {
  margin-right: 5px;
}

/* Simple modal override for demonstration, adapt as needed */
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
