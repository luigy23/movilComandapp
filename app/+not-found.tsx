import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import Txt from '@/components/Txt';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Txt style={styles.title}>Esta pantalla no existe.</Txt>

        <Link href="/login" style={styles.link}>
          <Txt style={styles.linkText}>Ir a la pantalla de inicio</Txt>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
