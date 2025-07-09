import axios, { isCancel, AxiosError, AxiosRequestConfig } from "axios";

const additionalConfig: AxiosRequestConfig = {
  baseURL: `https://api.unsplash.com/`,
  method: "GET",
};

const searchUnsplashRequest = async (query: string) => {
  return await axios.get(
    `search/photos?query=${query}&per_page=12&client_id=Q7iJbjYdDIi6th-IVsdIaLHKByJBxx_lKyLYc58_j9A`,
    additionalConfig,
  );
};

const downloadRequest = async (url: string) => {
  return await axios.get(
    `${url}&client_id=Q7iJbjYdDIi6th-IVsdIaLHKByJBxx_lKyLYc58_j9A`,
    { ...additionalConfig, baseURL: "" },
  );
};

export { searchUnsplashRequest, downloadRequest };
