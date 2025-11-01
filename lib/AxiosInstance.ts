import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach token to every request automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
