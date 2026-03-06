"use client";
import { hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { facilityViewJson } from "@/commonJson/facility-master/viewJson";
import { button } from "@/components/Button/Button";
import CommonForm from "@/components/CommonForm/CommonForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import { RootState } from "@/redux";
import {
  getFacilityDetails,
  getFacilityEnums,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FacilityMasterView = () => {
  // Constants
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id: facilityId } = params;
  const modulePermission = "settings.facility.view";
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
      title: `View`,
      path: `/facility-master/${facilityId}/view`,
    },
  ];

  // redux state
  const { facilityEnums } = useSelector((state: RootState) => state.facility);
  const { userRolePermission } = useSelector((state: RootState) => state.user);

  // Page state
  const [facilityFieldData, setFacilityFieldData] = useState<any>({});
  const { facilityDetails } = useSelector((state: RootState) => state.facility);

  // Functions
  const onClickField = async (
    e: React.MouseEvent<HTMLButtonElement>,
    field: button,
  ) => {
    if (field?.id === "cross_btn") {
      router?.push(`/facility-master`);
    }
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
      setFacilityFieldData(updatedState);
    }
  }, [facilityDetails]);

  return (
    <div className="page-content">
      <PageHeader breadCrumsPath={breadCrumbsPaths} />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <CommonForm
            formJson={facilityViewJson}
            fieldData={facilityFieldData}
            onClickField={onClickField}
            fullFieldData={{
              facilityEnums,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityMasterView;
