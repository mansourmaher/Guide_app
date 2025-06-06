import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:4000",
});



AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            const accessToken = JSON.parse(token);
             if (accessToken) {
            if (config.headers) config.headers.token = accessToken;
            

        }
    }
    return config;

    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);
export default AxiosInstance;