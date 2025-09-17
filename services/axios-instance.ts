import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";

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

    axiosInstance.interceptors.request.use((config) => {
        console.log("DATA TYPE:", config.data instanceof FormData); // should be true
        console.log("HEADERS SENT:", config.headers);
        return config;
    });

    //   axiosInstance.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const originalRequest = error.config;

    //     if (
    //       error.response?.status === 401 &&
    //       !originalRequest._retry // prevent infinite loop
    //     ) {
    //       originalRequest._retry = true;
    //       try {
    //         // Call refresh endpoint
    //         await axiosInstance.post("/unified-auth/refresh", {}, { withCredentials: true });

    //         // Retry original request after refreshing
    //         return axiosInstance(originalRequest);
    //       } catch (refreshError) {
    //         console.error("Refresh token failed:", refreshError);
    //         // Optionally clear user session and redirect
    //         window.location.href = "/login";
    //       }
    //     }

    //     return Promise.reject(error);
    //   }
    // );

    return axiosInstance;
};
