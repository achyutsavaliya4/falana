import StatusChip from "@/components/StatusChip/StatusChip";
import { FacilityItem } from "@/redux/sagas/handlers/facilityMasterHandler/facilityMasterHandlerInterface";

export const facilityListingJson = {
  columns: [
    {
      headerName: "#",
      field: "sr_no",
      width: "2.5%",
      thClassName: "py-2",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
        rowIndex: number,
      ) => {
        return (
          <span className="d-flex align-items-center py-2">{rowIndex + 1}</span>
        );
      },
    },
    {
      headerName: "Wondersoft Store Code",
      field: "ws_alternate_code",
      width: "8.5%",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
      ) => {
        const wsAlternateCode = rowValue?.details?.find(
          (item: any) => item?.key === field
        )?.value;
        return <span className="d-flex align-items-center">{wsAlternateCode ?? ""}</span>;
      },
    },
    {
      headerName: "Facility Name",
      field: "name",
      width: "8.5%",
    },
    {
      headerName: "City",
      field: "city",
      isActionColumn: false,
      width: "6%",
    },
    // {
    //   headerName: "type",
    //   field: "type",
    //   isActionColumn: false,
    //   width: "6%",
    // },
    {
      headerName: "Status",
      field: "status",
      isActionColumn: false,
      width: "6%",
      customField: (
        field: any,
        columnValue: any,
        rowValue: FacilityItem,
      ) => {
        return (
          <StatusChip
            status={rowValue?.is_active ? "Active" : "Inactive"}
            chipType={`${rowValue?.is_active ? "green200" : "red100"}`}
            bulletColor={`${
              rowValue?.is_active ? "bullet-green" : "bullet-red"
            }`}
          />
        );
      },
    },
    {
      headerName: "",
      field: "actions",
      width: "8.5%",
      isActionColumn: true,
      actionColumnContainerClassName: "d-flex justify-content-center gap-2",
      actionFields: [
        {
          fieldType: "button",
          buttonImageUrl:
            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
            "/icons/eye-filled-blue.svg",
          imageHeight: 24,
          imageWidth: 24,
          fieldId: "view_btn",
        },
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
  searchColumns: [],
  filterColumns: [],
  sortingColumn: [
    {
      title: "Facility Name",
      field: "name",
    },
  ],
};

export const addNewFacilityBtnJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "add-new-facility",
        label: "Add Facility",
        fieldType: "button",
        fieldName: "add_new_facility",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-1",
        variant: "primary",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/plus-white.svg",
        imageAlt: "Create New Facility",
        isDisabled: false,
        showLabel: false,
        hiddenFor: (field: any, fieldData: any) => {
          return fieldData?.addPermission;
        },
      },
    ],
  },
];
