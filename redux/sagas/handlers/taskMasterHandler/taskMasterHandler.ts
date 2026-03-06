import { responseInterface } from "../masterHandlerInterface";
import { getFormApi, getTaskApi } from "../../requests/taskMasterRequest";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { call, put } from "redux-saga/effects";
import {
  SET_TASKFORM_LIST,
  SET_TASK_LIST,
} from "@/redux/actions/taskMasterAction/taskMasterAction";

export function* handleGetTaskFormList(action: {
  type: string;
  payload: string;
}) {
  try {
    const response: responseInterface<{
      data: { forms?: any[] };
    }> = yield call(getFormApi);
    if (response?.status !== 200) return;
    if (hasKeys(response?.data)) {
      yield put({
        type: SET_TASKFORM_LIST,
        payload: response?.data?.data?.forms,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* handleGetTaskList(action: { type: string; payload: string }) {
  try {
    const response: responseInterface<{
      data: { task_categories?: any[] };
    }> = yield call(getTaskApi);
    if (response?.status !== 200) return;
    if (hasKeys(response?.data)) {
      yield put({
        type: SET_TASK_LIST,
        payload: response?.data?.data?.task_categories,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
