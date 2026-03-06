import {
  GET_TASKFORM_LIST,
  GET_TASK_LIST,
  SET_TASKFORM_LIST,
  SET_TASK_LIST,
} from "@/redux/actions/taskMasterAction/taskMasterAction";
import { TaskMasterInterface } from "./taskMasterReducerInterface";

const initialState: any = {
  taskList: [],
  formList: [],
};

const taskMasterReducer = (
  state: TaskMasterInterface = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_TASKFORM_LIST:
      return { ...state, formList: action?.payload };

    case SET_TASK_LIST:
      return { ...state, taskList: action?.payload };

    default:
      return state;
  }
};

export default taskMasterReducer;
