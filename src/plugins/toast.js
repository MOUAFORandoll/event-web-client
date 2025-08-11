export default {
  install(Vue, { store }) {
    if (!store) {
      // eslint-disable-next-line no-console
      console.warn("Toast plugin requires a Vuex store instance");
    }
    const api = {
      success(message) {
        if (store && store.dispatch) {
          store.dispatch("toastSuccess", message);
        }
      },
      error(message) {
        if (store && store.dispatch) {
          store.dispatch("toastError", message);
        }
      },
    };
    Vue.prototype.$toast = api;
  },
};


