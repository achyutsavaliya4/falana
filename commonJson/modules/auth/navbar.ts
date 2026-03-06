export const mainMenu = [
  {
    title: "Search",
    fieldKey: "search",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Medicine Search",
        fieldKey: "medicine-search",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/",
      },
      {
        title: "Search History",
        fieldKey: "search-history",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/search-history",
      },
      {
        title: "Requested Product",
        fieldKey: "product-request",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/product-request",
      },
    ],
  },
  {
    title: "Sales Order",
    fieldKey: "orders",
    fieldSubKey: "sales-orders",
    redirectUrl: "/orders",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
  },
  {
    title: "Deliveries",
    fieldKey: "orders",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Home Delivery",
        fieldKey: "store-orders",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/home-delivery",
      },
      {
        title: "Stock Transfer",
        fieldKey: "store-orders",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/store-delivery",
      },
      {
        title: "Pincode Configuration",
        fieldKey: "pincode-serviceability",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/pincode-configuration",
      },
    ],
  },
  {
    title: "Programs",
    fieldKey: "program",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Admin Referral Program",
        fieldKey: "admin-referral-program",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/referral-program",
      },
      {
        title: "Admin Loyalty Program",
        fieldKey: "admin-loyalty-program",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/loyalty-program",
      },
      {
        title: "User Referral Program",
        fieldKey: "user-referral-program",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/referral-program-user/validate-referral-code",
      },
      {
        title: "User Loyalty Program",
        fieldKey: "user-loyalty-program",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/loyalty-program-user",
      },
      {
        title: "Restricted User",
        fieldKey: "restricted-user",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/restricted-user",
      },
    ],
  },
  {
    title: "Inventory",
    fieldKey: "inventory",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Stock",
        fieldKey: "stock",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/stock-audit-admin",
      },
    ],
  },
  {
    title: "Task",
    fieldKey: "task",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      // {
      //   title: "PJP Planning",
      //   fieldKey: "pjp",
      //   imageUrl:
      //     process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
      //   redirectUrl: "/pjp-planning",
      //   hideForAsm: true,
      // },
      // {
      //   title: "ASM PJP Planning",
      //   fieldKey: "pjp-asm",
      //   imageUrl:
      //     process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
      //   redirectUrl: "/pjp-asm",
      //   hideForAdmin: true,
      // },
      {
        title: "Task Form Mapping",
        fieldKey: "custom-task",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/task/task-form-mapping",
      },
    ],
  },
  {
    title: "CRM",
    fieldKey: "crm-task",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "CRM Store Settings",
        fieldKey: "crm-task",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/crm-store-settings",
        hideForAsm: true,
      },
      {
        title: "Task File Upload",
        fieldKey: "crm-task",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/crm-task",
        hideForAsm: true,
      },
    ],
  },
  {
    title: "Settings",
    fieldKey: "master",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    redirectUrl: "/",
    child: [
      {
        title: "Users & Roles",
        fieldKey: "user",
        redirectUrl: "/user-and-roles/",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
      },
      {
        title: "Import History",
        fieldKey: "import-history",
        redirectUrl: "/import-history",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
      },
    ],
  },
  {
    title: "Reports",
    fieldKey: "report",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    redirectUrl: "/reports",
  },
  {
    title: "Settings",
    fieldKey: "settings",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Facility",
        fieldKey: "facility",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/facility-master",
      },
    ],
  },
  {
    title: "Users",
    fieldKey: "users",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
    child: [
      {
        title: "Roles",
        fieldKey: "roles",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/user-management/roles",
      },
      {
        title: "Invites",
        fieldKey: "invites",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/invites",
      },
      {
        title: "Manage",
        fieldKey: "manage",
        imageUrl:
          process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
        redirectUrl: "/user-management/users",
      },
    ],
  },
  {
    title: "Form Management",
    fieldKey: "forms",
    fieldSubKey: "forms",
    redirectUrl: "/form-management",
    imageUrl:
      process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/navbar/dashboard-black.svg",
  },
];
