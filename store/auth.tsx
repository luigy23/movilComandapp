import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import * as jwtDecode from 'jwt-decode';
import { authService } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenPayload {
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

// Átomo para el token JWT
export const tokenAtom = atomWithStorage<string | null>('token', null, {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log("[tokenAtom] getItem:", value);
      return value || null;
    } catch (error) {
      console.error("[tokenAtom] Error getting item:", error);
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      console.log("[tokenAtom] setItem:", value);
      if (value) {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("[tokenAtom] Error setting item:", error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("[tokenAtom] Error removing item:", error);
    }
  },
});

// Átomo para el usuario decodificado
export const userAtom = atom(
  async (get) => {
    const token = await get(tokenAtom);
    if (!token) return null;
    try {
      return jwtDecode.jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }
);

// Átomo para el estado de autenticación
export const isAuthenticatedAtom = atom(
  async (get) => {
    const token = await get(tokenAtom);
    console.log("[isAuthenticatedAtom] token:", token);
    if (!token) return false;
    try {
      const decoded = jwtDecode.jwtDecode<TokenPayload>(token);
      const isValid = decoded.exp ? decoded.exp * 1000 > Date.now() : true;
      console.log("[isAuthenticatedAtom] isValid:", isValid);
      return isValid;
    } catch {
      return false;
    }
  }
);

// Átomos derivados para las acciones de autenticación
export const authActionsAtom = atom(
  null,
  async (get, set, { type, payload }) => {
    switch (type) {
      case 'LOGIN':
        console.log("[authActionsAtom] login:", payload);
        try {
          const data = await authService.login(payload);
          console.log("[authActionsAtom] setting token:", data.token);
          set(tokenAtom, data.token);
          return true;
        } catch (error) {
          console.error('Error en login:', error);
          return false;
        }

      case 'REGISTER':
        try {
          const data = await authService.register(payload);
          set(tokenAtom, data.token);
          return true;
        } catch (error) {
          console.error('Error en registro:', error);
          return false;
        }

      case 'LOGOUT':
        set(tokenAtom, null);
        return true;

      default:
        throw new Error('Acción no soportada');
    }
  }
); 