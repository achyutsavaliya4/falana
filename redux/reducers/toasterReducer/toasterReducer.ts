import {
  ADD_TOASTER,
  ERR_MSG_FOR,
  RESET_ERR_MSG,
  RESET_ERR_MSG_FOR,
  SET_ERR_MSG,
} from "@/redux/actions/toasterAction/toasterAction";
import { toasterState } from "./toasterReducerInterface";

const initialState: toasterState = {
  toasterData: {},
  errMsg: {},
};

const toasterReducer = (
  state: toasterState = initialState,
  action: any
): toasterState => {
  switch (action.type) {
    case ADD_TOASTER:
      return {
        ...state,
        toasterData: action.payload,
      };
    case SET_ERR_MSG:
      return {
        ...state,
        errMsg: action?.payload,
      };
    case ERR_MSG_FOR:
      return {
        ...state,
        errorMsgData: action?.payload,
      };
    case RESET_ERR_MSG_FOR:
      return {
        ...state,
        errorMsgData: {},
      };
    case RESET_ERR_MSG:
      return {
        ...state,
        errMsg: {},
      };

    default:
      return state;
  }
};
export default toasterReducer;
