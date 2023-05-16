import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/common/toast/toast";

const baseURL = "https://0bkj8hawb6.execute-api.us-east-1.amazonaws.com/qa/api";

// const baseURL =
// //   "https://01hj7ks3ih.execute-api.us-east-1.amazonaws.com/dev/api";

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "X-accessType": "pos",
  },
});

// Authorization header with the access token
api.interceptors.request.use(
  (config) => {
    const { accessToken }: any = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Error sending request:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === "Unauthorized"
    ) {
      localStorage.removeItem("user");
      window.location.href = ROUTE_CONSTANTS.LOGIN;
    } else {
      return Promise.reject(error);
    }
  }
);

export const requestApi = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.request<T>(config);
  return response.data;
};

export const getApi = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.get<T>(url, config);
  return response.data;
};

export const postApi = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.post<T>(url, data, config);
  return response.data;
};

export const putApi = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.put<T>(url, data, config);
  return response.data;
};

export const patchApi = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.patch<T>(url, data, config);
  return response.data;
};

export const delApi = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete<T>(url, config);
  return response.data;
};
