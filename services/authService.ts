

import axiosClient from '@/lib/axios';

export interface Credentials {
    email: string;
    password: string;
}

export interface UserData {
    email: string;
    password: string;
    name?: string;
    id?: number;
    role?: {
        name: string;
        id: number;
    };
    roleId?: number;
}


export const authService = {
    
  async login(credentials: Credentials) {
    console.log("[authService] login:", credentials);
    try {
      const { data } = await axiosClient.post('/auth/login', credentials);
      console.log("[authService] login:", data);
      return data;
    } catch (error: any) {
      console.error('Error en el servicio de login:', error);
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  },

  async register(userData: UserData) {
    try {
      const { data } = await axiosClient.post('/auth/register', userData);
      return data;
    } catch (error: any) {
      console.error('Error en el servicio de registro:', error);
      throw new Error(error.response?.data?.error || 'Error al registrar usuario');
    }
  },
}; 