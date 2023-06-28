import axios from "axios"
import { fromStorage } from "../lib"

const http = axios.create({
    baseURL: 'http://localhost:8000',
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

export default http