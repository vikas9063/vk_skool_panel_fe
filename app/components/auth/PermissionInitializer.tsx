"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { AppDispatch, RootState } from "@/app/features/store";
import { loginUserDetails } from "@/app/features/permissionThunks";

export default function PermissionInitializer() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, permissions, loggedInUserDetails } = useSelector(
        (state: RootState) => state.permission
    );

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        async function fetchPermissions() {
            try {
                await dispatch(loginUserDetails()).unwrap();
                setInitialized(true);
            } catch (err) {
                console.error("Permission loading failed:", err);
            }
        }

        fetchPermissions();
    }, [dispatch]);

    // Show loader while fetching
    if (loading || !initialized) {
        return <Loader />;
    }

    // Optional: Handle API failure or no user
    if (error || !loggedInUserDetails) {
        return <div className="text-center mt-10 text-red-500">
            Failed to load user. Please log in again.
        </div>;
    }

    // Once permissions are loaded, render nothing — layout will continue
    return null;
}
