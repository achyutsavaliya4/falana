import { SET_WORKSPACE_LIST } from "@/redux/actions/workSpaceAction/workSpaceAction";
import { WorkSpaceState } from "./workSpaceReducerInterface";

const initialState: WorkSpaceState = {
  workspaces: [],
};

const workSpaceReducer = (
  state: WorkSpaceState = initialState,
  action: { type: string; payload: any }
): WorkSpaceState => {
  switch (action.type) {
    case SET_WORKSPACE_LIST:
      return {
        ...state,
        workspaces: action.payload,
      };

    default:
      return state;
  }
};

export default workSpaceReducer;
