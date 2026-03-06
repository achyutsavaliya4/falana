export const SET_USER_ROLE_PERMISSION = "SET_USER_ROLE_PERMISSION";

export const setUserRolePermission = (data: Record<string, boolean>) => ({
  type: SET_USER_ROLE_PERMISSION,
  payload: data,
});
