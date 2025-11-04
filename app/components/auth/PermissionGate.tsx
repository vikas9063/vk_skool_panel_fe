"use client";

import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGateProps {
  perm: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ perm, children, fallback = null }: PermissionGateProps) {
  const { hasPermission } = usePermissions();

  return <>{hasPermission(perm) ? children : fallback}</>;
}
