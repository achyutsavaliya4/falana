let tabsValid: any[] = [];
const useCheckValidation = (tabsValidation: boolean = false) => {
  const checkTabsValidation = async (
    jsonData: { sectionType?: string; child?: any[] },
    valueData: { [x: string]: any },
    fullFieldData?: any,
  ) => {
    let isTabsValidation: any[] = [];
    isTabsValidation = (jsonData?.child || []).map(
      async (tabData: {
        eventKey: string | number;
        child: any[];
        isNonObject: any;
      }) => {
        let fieldDataTabs = valueData ? valueData[tabData.eventKey] : "";
        if (
          typeof fieldDataTabs === "undefined" &&
          tabData?.child?.length > 0 &&
          tabData?.isNonObject
        ) {
          tabData?.child.map((childD: { child: any[] }) => {
            if (childD?.child) {
              fieldDataTabs = {};
              childD?.child.map((subChild: { fieldName: string | number }) => {
                fieldDataTabs[subChild?.fieldName] =
                  valueData[subChild?.fieldName];
              });
            }
          });
        }

        return await checkBodyValidation(tabData?.child[0], fieldDataTabs, fullFieldData);
      },
    );
    isTabsValidation = await Promise.all(isTabsValidation);
    tabsValid = [...isTabsValidation];

    return isTabsValidation.filter(Boolean).length === isTabsValidation?.length;
  };

  const checkBodyValidation = async (
    jsonData: { sectionType?: string; child?: any[] },
    valueData: { [x: string]: any },
    fullFieldData?: any,
  ) => {
    let isBodyValidation: any[] = [];
    isBodyValidation = (jsonData?.child || []).map(
      async (childData: {
        sectionType: string;
        fieldType: string;
        isDisabled: any;
        validation: (
          arg0: any,
          arg1: any,
          arg2: any,
        ) => { (): any; new (): any; isValid: boolean };
        parent: string | number;
        fieldName: string | number;
        compareField: string | number;
        hiddenFor?: Function;
      }) => { 

        if (
          !["accordion", "grid-table", "body", "button"].includes(
            childData?.fieldType,
          ) &&
          childData?.sectionType !== "body" &&
          childData?.sectionType !== "body-repeat"
        ) {
          if (
            childData.isDisabled
              ? !childData.isDisabled
              : childData?.hiddenFor
                ? childData?.hiddenFor(childData, valueData, fullFieldData)
                : !childData.isDisabled && !childData?.hiddenFor
                  ? true
                  : false
          ) {
            const parentKey = childData?.parent;

            const fieldValue = parentKey
              ? (valueData?.[parentKey]?.[childData.fieldName] ??
                valueData?.[childData.fieldName])
              : valueData?.[childData.fieldName];

            const compareValue = childData?.compareField
              ? parentKey
                ? (valueData?.[parentKey]?.[childData.compareField] ??
                  valueData?.[childData.compareField])
                : valueData?.[childData.compareField]
              : "";

            const trimmedFieldValue =
              typeof fieldValue === "string" ? fieldValue.trim() : fieldValue;

            const trimmedCompareValue =
              typeof compareValue === "string"
                ? compareValue.trim()
                : compareValue;
            if (!childData?.validation) return true;
            const isInvalid =
              childData?.validation(
                trimmedFieldValue,
                trimmedCompareValue,
                fullFieldData,
              )?.isValid === false; 

            return !isInvalid;
          } else if (
            childData.isDisabled ||
            (childData?.hiddenFor
              ? !childData?.hiddenFor(childData, valueData, fullFieldData)
              : false)
          ) {
            return true;
          }
        } else if (
          ["accordion", "grid-table", "button"].includes(childData?.fieldType)
        ) {
          return true;
        } else if (childData?.sectionType === "body") {
          return (await checkBodyValidation(
            childData,
            valueData,
            fullFieldData,
          ))
            ? true
            : false;
        } else if (childData?.sectionType === "body-repeat") {
          const repeatData = valueData?.[childData.fieldName as string];
          if (Array.isArray(repeatData)) {
            const repeatValidation = await Promise.all(
              repeatData.map(async (itemData) => {
                return await checkBodyValidation(
                  childData,
                  itemData as { [x: string]: any },
                  fullFieldData,
                );
              }),
            );
            return repeatValidation.every((isValid) => isValid);
          }
          return true;
        } else if (childData?.fieldType === "body") {
          return (await checkBodyValidation(
            childData,
            valueData,
            fullFieldData,
          ))
            ? true
            : false;
        }
        return false;
      },
    );

    isBodyValidation = await Promise.all(isBodyValidation);
    if (
      isBodyValidation.filter((d) => {
        return d;
      })?.length !== isBodyValidation?.length
    ) {
      return false;
    }
    return true;
  };
  const checkFormValidation = async (
    json: any[],
    valueData: any,
    fullFieldData?: any,
  ) => {
    let isCheckFormValidation = [];
    isCheckFormValidation = await json.map(
      async (jsonData: { sectionType: string }) => {
        if (jsonData.sectionType === "body") {
          return await checkBodyValidation(jsonData, valueData, fullFieldData);
        } else if (jsonData.sectionType === "tabs") {
          return await checkTabsValidation(jsonData, valueData, fullFieldData);
        }
        return true;
      },
    );
    isCheckFormValidation = await Promise.all(isCheckFormValidation);
    return (
      isCheckFormValidation.filter(Boolean).length ===
      isCheckFormValidation?.length
    );
  };
  const checkValidation = async (
    json: any[],
    valueData: any,
    fullFieldData?: any,
  ) => {
    if (json) {
      const response = await checkFormValidation(
        json,
        valueData,
        fullFieldData,
      );
      return response;
    }
    return tabsValidation ? { tabsErrors: tabsValid, isValid: false } : false;
  };
  return checkValidation;
};

export default useCheckValidation;
