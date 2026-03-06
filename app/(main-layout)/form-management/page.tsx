"use client";
import {
  addNewFormJson,
  formListColumns,
} from "@/commonJson/form-management/list";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import Button from "@/components/Button/Button";
import ListingComponents from "@/components/ListingComponents/ListingComponents";
import { RootState } from "@/redux";
import { getFormList } from "@/redux/actions/formManagementAction/formManagementAction";
import { getWorkspaceList } from "@/redux/actions/workSpaceAction/workSpaceAction";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fields from "@/dummyJsona/main.json";
import PageHeader from "@/components/PageHeader/PageHeader";
import { publishFormJson } from "@/commonJson/form-management/add";

const FormList = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({ page: 1 });
  const dispatch = useDispatch();
  const { formsList, formsMeta } = useSelector(
    (state: RootState) => state.forms,
  );
  const onClickActionFieldFormList = useCallback(
    (fieldId: string, rowValue: any) => {
      console.log("fieldIdfieldId", fieldId);

      if (fieldId === "edit_form") {
        router?.push(`/form-management/${rowValue?.slug}/edit`);
      } else if (fieldId === "delete_form") {
      }
    },
    [router],
  );
  const onChangeQuery = () => {
    dispatch(getFormList({ workspaceId: 9 }));
  };
  const onClickField = (
    event: MouseEvent<HTMLButtonElement>,
    field: any,
  ) => {
    if (field?.id === "create-new-form") {
      router?.push("/form-management/add");
    }
  };

  useEffect(() => {
    dispatch(getWorkspaceList());
  }, []);
  useEffect(() => {
    onChangeQuery();
    console.log("TestingMain", new Set(fields?.map((f) => f?.type)));
  }, [filters]);
  return (
    <div className="page-content">
      <PageHeader formJson={addNewFormJson} onClickField={onClickField} />
      <div className="card p-0 border-none">
        <div className="card-body p-0">
          <ListingComponents
            columns={formListColumns}
            data={formsList}
            paginationData={formsMeta}
            onClickActionField={onClickActionFieldFormList}
            dropdownData={[
              {
                title: "Mobile No",
                field: "customer_mobile",
                placeholder: "Search By Customer Mobile No.",
              },
              {
                title: "Invoice No",
                field: "invoice_number",
                placeholder: "Search By Invoice Number",
              },
            ]}
            filterColumn={[
              {
                field: "customer_id",
                title: "Customer Id",
                isHidden: true,
              },
              {
                title: "Mode of Payment",
                field: "payment_mode",
                valueKey: "name",
                selectValue: "id",
              },
              {
                title: "Created By",
                field: "billing_user",
                valueKey: "name",
                selectValue: "id",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FormList;
