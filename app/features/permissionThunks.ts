import axiosInstance from "@/lib/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse, UserDetails } from "../types/user";

export const loginUserDetails = createAsyncThunk<
  { userDetails: UserDetails }, // ✅ Correct return type
  void,
  { rejectValue: string }
>(
  "user/loggedin-user-details",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ApiResponse<{ userDetails: UserDetails }>>(
        "/user/loggedin-user-details"
      );

      return response.data.result; // returns { userDetails }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch user details. Please try again.";
      return rejectWithValue(message);
    }
  }
);
