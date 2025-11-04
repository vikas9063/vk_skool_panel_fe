import axiosInstance from "@/lib/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginPayload } from "../types/user";



export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload: loginPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", payload);
            const data = response.data;

            // ✅ Store tokens securely in cookies (client-side)
            Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 }); // expires in 1 hour
            Cookies.set("refreshToken", data.refreshToken, { expires: 1 }); // expires in 1 day
            Cookies.set("username", data.username);

            return data;
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Failed to login. Please try again.";
            return rejectWithValue(message);
        }
    }
);
