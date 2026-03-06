import {
  ResetPasswordPayload,
  SendRestLinkPayload,
  SetPasswordPayload,
  UserLogoutPaylaod,
} from "@/redux/actions/authAction/authActionInterface";
import { get, post } from "@/redux/apiWrapper";

export const UserLoginApi = (data: any) => {
  return post("/auth/login", data);
};

export const UserLogoutApi = (data: UserLogoutPaylaod) => {
  return post("/auth/logout", data);
};

export const getUserDataApi = () => {
  return get(`/auth/me`);
};

export const setNewPasswordApi = (data: SetPasswordPayload) => {
  return post(`/users/invite/set-password`, data);
};

export const sendResetLinkApi = (data: SendRestLinkPayload) => {
  return post(`/auth/password/forgot`, data);
};

export const resetNewPasswordApi = (data: ResetPasswordPayload) => {
  return post(`/users/reset-password`, data);
};
