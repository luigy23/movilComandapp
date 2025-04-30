import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { jwtDecode } from 'jwt-decode';

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
    
    const exp = userInfo.exp;
    if (exp) {
        const now = Math.floor(Date.now() / 1000);
        console.log('[isAuthenticatedAtom] now:', now);
        console.log('[isAuthenticatedAtom] exp:', exp);
        console.log('[isAuthenticatedAtom] now < exp:', now < exp);
        return now < exp;
    }
    
    return true;
});










