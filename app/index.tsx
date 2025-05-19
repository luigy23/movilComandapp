import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '@/store/auth';
import { useRouter } from 'expo-router';
import Txt from '@/components/Txt';

export default function Index() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const router = useRouter();

  const handlePress = () => {
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Txt style={styles.title}>¡Bienvenido a Comandappaa!</Txt>
      <Pressable style={styles.button} onPress={handlePress}>
        <Txt style={styles.buttonText}>Ir a la aplicación</Txt>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
