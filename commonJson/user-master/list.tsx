import { mobileNumber_Regex } from "@/commonJS/regexGlobal/regexGlobal";
import { button } from "@/components/Button/Button";
import StatusChip from "@/components/StatusChip/StatusChip";
import { FacilityItem } from "@/redux/sagas/handlers/facilityMasterHandler/facilityMasterHandlerInterface";

export const inviteUserBtnJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "invite-user",
        label: "Invite User",
        fieldType: "button",
        fieldName: "invite_user",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-1",
        variant: "primary",
        imagePosition: "front",
        url:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/users-plus-white.svg",
        imageAlt: "Invite User",
        isDisabled: false,
        showLabel: false,
        hiddenFor: (field: any, fieldData: any) => {
          return fieldData?.addPermission
        }
      },
    ],
  },
];

export const userMasterJson = {
  columns: [
    {
      headerName: "Full Name",
      field: "name",
      width: "8.5%",
      thClassName: "py-2",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
        rowIndex: number
      ) => {
        return <span className="d-flex align-items-center py-2">{rowValue?.name ?? ""}</span>
      }
      
    },
    {
      headerName: "Email",
      field: "email",
      width: "7.5%",
    },
    {
      headerName: "Role",
      field: "role",
      isActionColumn: true,
      width: "6%",
      actionFields: [
        {
         fieldType: "expand",
          objectName: "roles",
          isList: true,
          fieldId: "roles",
          expandKey: "roles",
          expandWrapperClassName: "py-1"
        },
      ],
    },
    {
      headerName: "Facility",
      field: "facility",
      isActionColumn: true,
      width: "9%",
      actionFields: [
        {
         fieldType: "expand",
          objectName: "facilities",
          isList: true,
          fieldId: "facilities",
          expandKey: "facilities",
          expandWrapperClassName: "py-1"
        },
      ],
    },
    {
      headerName: "Last Login",
      field: "last_login",
      isActionColumn: false,
      width: "4%",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
        rowIndex: number
      ) => {
        return <span className="">{rowValue?.last_login ?? "-"}</span>
      }
    },
    // {
    //   headerName: "Invite Request",
    //   field: "invite_request",
    //   isActionColumn: false,
    //   width: "6%",
    //   customField: (
    //     field: any,
    //     columnValue: any,
    //     rowValue: any,
    //     rowIndex: number
    //   ) => {
    //     return (
    //       <>
    //     <span className="">{rowValue?.invite_status ?? "-"}</span>
    //     {rowValue?.invite_status === "Pending" && (
    //       <p>invite User</p>
    //     )}
    //       </>
        
    //     )
    //   }
    // },
     {
      headerName: "Invite Request",
      field: "invite_request",
      width: "6.5%",
      isActionColumn: true,
      tdClassName:"py-1",
      actionColumnContainerClassName: "d-flex justify-content-center flex-column",
      actionFields: [
        {
          fieldType: "action_text",
          fillCustomlabel : (field: any, rowValue: any, rowIndex: number) => {
            return rowValue?.invite_status ?? "-";
          },
          fieldId: "invite_status_text",
        },
        {
          fieldType: "action_text",
          actionText: "Resend Request",
          fieldId: "resent_invite",
          actionTextClassName: "resend-request",
          hiddenFor: (rowValue: any,configData: number) => {
            return rowValue?.invite_status !== "Pending";
          }
        },
      ],
    },
    {
      headerName: "Status",
      field: "status",
      width: "1.5%",
      isActionColumn: true,
      actionColumnContainerClassName: "d-flex justify-content-center gap-2",
      actionFields: [
        {
          fieldType: "switch",
          buttonImageUrl:
            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
            "/icons/edit-filled-navy-blue.svg",
          imageHeight: 24,
          imageWidth: 24,
          fieldId: "user_status_switch",
        },
      ],
    },
    {
      headerName: "Actions",
      field: "actions",
      width: "1.5%",
      isActionColumn: true,
      actionColumnContainerClassName: "d-flex justify-content-center gap-2",
      actionFields: [
        {
          fieldType: "button",
          buttonImageUrl:
            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
            "/icons/edit-filled-navy-blue.svg",
          imageHeight: 24,
          imageWidth: 24,
          fieldId: "edit_btn",
        },
        {
          fieldType: "button",
          buttonImageUrl:
            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
            "/icons/trash-filled-red.svg",
          imageHeight: 24,
          imageWidth: 24,
          fieldId: "delete_btn",
        },
      ],
    },
  ],
  searchColumns: [
    {
      title: "Full Name",
      field: "name",
      customSearch: true,
      placeholder: "Search by User Name",
    },
    {
      title: "Email",
      field: "email",
      customSearch: true,
      placeholder: "Search by Email",
    },
    {
      title: "Role",
      field: "role",
      customSearch: true,
      placeholder: "Search by Role",
    },
    {
      title: "Facility",
      field: "facility",
      customSearch: true,
      placeholder: "Search by Facility",
    }
  ],
  filterColumns: [],
  sortingColumn: [
    {
      title: "Created At",
      field: "created_at",
    },
  ],
};

export const inviteUserModalJson = [
  {
    sectionType: "body",
    rowClassName: "px-3 row gap-3",
    child: [
      {
        sectionType: "body",
        rowClassName: "row gap-3",
        child: [
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "name",
            placeholder: "Enter Name",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Name",
            className: "col-10",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "User name is required",
              };
            },
          },
          {
            fieldType: "input",
            inputType: "email",
            fieldName: "email",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            placeholder: "ABC@gmail.com",
            showLabel: true,
            label: "Email",
            className: "col-10",
            isRequired: false,
            labelClassName: "col-2 field-label p-0",
          },
          {
            fieldType: "input",
            inputType: "number",
            fieldName: "mobile_number",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            placeholder: "0123456789",
            label: "Mobile No",
            className: "col-10",
            isRequired: true,
            regexTest: "integer",
            max: 10,
            maxLength: 10,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              if (!data) {
                return {
                  isValid: false,
                  message: "Mobile number is required",
                };
              }

              if (!mobileNumber_Regex.test(data)) {
                return {
                  isValid: false,
                  message: "Enter a valid 10 digit mobile number starting with 6-9",
                };
              }

              return {
                isValid: true,
                message: "",
              };
            },
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "row ",
        child: [
          {
            fieldType: "label",
            fieldName: "address_label",
            labelText: "Assign Role",
            fieldContainerClassName: "col-2 px-0 py-2",
            labelClassName: "field-label",
          },
          {
            sectionType: "body",
            rowClassName: "col-10 p-0",
            child: [
              {
                sectionType: "body-repeat",
                fieldName: "roles",
                rowClassName: "row align-items-center",
                showSectionLabel: true,
                label: "Roles",
                child: [
                  {
                    fieldType: "searchable-select",
                    fieldName: "role_id",
                    label: "Role",
                    showLabel: true,
                    fieldContainerClassName: "col-4 py-1",
                    as: "search-select",
                    placeholder: "Select Role",
                    optionKey: "name",
                    id: "id",
                    labelClassName: "col-2 field-label p-0",
                    validation: (data: any) => {
                      console.log("rolevallidation",data);
                      return {
                        isValid: !!data?.id,
                        message: "Role is required",
                      };
                    },
                  },
                  {
                    fieldType: "searchable-select",
                    fieldName: "facility_ids",
                    label: "Facility",
                    showLabel: true,
                    fieldContainerClassName: "col-4 py-1",
                    // as: "multi-search-select",
                    as: (field: any, fieldData: any, fullFieldData: any, configData: any) => {
                      return fieldData?.role_id?.role_type === "multi-scoped" ? "multi-search-select" : "search-select";
                    },
                    placeholder: "Select Facility",
                    optionKey: "name",
                    id: "id",
                    labelClassName: "col-2 field-label p-0",
                    validation: (data: any, compareField:any, fieldData:any, fullFieldData:any, field: any) => {
                      console.log("validationData",data, field);
                      return {
                        isValid: !!data?.id || (Array.isArray(data) && data.length > 0),
                        message: "Facility is required",
                      };
                    },
                  },
                  {
                    label: "",
                    fieldType: "button",
                    fieldName: "remove_role",
                    id: "remove_role",
                    imageWidth: 20,
                    imageHeight: 20,
                    imagePosition: "front",
                    url:
                      process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                      "/icons/cross-black.svg",
                    isDisabled: false,
                    className: "",
                    fieldContainerClassName: "col",
                    hiddenFor: (
                      field: any,
                      fieldData: any,
                      fullFieldData: any,
                    ) => {
                      return fullFieldData?.roles?.length > 1;
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "row ",
        child: [
          {
            fieldType: "label",
            fieldName: "address_label",
            labelText: "",
            fieldContainerClassName: "col-2 px-0 py-2",
            labelClassName: "field-label",
          },
          {
            sectionType: "body",
            rowClassName: "col-10 p-0 justify-content-between d-flex",
            child: [
              {
                label: "Add",
                fieldType: "button",
                fieldName: "add_role",
                id: "add_role",
                isDisabled: false,
                className: "",
                variant: "secondary",
                imageWidth: "20",
                imageHeight: "20",
                imageClassName: "me-1",
                imagePosition: "front",
                url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/plus-navy-blue.svg",
              },
              {
                label: "Clear Selection",
                fieldType: "button",
                fieldName: "clear_selection",
                id: "clear_selection",
                isDisabled: false,
                className: "clear-selection-btn",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const inviteUserButtonJson: button = {
  fieldName: "invite_user_submit",
  id: "invite_user_submit",
  label: "Invite",
  imageWidth: 20,
  imageHeight: 20,
  imageClassName: "me-1",
  imagePosition: "front",
  url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/users-plus-white.svg",
  imageAlt: "Invite User",
  variant: "primary",
};

export const cancelButtonJson: button = {
  fieldName: "cancel-modal",
  id: "cancel-modal",
  label: "Cancel",
  variant: "base",
};
