import axiosClient from '@/lib/axios';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { jwtDecode } from 'jwt-decode';
import { authService, Credentials, UserData } from '@/services/authService';

export interface TokenPayload {
    id?: number;
    name?: string;
    email?: string;
    role?: {
        name: string;
        id: number;
    };
    roleId?: number;
    exp?: number;
    iat?: number;
    [key: string]: any;
}


// Átomo para el token
export const tokenAtom = atomWithStorage<string | null>('token', null);

// Átomo derivado para la información del usuario
export const userInfoAtom = atom<TokenPayload | null>((get) => {
    const token = get(tokenAtom);
    if (!token) return null;
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
});

// Átomo derivado para verificar si el usuario está autenticado
export const isAuthenticatedAtom = atom((get) => {
    const userInfo = get(userInfoAtom);
    if (!userInfo) return false;
    
    // Verificar si el token ha expirado
    const exp = userInfo.exp;
    if (exp) {
        const now = Math.floor(Date.now() / 1000);
        return now < exp;
    }
    
    return true;
}); 


export const useAuthService = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const login = async (credentials: Credentials) => {
        try {
            const response = await authService.login(credentials)
            setToken(response.data.token)
        } catch (error) {
            throw error
        }
    }

    const register = async (userData: UserData) => {
        try {
            const response = await authService.register(userData)   
            return response.data
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        setToken(null)
    }

    return { login, register, logout }
}           



