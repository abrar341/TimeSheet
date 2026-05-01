// utils/api/interceptor.ts
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import {LOGIN_ROUTE} from "@/modules/auth/constants/auth-route.constants";   // ✅ next-auth instead of getAccessToken

export const requestInterceptor = (instance: AxiosInstance) => instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // ✅ get token from next-auth session instead of localStorage
        const session = await getSession();
        if (session && config.headers) {
            config.headers.Authorization = `Bearer ${session.user.id}`;
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    },
);

export const responseInterceptor = (instance: AxiosInstance) => instance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            // ✅ Next.js router instead of React Router
            window.location.href = LOGIN_ROUTE;
        }
        return Promise.reject(error);
    },
);