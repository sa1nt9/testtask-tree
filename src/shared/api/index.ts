import axios from 'axios';
import { toast } from 'react-toastify';

const $api = axios.create({
    baseURL: `https://${import.meta.env.VITE_BACKEND_DOMEN}`
})


$api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error.message === 'timeout of 20000ms exceeded') {
        toast.error('Check your internet connection')
        throw error
    }
    // if (String(error.response?.status).slice(0, 1) == '5') {
    //     toast.error('Произошла ошибка при получении данных, попробуйте позже')
    // }
    else if (error.response?.status == 429) {
        toast.error("You are sending too many requests!")
    }
    throw error
})

export default $api;