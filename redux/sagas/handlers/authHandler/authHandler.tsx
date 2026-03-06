import { call, put } from "redux-saga/effects";
import { responseInterface } from "../masterHandlerInterface";

import {
  ResetPasswordPayload,
  SendRestLinkPayload,
  SetPasswordPayload,
  UserLoginPaylaod,
  UserLogoutPaylaod,
} from "@/redux/actions/authAction/authActionInterface";
import {
  UserDetailsResponse,
  UserLoginResponse,
  UserLogoutResponse,
} from "./authHandlerInterface";
import {
  getUserDataApi,
  resetNewPasswordApi,
  sendResetLinkApi,
  setNewPasswordApi,
  UserLoginApi,
  UserLogoutApi,
} from "../../requests/authRequest";
import {
  GET_USERDETAILS,
  SET_USERDETAILS,
} from "@/redux/actions/authAction/authAction";
import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { storage } from "@/utils/storage";

export function* handleUserLogin(action: {
  type: string;
  payload: UserLoginPaylaod;
}) {
  try {
    const response: responseInterface<UserLoginResponse> = yield call(
      UserLoginApi,
      action?.payload,
    );

    if (response.status !== 200) return;
    const data = response.data.data;

    if (hasKeys(data)) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      yield put({ type: GET_USERDETAILS });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleUserLogout(action: {
  type: string;
  payload: UserLogoutPaylaod;
}) {
  try {
    const response: responseInterface<UserLogoutResponse> = yield call(
      UserLogoutApi,
      action?.payload,
    );

    if (response.status !== 200) return;
    yield call(storage.clearLoginTokens);
  } catch (err) {
    console.error(err);
  }
}

export function* handleGetUserDetails() {
  try {
    const response: responseInterface<UserDetailsResponse> =
      yield call(getUserDataApi);
    const data = response.data.data;
    if (hasKeys(data)) {
      if (!checkArray(data.tenants)) {
        // TODO:= Add Toaster Logic With Message(No Tenant Found. Please contact admin)
      } else {
        const tenant = data.tenants[0];
        if (
          hasKeys(tenant?.roles) &&
          Object.keys(tenant?.roles)?.length === 1
        ) {
          localStorage.setItem("tenant_id", String(tenant?.tenant_id));
        }
        yield put({ type: SET_USERDETAILS, payload: data });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleSetNewPassword(action: {
  type: string;
  payload: SetPasswordPayload;
}) {
  try {
    const response: responseInterface<UserDetailsResponse> = yield call(
      setNewPasswordApi,
      action.payload,
    );

    if (response.data) {
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleSendResetLink(action: {
  type: string;
  payload: SendRestLinkPayload;
}) {
  try {
    const response: responseInterface<UserDetailsResponse> = yield call(
      sendResetLinkApi,
      action.payload,
    );

    if (response.data) {
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleResetNewPassword(action: {
  type: string;
  payload: ResetPasswordPayload;
}) {
  try {
    const response: responseInterface<UserDetailsResponse> = yield call(
      resetNewPasswordApi,
      action.payload,
    );

    if (response.data) {
    }
  } catch (err) {
    console.error(err);
  }
}
