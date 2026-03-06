import clsx from "clsx";

export const facilityViewJson = [
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
            labelText: () => {
              return "View Facility";
            },
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
            fieldName: "name",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            isDisabled: true,
            label: "Facility Name",
            className: "col-4",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Facility name is required",
              };
            },
          },
          {
            fieldType: "select",
            fieldName: "status",
            isDisabled: true,
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            className: "col-4",
            selectWrapperClassName: "col-4",
            isRequired: true,
            optionKey: "label",
            optionValue: "value",
            label: "Status",
            labelClassName: "col-2 field-label p-0",
          },
        ],
      },
      {
        fieldType: "label",
        fieldName: "address_label",
        labelText: "Full Address*",
        fieldContainerClassName: "col-2 py-2",
        labelClassName: "header-label",
      },
      {
        sectionType: "body",
        rowClassName: (fieldData: any, fullFieldData:any) => {
          return clsx(`d-flex flex-column gap-4 py-2`, fullFieldData?.facilityEnums?.length === 0 ? "border-bottom" : "")
        },
        child: [
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "address1",
            isDisabled: true,
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Address 1",
            className: "col-4",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Address 1 is required",
              };
            },
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "address2",
            isDisabled: true,
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Address 2",
            className: "col-4",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Address 2 is required",
              };
            },
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "address3",
            isDisabled: true,
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Address 3",
            className: "col-4",
            isRequired: false,
            labelClassName: "col-2 field-label p-0",
          },
          {
            fieldType: "input",
            inputType: "text",
            maxLength: 6,
            fieldName: "pincode",
            isDisabled: true,
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Pincode",
            className: "col-4",
            isRequired: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Pincode is required",
              };
            },
          },
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "country",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Country",
            className: "col-4",
            isRequired: true,
            isDisabled: true,
            labelClassName: "col-2 field-label p-0",
            validation: (data: string) => {
              return {
                isValid: !!data,
                message: "Country is required",
              };
            },
          },
          {
            sectionType: "body",
            rowClassName: "row p-0 m-0",
            child: [
              {
                sectionType: "body",
                rowClassName: "col-6 m-0 p-0",
                child: [
                  {
                    sectionType: "body",
                    rowClassName: "row p-0 m-0",
                    child: [
                      {
                        fieldType: "input",
                        inputType: "text",
                        fieldName: "city",
                        showLabel: true,
                        label: "City",
                        isRequired: true,
                        isDisabled: true,
                        fieldContainerClassName: "col-6 row m-0 p-0 align-items-center",
                        labelClassName: "col-3 field-label",
                        className: "col-9",
                        validation: (data: string) => {
                          return {
                            isValid: !!data,
                            message: "City is required",
                          };
                        },
                      },
                      {
                        fieldType: "input",
                        inputType: "text",
                        fieldName: "state",
                        showLabel: true,
                        label: "State",
                        isRequired: true,
                        isDisabled: true,
                        fieldContainerClassName: "col-6 row m-0 p-0 align-items-center",
                        labelClassName: "col-3 field-label",
                        className: "col-9",
                        validation: (data: string) => {
                          return {
                            isValid: !!data,
                            message: "State is required",
                          };
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
            rowClassName: "row p-0 m-0",
            child: [
              {
                sectionType: "body",
                rowClassName: "col-6 m-0 p-0",
                child: [
                  {
                    sectionType: "body",
                    rowClassName: "row p-0 m-0",
                    child: [
                      {
                        fieldType: "input",
                        inputType: "number",
                        fieldName: "latitude",
                        showLabel: true,
                        label: "Lat",
                        isRequired: true,
                        isDisabled: true,
                        fieldContainerClassName: "col-6 row m-0 p-0 align-items-center",
                        labelClassName: "col-3 field-label",
                        className: "col-9",
                        validation: (data: string) => {
                          return {
                            isValid: !!data,
                            message: "Latitude is required",
                          };
                        },
                      },
                      {
                        fieldType: "input",
                        inputType: "number",
                        fieldName: "longitude",
                        showLabel: true,
                        label: "Long",
                        isRequired: true,
                        isDisabled: true,
                        fieldContainerClassName: "col-6 row m-0 p-0 align-items-center",
                        labelClassName: "col-3 field-label",
                        className: "col-9",
                        validation: (data: string) => {
                          return {
                            isValid: !!data,
                            message: "Longitude is required",
                          };
                        },
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
        fieldType: "label",
        fieldName: "additional_information_label",
        labelText: "Additional Information",
        fieldContainerClassName: "col-2 py-2",
        labelClassName: "header-label",
        hiddenFor: (
          section: any,
          fieldData: any,
          fullFieldData: any,
        ) => {
          return fullFieldData?.facilityEnums?.length > 0
        },
      },
      {
        sectionType: "body",
        rowClassName: "d-flex flex-column gap-4 py-2 border-bottom",
        hiddenFor: (
          section: any,
          fieldData: any,
          fullFieldData: any,
        ) => {
          return fullFieldData?.facilityEnums?.length > 0
        },
        child: [
          {
            fieldType: "input",
            inputType: "text",
            fieldName: "ws_alternate_code",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            label: "Ws Alternate Code",
            className: "col-4",
            isRequired: false,
            isDisabled: true,
            labelClassName: "col-2 field-label p-0",
            is_additional_field: true,
            hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
            ) => {
              return !!fullFieldData?.facilityEnums?.find(
                (item: any) => item?.key === field?.fieldName,
              );
            },
          },
          {
            fieldType: "select",
            fieldName: "store_type",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            className: "col-4",
            isRequired: false,
            selectWrapperClassName: "col-4",
            optionKey: "label",
            optionValue: "value",
            label: "Store Type",
            isDisabled: true,
            is_additional_field: true,
            labelClassName: "col-2 field-label p-0",
             hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
            ) => {
              return !!fullFieldData?.facilityEnums?.find(
                (item: any) => item?.key === field?.fieldName,
              );
            },
          },
          {
            fieldType: "select",
            fieldName: "store_cluster",
            fieldContainerClassName: "row p-0 m-0 align-items-center",
            showLabel: true,
            className: "col-4",
            isRequired: false,
            optionKey: "label",
            optionValue: "value",
            selectWrapperClassName: "col-4",
            is_additional_field: true,
            isDisabled: true,
            label: "Store Cluster",
            labelClassName: "col-2 field-label p-0",
             hiddenFor: (
              field: any,
              fieldData: any,
              fullFieldData: any,
            ) => {
              return !!fullFieldData?.facilityEnums?.find(
                (item: any) => item?.key === field?.fieldName,
              );
            },
          },
        ],
      },
    ],
  },
];
