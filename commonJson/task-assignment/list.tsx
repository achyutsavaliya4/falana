import { mobileNumber_Regex } from "@/commonJS/regexGlobal/regexGlobal";
import { button } from "@/components/Button/Button";
import StatusChip from "@/components/StatusChip/StatusChip";
import { FacilityItem } from "@/redux/sagas/handlers/facilityMasterHandler/facilityMasterHandlerInterface";

export const assignTaskBtnJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "assign-task",
        label: "Assign Task",
        fieldType: "button",
        fieldName: "assign_task",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-1",
        variant: "primary",
        imagePosition: "front",
        url:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/users-plus-white.svg",
        imageAlt: "Assign Task",
        isDisabled: false,
        showLabel: false,
        // hiddenFor: (field: any, fieldData: any) => {
        //   return fieldData?.addPermission
        // }
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

