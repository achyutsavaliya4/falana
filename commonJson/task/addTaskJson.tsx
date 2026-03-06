export const addTaskJson = [
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
            labelText: "Add Custom Task",
            fieldContainerClassName: "",
            labelClassName: "header-label",
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
            fieldName: "name",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Task Name:",
            className: "col-4",
            labelClassName: "col-2 field-label p-0",
            placeholder: "Enter Task Name",
            validation: (value: string) => {
              if (!value)
                return { isValid: false, message: "Task Name is required" };
              const regex = /^[a-zA-Z0-9\s]+$/;
              if (!regex.test(value))
                return {
                  isValid: false,
                  message: "No special characters allowed",
                };
              return { isValid: true, message: "" };
            },
          },
          {
            fieldType: "select",
            fieldName: "type",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            className: "col-4",
            selectWrapperClassName: "col-4",
            optionKey: "label",
            optionValue: "value",
            label: "Task Type:",
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              if (!data)
                return { isValid: false, message: "Task Type is required" };
              return { isValid: true, message: "" };
            },
          },
          {
            fieldType: "searchable-select",
            fieldName: "form",
            label: "Form:",
            showLabel: true,
            fieldContainerClassName: "d-flex py-1 align-items-center",
            searchbleClass: "col-4",
            as: "search-select",
            placeholder: "Search Form",
            optionKey: "name",
            id: "id",
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              if (!data)
                return { isValid: false, message: "Task Type is required" };
              return { isValid: true, message: "" };
            },
          },
          {
            sectionType: "body",
            rowClassName: "d-flex align-items-center py-2 col-12",
            child: [
              {
                fieldType: "label",
                labelText: "Link Type:",
                showlabel: true,
                labelClassName: "field-label p-0",
                fieldContainerClassName: "row p-0 m-0 align-items-center col-2",
              },
              {
                sectionType: "body",
                rowClassName: "d-flex gap-3 col-10",
                child: [
                  {
                    fieldType: "input",
                    inputType: "radio",
                    fieldName: "link_type",
                    optionValue: "video",
                    fieldContainerClassName:
                      "d-flex align-items-center border rounded px-3 py-2 cursor-pointer bg-white",
                    showLabel: true,
                    label: "Video",
                    className: "form-check-input me-2",
                  },
                  {
                    fieldType: "input",
                    inputType: "radio",
                    fieldName: "link_type",
                    optionValue: "document",
                    fieldContainerClassName:
                      "d-flex align-items-center border rounded px-3 py-2 cursor-pointer bg-white",
                    showLabel: true,
                    label: "Document",
                    className: "form-check-input me-2",
                  },
                ],
              },
            ],
            hiddenFor: (
              section: any,
              fieldData: any,
              fullFieldData: any,
            ) => {
              return fullFieldData?.type === "quiz";
            },
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "link",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Link:",
            className: "col-4",
            labelClassName: "col-2 field-label p-0",
            placeholder: "Enter Link",
            hiddenFor: (
              section: any,
              fieldData: any,
              fullFieldData: any,
            ) => {
              return fullFieldData?.type === "quiz";
            },
            validation: (fieldData: any, _: any, fullFieldData: any) => {
              if (fullFieldData?.type !== "quiz") {
                return { isValid: true, message: "" };
              }
              if (!fieldData)
                return { isValid: false, message: "Link is required" };

              const urlPattern =
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              if (!urlPattern.test(fieldData))
                return { isValid: false, message: "Invalid URL format" };

              return { isValid: true, message: "" };
            },
          },
          {
            fieldType: "select",
            fieldName: "department",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            className: "col-4",
            selectWrapperClassName: "col-4",
            optionKey: "name",
            optionValue: "Constant",
            label: "Select Department",
            labelClassName: "col-2 field-label p-0",
            placeholder: "Select Form",
            validation: (data: string) => {
              if (!data)
                return { isValid: false, message: "Department is required" };
              return { isValid: true, message: "" };
            },
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex justify-content-end py-2",
        child: [
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
