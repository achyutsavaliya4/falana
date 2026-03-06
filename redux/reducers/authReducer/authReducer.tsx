import { SET_USERDETAILS } from "@/redux/actions/authAction/authAction";
import { AuthState } from "./authReducerInterface";

const initialState: AuthState = {};

// Define the user reducer
const authReducer = (
  state: AuthState = initialState,
  action: { type: string; payload: any },
): AuthState => {
  switch (action.type) {
    case SET_USERDETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
