import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { createAxiosInstance } from "./axios-instance";

export abstract class BaseService {
    protected clientUrl: string;
    protected apiInstance: AxiosInstance;

    constructor(
        url: string,
        // version: 'v1' | 'v2' = 'v1',
        headers?: Record<string, string>
    ) {
        this.clientUrl = url;
        this.apiInstance = createAxiosInstance(this.clientUrl, headers);
    }

    protected async handleRequest<TData>(
        request: Promise<AxiosResponse<TData>>
    ): Promise<TData> {
        try {
            const response = await request;
            return response.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data?.message || e.message);
            }
            throw new Error(
                "Something went wrong while processing your request"
            );
        }
    }

    public async get<TData>(
        url: string,
        params?: Record<string, unknown>,
        responseType: "json" | "blob" | "text" | "arraybuffer" = "json"
    ): Promise<TData> {
        return this.handleRequest(
            this.apiInstance.get(url, { params, responseType })
        );
    }

    public async post<TResponse, TData>(
        url: string,
        data?: TData,
        params?: Record<string, unknown>
    ): Promise<TResponse> {
        return this.handleRequest(this.apiInstance.post(url, data, { params }));
    }

    public async put<TResponse, TData>(
        url: string,
        data?: TData,
        params?: Record<string, unknown>
    ): Promise<TResponse> {
        return this.handleRequest(this.apiInstance.put(url, data, { params }));
    }

    public async patch<TResponse, TData>(
        url: string,
        data?: TData,
        params?: Record<string, unknown>
    ): Promise<TResponse> {
        return this.handleRequest(
            this.apiInstance.patch(url, data, { params })
        );
    }

    public async delete<TData>(
        url: string,
        params?: Record<string, unknown>
    ): Promise<TData> {
        return this.handleRequest(this.apiInstance.delete(url, { params }));
    }
}
