export const GET_TASK_LIST = "GET_TASK_LIST";
export const GET_TASKFORM_LIST = "GET_TASKFORM_LIST";
export const SET_TASK_LIST = "SET_TASK_LIST";
export const SET_TASKFORM_LIST = "SET_FORM_LIST";

export const getTaskList = () => {
  return {
    type: GET_TASK_LIST,
  };
};

export const getFormList = () => {
  return {
    type: GET_TASKFORM_LIST,
  };
};
