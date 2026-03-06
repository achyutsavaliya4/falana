export const roleMasterJson = [
  {
    sectionType: "body",
    rowClassName: "px-3",
    child: [
      {
        sectionType: "body",
        rowClassName:
          "d-flex justify-content-between align-items-center border-bottom py-2",
        child: [
          {
            fieldType: "label",
            labelText: "New Role",
            fieldContainerClassName: "",
            labelClassName: "header-label",
          },
          {
            fieldType: "button",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/cross-black.svg",
            imageHeight: 24,
            imageWidth: 24,
            id: "cross_btn",
            imagePosition: "front",
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex flex-column gap-4 py-2",
        child: [
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "role_name",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Role Name",
            className: "col-4",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Role name is required",
              };
            },
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex gap-4 py-3",
        child: [
          {
            fieldType: "switch",
            fieldName: "is_facility_login_required",
            fieldContainerClassName:
              "d-flex align-items-center gap-2 py-2 flex-fill",
            showLabel: true,
            label: "Requires Geo-Fencing?",
          },
          {
            fieldType: "switch",
            fieldName: "is_facility_visibility_required",
            fieldContainerClassName:
              "d-flex align-items-center gap-2 py-2 flex-fill border-start border-secondary ps-3",
            showLabel: true,
            label: "Access To Multiple Facilities?",
          },
          {
            fieldType: "switch",
            fieldName: "required",
            fieldContainerClassName:
              "d-flex align-items-center gap-2 py-2 flex-fill border-start border-secondary ps-3",
            showLabel: true,
            label: "Show Tasks Of Attached Facilities?",
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "role-add-permissions",
        child: [
          {
            sectionType: "body",
            rowClassName: "w-100 border-bottom",
            child: [
              {
                fieldType: "label",
                showLabel: true,
                label: "Permissions",
                labelClassName: "p-3",
                fieldContainerClassName: "mx-3",
              },
            ],
          },
          {
            sectionType: "tabs",
            alignment: "vertical",
            varient: "primary",
            rowClassName: "w-100 border-bottom",
            fieldName: "modules",
            titleFieldName: "name",
            className: "permissions-group",
            child: [
              {
                sectionType: "body",
                rowClassName: "px-4 py-3",
                child: [
                  {
                    fieldType: "label",
                    showLabel: false,
                    fieldName: "name",
                    fieldContainerClassName: "mb-2",
                  },
                  {
                    sectionType: "body-repeat",
                    fieldName: "sub_modules",
                    rowClassName: "d-flex align-items-center gap-2 mt-4",
                    child: [
                      {
                        sectionType: "body",
                        rowClassName:
                          "d-flex align-items-center gap-2 sub-module-label",
                        child: [
                          {
                            fieldType: "input",
                            inputType: "checkbox",
                            fieldName: "sub_module_permission",
                            showLabel: false,
                            fieldContainerClassName:
                              "d-flex align-items-center",
                          },
                          {
                            fieldType: "label",
                            showLabel: false,
                            fieldName: "name",
                          },
                        ],
                      },
                      {
                        sectionType: "body",
                        rowClassName:
                          "d-flex align-items-center gap-2 flex-fill",
                        child: [
                          {
                            sectionType: "body-repeat",
                            fieldName: "actions",
                            rowClassName:
                              "d-flex align-items-center gap-2 flex-fill",
                            child: [
                              {
                                fieldType: "input",
                                inputType: "checkbox",
                                fieldName: "action_permission",
                                showLabel: false,
                                fieldContainerClassName:
                                  "d-flex align-items-center",
                              },
                              {
                                fieldType: "label",
                                showLabel: false,
                                fieldName: "name",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex justify-content-end gap-3 pt-4 pb-3",
        child: [
          {
            fieldType: "button",
            label: "Cancel",
            fieldName: "cancel",
            variant: "base",
            id: "cancel",
          },
          {
            fieldType: "button",
            label: "Save",
            fieldName: "save",
            variant: "primary",
            id: "save",
          },
        ],
      },
    ],
  },
];
