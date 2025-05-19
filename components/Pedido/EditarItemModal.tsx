import React from 'react';
import { Modal, View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface EditarItemModalProps {
  visible: boolean;
  cantidad: string;
  notas: string;
  setCantidad: (val: string) => void;
  setNotas: (val: string) => void;
  onGuardar: () => void;
  onClose: () => void;
}

const EditarItemModal: React.FC<EditarItemModalProps> = ({
  visible,
  cantidad,
  notas,
  setCantidad,
  setNotas,
  onGuardar,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.25)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            onPress={onClose}
          />
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 24,
            width: '90%',
            maxWidth: 350,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 4 }
          }}>
            <Text className="text-xl font-bold mb-4 text-gray-800">Editar producto</Text>
            <Text className="text-base text-gray-600 mb-1">Cantidad</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="Cantidad"
              autoFocus
            />
            <Text className="text-base text-gray-600 mb-1">Notas</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base min-h-[48px]"
              value={notas}
              onChangeText={setNotas}
              placeholder="Notas para la cocina (opcional)"
              multiline
            />
            <View className="flex-row justify-end gap-2">
              <Pressable
                className="px-4 py-2 rounded-lg bg-gray-200"
                onPress={onClose}
              >
                <Text className="text-gray-700">Cancelar</Text>
              </Pressable>
              <Pressable
                className="px-4 py-2 rounded-lg bg-green-600"
                onPress={onGuardar}
              >
                <Text className="text-white font-semibold">Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditarItemModal; 