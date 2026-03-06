"use client";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { inputFieldInterface } from "@/commonJS/interfaces/renderFieldinterface/inputFieldInterface";
import { facilityAddEditJson } from "@/commonJson/facility-master/addEditPageJson";
import { button } from "@/components/Button/Button";
import CommonForm from "@/components/CommonForm/CommonForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import useCheckValidation from "@/hooks/useCheckValidation";
import { RootState } from "@/redux";
import {
  createFacility,
  getFacilityEnums,
  resetFacilityEnums,
  SET_FACILITY_ENUMS,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { FacilityAddFormData } from "@/redux/actions/facilityMasterAction/facilityMasterInterface";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import { resetUiAction } from "@/redux/actions/uiAction/uiAction";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FacilityMasterAdd = () => {
  // constants
  const checkValidation = useCheckValidation();
  const dispatch = useDispatch();
  const router = useRouter();
  const modulePermission = "settings.facility.create";
  const getConfig = useMemo(() => {
    let data: any = {};
    data.status = [
      { label: "active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ];
    data.store_type = [
      { label: "COCO", value: "COCO" },
      { label: "FOFO", value: "FOFO" },
    ];
    return data;
  }, []);

  // redux state
  const { facilityEnums } = useSelector((state: RootState) => state.facility);
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);

  // page state
  const [additionalDetails, setAdditionalDetails] = useState<
    { key: string; value: string }[]
  >([]);
  const [facilityFieldData, setFacilityFieldData] =
    useState<FacilityAddFormData>({} as FacilityAddFormData);
  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);

  // Functions
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: inputFieldInterface,
  ) => {
    const value = e.target.value;
    if (field?.is_additional_field) {
      updateAdditionalDetails(field?.fieldName as string, value);
    }
    setFacilityFieldData((prev: any) => {
      return {
        ...prev,
        [field?.fieldName as string]: value,
      };
    });
  };
  const onClickField = async (
    e: React.MouseEvent<HTMLButtonElement>,
    field: button,
  ) => {
    if (field?.id === "save") {
      setIsCheckValid(true);
      const isValid = await checkValidation(
        facilityAddEditJson,
        facilityFieldData,
      );
      if (isValid) {
        dispatch(
          setBtnLoaderAction({
            isLoading: true,
            btnFieldName: "save",
          }),
        );
        setIsCheckValid(false);
        dispatch(
          createFacility({
            ...facilityFieldData,
            details: additionalDetails,
          }),
        );
      }
    } else if (field?.id === "cross_btn") {
      router?.push(`/facility-master`);
    }
  };
  const onChangeSelect = (e: any, field: any) => {
    const value = e?.target?.value;
    if (field?.is_additional_field) {
      updateAdditionalDetails(field.fieldName, value);
    }
    setFacilityFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: value,
    }));
  };
  const updateAdditionalDetails = (key: string, value: string) => {
    setAdditionalDetails((prev) => {
      const index = prev?.findIndex((item) => item?.key === key);

      if (index !== -1) {
        // update existing
        const updated = [...prev];
        updated[index] = { key, value };
        return updated;
      }

      // add new
      return [...prev, { key, value }];
    });
  };

  // Effects

  useEffect(() => {
    if (
      hasKeys(userRolePermission) &&
      !userRolePermission?.[modulePermission]
    ) {
      router?.push(`/facility-master`);
    }
  }, [userRolePermission]);

  useEffect(() => {
    dispatch(getFacilityEnums());
  }, []);

  useEffect(() => {
    if (customPayload?.facilityCreateSuccess) {
      router?.push(`/facility-master`);
    }
  }, [customPayload?.facilityCreateSuccess]);

  useEffect(() => {
    return () => {
      dispatch(resetUiAction());
      dispatch(resetFacilityEnums());
      setFacilityFieldData({} as FacilityAddFormData);
      setAdditionalDetails([]);
    };
  }, []);
  return (
    <div className="page-content">
      <PageHeader />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <CommonForm
            formJson={facilityAddEditJson}
            fieldData={facilityFieldData}
            fullFieldData={{
              facilityEnums,
            }}
            onChangeInput={onChangeInput}
            isCheckValid={isCheckValid}
            configData={getConfig}
            onClickField={onClickField}
            onChangeSelect={onChangeSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityMasterAdd;
