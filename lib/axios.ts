import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//     baseURL: 'http://192.168.20.56:3001/api',

const axiosClient = axios.create({
    baseURL: 'http://192.168.20.56:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const cleanToken = token.replace(/^"|"$/g, '');
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${cleanToken}`;
            }
            return config;
        } catch (error) {
            console.error('Error al obtener el token:', error);
            return config;
        }
    },
    (error) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            console.error('Error de conectividad:', error.message);
            return Promise.reject(new Error('No se puede conectar con el servidor'));
        }

        if (error.response.status === 401) {
            try {
                AsyncStorage.removeItem('token');
            } catch (e) {
                console.error('Error al eliminar el token:', e);
            }
        }

        console.error('Error en la respuesta:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient; 