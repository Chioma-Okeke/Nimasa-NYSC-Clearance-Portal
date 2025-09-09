// import { getCookie } from "@/actions/utils-actions";
import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";

function getCookie() {
  const authToken = localStorage.getItem("token")
  return authToken;
}

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
        timeout: 60000,
        baseURL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (!isServer) {
                const token = getCookie();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                console.log(token, "here is the token coming in");
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
