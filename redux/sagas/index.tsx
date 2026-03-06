import { all, takeLatest } from "redux-saga/effects";
import { GET_WORKSPACE_LIST } from "../actions/workSpaceAction/workSpaceAction";
import { handleGetWorkspaceList } from "./handlers/workSpaceHandler/workSpaceHandler";
import {
  CREATE_FORM,
  EDIT_FORM,
  GET_FORM_LIST,
} from "../actions/formManagementAction/formManagementAction";
import {
  handleCreateForm,
  handleEditForm,
  handleGetFormList,
} from "./handlers/formManagementHandler/formManagementHandler";
import {
  GET_USERDETAILS,
  RESET_PASSWORD,
  SEND_RESET_LINK,
  SET_NEW_PASSWORD,
  USER_LOGIN,
  USER_LOGOUT,
} from "../actions/authAction/authAction";
import {
  handleGetUserDetails,
  handleResetNewPassword,
  handleSendResetLink,
  handleSetNewPassword,
  handleUserLogin,
  handleUserLogout,
} from "./handlers/authHandler/authHandler";
import {
  handleCreateFacility,
  handleDeleteFacility,
  handleGetFacilityDetails,
  handleGetFacilityEnums,
  handleGetFacilityList,
  handleUpdateFacility,
} from "./handlers/facilityMasterHandler/facilityMasterHandler";
import {
  CREATE_FACILITY,
  DELETE_FACILITY,
  GET_FACILITY_DETAILS,
  GET_FACILITY_ENUMS,
  GET_FACILITY_LIST,
  UPDATE_FACILITY,
} from "../actions/facilityMasterAction/facilityMasterAction";
import {
  CREATE_ROLE,
  DELETE_ROLE,
  GET_ROLE_DEFINITIONS,
  GET_ROLE_DETAILS,
  GET_ROLES_LIST,
  UPDATE_ROLE,
} from "../actions/roleMasterAction/roleMasterAction";
import {
  handleCreateRole,
  handleDeleteRole,
  handleGetRole,
  handleGetRoleDefinitions,
  handleGetRolesList,
  handleUpdateRole,
} from "./handlers/roleMasterHandler/roleMasterHandler";
import {
  GET_USER_DETAILS,
  GET_USER_MASTER_LIST,
  INVITE_USER,
  REINVITE_USER,
  UPDATE_USER_DETAILS,
} from "../actions/userMasterAction/userMasterAction";
import {
  handleGetUserMasterDetails,
  handleGetUsersList,
  handleInviteUser,
  handleReInviteUser,
  handleUpdateUserDetails,
} from "./handlers/userMasterHandler/userMasterHandler";
import {
  GET_TASK_LIST,
  GET_TASKFORM_LIST,
} from "../actions/taskMasterAction/taskMasterAction";
import {
  handleGetTaskList,
  handleGetTaskFormList,
} from "./handlers/taskMasterHandler/taskMasterHandler";

export function* watcherSaga(): Generator<any, void, any> {
  yield all([
    // auth
    yield takeLatest(USER_LOGIN, handleUserLogin),
    yield takeLatest(USER_LOGOUT, handleUserLogout),
    yield takeLatest(GET_USERDETAILS, handleGetUserDetails),
    yield takeLatest(SET_NEW_PASSWORD, handleSetNewPassword),
    yield takeLatest(SEND_RESET_LINK, handleSendResetLink),
    yield takeLatest(RESET_PASSWORD, handleResetNewPassword),

    // user management

    // form management
    yield takeLatest(GET_WORKSPACE_LIST, handleGetWorkspaceList),
    yield takeLatest(GET_FORM_LIST, handleGetFormList),
    yield takeLatest(CREATE_FORM, handleCreateForm),
    yield takeLatest(EDIT_FORM, handleEditForm),

    // facility Master
    yield takeLatest(GET_FACILITY_LIST, handleGetFacilityList),
    yield takeLatest(CREATE_FACILITY, handleCreateFacility),
    yield takeLatest(GET_FACILITY_DETAILS, handleGetFacilityDetails),
    yield takeLatest(UPDATE_FACILITY, handleUpdateFacility),
    yield takeLatest(DELETE_FACILITY, handleDeleteFacility),
    yield takeLatest(GET_FACILITY_ENUMS, handleGetFacilityEnums),

    //task Master
    yield takeLatest(GET_TASKFORM_LIST, handleGetTaskFormList),
    yield takeLatest(GET_TASK_LIST, handleGetTaskList),
    // Roles Master
    yield takeLatest(GET_ROLES_LIST, handleGetRolesList),
    yield takeLatest(GET_ROLE_DETAILS, handleGetRole),
    yield takeLatest(CREATE_ROLE, handleCreateRole),
    yield takeLatest(UPDATE_ROLE, handleUpdateRole),
    yield takeLatest(DELETE_ROLE, handleDeleteRole),
    yield takeLatest(GET_ROLE_DEFINITIONS, handleGetRoleDefinitions),

    // user Master
    yield takeLatest(GET_USER_MASTER_LIST, handleGetUsersList),
    yield takeLatest(INVITE_USER, handleInviteUser),
    yield takeLatest(GET_USER_DETAILS, handleGetUserMasterDetails),
    yield takeLatest(UPDATE_USER_DETAILS, handleUpdateUserDetails),
    yield takeLatest(REINVITE_USER, handleReInviteUser),
  ]);
}
