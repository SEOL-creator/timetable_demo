import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
});

export default axiosInstance;
