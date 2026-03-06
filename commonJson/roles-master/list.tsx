
export const rolesListingJson = {
  columns: [
    {
      headerName: "#",
      field: "sr_no",
      width: "2.5%",
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
      headerName: "Role Name",
      field: "name",
      width: "8.5%",
    },
    {
      headerName: "No. of Users",
      field: "number_of_user",
      width: "8.5%",
    },
    {
      headerName: "Created By",
      field: "city",
      isActionColumn: false,
      width: "6%",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
      ) => {
        return (
          <div>
            <span>{rowValue?.created_by}</span>
            <span>{rowValue?.created_at}</span>
          </div>
        );
      },
    },
    {
      headerName: "Created By",
      field: "city",
      isActionColumn: false,
      width: "6%",
      customField: (
        field: any,
        columnValue: any,
        rowValue: any,
      ) => {
        return (
          <div>
            <span>{rowValue?.updated_by}</span>
            <span>{rowValue?.updated_at}</span>
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "is_active",
      isActionColumn: false,
      width: "6%",
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

export const addNewRoleBtnJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "add-new-role",
        label: "Add Role",
        fieldType: "button",
        fieldName: "add_new_role",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-1",
        variant: "primary",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/plus-white.svg",
        imageAlt: "Create New Role",
        isDisabled: false,
        showLabel: false,
        hiddenFor: (field: any, fieldData: any) => {
          return fieldData?.addPermission;
        },
      },
    ],
  },
];
