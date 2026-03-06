class tokenStorage {
  clearLoginTokens() {
    localStorage.removeItem("tenant_id");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("facility_id");
  }
  getFilters = () => {
    const filters = localStorage.getItem("filters");
    return filters ? JSON.parse(filters) : {};
  };
  setFilters = (value: any) => {
    const filters = localStorage.getItem("filters");
    let oldData = filters ? JSON.parse(filters) : {};
    const newData = { ...oldData, ...value };
    return localStorage.setItem("filters", JSON.stringify(newData));
  };
  removeFilters = () => {
    return localStorage.removeItem("filters");
  };
}
const storage = new tokenStorage();
export { storage };
