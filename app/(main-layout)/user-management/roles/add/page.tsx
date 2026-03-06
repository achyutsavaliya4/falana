"use client";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { inputFieldInterface } from "@/commonJS/interfaces/renderFieldinterface/inputFieldInterface";
import { convertRolePayload } from "@/commonJS/modules/role";
import { roleMasterJson } from "@/commonJson/roles-master/add";
import { button } from "@/components/Button/Button";
import CommonForm from "@/components/CommonForm/CommonForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import useCheckValidation from "@/hooks/useCheckValidation";
import { RootState } from "@/redux";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import {
  createRole,
  getRoleDefinitions,
  resetRoleDefinitions,
} from "@/redux/actions/roleMasterAction/roleMasterAction";
import { RoleAddPayload } from "@/redux/actions/roleMasterAction/roleMasterActionInterface";
import { resetUiAction } from "@/redux/actions/uiAction/uiAction";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoleMasterAdd = () => {
  // constants
  const checkValidation = useCheckValidation();
  const dispatch = useDispatch();
  const router = useRouter();
  const modulePermission = "users.roles.create";

  // redux state
  const { roleDefinitions } = useSelector((state: RootState) => state.role);
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);

  // page state
  const [roleFieldData, setRoleFieldData] = useState<RoleAddPayload>();
  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);
  const [modulePermissions, setModulePermissions] = useState([]);

  const getConfig = useMemo(
    () => ({
      modules: modulePermissions || [],
    }),
    [modulePermissions],
  );

  // Functions
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: inputFieldInterface,
  ) => {
    const value = e.target.value;

    setRoleFieldData((prev: any) => {
      return {
        ...prev,
        [field?.fieldName]: value,
      };
    });
  };

  const onClickField = async (
    e: React.MouseEvent<HTMLButtonElement>,
    field: button,
  ) => {
    if (field?.id === "save" && hasKeys(roleFieldData)) {
      setIsCheckValid(true);
      const isValid = await checkValidation(roleMasterJson, roleFieldData);
      console.log("isValid", isValid);
      
      if (isValid) {
        dispatch(
          setBtnLoaderAction({
            isLoading: true,
            btnFieldName: "save",
          }),
        );
        setIsCheckValid(false);
        dispatch(createRole(convertRolePayload(roleFieldData)));
      }
    } else if (field?.id === "cross_btn") {
      router?.push(`/user-management/roles`);
    }
  };
  const onChangeSelect = (e: any, field: any) => {
    const value = e?.target?.value;

    setRoleFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: value,
    }));
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    fieldData: any,
  ) => {
    const { fieldName } = field;

    if (fieldName === "action_permission") {
      setRoleFieldData((prev) => {
        const moduleIdx = prev?.modules?.findIndex(
          (m) => m.id === fieldData.module_id,
        );

        if (moduleIdx === -1) return prev;

        const subModuleIdx = prev?.modules[moduleIdx].sub_modules.findIndex(
          (sM) => sM.id === fieldData.sub_module_id,
        );

        if (subModuleIdx === -1) return prev;

        const actionsIdx = prev?.modules[moduleIdx].sub_modules?.[
          subModuleIdx
        ]?.actions?.findIndex(
          (sM) => sM.module_action_id === fieldData.module_action_id,
        );

        return {
          ...prev,
          modules: prev?.modules.map((module, mIdx) =>
            mIdx !== moduleIdx
              ? module
              : {
                  ...module,
                  sub_modules: module.sub_modules.map((subModule, sIdx) =>
                    sIdx !== subModuleIdx
                      ? subModule
                      : {
                          ...subModule,
                          sub_module_permission: subModule.actions.every(
                            (action, aIdx) =>
                              aIdx === actionsIdx
                                ? e.target.checked
                                : Boolean(action?.[fieldName]),
                          ),
                          actions: subModule.actions.map((actions, aIdx) =>
                            aIdx !== actionsIdx
                              ? actions
                              : {
                                  ...actions,
                                  [fieldName]: e.target.checked,
                                },
                          ),
                        },
                  ),
                },
          ),
        };
      });

      return;
    } else if (fieldName === "sub_module_permission") {
      setRoleFieldData((prev) => {
        const moduleIdx = prev?.modules?.findIndex(
          (m) => m.id === fieldData.module_id,
        );

        if (moduleIdx === -1) return prev;

        const subModuleIdx = prev?.modules[moduleIdx].sub_modules.findIndex(
          (sM) => sM.id === fieldData.id,
        );

        if (subModuleIdx === -1) return prev;

        return {
          ...prev,
          modules: prev?.modules.map((module, mIdx) =>
            mIdx !== moduleIdx
              ? module
              : {
                  ...module,
                  sub_modules: module.sub_modules.map((subModule, sIdx) =>
                    sIdx !== subModuleIdx
                      ? subModule
                      : {
                          ...subModule,
                          sub_module_permission: e.target.checked,
                          actions: subModule.actions.map((action) => ({
                            ...action,
                            action_permission: e.target.checked,
                          })),
                        },
                  ),
                },
          ),
        };
      });

      return;
    }

    setRoleFieldData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  const handleChangeSwitch = (
    e: ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    setRoleFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: e.target.checked,
    }));
  };

  // Effects
  useEffect(() => {
    if (
      hasKeys(userRolePermission) &&
      !userRolePermission?.[modulePermission]
    ) {
      router?.push(`/user-management/roles`);
    }
  }, [userRolePermission]);

  useEffect(() => {
    dispatch(getRoleDefinitions());
  }, []);

  useEffect(() => {
    setModulePermissions(roleDefinitions);
    setRoleFieldData((prev) => ({ modules: roleDefinitions }));
  }, [roleDefinitions]);

  useEffect(() => {
    if (customPayload?.roleCreateSuccess) {
      router?.push(`/user-management/roles`);
    }
  }, [customPayload?.roleCreateSuccess]);

  useEffect(() => {
    return () => {
      dispatch(resetUiAction());
      dispatch(resetRoleDefinitions());
    };
  }, []);
  console.log(
    "roleDefinitionsroleDefinitions",
    modulePermissions,
    roleFieldData,
  );

  return (
    <div className="page-content">
      <PageHeader />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <CommonForm
            formJson={roleMasterJson}
            fieldData={JSON.parse(JSON.stringify(roleFieldData || {}))}
            fullFieldData={{
              modulePermissions,
            }}
            onChangeInput={onChangeInput}
            isCheckValid={isCheckValid}
            configData={getConfig}
            onChangeInput={handleChangeInput}
            onChangeSwitch={handleChangeSwitch}
            onClickField={onClickField}
            onChangeSelect={onChangeSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleMasterAdd;
