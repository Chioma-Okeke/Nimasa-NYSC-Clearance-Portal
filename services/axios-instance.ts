import { getAccessRefreshTokens } from "@/actions/utils-actions";
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import { refreshAccessRefreshTokens } from "./refresh-service";
import { toast } from "sonner";
import EmployeeService from "./employee-service";

let isRefreshing = false;

let failedQueue: AxiosRequestConfig[] = [];

export const createAxiosInstance = (
    clientUrl: string,
    headers?: RawAxiosRequestHeaders
): AxiosInstance => {
    const baseURL =
        "https://nimasa-nysc-clearance-app1.onrender.com/api" + clientUrl;

    const axiosInstance = axios.create({
        baseURL,
        timeout: 120000,
        withCredentials: true,
        headers: {
            ...headers,
        },
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log("I ran")
                await generateRefreshToken()
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                console.error("Token refresh failed: ", refreshError)
            } {
                
            }
        }
        return Promise.reject(error)
    }
    );

    const generateRefreshToken = async() => {
        try {
            await new EmployeeService().refreshToken()
        } catch (error: any) {
            console.error(error)
            toast.error("Error in authenticating", {
                description: error?.response?.data?.error?.message ?? "You need to login again."
            })
        }
    }

    return axiosInstance;
};
