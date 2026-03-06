import { Action, Reducer, combineReducers } from "redux";
import { UserState } from "./reducers/userReducer/userReducerInterface";
import userReducer from "./reducers/userReducer/userReducer";
import workSpaceReducer from "./reducers/workSpaceReducer/workSpaceReducer";
import formManagementReducer from "./reducers/formManagementReducer/formManagementReducer";
import { FormManagementState } from "./reducers/formManagementReducer/formManagementReducerInterface";
import { WorkSpaceState } from "./reducers/workSpaceReducer/workSpaceReducerInterface";
import authReducer from "./reducers/authReducer/authReducer";
import { AuthState } from "./reducers/authReducer/authReducerInterface";
import { FacilityMasterInterface } from "./reducers/facilityMasterReducer/facilityMasterReducerInterface";
import facilityMasterReducer from "./reducers/facilityMasterReducer/facilityMasterReducer";
import { loaderInterface } from "./reducers/loaderReducer/loaderReducerInterface";
import { loaderReducer } from "./reducers/loaderReducer/loaderReducer";
import uiRedcuer from "./reducers/uiReducer/uiReducer";
import { uiState } from "./reducers/uiReducer/uiReducerInterface";
import { RoleState } from "./reducers/roleMasterReducer/roleMasterReducerInterface";
import roleMasterRedcuer from "./reducers/roleMasterReducer/roleMasterReducer";
import { UserMasterReducerInterface } from "./reducers/userMasterReducer/userMasterReducerInterface";
import userMasterReducer from "./reducers/userMasterReducer/userMasterReducer";
import { toasterState } from "./reducers/toasterReducer/toasterReducerInterface";
import toasterReducer from "./reducers/toasterReducer/toasterReducer";
import taskMasterReducer from "./reducers/taskMasterReducer/taskMasterReducer";
import { TaskMasterInterface } from "./reducers/taskMasterReducer/taskMasterReducerInterface";
export interface RootState {
  user: UserState;
  forms: FormManagementState;
  workspace: WorkSpaceState;
  auth: AuthState;
  facility: FacilityMasterInterface;
  loader: loaderInterface;
  ui: uiState;
  role: RoleState;
  userMaster: UserMasterReducerInterface;
  toaster: toasterState;
  taskMaster: TaskMasterInterface;
}
const appReducers = combineReducers({
  user: userReducer,
  workspace: workSpaceReducer,
  forms: formManagementReducer,
  auth: authReducer,
  facility: facilityMasterReducer,
  loader: loaderReducer,
  ui: uiRedcuer,
  role: roleMasterRedcuer,
  userMaster: userMasterReducer,
  toaster: toasterReducer,
  taskMaster: taskMasterReducer,
});

const rootReducer: Reducer<RootState, Action> = (
  state: RootState | undefined,
  action: Action,
): RootState => {
  // Return the combined state from all reducers
  return appReducers(state, action);
};
export default rootReducer;
