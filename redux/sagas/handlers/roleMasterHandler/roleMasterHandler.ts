import {
  createRoleApi,
  deleteRoleApi,
  getRoleDefinitionsApi,
  getRoleDetailsApi,
  getRolesListApi,
  updateRoleApi,
} from "../../requests/roleMasterRequest/roleMasterRequest";
import { responseInterface } from "../masterHandlerInterface";
import { call, put } from "redux-saga/effects";
import {
  RoleCreateResponse,
  RoleDefinitions,
  RoleDeleteResponse,
} from "./roleMasterHandlerInterface";
import {
  RoleAddPayload,
  RoleUpdatePayload,
} from "@/redux/actions/roleMasterAction/roleMasterActionInterface";
import { SET_UI_ACTION } from "@/redux/actions/uiAction/uiAction";
import { SET_BTN_LOADER_ACTION } from "@/redux/actions/loaderAction/loaderAction";
import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";
import {
  SET_ROLE_DEFINITIONS,
  SET_ROLE_DETAILS,
  SET_ROLES_LIST,
  SET_ROLES_LIST_META,
} from "@/redux/actions/roleMasterAction/roleMasterAction";

export function* handleGetRolesList(action: {
  type: string;
  payload: { query: string };
}) {
  try {
    const response: responseInterface<{
      data: { roles?: any[]; meta?: any };
    }> = yield call(getRolesListApi, action?.payload?.query);
    if (response?.status !== 200) return;
    const data = response?.data?.data;
    if (hasKeys(data)) {
      yield put({ type: SET_ROLES_LIST, payload: data?.roles });
      yield put({ type: SET_ROLES_LIST_META, payload: data?.meta });
    }
  } catch (error) {
    console.error(error);
  }
}
export function* handleCreateRole(action: {
  type: string;
  payload: RoleAddPayload;
}) {
  try {
    const response: responseInterface<{
      data: RoleCreateResponse;
    }> = yield call(createRoleApi, action?.payload);
    if (response?.status !== 201) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { roleCreateSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleGetRole(action: { type: string; payload: number }) {
  try {
    const response: responseInterface<{
      data: RoleCreateResponse;
    }> = yield call(getRoleDetailsApi, action?.payload);
    if (response?.status !== 200) return;
    if (hasKeys(response?.data?.data)) {
      yield put({
        type: SET_ROLE_DETAILS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
export function* handleUpdateRole(action: {
  type: string;
  payload: RoleUpdatePayload;
}) {
  try {
    const response: responseInterface<{
      data: RoleCreateResponse;
    }> = yield call(updateRoleApi, action?.payload);
    if (response?.status !== 200) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { roleCreateSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleDeleteRole(action: { type: string; payload: number }) {
  try {
    const response: responseInterface<{
      data: RoleDeleteResponse;
    }> = yield call(deleteRoleApi, action?.payload);

    if (response?.status !== 200) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { roleDeleteSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleGetRoleDefinitions() {
  try {
    const response: responseInterface<{
      data: RoleDefinitions;
    }> = yield call(getRoleDefinitionsApi);
    if (response?.status !== 200) return;
    const data = response?.data?.data;
    if (checkArray(data?.modules)) {
      yield put({
        type: SET_ROLE_DEFINITIONS,
        payload: data?.modules,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
