import { SET_USER_ROLE_PERMISSION } from "@/redux/actions/userAction/userAction";
import { UserState } from "./userReducerInterface";

const initialState: UserState = {
  userDetails: {},
};

// Define the user reducer
const userReducer = (
  state: UserState = initialState,
  action: { type: string; payload: any },
): UserState => {
  switch (action.type) {
    case SET_USER_ROLE_PERMISSION:
      return {
        ...state,
        userRolePermission: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
