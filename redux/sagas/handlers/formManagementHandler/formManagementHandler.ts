import { call, put } from "redux-saga/effects";
import { responseInterface } from "../masterHandlerInterface";
import {
  getCreateFormApi,
  getEditFormApi,
  getFormListApi,
} from "../../requests/formManagementRequest";
import {
  formListItem,
  FormListLinks,
  FormListMeta,
  getFormListPayload,
} from "./formManagementHandlerInterface";
import {
  SET_FORM_LIST,
  SET_FORM_LIST_LINKS,
  SET_FORM_LIST_META,
} from "@/redux/actions/formManagementAction/formManagementAction";
import { CreateForm } from "@/redux/actions/formManagementAction/formManagementActionInterface";

export function* handleGetFormList(action: {
  type: string;
  payload: getFormListPayload;
}) {
  try {
    const response: responseInterface<{
      data: formListItem[];
      meta: FormListMeta;
      links: FormListLinks;
    }> = yield call(
      getFormListApi,
      action?.payload?.workspaceId,
      action?.payload?.query,
    );

    if (response.data) {
      yield put({ type: SET_FORM_LIST, payload: response.data.data });
      yield put({ type: SET_FORM_LIST_META, payload: response.data.meta });
      yield put({ type: SET_FORM_LIST_LINKS, payload: response.data.links });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleCreateForm(action: {
  type: string;
  payload: CreateForm;
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(getCreateFormApi, action?.payload);

    if (response.data) {
    }
  } catch (err) {
    console.error(err);
  }
}

export function* handleEditForm(action: {
  type: string;
  payload: { data: CreateForm; id: number };
}) {
  try {
    const response: responseInterface<{
      data: object;
    }> = yield call(getEditFormApi, action?.payload?.id, action?.payload?.data);

    if (response.data) {
    }
  } catch (err) {
    console.error(err);
  }
}
