import { useAtom, useAtomValue } from 'jotai';
import { userAtom, isAuthenticatedAtom, authActionsAtom } from '../store/auth';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [, dispatch] = useAtom(authActionsAtom);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsInitialized(true);
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    console.log("[useAuth] login:", credentials);
    return dispatch({ type: 'LOGIN', payload: credentials });
  };

  const register = async (userData: RegisterUserData) => {
    return dispatch({ type: 'REGISTER', payload: userData });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    return dispatch({ type: 'LOGOUT', payload: {} });
  };

  return {
    user,
    isAuthenticated,
    isInitialized,
    login,
    logout,
    register
  };
}; 