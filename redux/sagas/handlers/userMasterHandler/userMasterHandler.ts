import { call, put } from "redux-saga/effects";
import { getFacilityDetailsApi } from "../../requests/facilityMasterRequest";
import { responseInterface } from "../masterHandlerInterface";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { SET_USER_DETAILS, SET_USER_MASTER_LIST } from "@/redux/actions/userMasterAction/userMasterAction";
import { getUserMasterListApi, inviteUserApi, reInviteUserApi, updateUserDetailsApi } from "../../requests/userMasterRequest/userMasterRequest";
import { SET_UI_ACTION } from "@/redux/actions/uiAction/uiAction";
import { SET_BTN_LOADER_ACTION } from "@/redux/actions/loaderAction/loaderAction";
import { InviteUserResponse, ReInviteUserResponse, UsersMasterResponse } from "./userMasterHandlerInterface";
import { ADD_TOASTER } from "@/redux/actions/toasterAction/toasterAction";

export function* handleGetUsersList(action: {
  type: string;
  payload: {query:string};
}) {
  try {
    const response: responseInterface<{
      data: UsersMasterResponse
    }> = yield call(getUserMasterListApi, action?.payload?.query);
    if (response?.status !== 200) return 
    if(hasKeys(response?.data)){
      yield put({ type: SET_USER_MASTER_LIST, payload: response?.data });
    }
  
  } catch (error) {
    console.error(error);
  }
}

export function* handleInviteUser(action: {
  type: string;
  payload: any;
}) {
  try {
    const response: responseInterface<InviteUserResponse> = yield call(inviteUserApi, action?.payload);
    if (response?.status !== 201) return 
      yield put({
        type: SET_UI_ACTION,
        payload: {
          customPayload: { userInviteSuccess: true },
        },
      });
      yield put({
        type: ADD_TOASTER,
        payload: {
          customPayload: { type: "success", message: response?.data?.message },
        },
      });
    
  } catch (error) {
    console.error(error);
  }finally{
     yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleGetUserMasterDetails(action: {
  type: string;
  payload: number;
}) {
  try {
    const response: responseInterface<{
      data: { user?: any };
    }> = yield call(getFacilityDetailsApi, action?.payload);
    if (response?.status !== 200) return 
    if(hasKeys(response?.data?.data?.user)){
      yield put({ type: SET_USER_DETAILS, payload: response?.data?.data?.user });
    }
    
  } catch (error) {
    console.error(error);
  }
}

export function* handleUpdateUserDetails(action: {
  type: string;
  payload: any;
}) {
  try {
    const response: responseInterface<{ message?: string; data?: any }> = yield call(updateUserDetailsApi, action?.payload);
    if (response?.status !== 200) return 
      yield put({
        type: SET_UI_ACTION,
        payload: {
          customPayload: { userUpdateSuccess: true },
        },
      });
      yield put({
        type: ADD_TOASTER,
        payload: {
          customPayload: { type: "success", message: (response as any)?.data?.message },
        },
      });
    
  } catch (error) {
    console.error(error);
  }finally{
     yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleReInviteUser(action: {
  type: string;
  payload: number;
}) {
  try {
    const response: responseInterface<ReInviteUserResponse> = yield call(reInviteUserApi, action?.payload);
    if (response?.status !== 200) return 
      yield put({
        type: SET_UI_ACTION,
        payload: {
          customPayload: { userReInviteSuccess: true },
        },
      });
      yield put({
        type: ADD_TOASTER,
        payload: {
          customPayload: { type: "success", message: (response as any)?.data?.message },
        },
      });
    
  } catch (error) {
    console.error(error);
  }finally{
     yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}