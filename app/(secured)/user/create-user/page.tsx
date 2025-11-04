"use client";
import { usePermissions } from '@/hooks/usePermissions';

const CreateUserPage = () => {

  const {hasPermission, permissions, loggedInUserDetails} = usePermissions();

  return (
    <div>
      {permissions.join(", ")}
      ----------------------------------
      {JSON.stringify(loggedInUserDetails)}
    </div>
  )
}

export default CreateUserPage
