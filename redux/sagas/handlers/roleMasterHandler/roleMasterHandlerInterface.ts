import { PaginationMeta } from "@/commonJS/interfaces/utilsInterface";
import { HttpStatusCode } from "axios";

export interface RoleListItem {
  id: number;
  tenant_id: number;
  name: string;
  slug: string;
  role_type: "multi-scoped" | "single-scoped";
  is_facility_visibility_required: boolean;
  is_facility_login_required: boolean;
  is_active: boolean;
  module_action_ids: number[] | null;
}

export interface RoleDefinitions {
  modules: RoleModule[];
}

export interface RoleModule {
  id: number;
  name: string;
  slug: string;
  sub_modules: RoleSubModule[];
}

export interface RoleSubModule {
  id: number;
  module_id: number;
  name: string;
  slug: string;
  actions: RoleModuleAction[];
}

export interface RoleModuleAction {
  module_action_id: number;
  module_id: number;
  sub_module_id: number;
  action_id: number;
  name: string;
  slug: string;
}

export interface RoleListResponse {
  success: true;
  status_code: HttpStatusCode;
  message: string;
  data: { roles: RoleListItem[] };
  meta: PaginationMeta;
}

export interface RoleCreateResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: RoleCreateData;
}

export interface RoleCreateData {
  id: number;
  tenant_id: number;
  name: string;
  slug: string;
  role_type: "multi-scoped" | "single-scoped";
  is_facility_visibility_required: boolean;
  is_facility_login_required: boolean;
  is_active: boolean;
  module_action_ids: number[];
}

export interface RoleDeleteResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: Record<string, never>;
}
