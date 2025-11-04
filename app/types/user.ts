export type loginPayload = {
    email: string;
    password: string;
};

export type loginResponse = {
    accessToken: string;
    refreshToken: string;
    username: string;
    status: string;
    refreshTokenExpiration: string;
    tokenExpiration: string;
};

export type ApiResponse<T> = {
    result: T;
    message: string;
    status: string;
};

export type Permission = {
  permissionId: number;
  permissionName: string;
};

export type Role = {
  roleId: string;
  roleName: string;
  permissions: Permission[];
};

export type UserDetails = {
  createdAt: string; 
  updatedAt: string;
  userId: string;
  email: string;
  password: string;
  name: string;
  plan: string;
  role: Role;
  customPermissions: Permission[];
  enabled: boolean;
  deleted: boolean;
  username: string;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
};

export type PermissionState = {
    permissions: string[];
    loading: boolean;
    error: string | null;
    loggedInUserDetails: UserDetails | null;
};

