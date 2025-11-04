import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";
import Cookies from "js-cookie";

interface AuthState {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    username: Cookies.get("username") || null,
    accessToken: Cookies.get("accessToken") || null,
    refreshToken: Cookies.get("refreshToken") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.username = null;
            state.accessToken = null;
            state.refreshToken = null;
            Cookies.remove("accessToken");
            console.log("Logging out, removing tokens from cookies");
            Cookies.remove("refreshToken");
            console.log("Logging out, removing refresh tokens from cookies");
            Cookies.remove("username");
            console.log("Logging out, removing username from cookies");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload.username;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
