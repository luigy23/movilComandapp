import React from 'react';
import { Text, TextInput, Pressable, Modal, View } from 'react-native';

interface ModalAgregarProductoProps {
  visible: boolean;
  productoSeleccionado: any;
  cantidad: string;
  notas: string;
  setCantidad: (val: string) => void;
  setNotas: (val: string) => void;
  onAgregar: () => void;
  onClose: () => void;
}

const ModalAgregarProducto: React.FC<ModalAgregarProductoProps> = ({
  visible,
  productoSeleccionado,
  cantidad,
  notas,
  setCantidad,
  setNotas,
  onAgregar,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <Pressable
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          onPress={onClose}
        />
        <View style={{ backgroundColor: 'white', borderRadius: 24, padding: 24, width: '90%', maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 }}>
          {productoSeleccionado && (
            <>
              <Text className="text-xl font-bold mb-2 text-gray-800">{productoSeleccionado.name}</Text>
              <Text className="text-lg text-gray-600 mb-1">ID: {productoSeleccionado.id}</Text>
              <Text className="text-lg font-semibold text-blue-600 mb-4">${productoSeleccionado.price}</Text>
              <Text className="text-sm text-gray-500 mb-1">Cantidad</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
                placeholder="Cantidad"
              />
              <Text className="text-sm text-gray-500 mb-1">Notas</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base min-h-[60px]"
                value={notas}
                onChangeText={setNotas}
                placeholder="Notas para la cocina (opcional)"
                multiline
              />
              <Pressable
                className="bg-green-500 rounded-lg py-3 items-center mb-2"
                onPress={onAgregar}
                android_ripple={{ color: '#059669' }}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text className="text-white font-bold text-base">Añadir al pedido</Text>
              </Pressable>
              <Pressable
                className="py-2 items-center bg-red-200 rounded-lg"
                onPress={onClose}
                android_ripple={{ color: '#fecaca' }}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text className="text-red-500">Cancelar</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalAgregarProducto; 