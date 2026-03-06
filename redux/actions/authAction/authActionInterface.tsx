export interface UserLoginPaylaod {
  email: string;
  password: string;
}

export interface UserLogoutPaylaod {
  refresh_token: string;
}

export interface SetPasswordPayload {
  invite_token: string;
  password: string;
  confirm_password: string;
}

export interface SendRestLinkPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirm_password: string;
}
