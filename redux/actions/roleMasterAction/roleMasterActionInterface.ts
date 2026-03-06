export interface RoleAddPayload {
  role_name: string;
  role_type: "multi-scoped" | "single-scoped";
  is_facility_visibility_required: boolean;
  is_facility_login_required: boolean;
  is_active: boolean;
  module_action_ids: number[];
  modules?: any[];
}

export interface RoleUpdatePayload {
  role_id: number;
  role_name: string;
  role_type: "multi-scoped" | "single-scoped";
  is_facility_visibility_required: boolean;
  is_facility_login_required: boolean;
  is_active: boolean;
  module_action_ids: number[];
}
