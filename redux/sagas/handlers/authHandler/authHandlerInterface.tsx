export interface UserLoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface UserLogoutResponse {
  data: object;
  message: string;
  status_code: number;
  success: boolean;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
}

export interface Tenant {
  tenant_id: number;
  key: string;
  tenant_name: string;
  tenant_slug: string;
  facilities: Facility[];
  roles: Record<string, Role>;
}

export interface Facility {
  facility_id: number;
  facility_slug: string;
  latitude: string;
  longitude: string;
  role_id: number;
}

export interface Role {
  role_id: number;
  role_name: string;
  role_slug: string;
  is_facility_login_required: boolean;
  permissions: Permission[];
  permission_index: Record<string, boolean>;
}

export interface Permission {
  module_action_id: number;
  module_id: number;
  sub_module_id: number;
  action_id: number;
  module_slug: string;
  sub_module_slug: string;
  action_slug: string;
  permission: string;
}

export interface User {
  user_id: number;
  current_facility_id: number | null;
  tenants: Tenant[];
  profile: Profile;
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: User;
}
