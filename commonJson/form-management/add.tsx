export const addFormJson = [
  {
    sectionType: "body",
    rowClassName: "bg-white px-3 py-2 mt-2 mb-4 form-basic-details",
    child: [
      {
        placeholder: "Add Form Title",
        fieldName: "title",
        showLabel: false,
        fieldType: "input",
        required: true,
        validation: (data: string) => {
          return {
            isValid: !!data,
            message: "Form Title is Required",
          };
        },
        className: "question-form-title",
      },
      {
        placeholder: "Add Form Description",
        fieldName: "description",
        showLabel: false,
        fieldType: "input",
        required: false,
        rows: 1,
        fieldContainerClassName: "mt-2",
        className: "question-form-description",
      },
      {
        sectionType: "body",
        rowClassName: "d-flex align-items-end gap-4 mt-2 mb-4",
        child: [
          {
            label: "Tags",
            fieldName: "tags",
            showLabel: true,
            fieldType: "select",
            placeholder: "Select tags",
            required: true,
            optionKey: "label",
            optionValue: "value",
            fieldContainerClassName: "flex-fill",
          },
          {
            label: "Visibility",
            showLabel: true,
            fieldName: "visibility",
            fieldType: "select",
            placeholder: "Select visibility",
            required: true,
            optionKey: "label",
            optionValue: "value",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Visibility is Required",
              };
            },
            fieldContainerClassName: "flex-fill",
          },
          {
            label: "Copy Other Form Settings",
            fieldType: "button",
            fieldName: "copy_form",
            imageWidth: "20",
            imageHeight: "20",
            imageClassName: "me-2",
            className: "copy-form-settings",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/icons/copy-navy-blue.svg",
            imageAlt: "",
            isDisabled: false,
            showLabel: false,
          },
        ],
      },
    ],
  },
];

export const addQuestionButton = [
  {
    sectionType: "body",
    child: [
      {
        label: "Add Question",
        fieldType: "button",
        fieldName: "add_question",
        imageWidth: "20",
        imageHeight: "20",
        imageClassName: "me-2",
        className: "ms-auto my-4 px-3 py-2",
        imagePosition: "front",
        variant: "secondary",
        url:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/plus-navy-blue.svg",
        imageAlt: "Add Question",
        isDisabled: false,
        showLabel: false,
      },
    ],
  },
];

export const addQuestionModal = [
  {
    sectionType: "body",
    child: [
      {
        labelText: "Input Blocks",
        fieldType: "label",
        className: "px-3 py-2",
        labelClassName: "mb-3",
        showLabel: false,
      },
      {
        sectionType: "body",
        rowClassName: "d-flex flex-wrap gap-3",
        child: [
          {
            label: "Text Input",
            fieldType: "button",
            fieldName: "text",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/half-menu.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Date Input",
            fieldType: "button",
            fieldName: "date",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/calender.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "URL Input",
            fieldType: "button",
            fieldName: "url",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/link.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Phone Input",
            fieldType: "button",
            fieldName: "phone_number",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/phone.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Email Input",
            fieldType: "button",
            fieldName: "email",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/email.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Checkbox Input",
            fieldType: "button",
            fieldName: "checkbox",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/checkbox.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Select Input",
            fieldType: "button",
            fieldName: "select",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/cursor.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Multiselect Input",
            fieldType: "button",
            fieldName: "multi_select",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/select.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Number Input",
            fieldType: "button",
            fieldName: "number",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/hash.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "File Input",
            fieldType: "button",
            fieldName: "files",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/file-upload.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Location Input",
            fieldType: "button",
            fieldName: "location",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/location.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
        ],
      },
    ],
  },
  {
    sectionType: "body",
    child: [
      {
        labelText: "Layout Blocks",
        fieldType: "label",
        className: "px-3 py-2",
        labelClassName: "my-3",
        showLabel: false,
      },
      {
        sectionType: "body",
        rowClassName: "d-flex flex-wrap gap-3",
        child: [
          {
            label: "Text Block",
            fieldType: "button",
            fieldName: "nf-text",
            // fieldName: "nf-image",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/text-block.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Page Break Block",
            fieldType: "button",
            fieldName: "nf-page-break",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/page-break.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
          {
            label: "Divider Block",
            fieldType: "button",
            fieldName: "nf-divider",
            imageWidth: "20",
            imageHeight: "20",
            imagePosition: "front",
            url:
              process.env.NEXT_PUBLIC_IMAGES_ASSETS +
              "/form-management/divider.svg",
            isDisabled: false,
            className:
              "d-flex flex-column align-items-center py-2 px-4 gap-2 add-question-block",
          },
        ],
      },
    ],
  },
];

export const publishFormJson = [
  {
    sectionType: "body",
    child: [
      {
        id: "publish-form",
        label: "Publish Form",
        fieldType: "button",
        fieldName: "publish_form",
        variant: "px-4 primary",
        isDisabled: false,
        showLabel: false,
      },
    ],
  },
];
