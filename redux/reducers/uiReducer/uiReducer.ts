import {
  RESET_UI_ACTION,
  SET_UI_ACTION,
} from "@/redux/actions/uiAction/uiAction";
import { uiState } from "./uiReducerInterface";

const initialState: uiState = {
  activeMenuField: "",
  customPayload: {},
  isSuccess: false,
};

const uiRedcuer = (state: uiState = initialState, action: any) => {
  switch (action?.type) {
    case SET_UI_ACTION:
      return {
        ...state,
        ...action?.payload,
      };
    case RESET_UI_ACTION:
      return {
        ...state,
        isSuccess: false,
        customPayload: null,
      };
      default:
        return state
  }
};

export default uiRedcuer
