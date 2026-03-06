"use client";
import {
  checkString,
  convertToModuleName,
  hasKeys,
} from "@/commonJS/commonHelper/commonHelper";
import { inputFieldInterface } from "@/commonJS/interfaces/renderFieldinterface/inputFieldInterface";
import QueryUtilityFunc from "@/commonJS/queryUtilityFunction/QueryUtilityFunction";
import { cancelButtonJson } from "@/commonJson/user-master/list";
import {
  inviteUserBtnJson,
  inviteUserButtonJson,
  inviteUserModalJson,
  userMasterJson,
} from "@/commonJson/user-master/list";
import CommonMasterModal from "@/components/CommonMasterModal/CommonMasterModal";
import ListingComponents from "@/components/ListingComponents/ListingComponents";
import PageHeader from "@/components/PageHeader/PageHeader";
import useCheckValidation from "@/hooks/useCheckValidation";
import { RootState } from "@/redux";
import {
  resetFacilityList,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import {
  resetRoleList,
} from "@/redux/actions/roleMasterAction/roleMasterAction";
import { resetUiAction } from "@/redux/actions/uiAction/uiAction";
import {
  getUserMasterList,
} from "@/redux/actions/userMasterAction/userMasterAction";
import { storage } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListQueryState } from "../../user-management/roles/page";
import { getToaster } from "@/redux/actions/toasterAction/toasterAction";

const UserList = () => {
  // constants
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const moduleName = useMemo(() => convertToModuleName(pathname), [pathname]);
  const modulePermission = "users.manage.view";
  const checkValidation = useCheckValidation();
  const initialState: ListQueryState = {
    search: "",
    page: 1,
    filters: {},
    sort: { val: "created_at", type: "desc" },
    column: userMasterJson?.searchColumns?.[0] || {},
  };
  const breadCrumbsPaths = [
    {
      title: "",
      path: "/",
    },
    {
      title: "User Management",
      path: "/user-management/users",
    },
    {
      title: `Users`,
      path: `/user-management/users`,
    },
  ];

  // redux states
  const { userMasterList, userDetails, userMasterMetadata } = useSelector(
    (state: RootState) => state.userMaster,
  );
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);
  const { rolesList } = useSelector((state: RootState) => state.role);
  const { facilityList } = useSelector((state: RootState) => state.facility);

  // page states
  const [filtersLoaded, setFiltersLoaded] = useState<boolean>(false);
  const [showInviteUserModal, setShowInviteUserModal] =
    useState<boolean>(false);
  const [inviteUserFieldData, setInviteUserFieldData] = useState<
    Record<string, any>
  >({
    roles: [
      {
        role_id: null,
        facility_ids: [],
      },
    ],
  });
  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);
  const [userMasterListData, setUserMasterListData] = useState<any[]>([]);
  const [filters, setFilters] = useState<ListQueryState>(initialState);

  const getConfigData = useMemo(() => {
    const data: Record<string, any> = {};
    data.role_id = rolesList;
    data.facility_ids = facilityList;
    return data;
  }, [rolesList, facilityList]);

  // Functions
  const onChangeQuery = (page?: number) => {
    const query = QueryUtilityFunc(
      filters.search,
      filters.column as any,
      filters.filters,
      filters?.sort,
      filters?.page,
      [],
    );

    if (checkString(query)) {
      dispatch(getUserMasterList({ query }));
    }
  };

  const onClickField = (
    event: MouseEvent<HTMLButtonElement>,
    field: any,
    fieldData: any,
    fullFieldData: any,
    configData: any,
    fieldIndex: number,
    repeatChildIndex: number,
  ) => {
    if (field?.id === "invite-user") {
      setShowInviteUserModal(true);
    } 
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: inputFieldInterface,
    repeatIndex?: number,
  ) => {
    setInviteUserFieldData((prev: any) => {
      return {
        ...prev,
        [field?.fieldName as string]: e.target.value,
      };
    });
  };

  const onSearchSelect = (item: any, field: any, repeatChildIndex: number) => {
    
  };

  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e?.target?.value) {

    }
  };

const handleInviteUser = async () => {
    setIsCheckValid(true);
    const isValid = await checkValidation(
      inviteUserModalJson,
      inviteUserFieldData,
    );
    if (isValid) {
    }
  };

  const onClickActionField = (fieldId: string, rowValue: any) => {
    dispatch(getToaster({
      type: "success",
      message: `Clicked on action: ${fieldId}`,
    }))
  };

  const onRemoveSelect = (
    item: any,
    field: any,
    repeatChildIndex: number,
    idx: number,
  ) => {
    if (field?.fieldName === "facility_ids") {
      setInviteUserFieldData((prev: any) => {
        const updatedRoles = [...(prev?.roles || [])];
        const currentRole = updatedRoles[repeatChildIndex] || {};

        const existingFacilities = Array.isArray(
          currentRole?.[field?.fieldName],
        )
          ? currentRole?.[field?.fieldName]
          : [];

        const updatedFacilities = existingFacilities.filter(
          (_: any, index: number) => index !== idx,
        );

        updatedRoles[repeatChildIndex] = {
          ...currentRole,
          [field?.fieldName]: updatedFacilities,
        };

        return {
          ...prev,
          roles: updatedRoles,
        };
      });
    }
  };

  const handleInviteUserModalClose = () => {
    setShowInviteUserModal(false);
    setInviteUserFieldData({
      roles: [
        {
          role_id: null,
          facility_ids: [],
        },
      ],
    });
    dispatch(resetUiAction());
    dispatch(resetFacilityList());
    dispatch(resetRoleList());
    setIsCheckValid(false);
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
      onChangeQuery();
      storage?.setFilters({ [moduleName]: filters });
    }
  }, [filtersLoaded, filters]);

useEffect(() => {
    if (checkString(moduleName)) {
      const storageItem = storage?.getFilters();
      if (hasKeys(storageItem) && storageItem[moduleName]) {
        const localFilters = storageItem[moduleName];

        if (localFilters && hasKeys(localFilters)) {
          if (
            filters?.sort?.type !== localFilters?.sort?.type ||
            filters?.sort?.val !== localFilters?.sort?.val
          ) {
            setFilters((prev: any) => ({
              ...prev,
              sort: localFilters?.sort,
            }));
          }
          setFilters((prev: any) => ({
            ...prev,
            page: localFilters?.page,
          }));
          if (
            checkString(localFilters?.search) &&
            hasKeys(localFilters?.column)
          ) {
            setFilters((prev: any) => ({
              ...prev,
              search: localFilters?.search,
              column: localFilters?.column,
            }));
          }
        }
      }
      setFiltersLoaded(true);
    }
  }, [moduleName]);

useEffect(() => {
    setUserMasterListData(userMasterList);
  }, [userMasterList]);

useEffect(() => {
    if (customPayload?.userInviteSuccess) {
      setShowInviteUserModal(false);
      onChangeQuery(1);
      setInviteUserFieldData({
        roles: [
          {
            role_id: null,
            facility_ids: [],
          },
        ],
      });
      dispatch(resetUiAction());
      dispatch(resetFacilityList());
      dispatch(resetRoleList());
    }
  }, [customPayload?.userInviteSuccess]);

  return (
    <div className="page-content">
      <PageHeader
        formJson={inviteUserBtnJson}
        onClickField={onClickField}
        breadCrumsPath={breadCrumbsPaths}
      />
      <div className="card p-0 m-0">
        <div className="card-body p-0 m-0">
          <ListingComponents
            data={userMasterListData}
            paginationData={userMasterMetadata}
            innerSearchValue={filters?.search ?? ""}
            columns={userMasterJson?.columns ?? []}
            expandControlClick={() => {}}
            dropdownData={userMasterJson?.searchColumns ?? []}
            selectColumnSearch={filters?.column as any ?? {}}
            onChangeSearch={(e: any) => {
              setFilters((prev: any) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }));
            }}
            moveTo={(pageNo: number) => {
              setFilters((prev: any) => ({
                ...prev,
                page: pageNo,
              }));
            }}
            onSelectColumn={(e: any) => {
              setFilters((prev: any) => ({
                ...prev,
                column: e || {},
                search: "",
              }));
            }}
            sortingColumnData={userMasterJson?.sortingColumn ?? []}
            onSelectSortType={(order: string) => {
              setFilters((prev: any) => ({
                ...prev,
                sort: { ...prev.sort, type: order },
                page: 1,
              }));
            }}
            onSelectSortColumn={(e: any) => {
              setFilters((prev: any) => ({
                ...prev,
                sort: { ...prev.sort, val: e?.field },
                page: 1,
              }));
            }}
            selectedSortType={filters?.sort?.type}
            selectedSortColumn={filters?.sort?.val}
            isDisabledFilter={true}
            onClickActionField={onClickActionField}
          />
        </div>
      </div>
      <CommonMasterModal
        formData={inviteUserModalJson}
        show={showInviteUserModal}
        handleToggle={handleInviteUserModalClose}
        title="Invite New User"
        fieldData={inviteUserFieldData}
        cancelButtonJson={cancelButtonJson}
        submitButtonJson={inviteUserButtonJson}
        hideFooter={false}
        onChangeInput={onChangeInput}
        onClickField={onClickField}
        handleSubmit={handleInviteUser}
        handleCancel={handleInviteUserModalClose}
        configData={getConfigData}
        fullFieldData={{
          roles: inviteUserFieldData?.roles ?? [],
        }}
        onSearchSelect={onSearchSelect}
        onRemoveSelect={onRemoveSelect}
        onChangeSearch={onChangeSearch}
        isCheckValid={isCheckValid}
      />
    </div>
  );
};

export default UserList;
