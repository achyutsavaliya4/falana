import {
  RoleAddPayload,
  RoleUpdatePayload,
} from "@/redux/actions/roleMasterAction/roleMasterActionInterface";
import { get, post, put } from "@/redux/apiWrapper";
export const getRolesListApi = (query?: string) => {
  return get(`/roles${query ? `?${query}` : ""}`);
};
export const getRoleDetailsApi = (roleId: number) => {
  return get(`/roles/${roleId}`);
};
export const createRoleApi = (payload: RoleAddPayload) => {
  return post(`/roles`, payload);
};
export const updateRoleApi = (payload: RoleUpdatePayload) => {
  return put(`/roles/${payload?.role_id}`, payload);
};
export const deleteRoleApi = async (roleId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({status: 200});
    }, 5000);
  });
  // return remove(`/roles/${roleId}`);
};
export const getRoleDefinitionsApi = () => {
  return get(`/rbac/definitions`);
};
