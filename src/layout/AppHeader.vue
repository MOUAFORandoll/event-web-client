<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm py-2"
  >
    <div class="container">
      <router-link
        class="navbar-brand font-weight-bold d-flex align-items-center"
        to="/"
      >
        <img
          src="https://img.icons8.com/color/48/000000/rocket--v2.png"
          alt="Logo"
          class="mr-2"
          style="height: 32px"
        />
        <span v-if="user && (user.first_name || user.last_name)">
          {{ user.first_name || user.last_name }}
        </span>
        <span v-else> Invité </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        :aria-expanded="navbarOpen ? 'true' : 'false'"
        aria-controls="navbarNav"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: navbarOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav ml-auto align-items-center">
          <li class="nav-item" :class="{ active: $route.name === 'home' }">
            <router-link class="nav-link" to="/">
              <i class="ni ni-shop"></i> Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/my-event">
              <i class="ni ni-album-2"></i> Gérer mes Événements
            </router-link>
          </li>
          <li class="nav-item dropdown" :class="{ show: dropdownOpen }">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="navbarProfileDropdown"
              role="button"
              @click.prevent="toggleDropdown"
              :aria-expanded="dropdownOpen ? 'true' : 'false'"
              aria-haspopup="true"
            >
              <img
                :src="userPhoto"
                alt="Avatar"
                class="rounded-circle mr-2"
                style="
                  width: 32px;
                  height: 32px;
                  object-fit: cover;
                  border: 2px solid #fff;
                "
              />
              <span>
                {{
                  user && (user.first_name || user.last_name)
                    ? user.first_name || user.last_name
                    : "Profil"
                }}
              </span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              :class="{ show: dropdownOpen }"
              aria-labelledby="navbarProfileDropdown"
            >
              <router-link
                class="dropdown-item"
                to="/profile"
                @click.native="closeDropdown"
              >
                <i class="ni ni-single-02 text-primary"></i> Mon Profil
              </router-link>
              <router-link
                class="dropdown-item"
                to="/settings"
                @click.native="closeDropdown"
              >
                <i class="ni ni-settings-gear-65 text-info"></i> Paramètres
              </router-link>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item text-danger"
                href="#"
                @click.prevent="logoutAndCloseDropdown"
              >
                <i class="ni ni-user-run"></i> Déconnexion
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import RequestService from "@/tools/requestService";
import API_ENDPOINTS from "@/tools/endPoints";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["currentUser"]),

    user() {
      return this.currentUser;
    },
  },
  data() {
    return {
      userPhoto: "",
      navbarOpen: false,
      dropdownOpen: false,
    };
  },
  watch: {
    user: {
      handler() {
        this.loadUserPhoto();
      },
      immediate: true,
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    async logout() {
      // Use Vuex logout and redirect, with toast
      if (this.$store && this.$store.dispatch) {
        await this.$store.dispatch("clearAuth");
      }
      this.$router.replace({ name: "login" });
      if (this.$toast && this.$toast.success) {
        this.$toast.success("Déconnexion réussie !");
      }
    },
    async logoutAndCloseDropdown() {
      this.dropdownOpen = false;
      await this.logout();
    },
    async loadUserPhoto() {
      if (this.user && this.user.id) {
        this.userPhoto =
          process.env.VUE_APP_BASE_URL +
          API_ENDPOINTS.USERS +
          "/" +
          this.user.id +
          "/" +
          "picture";

        console.log(this.userPhoto);
      } else {
        this.userPhoto = "";
      }
    },
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    toggleDropdown(event) {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    handleClickOutside(event) {
      // Close dropdown if click outside
      if (this.dropdownOpen && this.$el && !this.$el.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
  },
};
</script>
<style scoped>
/* You can add custom styles here if needed */
</style>
