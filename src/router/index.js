import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/argon",
      name: "components",
      meta: { title: "Components" },
      components: {
        header: AppHeader,
        default: () =>
          import(
            /* webpackChunkName: "components" */ "../views/Components.vue"
          ),
        footer: AppFooter,
      },
    },
    {
      path: "/",
      name: "home",
      meta: { title: "Home", requiresAuth: true },
      components: {
        header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        footer: AppFooter,
      },
    },
    {
      path: "/landing",
      name: "landing",
      meta: { title: "Landing" },
      components: {
        header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "landing" */ "../views/Landing.vue"),
        footer: AppFooter,
      },
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Login" },
      components: {
        // header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
        footer: AppFooter,
      },
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "Register" },
      components: {
        // header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "register" */ "../views/Register.vue"),
        footer: AppFooter,
      },
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true, title: "Profile" },
      components: {
        header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        footer: AppFooter,
      },
    },
    {
      path: "*",
      name: "not-found",
      meta: { title: "404 Not Found" },
      components: {
        header: AppHeader,
        default: () =>
          import(/* webpackChunkName: "not-found" */ "../views/NotFound.vue"),
        footer: AppFooter,
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(
    (record) => record.meta && record.meta.requiresAuth
  );
  const nearestWithTitle = [...to.matched]
    .reverse()
    .find((r) => r.meta && r.meta.title);

  if (
    nearestWithTitle &&
    nearestWithTitle.meta &&
    nearestWithTitle.meta.title
  ) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = "My Album";
  }
  if (requiresAuth && !store.getters.isAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else if (
    (to.name === "login" || to.name === "register") &&
    store.getters.isAuthenticated
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
