"use client";

import { loginUserDetails } from "@/app/features/permissionThunks";
import { AppDispatch, RootState } from "@/app/features/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function PermissionInitializer() {
    const dispatch = useDispatch<AppDispatch>();
    const { permissions, loading } = useSelector(
        (state: RootState) => state.permission
    );
    useEffect(() => {
        if (permissions.length === 0 && !loading) {
            dispatch(loginUserDetails());
        }
    }, []);

    return null;
}
