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
  addNewRoleBtnJson,
  rolesListingJson,
} from "@/commonJson/roles-master/list";
import ConfirmationModal from "@/components/ConfimationModal/ConfimationModal";
import ListingComponents from "@/components/ListingComponents/ListingComponents";
import PageHeader from "@/components/PageHeader/PageHeader";
import { RootState } from "@/redux";
import { setBtnLoaderAction } from "@/redux/actions/loaderAction/loaderAction";
import {
  deleteRole,
  getRolesList,
} from "@/redux/actions/roleMasterAction/roleMasterAction";
import { RoleListItem } from "@/redux/sagas/handlers/roleMasterHandler/roleMasterHandlerInterface";
import { storage } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export interface ListQueryState {
  search: string;
  page: number;
  filters: Record<string, any>;
  sort: {
    val: string;
    type: "asc" | "desc";
  };
  column: Record<string, any>;
}
const initialState: ListQueryState = {
  search: "",
  page: 1,
  filters: {},
  sort: { val: "name", type: "desc" },
  column: {},
};
const RoleMaster = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const moduleName = useMemo(() => convertToModuleName(pathname), [pathname]);
  const modulePermission = "users.roles.view";
  const { customPayload } = useSelector((state: RootState) => state.ui);
  const { userRolePermission } = useSelector((state: RootState) => state.user);
  const { rolesList, rolesListMeta } = useSelector(
    (state: RootState) => state.role,
  );
  const [filtersLoaded, setFiltersLoaded] = useState<boolean>(true);
  const [confimationModalData, setConfimationModalData] = useState<{
    type: "role-delete";
    show: boolean;
    data: any;
  }>();
  const [filters, setFilters] = useState<ListQueryState>(initialState);

  const onClickActionField = async (
    fieldId: string,
    rowValue: RoleListItem,
  ) => {
    if (fieldId === "edit_btn") {
      router.push(`/user-management/roles/${rowValue?.id}/edit`);
    } else if (fieldId === "view_btn") {
      router.push(`/user-management/roles/${rowValue?.id}/view`);
    } else if (fieldId === "delete_btn") {
      setConfimationModalData({
        type: "role-delete",
        show: true,
        data: rowValue,
      });
    }
  };

  const onClickField = (
    event: MouseEvent<HTMLButtonElement>,
    field: any,
  ) => {
    if (field?.id === "add-new-role") {
      router?.push("/user-management/roles/add");
    }
  };

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
      dispatch(getRolesList({ query }));
    }
  };

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
    if (customPayload?.roleDeleteSuccess) {
      // TODO :== Add toaster for delete confirmation
      onChangeQuery();
      setConfimationModalData();
    }
  }, [customPayload]);

  return (
    <div className="page-content">
      <PageHeader
        formJson={addNewRoleBtnJson}
        onClickField={onClickField}
        fieldData={{
          addPermission: userRolePermission?.["users.roles.create"],
        }}
      />
      <div className="card p-0 m-0">
        <div className="card-body p-0">
          <ListingComponents
            columns={rolesListingJson?.columns}
            data={rolesList}
            paginationData={rolesListMeta}
            onClickActionField={onClickActionField}
            sortingColumnData={rolesListingJson?.sortingColumn}
            selectedSortType={filters?.sort?.type}
            selectedSortColumn={filters?.sort?.val}
            isDisabledFilter={true}
            customPlaceHolder="Search By Role Name..."
            onChangeSearch={(e) => {
              setFilters((prev) => ({ ...prev, search: e.target.value }));
            }}
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
            moveTo={(pageNo: number) => {
              setFilters((prev) => ({
                ...prev,
                page: pageNo,
              }));
            }}
          />
          <ConfirmationModal
            showModal={confimationModalData?.show}
            handleToggle={() => {
              setConfimationModalData();
            }}
            title={"Confimation"}
            message={`Are you sure you want to delete the ${confimationModalData?.data?.name} role?`}
            cancelButtonJson={cancelButtonJson}
            submitButtonJson={confimButtonJson}
            handleCancel={() => {
              setConfimationModalData(false);
            }}
            handleSubmit={() => {
              dispatch(
                setBtnLoaderAction({
                  btnFieldName: "confim",
                  isLoading: true,
                }),
              );
              dispatch(deleteRole(confimationModalData?.data?.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleMaster;
