import { useAppSelector } from "@/hooks/reduxHooks";

export const usePermissions = () => {
  const permissions = useAppSelector((state) => state.permission.permissions);
  const loggedInUserDetails = useAppSelector((state) => state.permission.loggedInUserDetails);
  console.log({permissions, loggedInUserDetails});
  

  const hasPermission = (perm: string) => permissions.includes(perm);

  return { permissions, hasPermission, loggedInUserDetails };
};
