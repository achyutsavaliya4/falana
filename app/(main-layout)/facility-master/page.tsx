"use client";
import {
  checkString,
  convertToModuleName,
  hasKeys,
} from "@/commonJS/commonHelper/commonHelper";
import QueryUtilityFunc from "@/commonJS/queryUtilityFunction/QueryUtilityFunction";
import {
  cancelButtonJson,
  confimButtonJson,
} from "@/commonJson/common-master-modal/footer";
import {
  addNewFacilityBtnJson,
  facilityListingJson,
} from "@/commonJson/facility-master/list";
import { addNewFormJson } from "@/commonJson/form-management/list";
import { button } from "@/components/Button/Button";
import ConfirmationModal from "@/components/ConfimationModal/ConfimationModal";
import ListingComponents from "@/components/ListingComponents/ListingComponents";
import PageHeader from "@/components/PageHeader/PageHeader";
import useCheckValidation from "@/hooks/useCheckValidation";
import { RootState } from "@/redux";
import {
  deleteFacility,
  getFacilityList,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import { FacilityItem } from "@/redux/sagas/handlers/facilityMasterHandler/facilityMasterHandlerInterface";
import { storage } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FacilityMaster = () => {
  // constants
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const moduleName = useMemo(() => convertToModuleName(pathname), [pathname]);
  const modulePermission = "settings.facility.view";

// redux states
  const { facilityList, facilityMetadata } = useSelector(
    (state: RootState) => state.facility,
  );
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);

  // page states
  const [showConfimationModal, setShowConfimationModal] =
    useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<any>({});
  const [filtersLoaded, setFiltersLoaded] = useState<boolean>(false);
  const [selectedSortData, setSelectedSortData] = useState<{
    val: string;
    type: string;
  }>({
    val: "name",
    type: "asc",
  });
  const [pageNo, setPageNo] = useState<number>(1);

// Functions
  const onClickActionField = async (
    fieldId: string,
    rowValue: FacilityItem,
  ) => {
    if (fieldId === "edit_btn") {
      router.push(`/facility-master/${rowValue?.id}/edit`);
    } else if (fieldId === "view_btn") {
      router.push(`/facility-master/${rowValue?.id}/view`);
    } else if (fieldId === "delete_btn") {
      setShowConfimationModal(true);
      setSelectedFacility(rowValue);
    }
  };
  const onChangeQuery = (page: number, filterJson?: any[]) => {
    const query = QueryUtilityFunc(
      "",
      {} as any,
      {} as any,
      selectedSortData,
      page,
      filterJson ?? [],
    );

    if (checkString(query)) {
      dispatch(getFacilityList({ query }));
    }
  };
  const onClickField = (
    event: MouseEvent<HTMLButtonElement>,
    field: any,
  ) => {
    if (field?.id === "add-new-facility") {
      router?.push("/facility-master/add");
    }
  };

  // Effects

  useEffect(() => {
    if (
      hasKeys(userRolePermission) &&
      !userRolePermission?.[modulePermission]
    ) {
      router?.push("/");
    }
  }, [userRolePermission]);

  useEffect(() => {
    if (filtersLoaded) {
      onChangeQuery(pageNo);
      const moduleFilters = {
        [moduleName]: {
          filter: {},
          sort: selectedSortData,
          column: {},
          page: pageNo,
          search: "",
        },
      };
      storage?.setFilters(moduleFilters);
    }
  }, [filtersLoaded, selectedSortData, pageNo]);
  useEffect(() => {
    if (checkString(moduleName)) {
      const storageItem = storage?.getFilters();
      if (hasKeys(storageItem) && storageItem[moduleName]) {
        const filters = storageItem[moduleName];

        if (filters && hasKeys(filters)) {
          if (
            selectedSortData?.type !== filters?.sort?.type ||
            selectedSortData?.val !== filters?.sort?.val
          ) {
            setSelectedSortData({
              ...filters.sort,
            });
          }
          setPageNo(filters?.page);
        }
      }
      setFiltersLoaded(true);
    }
  }, [moduleName]);

  useEffect(() => {
    if (customPayload?.facilityDeleteSuccess) {
      setShowConfimationModal(false)
      onChangeQuery(1)
    }
  }, [customPayload?.facilityDeleteSuccess]);

return (
    <div className="page-content">
      <PageHeader
        formJson={addNewFacilityBtnJson}
        onClickField={onClickField}
        fieldData={{
          addPermission: userRolePermission?.["settings.facility.create"]
        }}
      />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <ListingComponents
            columns={facilityListingJson?.columns}
            data={facilityList}
            paginationData={facilityMetadata}
            onClickActionField={onClickActionField}
            showSearchBar={true}
            sortingColumnData={facilityListingJson?.sortingColumn}
            selectedSortType={selectedSortData?.type}
            selectedSortColumn={selectedSortData?.val}
            isDisabledFilter={true}
            onSelectSortType={(order: string) => {
              setPageNo(1);
              setSelectedSortData({
                ...selectedSortData,
                type: order,
              });
            }}
            onSelectSortColumn={(e: any) => {
              setPageNo(1);
              setSelectedSortData({
                ...selectedSortData,
                val: e?.field,
              });
            }}
            moveTo={(pageNo: number) => {
              setPageNo(pageNo);
            }}
          />
          <ConfirmationModal
            showModal={showConfimationModal}
            handleToggle={() => {
              setShowConfimationModal(false);
              setSelectedFacility({});
            }}
            title={"Confimation"}
            message="Are you sure you want to delete the facility?"
            cancelButtonJson={cancelButtonJson}
            submitButtonJson={confimButtonJson}
            handleCancel={() => {
              setShowConfimationModal(false);
              setSelectedFacility({});
            }}
            handleSubmit={() => {
              dispatch(setBtnLoaderAction({
                btnFieldName: "confim",
                isLoading: true,
              }))
              dispatch(deleteFacility(selectedFacility?.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityMaster;
