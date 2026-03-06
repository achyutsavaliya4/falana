import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://opn.mkart.dev";
export type ContentType =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | "text/plain"
  | "text/html"
  | "text/css"
  | "text/javascript"
  | "application/javascript"
  | "application/pdf"
  | "application/xml"
  | "image/png"
  | "image/jpeg"
  | "image/webp"
  | "image/svg+xml";
const api = (BASE_URL?: string, contentType: ContentType = "application/json") => {
  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL ?? API_BASE_URL,
    headers: {
      "Content-Type": contentType ?? "application/json",
    },
  });

  // Add a request interceptor
  service.interceptors.request.use(
    async function (config) {
      const token = localStorage.getItem("access_token");
      config.headers["x-tenant-id"] = localStorage?.getItem("tenant_id");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      //    TODO: update header
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  return service;
};

export default api;
