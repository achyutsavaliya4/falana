import { get } from "@/redux/apiWrapper";

export const getFormApi = () => {
  return get(`/tasks/form/`);
};

export const getTaskApi = () => {
  return get(`/tasks/master/categories`);
};
