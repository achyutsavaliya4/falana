import { RootState } from "@/redux";
import { useSelector } from "react-redux";
type CheckPermission = (
  module: string,
  subModule: string,
  askedPermission: string
) => boolean;

const usePermission = () => {
  const { userDetails } = useSelector((state: RootState) => state.user);

  const checkPermission: CheckPermission = (
    module: any,
    subModule: any,
    askedPermission: any
  ) => {
    let isAllowed = false;
    const modulePermissions = userDetails?.module_permissions?.[module];

    if (modulePermissions) {
      if (subModule) {
        const subModulePermissions = modulePermissions[subModule];
        if (subModulePermissions) {
          if (askedPermission) {
            if (
              subModulePermissions.includes(askedPermission) ||
              subModulePermissions.includes(askedPermission.toLowerCase())
            ) {
              isAllowed = true;
            }
          } else {
            isAllowed = true;
          }
        }
      } else {
        isAllowed = true;
      }
    }
    return isAllowed;
  };

  return checkPermission;
};

export default usePermission;
