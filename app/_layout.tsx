import 'react-native-reanimated';
import '../global.css';
import { Slot } from 'expo-router';
import { Provider } from 'jotai'; // Asegúrate que esté importado
import { store } from '../contexts/store'; // Importa tu store
import { Text } from 'react-native';
export default function RootLayout() {
  // Solo configura el Provider y renderiza el Slot.
  // Expo Router manejará qué pantalla mostrar basado en la URL.
  return (
    <Provider store={store}>

      <Slot />
    </Provider>
  );
}