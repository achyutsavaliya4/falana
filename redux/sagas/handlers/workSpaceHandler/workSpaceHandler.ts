import { call, put } from "redux-saga/effects";
import { getWorkspaceListApi } from "../../requests/workSpaceRequest";
import { responseInterface } from "../masterHandlerInterface";
import { SET_WORKSPACE_LIST } from "@/redux/actions/workSpaceAction/workSpaceAction";
import { WorkspaceListItem } from "./workSpaceHandlerInterface";

export function* handleGetWorkspaceList() {
  try {
    const response: responseInterface<WorkspaceListItem[]> = yield call(
      getWorkspaceListApi
    );

    if (response.data) {
      yield put({ type: SET_WORKSPACE_LIST, payload: response.data });
    }
  } catch (err) {
    console.error(err);
  }
}
