import apiRequest from "./apiRequest";
import API_ENDPOINTS from "./endPoints";

const RequestService = {
  /**
   * Requête de connexion utilisateur
   * @param {Object} credentials - { email, password }
   * @returns {Promise}
   */
  login(credentials) {
    return apiRequest(API_ENDPOINTS.LOGIN, "post", credentials);
  },

  /**
   * Requête de connexion par code
   * @param {Object} payload - { code }
   * @returns {Promise}
   */
  loginByCode(payload) {
    return apiRequest(API_ENDPOINTS.LOGIN_CODE, "post", payload);
  },

  /**
   * Requête d'inscription utilisateur
   * @param {Object} userData - { email, password, ... }
   * @returns {Promise}
   */
  register(userData) {
    return apiRequest(API_ENDPOINTS.USERS, "post", userData);
  },
  /**
   * Requête les evennements de utilisateur
   * @returns {Promise}
   */
  userPicture(id) {
    return apiRequest(API_ENDPOINTS.USERS + "/" + id + "picture", "get");
  },
};

export default RequestService;
