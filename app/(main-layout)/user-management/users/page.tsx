"use client";
import {
  checkArray,
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
  getFacilityList,
  resetFacilityList,
} from "@/redux/actions/facilityMasterAction/facilityMasterAction";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import {
  getRolesList,
  resetRoleList,
} from "@/redux/actions/roleMasterAction/roleMasterAction";
import { resetUiAction } from "@/redux/actions/uiAction/uiAction";
import {
  getUserMasterList,
  inviteUser,
} from "@/redux/actions/userMasterAction/userMasterAction";
import { storage } from "@/utils/storage";
import { clear } from "console";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListQueryState } from "../roles/page";
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
    let data: Record<string, any> = {};
    data.role_id = rolesList;
    data.facility_ids = facilityList;
    return data;
  }, [rolesList, facilityList]);

  // Functions
  const onChangeQuery = () => {
    const query = QueryUtilityFunc(
      filters.search,
      filters.column,
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
    console.log("fieldIndex", repeatChildIndex, field);
    if (field?.id === "invite-user") {
      setShowInviteUserModal(true);
    } else if (field?.id === "remove_role") {
      setInviteUserFieldData((prev: any) => {
        const updatedRoles = [...(prev?.["roles"] as any[])];
        updatedRoles.splice(repeatChildIndex, 1);
        return {
          ...prev,
          roles: updatedRoles,
        };
      });
    } else if (field?.id === "add_role") {
      setInviteUserFieldData((prev: any) => {
        const updatedRoles = [...(prev?.["roles"] as any[])];
        updatedRoles?.push({
          role_id: null,
          facility_ids: [],
        });
        return {
          ...prev,
          roles: updatedRoles,
        };
      });
    } else if (field?.id === "clear_selection") {
      setInviteUserFieldData((prev: any) => {
        const updatedRoles = [...(prev?.["roles"] as any[])];
        updatedRoles?.forEach((role: any) => {
          role.role_id = null;
          role.facility_ids = [];
        });
        return {
          ...prev,
          roles: updatedRoles,
        };
      });
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
        [field?.fieldName]: e.target.value,
      };
    });
  };

  const onSearchSelect = (item: any, field: any, repeatChildIndex: number) => {
    setInviteUserFieldData((prev: any) => {
      const roles = prev?.roles || [];
      if (field?.fieldName === "role_id") {
        const roleAlreadyExists = roles?.some(
          (r: any, idx: number) =>
            idx !== repeatChildIndex && r?.[field?.fieldName]?.id === item?.id,
        );

        if (roleAlreadyExists) {
          dispatch(getToaster({
            type: "error",
            message: "This role has already been selected.",
          }))
          return prev;
        }
      }

      // Facility already selected anywhere
      if (field?.fieldName === "facility_ids") {
        const facilityAlreadyExists = roles?.some((r: any) => {
          const facilities = Array.isArray(r?.[field?.fieldName])
            ? r?.[field?.fieldName]
            : r?.[field?.fieldName]
              ? [r?.[field?.fieldName]]
              : [];

          return facilities?.some((f: any) => f?.id === item?.id);
        });

        if (facilityAlreadyExists) {
           dispatch(getToaster({
            type: "error",
            message: "This Facility has already been selected.",
          }))
          return prev;
        }
      }
      const updatedRoles = [...(prev?.roles || [])];
      const currentRole = updatedRoles[repeatChildIndex] || {};

      // When selecting ROLE
      if (field?.fieldName === "role_id") {
        const isMultiScoped = item?.role_type === "multi-scoped";

        updatedRoles[repeatChildIndex] = {
          ...currentRole,
          role_id: item,
          // Reset facilities when role changes
          facility_ids: isMultiScoped ? [] : null,
        };

        return {
          ...prev,
          roles: updatedRoles,
        };
      }

      // When selecting FACILITY
      if (field?.fieldName === "facility_ids") {
        const role = currentRole?.role_id;
        const isMultiScoped = role?.role_type === "multi-scoped";

        // MULTI scoped role → multiple facilities allowed
        if (isMultiScoped) {
          const existingFacilities = Array.isArray(
            currentRole?.[field?.fieldName],
          )
            ? currentRole?.[field?.fieldName]
            : currentRole?.[field?.fieldName]
              ? [currentRole?.[field?.fieldName]]
              : [];

          // avoid duplicates
          const alreadyExists = existingFacilities?.some(
            (f: any) => f?.id === item?.id,
          );

          const updatedFacilities = alreadyExists
            ? existingFacilities
            : [...existingFacilities, item];

          updatedRoles[repeatChildIndex] = {
            ...currentRole,
            facility_ids: updatedFacilities,
          };
        }
        // SINGLE scoped role → only one facility allowed
        else {
          updatedRoles[repeatChildIndex] = {
            ...currentRole,
            facility_ids: item, // overwrite with single object
          };
        }

        return {
          ...prev,
          roles: updatedRoles,
        };
      }

      // fallback (for any other field)
      updatedRoles[repeatChildIndex] = {
        ...currentRole,
        [field?.fieldName]: item,
      };

      return {
        ...prev,
        roles: updatedRoles,
      };
    });

    if (field?.fieldName === "role_id") {
      dispatch(resetRoleList());
    }

    if (field?.fieldName === "facility_ids") {
      dispatch(resetFacilityList());
    }
  };

  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    console.log("searchDipal", e.target.value, field);
    if (e?.target?.value) {
      if (field?.fieldName === "role_id") {
        dispatch(
          getRolesList({
            query: `search=${e?.target?.value}`,
          }),
        );
      }
      if (field?.fieldName === "facility_ids") {
        dispatch(
          getFacilityList({
            query: `search=${e?.target?.value}`,
          }),
        );
      }
    }
  };

  const buildInviteUserPayload = (data: any) => {
    return {
      name: data?.name ?? "",
      mobile_number: data?.mobile_number ?? "",
      email: data?.email ?? "",
      roles: (data?.roles || []).map((r: any) => {
        const roleId = r?.role_id?.id ?? r?.role_id;

        let facilityIds: number[] = [];

        if (checkArray(r?.facility_ids)) {
          facilityIds = r?.facility_ids?.map((f: any) => f?.id ?? f);
        } else if (r?.facility_ids) {
          facilityIds = [r?.facility_ids?.id ?? r?.facility_ids];
        }

        return {
          role_id: roleId,
          facility_ids: facilityIds,
        };
      }),
    };
  };

  const handleInviteUser = async () => {
    setIsCheckValid(true);
    const isValid = await checkValidation(
      inviteUserModalJson,
      inviteUserFieldData,
    );
    if (isValid) {
      const payload = buildInviteUserPayload(inviteUserFieldData);
      dispatch(
        setBtnLoaderAction({
          isLoading: true,
          btnFieldName: "invite_user_submit",
        }),
      );
      setIsCheckValid(false);
      dispatch(inviteUser(payload));
    }
  };

  const onClickShowMore = (
    rowValue: any,
    showMore: boolean,
    expandKey: string,
    actionField: any,
    rowIdx: number,
  ) => {
    setUserMasterListData((prevData: any[]) => {
      const updatedData = [...prevData];
      const currentRow = updatedData[rowIdx];

      updatedData[rowIdx] = expandKey
        ? {
            ...currentRow,
            _expand: {
              ...(currentRow._expand || {}),
              [expandKey]: showMore,
            },
          }
        : {
            ...currentRow,
            showMore,
          };

      return updatedData;
    });
  };

  const onClickActionField = (fieldId: string, rowValue: any) => {
    console.log("actionFieldId", fieldId, rowValue);
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
        fieldData={{
          addPermission: userRolePermission?.["users.invites.create"]
        }}
      />
      <div className="card p-0 m-0">
        <div className="card-body p-0 m-0">
          <ListingComponents
            data={userMasterListData}
            paginationData={userMasterMetadata}
            innerSearchValue={filters?.search ?? ""}
            columns={userMasterJson?.columns ?? []}
            expandControlClick={onClickShowMore}
            dropdownData={userMasterJson?.searchColumns ?? []}
            selectColumnSearch={filters?.column ?? {}}
            onChangeSearch={(e) => {
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }));
            }}
            moveTo={(pageNo: number) => {
              setFilters((prev) => ({
                ...prev,
                page: pageNo,
              }));
            }}
            onSelectColumn={(e) => {
              setFilters((prev) => ({
                ...prev,
                column: e || {},
                search: "",
              }));
            }}
            sortingColumnData={userMasterJson?.sortingColumn ?? []}
            onSelectSortType={(order: string) => {
              setFilters((prev) => ({
                ...prev,
                sort: { ...prev.sort, type: order },
                page: 1,
              }));
            }}
            onSelectSortColumn={(e: any) => {
              setFilters((prev) => ({
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
