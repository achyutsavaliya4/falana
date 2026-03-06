import {
  ResetPasswordPayload,
  SendRestLinkPayload,
  SetPasswordPayload,
  UserLoginPaylaod,
  UserLogoutPaylaod,
} from "./authActionInterface";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_USERDETAILS = "GET_USERDETAILS";
export const SET_USERDETAILS = "SET_USERDETAILS";
export const SET_NEW_PASSWORD = "SET_NEW_PASSWORD";
export const SEND_RESET_LINK = "SEND_RESET_LINK";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const userLogin = (credentials: UserLoginPaylaod) => ({
  type: USER_LOGIN,
  payload: credentials,
});

export const userLogout = (token: UserLogoutPaylaod) => ({
  type: USER_LOGOUT,
  payload: token,
});

export const userDetails = () => ({
  type: GET_USERDETAILS,
});

export const setNewPassword = (data: SetPasswordPayload) => ({
  type: SET_NEW_PASSWORD,
  payload: data,
});

export const sendResetLink = (data: SendRestLinkPayload) => ({
  type: SEND_RESET_LINK,
  payload: data,
});

export const resetPassword = (data: ResetPasswordPayload) => ({
  type: RESET_PASSWORD,
  payload: data,
});
