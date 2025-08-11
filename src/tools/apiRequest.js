import axiosInstance from "./axios";
import API_ENDPOINTS from "./endPoints";

/**
 * Récupère le token et l'userId du localStorage (ou autre stockage si besoin)
 * @returns {Object} - { token, userId }
 */
function getAuthHeaders() {
  let token = null;
  let userId = null;

  // Essayez de récupérer depuis localStorage (ou adaptez selon votre logique)
  try {
    token = localStorage.getItem("token") || localStorage.getItem("auth_token");
    userId = localStorage.getItem("userId") || localStorage.getItem("user_id");
    // Si vous stockez l'utilisateur comme objet JSON
    if (!userId) {
      const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        userId = parsed.id || parsed._id;
      }
    }
  } catch (e) {
    // Ignore errors
  }

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (userId) headers["X-User-Id"] = userId;
  return headers;
}

/**
 * Effectue une requête API générique.
 * @param {string} endpoint - L'endpoint de l'API (ex: API_ENDPOINTS.LOGIN)
 * @param {string} method - La méthode HTTP (ex: 'get', 'post', 'put', 'delete')
 * @param {Object} data - Les données à envoyer (pour POST/PUT)
 * @param {Object} config - Config additionnelle pour axios (headers, params, etc.)
 * @returns {Promise} - Résultat de la requête axios
 */
async function apiRequest(endpoint, method = "get", data = {}, config = {}) {
  // Ajoute le token et le userId dans le header
  const authHeaders = getAuthHeaders();
  const mergedHeaders = {
    ...(config.headers || {}),
    ...authHeaders,
  };

  const options = {
    url: endpoint,
    method: method.toLowerCase(),
    ...config,
    headers: mergedHeaders,
  };

  if (["post", "put", "patch"].includes(options.method)) {
    options.data = data;
  } else if (options.method === "get" && Object.keys(data).length > 0) {
    options.params = data;
  }

  return axiosInstance(options)
    .then((response) => response.data)
    .catch((error) => {
      // Vous pouvez personnaliser la gestion des erreurs ici
      throw error;
    });
}

export default apiRequest;
