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
                <small>Sign up with credentials</small>
              </div>
              <form role="form" @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-6 pr-1">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="First Name"
                      addon-left-icon="ni ni-hat-3"
                      v-model="form.first_name"
                      :disabled="loading"
                      required
                    />
                  </div>
                  <div class="col-6 pl-1">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Last Name"
                      addon-left-icon="ni ni-hat-3"
                      v-model="form.last_name"
                      :disabled="loading"
                      required
                    />
                  </div>
                </div>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Mobile"
                  addon-left-icon="ni ni-mobile-button"
                  v-model="form.mobile"
                  :disabled="loading"
                  type="text"
                  required
                />
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email (optional)"
                  addon-left-icon="ni ni-email-83"
                  v-model="form.email"
                  :disabled="loading"
                  type="email"
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
                <div class="text-muted font-italic">
                  <small>
                    password strength:
                    <span
                      :class="{
                        'text-success font-weight-700':
                          passwordStrength === 'strong',
                        'text-warning font-weight-700':
                          passwordStrength === 'medium',
                        'text-danger font-weight-700':
                          passwordStrength === 'weak',
                      }"
                      >{{ passwordStrength }}</span
                    >
                  </small>
                </div>
                <base-checkbox v-model="agree" :disabled="loading" required>
                  <span>
                    I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    native-type="submit"
                    :loading="loading"
                    :disabled="loading || !agree"
                  >
                    <span v-if="loading">
                      <i class="fa fa-spinner fa-spin"></i> Creating...
                    </span>
                    <span v-else>Create account</span>
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
              <a href="/login" class="text-light">
                <small>Login</small>
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

export default {
  name: "Register",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
      },
      loading: false,
      agree: false,
    };
  },
  computed: {
    passwordStrength() {
      const pwd = this.form.password;
      if (!pwd) return "";
      if (
        pwd.length >= 8 &&
        /[A-Z]/.test(pwd) &&
        /\d/.test(pwd) &&
        /[^A-Za-z0-9]/.test(pwd)
      ) {
        return "strong";
      } else if (pwd.length >= 6) {
        return "medium";
      } else {
        return "weak";
      }
    },
  },
  methods: {
    ...mapActions(["saveTokens"]),
    showError(message) {
      if (this.$toast && this.$toast.error) {
        this.$toast.error(message);
      }
    },
    showSuccess(message) {
      if (this.$toast && this.$toast.success) {
        this.$toast.success(message);
      }
    },
    async handleRegister() {
      this.loading = true;
      try {
        const payload = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email || undefined,
          mobile: this.form.mobile,
          password: this.form.password,
        };
        // Remove email if empty
        if (!payload.email) delete payload.email;
        const response = await RequestService.register(payload);
        // Expecting response like { token, refreshToken, user }
        await this.saveTokens({
          token: response.token || response.auth_token,
          refreshToken: response.refreshToken,
          user: response.user,
        });
        this.showSuccess("Account created successfully!");
        this.$router.replace({ name: "home" });
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.showError(err.response.data.message);
        } else {
          this.showError("Registration failed. Please check your information.");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style>
.fa-spinner {
  margin-right: 5px;
}
</style>
