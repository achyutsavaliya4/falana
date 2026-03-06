export const questionSettings = [
  {
    sectionType: "body",
    rowClassName: "d-flex gap-3",
    child: [
      {
        fieldType: "button",
        fieldName: "copy_question",
        imageWidth: "20",
        imageHeight: "20",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/copy-blue.svg",
      },
      {
        fieldType: "button",
        fieldName: "delete_question",
        imageWidth: "20",
        imageHeight: "20",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/trash-red.svg",
      },
      {
        fieldType: "button",
        fieldName: "settings",
        imageWidth: "20",
        imageHeight: "20",
        imagePosition: "front",
        url: process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/icons/setting-black.svg",
      },
    ],
  },
];

export const requiredSwitchJSON = [
  {
    sectionType: "body",
    rowClassName: "",
    child: [
      {
        fieldType: "switch",
        fieldName: "required",
        fieldContainerClassName: "d-flex align-items-center gap-2",
        showLabel: true,
        label: "Required",
      },
    ],
  },
];
