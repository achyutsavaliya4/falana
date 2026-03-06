export const checkArray = (array: any) => {
  return array && Array.isArray(array) && array?.length > 0;
};

export const hasKeys = (obj: any): obj is Record<string, any> => {
  return typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;
};

export const Capitalize = (name: string) => {
  if (!checkString(name)) return;
  return name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
};

export const convertToModuleName = (pathname: string): string => {
  if (!checkString(pathname)) return "";

  const route = pathname?.split("/");
  if (checkArray(route)) {
    const moduleNameParts = route?.map((d) => {
      if (!checkString(d)) return "";
      return d?.split("-")?.reduce((acc, path) => acc + Capitalize(path), "");
    });
    return moduleNameParts?.filter(Boolean)?.join("");
  }
  return "";
};

export const checkString = (name?: string | null) => {
  return name && name?.trim();
};

export const convertTabEventKey = (title: string = "") => {
  if (!checkString(title)) return "";
  const regex = /[\/\\\s_-]+/;
  const parts = title?.split(regex);
  return parts
    ?.filter(Boolean)
    ?.reduce((acc, path) => acc + path.toLocaleLowerCase(), "");
};
