import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const ACCESS_TOKEN_KEY = "auth.accessToken";
const USER_KEY = "auth.user";

function loadFromStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
}

function saveToStorage(key, value) {
  try {
    if (value === null || typeof value === "undefined") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    // ignore storage errors
  }
}

export default new Vuex.Store({
  state: {
    accessToken: loadFromStorage(ACCESS_TOKEN_KEY),
    user: loadFromStorage(USER_KEY),
    toasts: [],
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken),
    accessToken: (state) => state.accessToken,
    currentUser: (state) => state.user,
    toasts: (state) => state.toasts,
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken, persist = true }) {
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      if (persist) {
        saveToStorage(ACCESS_TOKEN_KEY, state.accessToken);
      } else {
        saveToStorage(ACCESS_TOKEN_KEY, null);
      }
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      saveToStorage(ACCESS_TOKEN_KEY, null);
    },
    SET_USER(state, user) {
      state.user = user || null;
      saveToStorage(USER_KEY, state.user);
    },
    CLEAR_USER(state) {
      state.user = null;
      saveToStorage(USER_KEY, null);
    },
    PUSH_TOAST(state, toast) {
      state.toasts.push(toast);
    },
    REMOVE_TOAST(state, id) {
      state.toasts = state.toasts.filter((t) => t.id !== id);
    },
  },
  actions: {
    saveTokens({ commit }, payload) {
      const accessToken = payload.token;
      const user = payload.user;
      const persist = true;

      commit("SET_TOKENS", { accessToken, persist });
      commit("SET_USER", user);
    },

    clearAuth({ commit }) {
      commit("CLEAR_TOKENS");
      commit("CLEAR_USER");
    },
    addToast({ commit }, { message, type = "success", duration = 4000 }) {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      commit("PUSH_TOAST", { id, message, type, duration });
      return id;
    },
    removeToast({ commit }, id) {
      commit("REMOVE_TOAST", id);
    },
    toastSuccess({ dispatch }, message) {
      return dispatch("addToast", { message, type: "success" });
    },
    toastError({ dispatch }, message) {
      return dispatch("addToast", { message, type: "error" });
    },
  },
});
