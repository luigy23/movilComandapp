import 'react-native-reanimated';
import '../global.css';
import { Slot } from 'expo-router';
import { Provider } from 'jotai'; // Asegúrate que esté importado
import { store } from '../contexts/store'; // Importa tu store
import { Text, View, ActivityIndicator } from 'react-native';
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Solo configura el Provider y renderiza el Slot.
  // Expo Router manejará qué pantalla mostrar basado en la URL.
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}