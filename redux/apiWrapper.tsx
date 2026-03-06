import api from "./api";

export const get = async (
  url: string,
  baseURL?: string,
  contentType?: string,
) => {
  try {
    const response = await api(baseURL, contentType as any).get(url);
    return response;
  } catch (err: any) {
    throw err;
  }
};

export const post = async (
  url: string,
  payload?: any,
  baseURL?: string,
  contentType?: string,
) => {
  try {
    const response = await api(baseURL, contentType as any).post(url, payload);
    return response;
  } catch (err: any) {
    throw err;
  }
};

export const put = async (
  url: string,
  payload: any,
  baseURL?: string,
  contentType?: string,
) => {
  try {
    const response = await api(baseURL, contentType as any).put(url, payload);

    return response;
  } catch (err: any) {
    throw err;
  }
};

export const remove = async (
  url: string,
  payload?: any,
  baseURL?: string,
  contentType?: string,
) => {
  try {
    const response = await api(baseURL, contentType as any).delete(url, {
      data: payload
    });

    return response;
  } catch (err: any) {
    throw err;
  }
};
