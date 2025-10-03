import axios, {
    AxiosInstance,
    RawAxiosRequestHeaders,
} from "axios";
import { toast } from "sonner";
import EmployeeService from "./employee-service";

export const createAxiosInstance = (
    clientUrl: string,
    headers?: RawAxiosRequestHeaders
): AxiosInstance => {
    const baseURL =
        process.env.NEXT_PUBLIC_API_BASE + clientUrl;

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
                await generateRefreshToken()
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                console.error("Token refresh failed: ", refreshError)
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
