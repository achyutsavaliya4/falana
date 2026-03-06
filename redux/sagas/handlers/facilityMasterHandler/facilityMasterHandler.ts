import { PaginationMeta } from "@/commonJS/interfaces/utilsInterface";
import { responseInterface } from "../masterHandlerInterface";
import { FacilityItem } from "./facilityMasterHandlerInterface";
import { call, put } from "redux-saga/effects";
import {
  getFacilityListApi,
  createFacillityApi,
  updateFacillityApi,
  getFacilityDetailsApi,
  deleteFacilityApi,
  getFacilityEnumsApi,
} from "../../requests/facilityMasterRequest";
import {
  SET_FACILITY_DETAILS,
  SET_FACILITY_ENUMS,
  SET_FACILITY_LIST,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { FacilityAddFormData } from "@/redux/actions/facilityMasterAction/facilityMasterInterface";
import { SET_UI_ACTION } from "@/redux/actions/uiAction/uiAction";
import { SET_BTN_LOADER_ACTION } from "@/redux/actions/loaderAction/loaderAction";
import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";

export function* handleGetFacilityList(action: {
  type: string;
  payload: string;
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(getFacilityListApi);
    if (response?.status !== 200) return;
    if (hasKeys(response?.data)) {
      yield put({ type: SET_FACILITY_LIST, payload: response?.data });
    }
  } catch (error) {
    console.error(error);
  }
}
export function* handleCreateFacility(action: {
  type: string;
  payload: FacilityAddFormData;
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(createFacillityApi, action?.payload);
    if (response?.status !== 201) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { facilityCreateSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}

export function* handleGetFacilityDetails(action: {
  type: string;
  payload: number;
}) {
  try {
    const response: responseInterface<{
      data: { facility?: any };
    }> = yield call(getFacilityDetailsApi, action?.payload);
    if (response?.status !== 200) return;
    if (hasKeys(response?.data?.data?.facility)) {
      yield put({
        type: SET_FACILITY_DETAILS,
        payload: response?.data?.data?.facility,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
export function* handleUpdateFacility(action: {
  type: string;
  payload: any;
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(updateFacillityApi, action?.payload);
    if (response?.status !== 200) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { facilityUpdateSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleDeleteFacility(action: {
  type: string;
  payload: number;
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(deleteFacilityApi, action?.payload);
    if (response?.status !== 200) return;
    yield put({
      type: SET_UI_ACTION,
      payload: {
        customPayload: { facilityDeleteSuccess: true },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    yield put({ type: SET_BTN_LOADER_ACTION, payload: {} });
  }
}
export function* handleGetFacilityEnums(action: {
  type: string;
  payload: string;
}) {
  try {
    const response: responseInterface<{
      data: { facility_enums?: any[] };
    }> = yield call(getFacilityEnumsApi);
    if (response?.status !== 200) return;
    if (checkArray(response?.data?.data?.facility_enums)) {
      yield put({
        type: SET_FACILITY_ENUMS,
        payload: response?.data?.data?.facility_enums,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
