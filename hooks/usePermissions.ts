import { useAppSelector } from "@/hooks/reduxHooks";

export const usePermissions = () => {
  const permissions = useAppSelector((state) => state.permission.permissions);

  const hasPermission = (perm: string) => permissions.includes(perm);

  return { permissions, hasPermission };
};
