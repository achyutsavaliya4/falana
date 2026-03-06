import { resretErrMsg, toasterPaylod } from "./toasterActionInterface";

export const ADD_TOASTER = "ADD_TOASTER";
export const RESET_ERR_MSG = "RESET_ERR_MSG";
export const SET_ERR_MSG = "SET_ERR_MSG";
export const ERR_MSG_FOR = "ERR_MSG_FOR";
export const RESET_ERR_MSG_FOR = "RESET_ERR_MSG_FOR";
export const SET_ERR_MESSAGES = "SET_ERR_MESSAGES";

export const getToaster = (
  payload: toasterPaylod
): { type: typeof ADD_TOASTER; payload: toasterPaylod } => {
  return {
    type: ADD_TOASTER,
    payload,
  };
};

export const resetErrMsg = (
  payload?: resretErrMsg
): { type: typeof RESET_ERR_MSG; payload?: toasterPaylod } => {
  return {
    type: RESET_ERR_MSG,
    payload,
  };
};

export const resetErrorMsgFor = () =>{
  return {
    type: RESET_ERR_MSG_FOR,
  }
}