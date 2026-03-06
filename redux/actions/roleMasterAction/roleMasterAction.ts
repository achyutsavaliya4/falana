import { RoleAddPayload, RoleUpdatePayload } from "./roleMasterActionInterface";

export const GET_ROLES_LIST = "GET_ROLES_LIST";
export const SET_ROLES_LIST = "SET_ROLES_LIST";
export const SET_ROLES_LIST_META = "SET_ROLES_LIST_META";
export const GET_ROLE_DETAILS = "GET_ROLE_DETAILS";
export const SET_ROLE_DETAILS = "SET_ROLE_DETAILS";
export const CREATE_ROLE = "CREATE_ROLE";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const DELETE_ROLE = "DELETE_ROLE";
export const GET_ROLE_DEFINITIONS = "GET_ROLE_DEFINITIONS";
export const SET_ROLE_DEFINITIONS = "SET_ROLE_DEFINITIONS";
export const RESET_ROLE_LIST = "RESET_ROLE_LIST";

export const getRolesList = ({ query }: { query: string }) => {
  return {
    type: GET_ROLES_LIST,
    payload: { query },
  };
};

export const getRoleDetails = (roleId: number) => {
  return {
    type: GET_ROLE_DETAILS,
    payload: roleId,
  };
};

export const createRole = (data: RoleAddPayload) => {
  return {
    type: CREATE_ROLE,
    payload: data,
  };
};

export const updateRole = (data: RoleUpdatePayload) => {
  return {
    type: UPDATE_ROLE,
    payload: data,
  };
};

export const deleteRole = (roleId: number) => {
  return {
    type: DELETE_ROLE,
    payload: roleId,
  };
};

export const getRoleDefinitions = () => {
  return {
    type: GET_ROLE_DEFINITIONS,
  };
};

export const resetRoleDefinitions = () => {
  return {
    type: SET_ROLE_DEFINITIONS,
    payload: [],
  };
};
export const resetRoleList = () => {
  return {
    type: RESET_ROLE_LIST,
  };
};
