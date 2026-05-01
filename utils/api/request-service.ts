// utils/api/request-service.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { requestInterceptor, responseInterceptor } from '@/utils/api/interceptor';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',   // ✅ no env variable needed
    timeout: 40000,
});

requestInterceptor(axiosInstance);
responseInterceptor(axiosInstance);

// 🔒 Authenticated Requests
export const getRequest = <T>(url: string, params?: any, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, { params, headers });

export const postRequest = <T>(url: string, data: any, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data, { headers });

export const patchRequest = <T>(url: string, data: any, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.patch<T>(url, data, { headers });

export const putRequest = <T>(url: string, data: any, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(url, data, { headers });

export const deleteRequest = <T>(url: string, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(url, { headers });

// 🔓 Unauthenticated Requests
export const getUnAuthRequest = <T>(url: string, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, { headers });

export const postUnAuthRequest = <T>(url: string, data: any, headers: any = {}): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data, { headers });