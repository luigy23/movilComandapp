import { Stack, Slot } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuthenticatedAtom } from '@/store/auth';

export default function ProtectedLayout() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        
        if (!isAuthenticated && !token) {
          router.replace('/login');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return null; // O un componente de carga
  }

  return (
      <Slot />
  );
}
