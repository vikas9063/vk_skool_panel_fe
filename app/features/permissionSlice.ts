import { createSlice } from "@reduxjs/toolkit";
import { loginUserDetails } from "./permissionThunks";
import { PermissionState } from "../types/user";



const initialState: PermissionState = {
  permissions: [],
  loading: false,
  error: null,
  loggedInUserDetails: null,
};

const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        // optional manual setter (e.g. for testing or manual updates)
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        clearPermissions: (state) => {
            state.permissions = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserDetails.fulfilled, (state, action) => {
                state.loading = false;

                const user = action.payload.userDetails;

                state.loggedInUserDetails = user; 

                // ✅ Extract and merge role + custom permissions
                const rolePerms = user.role?.permissions?.map((p) => p.permissionName) || [];
                const customPerms = user.customPermissions?.map((p) => p.permissionName) || [];

                // ✅ Deduplicate and store
                state.permissions = [...new Set([...rolePerms, ...customPerms])];
            })
            .addCase(loginUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load permissions";
            });
    },
});

export const { setPermissions, clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
