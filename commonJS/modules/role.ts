import { RoleAddPayload } from "@/redux/actions/roleMasterAction/roleMasterActionInterface";

export const convertRolePayload = (data: any): RoleAddPayload => {
  const { modules = [], ...rest } = data;

  const module_action_ids = modules
    .flatMap((module: any) => module.sub_modules ?? [])
    .flatMap((subModule: any) => subModule.actions ?? [])
    .filter((action: any) => action.action_permission === true)
    .map((action: any) => action.module_action_id);

  return {
    ...rest,
    role_type: rest?.is_facility_login_required
      ? "multi-scoped"
      : "single-scoped",
    module_action_ids,
  };
};
