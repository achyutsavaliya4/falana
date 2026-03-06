export const formListColumns = [
  {
    headerName: "Created Date",
    fieldName: "created_at",
  },
  {
    headerName: "Form Name",
    fieldName: "title",
  },
  {
    headerName: "Created By",
    fieldName: "creator_id",
  },
  {
    headerName: "Updated By",
    fieldName: "updated_by",
  },
  {
    headerName: "Action",
    isActionColumn: true,
    actionColumnContainerClassName: "d-flex space-between gap-3",
    actionFields: [
      {
        fieldType: "button",
        buttonImageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS +
          "/icons/edit-filled-navy-blue.svg",
        fieldId: "edit_form",
        title: "Edit Form",
      },
      {
        fieldType: "button",
        buttonImageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/trash-filled-red.svg",
        fieldId: "delete_form",
        title: "Delete Form",
      },
    ],
  },
];

export const addNewFormJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "create-new-form",
        label: "Create New Form",
        fieldType: "button",
        fieldName: "created_new_form",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-1",
        variant: "primary",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/plus-white.svg",
        imageAlt: "Create New Form",
        isDisabled: false,
        showLabel: false,
      },
    ],
  },
];
