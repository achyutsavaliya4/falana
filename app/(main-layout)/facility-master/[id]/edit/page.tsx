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
  getFacilityDetails,
  getFacilityEnums,
  resetFacilityEnums,
  updateFacility,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import { resetUiAction } from "@/redux/actions/uiAction/uiAction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FacilityMasterEdit = () => {

  // constants
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const checkValidation = useCheckValidation();
  const modulePermission = "settings.facility.update";
  const { id: facilityId } = params;
  const getConfig = useMemo(() => {
    let data: any = {};
    data.status = [
      { label: "active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ];
    data.store_type = [
      { label: "COCO", value: "COCO" },
      { label: "FOFO", value: "FOFO" },
    ]
    return data;
  }, []);
  const breadCrumbsPaths = [
    {
      title: "",
      path: "/",
    },
    {
      title: "Facility Master",
      path: "/facility-master",
    },
    {
      title: `Edit`,
      path: `/facility-master/${facilityId}/edit`,
    },
  ];

  // redux state
  const { facilityDetails } = useSelector((state: RootState) => state.facility);
  const { facilityEnums } = useSelector((state: RootState) => state.facility);
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);

  // page state
  const [facilityFieldData, setFacilityFieldData] = useState<any>({});
  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);
    const [additionalDetails, setAdditionalDetails] = useState<
    { key: string; value: string }[]
  >([]);
  
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
        [field?.fieldName as string]: value
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
        dispatch(updateFacility({
            facilityId,
            data : {
              ...facilityFieldData,
              details: additionalDetails
            }
        }));
      }
    }else if (field?.id === "cross_btn") {
     router?.push(`/facility-master`)
    }
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
    const onChangeSelect = (e: any, field: any) => {
    const value = e?.target?.value
    if(field?.is_additional_field){
      updateAdditionalDetails(field.fieldName, value);
    }
    setFacilityFieldData((prev: any) => ({
      ...prev,
      [field?.fieldName]: value,
    }));
  };

  // Effects
  
   useEffect(() => {
      if (
        hasKeys(userRolePermission) &&
        !userRolePermission?.[modulePermission]
      ) {
        router?.push(`/facility-master`)
      }
    }, [userRolePermission]);

    useEffect(() => {
        dispatch(getFacilityEnums());
      }, []);

  useEffect(() => {
    if (!facilityId) return;
    dispatch(getFacilityDetails({ facilityId: Number(facilityId) }));
  }, [facilityId]);

  // useEffect(() => {
  //   if (hasKeys(facilityDetails)) {
  //     setFacilityFieldData(facilityDetails);
  //   }
  // }, [facilityDetails]);

   useEffect(() => {
    if (hasKeys(facilityDetails)) {
      const { details, ...rest } = facilityDetails as any;

      // set normal fields
      let updatedState = { ...rest };

      // add additional fields directly into form state
      if (Array.isArray(details)) {
        details.forEach((item: any) => {
          updatedState[item?.key] = item?.value;
        });
      }
      setAdditionalDetails(details)
      setFacilityFieldData(updatedState);
    }
  }, [facilityDetails]);

    useEffect(() => {
    if (customPayload?.facilityUpdateSuccess) {
      router?.push(`/facility-master`);
    }
  }, [customPayload?.facilityUpdateSuccess]);

  // console.log("facilityDetails",facilityFieldData, additionalDetails);

    useEffect(() => {
      return () => {
        dispatch(resetUiAction());
        dispatch(resetFacilityEnums());
        setFacilityFieldData({})
        setAdditionalDetails([])
      };
    }, []);
  return (
    <div className="page-content">
      <PageHeader breadCrumsPath={breadCrumbsPaths} />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <CommonForm
            formJson={facilityAddEditJson}
            fieldData={facilityFieldData}
            onChangeInput={onChangeInput}
            isCheckValid={isCheckValid}
            configData={getConfig}
            onClickField={onClickField}
            onChangeSelect={onChangeSelect}
            fullFieldData={{
              facilityEnums
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityMasterEdit;
