// interceptors.api.js
import { getToken, setToken, executeLogout } from "../store/tokenStore";
import { refreshTokenRequest } from "../features/auth/api/auth.api";
import api from "./axios.api";

/**
 * Indicates whether a token refresh request is currently in progress.
 * This prevents multiple refresh requests from being fired simultaneously.
 */
let isRefreshing = false;

/**
 * Queue to store pending requests while the token is being refreshed.
 * Each entry is a Promise's resolve/reject pair.
 */
let failedQueue = [];

/**
 * Resolves or rejects all queued requests once the refresh process finishes.
 * - If `error` is provided, all queued requests fail.
 * - Otherwise, they are retried with the new access token.
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  // Always clear the queue to avoid memory leaks
  failedQueue = [];
};

/**
 * REQUEST INTERCEPTOR
 * Attaches the access token to every outgoing request (if present).
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      // Do NOT overwrite the entire headers object
      // Only set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 * Handles expired access tokens (401 responses).
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /**
     * Exit early if:
     * - There is no response (network error, CORS, etc.)
     * - The status is not 401
     * - The request was already retried (prevents infinite loops)
     */
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /**
     * If a refresh is already in progress, queue this request.
     * It will be resolved or rejected once the refresh completes.
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    /**
     * Mark the request as retried and start the refresh flow.
     */
    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise(async (resolve, reject) => {
      try {
        // Request a new access token using the refresh token
        const response = await refreshTokenRequest();
        const { accessToken } = response.data;

        // Persist the new access token
        setToken(accessToken);

        // Update the failed original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry all queued requests
        processQueue(null, accessToken);

        resolve(api(originalRequest));
      } catch (refreshError) {
        // Reject all queued requests and force logout
        processQueue(refreshError, null);
        executeLogout();
        reject(refreshError);
      } finally {
        // Reset refresh state
        isRefreshing = false;
      }
    });
  },
);
