import {
  RESET_ROLE_LIST,
  SET_ROLE_DEFINITIONS,
  SET_ROLES_LIST,
  SET_ROLES_LIST_META,
} from "@/redux/actions/roleMasterAction/roleMasterAction";
import { RoleState } from "./roleMasterReducerInterface";

const initialState: RoleState = {
  rolesList: [],
  rolesListMeta: {},
  roleDefinitions: [],
};

const roleMasterRedcuer = (
  state: RoleState = initialState,
  action: any,
) => {
  switch (action?.type) {
    case SET_ROLES_LIST:
      return {
        ...state,
        rolesList: action?.payload,
      };

    case SET_ROLES_LIST_META:
      return {
        ...state,
        rolesListMeta: action?.payload,
      };
    case SET_ROLE_DEFINITIONS:
      return {
        ...state,
        roleDefinitions: action?.payload,
      };
    case RESET_ROLE_LIST:
      return {
        ...state,
        rolesList: [],
        rolesListMeta: {},
      };
    default:
      return state;
  }
};

export default roleMasterRedcuer;
