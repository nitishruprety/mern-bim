import axios from "axios"
import { fromStorage } from "../lib"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
    }
})

http.interceptors.request.use((request) => {
    const token = fromStorage('user_token')

    if(token) {
        request.headers = {
            ...request.headers,
            'Authorization': `Bearer ${token}`
        }
    }

    return request
}, (error) => Promise.reject(error))

http.interceptors.response.use(response => {
    if('success' in response.data) {
        toast.success(response.data.success)
    }

    return response
}, error => {
    if('response' in error && 'error' in error.response.data) {
        toast.error(error.response.data.error)
    }

    return Promise.reject(error)
})

export default http