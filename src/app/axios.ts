import axios, { InternalAxiosRequestConfig } from "axios"
import { APP_CONFIG } from "~/app/appConfig.ts"

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
	baseURL: APP_CONFIG.apiBaseUrl,
})

function requestInterceptor(req: InternalAxiosRequestConfig) {
	return req
}

axiosInstance.interceptors.request.use(requestInterceptor)

export default axiosInstance
