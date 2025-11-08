import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// ✅ Attach token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Handle responses and refresh logic
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.status === 403 && error.response?.data?.message === "Anonymous user cannot access this resource.") {
            console.log("Anonymous user access detected. Redirecting to login...");
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.href = "/login";
            return Promise.reject("Anonymous user cannot access this resource.");
        }
        if (error.status === 401 && error.response?.data?.message === "Token expired") {
            console.log("Access token expired. Refreshing...");
            try {
                const refreshToken = Cookies.get("refreshToken");
                console.log("Refresh Token: ", refreshToken);

                if (!refreshToken) {
                    window.location.href = "/login";
                    return Promise.reject("No refresh token available");
                }

                // Use base axios to avoid interceptor loops
                const refreshResponse = await axios.get(
                    `${BASE_URL}/auth/refresh-token/${refreshToken}`
                );

                const { accessToken } = refreshResponse.data;
                Cookies.set("accessToken", accessToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        // Default error
        return Promise.reject(error);
    }
);

export default axiosInstance;
