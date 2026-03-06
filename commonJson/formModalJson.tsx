import { hiddenFieldMapping } from "./form-management/hiddenFieldJson";

const formModalJson = [
  {
    sectionType: "body",
    // rowClassName: "d-flex col-12 align-items-center pb-1",
    child: [
      {
        sectionType: "body",
        rowClassName: "d-flex align-items-center border-bottom",
        child: [
          {
            fieldType: "input",
            fieldName: "hidden",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1",
            showLabel: true,
            isRequired: false,
            label: "Hidden",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "input",
            fieldName: "disabled",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1",
            showLabel: true,
            isRequired: false,
            label: "Disable",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
        ],
      },

      {
        sectionType: "body",
        fieldName: "text_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "Text Options",
            labelText: "Keep it simple or make it a multi-lines input.",
          },
          {
            fieldType: "input",
            fieldName: "multi_lines",
            inputType: "checkbox",
            fieldContainerClassName:
              "d-flex align-items-center gap-1 px-1 border-bottom",
            showLabel: true,
            isRequired: false,
            label: "Multi-Lines input",
            noPadding: true,
          },
        ],
      },
      {
        sectionType: "body",
        fieldName: "number_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "Number Options",
            labelText: "Convert Number to Rating",
          },
          {
            fieldType: "input",
            fieldName: "is_rating",
            inputType: "checkbox",
            fieldContainerClassName:
              "d-flex align-items-center gap-1 px-1 border-bottom",
            showLabel: true,
            isRequired: false,
            label: "Rating",
            noPadding: true,
          },
          {
            fieldType: "input",
            inputType: "number",
            fieldName: "rating_max_value",
            fieldContainerClassName: "d-flex flex-column",
            showLabel: true,
            isRequired: true,
            label: "Max rating value",
            hiddenFor: (_: any, fieldData: any) => {
              return fieldData?.is_rating;
            },
          },
        ],
      },
      {
        sectionType: "body",
        fieldName: "file_upload_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "File Upload Options",
          },
          {
            fieldType: "input",
            fieldName: "multiple",
            inputType: "checkbox",
            fieldContainerClassName:
              "d-flex align-items-center gap-1 px-1 border-bottom",
            showLabel: true,
            isRequired: false,
            label: "Allow multiple files",
            noPadding: true,
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "allowed_file_types",
            fieldContainerClassName: "d-flex flex-column",
            showLabel: true,
            isRequired: true,
            label: "Allowed file types",
          },
        ],
      },
      {
        sectionType: "body",
        fieldName: "checkbox_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "Checkbox",
          },
          {
            fieldType: "input",
            fieldName: "use_toggle_switch",
            inputType: "checkbox",
            fieldContainerClassName:
              "d-flex align-items-center gap-1 px-1 border-bottom",
            showLabel: true,
            isRequired: false,
            label: "Use toggle switch",
            noPadding: true,
          },
        ],
      },
      {
        sectionType: "body",
        fieldName: "date_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "Date Options",
          },
          {
            fieldType: "input",
            fieldName: "date_range",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1 px-1",
            showLabel: true,
            isRequired: false,
            label: "Date Range",
            noPadding: true,
          },
          {
            fieldType: "input",
            fieldName: "with_time",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1 px-1",
            showLabel: true,
            isRequired: false,
            label: "Date with time",
            noPadding: true,
          },
          {
            fieldType: "input",
            fieldName: "prefill_today",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1 px-1",
            showLabel: true,
            isRequired: false,
            label: "Prefill with 'today'",
            noPadding: true,
          },
          {
            fieldType: "input",
            fieldName: "disable_past_dates",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1 px-1",
            showLabel: true,
            isRequired: false,
            label: "Disable past dates",
            noPadding: true,
          },
          {
            fieldType: "input",
            fieldName: "disable_future_dates",
            inputType: "checkbox",
            fieldContainerClassName: "d-flex align-items-center gap-1 px-1",
            showLabel: true,
            isRequired: false,
            label: "Disable future dates",
            noPadding: true,
          },
        ],
      },
      {
        sectionType: "body",
        fieldName: "text_block_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            showLabel: true,
            label: "Text Block Options",
          },
          {
            fieldType: "select",
            fieldName: "align",
            inputType: "text",
            fieldContainerClassName: "col",
            showLabel: true,
            isRequired: false,
            label: "Field Alignment",
            optionKey: "label",
            optionValue: "value",
            inputPlaceholder: "Select Alignment",
          },
        ],
      },
      {
        fieldType: "label",
        fieldName: "customization",
        fieldContainerClassName: "",
        showLabel: true,
        label: "Customization",
        labelText:
          "Change your form field name, pre-fill a value, add hints, etc.",
      },

      {
        sectionType: "body",
        rowClassName: "d-flex align-items-center",
        child: [
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "name",
            fieldContainerClassName: "d-flex flex-column",
            showLabel: true,
            isRequired: true,
            label: "Field Name",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "input",
            fieldName: "prefill",
            inputType: "text",
            fieldContainerClassName: "",
            showLabel: true,
            isRequired: false,
            label: "Pre Filled Value",
            inputPlaceholder: "text",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
        ],
      },
      {
        fieldType: "input",
        fieldName: "hide_field_name",
        inputType: "checkbox",
        fieldContainerClassName: "d-flex align-items-center gap-1",
        showLabel: true,
        isRequired: false,
        label: "Hide Text Field",
        // className: "prescription-modal-input",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
      },
      {
        sectionType: "body",
        rowClassName: "d-flex align-items-center col-12",
        child: [
          {
            fieldType: "input",
            fieldName: "placeholder",
            inputType: "text",
            fieldContainerClassName: "",
            showLabel: true,
            isRequired: false,
            label: "Empty Input Text(Placeholder)",
            inputPlaceholder: "Message",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "select",
            fieldName: "width",
            inputType: "text",
            fieldContainerClassName: "col",
            showLabel: true,
            isRequired: false,
            label: "Field Width",
            optionKey: "name",
            optionValue: "value",
            // className: "prescription-modal-input",
            inputPlaceholder: "Message",
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "next_btn_text",
            fieldContainerClassName: "d-flex flex-column",
            showLabel: true,
            isRequired: true,
            label: "Text of next button",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "previous_btn_text",
            fieldContainerClassName: "d-flex flex-column",
            showLabel: true,
            isRequired: true,
            label: "Text of previous button",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex align-items-center col-12 pb-2",
        child: [
          {
            fieldType: "input",
            fieldName: "help",
            inputType: "text",
            fieldContainerClassName: "col-4",
            showLabel: true,
            isRequired: false,
            label: "Field Help",
            inputPlaceholder: "Message",
            // className: "prescription-modal-input",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "select",
            fieldName: "help_position",
            inputType: "text",
            fieldContainerClassName: "col-4",
            showLabel: true,
            isRequired: false,
            label: "Field Help Position",
            optionKey: "name",
            optionValue: "value",
            // className: "prescription-modal-input",
            inputPlaceholder: "Message",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
          {
            fieldType: "input",
            fieldName: "max_char_limit",
            inputType: "number",
            fieldContainerClassName: "col-6",
            showLabel: true,
            isRequired: false,
            label: "Max Character Limit",
            // className: "prescription-modal-input",
            inputPlaceholder: "Message",
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
              configData: any,
            ) => {
              return !hiddenFieldMapping?.[fieldData?.type]?.includes(
                field?.fieldName,
              );
            },
          },
        ],
      },
      {
        fieldType: "input",
        fieldName: "show_char_limit",
        inputType: "checkbox",
        fieldContainerClassName:
          "d-flex justify-content-end gap-2 border-bottom",
        showLabel: true,
        isRequired: false,
        label: "Always show character limit",
        // className: "prescription-modal-input",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
      },
      {
        sectionType: "body",
        fieldName: "advance_options",
        hiddenFor: (
          field: any,
          fieldData: any,
          fullFieldData: any,
          configData: any,
        ) => {
          return !hiddenFieldMapping?.[fieldData?.type]?.includes(
            field?.fieldName,
          );
        },
        child: [
          {
            fieldType: "label",
            fieldContainerClassName: "",
            showLabel: false,
            label: "Customization",
            labelText: "Advance Options",
          },
          {
            sectionType: "body",
            rowClassName: "",
            child: [
              {
                fieldType: "input",
                fieldName: "generates_uuid",
                inputType: "checkbox",
                fieldContainerClassName: "d-flex justify-content-start gap-2",
                noPadding: true,
                showLabel: true,
                isRequired: false,
                label: "Generate an unique id",
                // className: "prescription-modal-input",
              },
              {
                fieldType: "label",
                fieldName: "generates_auto_increment_id",
                fieldContainerClassName: "px-3",
                showLabel: false,
                noPadding: true,
                label: "Customization",
                labelText:
                  "If you enable this, we will hide this field and fill it with a unique id (UUID format) on each new form submission",
              },
            ],
          },
          {
            sectionType: "body",
            rowClassName: "",
            child: [
              {
                fieldType: "input",
                fieldName: "generate_increment_id",
                inputType: "checkbox",
                fieldContainerClassName: "d-flex justify-content-start gap-2",
                noPadding: true,
                showLabel: true,
                isRequired: false,
                label: "Generate an auto-incremented id",
                // className: "prescription-modal-input",
              },
              {
                fieldType: "label",
                fieldName: "generate_increment_id_label",
                fieldContainerClassName: "px-3",
                showLabel: false,
                noPadding: true,
                label: "Customization",
                labelText:
                  "If you enable this, we will hide this field and fill it a unique incrementing number on each new form submission",
              },
            ],
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "",
        child: [
          {
            fieldType: "label",
            fieldName: "logic",
            fieldContainerClassName: "",
            showLabel: true,
            label: "Logic",
            labelText:
              "Add some logic to this block. Start by adding some conditions, and then add some actions.",
          },
          {
            sectionType: "body",
            rowClassName: "d-flex ",
            child: [
              {
                label: "Copy From",
                fieldType: "button",
                fieldName: "copy_form",
                imageWidth: "20",
                imageHeight: "20",
                imageClassName: "me-2",
                className: "px-3 py-2",
                imagePosition: "front",
                url:
                  process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                  "/icons/copy-blue.svg",
                isDisabled: false,
                showLabel: false,
              },
              {
                label: "Clear All",
                fieldType: "button",
                fieldName: "clear_all",
                imageWidth: "20",
                imageHeight: "20",
                imageClassName: "me-2",
                className: "px-3 py-2",
                imagePosition: "front",
                url:
                  process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                  "/form-management/rounded-cross-red.svg",
                isDisabled: false,
                showLabel: false,
              },
            ],
          },
        ],
      },
      {
        sectionType: "body",
        rowClassName: "d-flex col-12",
        child: [
          {
            sectionType: "body",
            rowClassName: "d-flex flex-column col-6",
            child: [
              {
                fieldType: "label",
                fieldName: "conditions",
                fieldContainerClassName: "",
                showLabel: false,
                label: "Customization",
                labelText: "1. Conditions",
              },
              {
                sectionType: "body",
                rowClassName: "col-12",
                child: [
                  {
                    fieldType: "select",
                    fieldName: "operators",
                    fieldContainerClassName: "d-flex align-items-center gap-2",
                    showLabel: true,
                    isRequired: false,
                    label: "Operator",
                    optionKey: "label",
                    optionValue: "value",
                    className: "col-4",
                  },
                  {
                    fieldType: "select",
                    fieldName: "operator_condition",
                    fieldContainerClassName: "d-flex align-items-center gap-2",
                    showLabel: false,
                    isRequired: false,
                    label: "Operator",
                    optionKey: "label",
                    optionValue: "value",
                    className: "col-6",
                  },
                ],
              },
              {
                sectionType: "body",
                rowClassName: "d-flex ",
                child: [
                  {
                    label: "Add Condition",
                    fieldType: "button",
                    fieldName: "add_condition_btn",
                    imageWidth: "12",
                    imageHeight: "12",
                    imageClassName: "me-2",
                    className: "px-3 py-2",
                    imagePosition: "front",
                    isDisabled: false,
                    showLabel: false,
                  },
                  {
                    label: "Add Group",
                    fieldType: "button",
                    fieldName: "add_group_btn",
                    imageWidth: "12",
                    imageHeight: "12",
                    imageClassName: "me-2",
                    className: "px-3 py-2",
                    imagePosition: "front",
                    isDisabled: false,
                    showLabel: false,
                  },
                ],
              },
            ],
          },
          {
            sectionType: "body",
            rowClassName: "d-flex flex-column col-6",
            child: [
              {
                fieldType: "label",
                fieldName: "actions",
                fieldContainerClassName: "",
                showLabel: false,
                label: "Customization",
                labelText: "2. Actions",
              },
              {
                sectionType: "body",
                rowClassName: "d-flex ",
                child: [
                  {
                    fieldType: "select",
                    fieldName: "add_action",
                    fieldContainerClassName: "d-flex align-items-center gap-2",
                    showLabel: false,
                    isRequired: false,
                    label: "Operator",
                    optionKey: "label",
                    optionValue: "value",
                    className: "",
                  },
                ],
              },
              {
                fieldType: "label",
                fieldName: "add_action_label",
                fieldContainerClassName: "",
                showLabel: false,
                label: "Customization",
                labelText: "Action(s) triggered when given conditions are true",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default formModalJson;
