import { getAccessRefreshTokens } from "@/actions/utils-actions";
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import { refreshAccessRefreshTokens } from "./refresh-service";

let isRefreshing = false;

let failedQueue: AxiosRequestConfig[] = [];

export const createAxiosInstance = (
    clientUrl: string,
    headers?: RawAxiosRequestHeaders
): AxiosInstance => {
    const isServer = typeof window === "undefined";
    const isProd = process.env.NODE_ENV === "production";

    // Determine base domain
    const productionDomain = process.env.NEXT_PUBLIC_PROD_DOMAIN;
    const localDomain = "http://localhost:3000";

    // const baseURL = isServer
    //   ? `${isProd ? productionDomain : localDomain}/api${clientUrl}`
    //   : `/api${clientUrl}`
    const baseURL =
        "https://nimasa-nysc-clearance-app1.onrender.com/api" + clientUrl;

    const axiosInstance = axios.create({
        baseURL,
        timeout: 120000,
        withCredentials: true,
        headers: {
            // "Content-Type": "application/json",
            ...headers,
        },
    });

    // axiosInstance.interceptors.request.use((config) => {
    //     async (error) => {
    //         const originalRequest = error.config;
    //         if (error.response?.status === 401 && !originalRequest._retry) {
    //             const { refreshToken } = await getAccessRefreshTokens();

    //             if (!refreshToken) {
    //                 return Promise.reject(error);
    //             }

    //             originalRequest._retry = true;

    //             if (isRefreshing) {
    //                 return failedQueue.push(originalRequest);
    //             }
    //             isRefreshing = true;

    //             try {
    //                 const { access_token, refresh_token } =
    //                     await refreshAccessRefreshTokens(refreshToken);

    //                 if (access_token) {
    //                     await setAccessRefreshTokens(
    //                         access_token,
    //                         refresh_token
    //                     );
    //                     originalRequest.headers.Authorization = `Bearer ${access_token}`;

    //                     processQueue(access_token, protectedBaseInstance);
    //                     return protectedBaseInstance(originalRequest);
    //                 }
    //             } catch (refreshError) {
    //                 // processQueue(refreshError as Error)
    //                 return Promise.reject(refreshError);
    //             } finally {
    //                 isRefreshing = false;
    //             }
    //         }
    //     };
    // });

    return axiosInstance;
};
