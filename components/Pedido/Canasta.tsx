import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { pedidoAtom } from '@/store/pedido';
import { Ionicons } from '@expo/vector-icons';
import EditarItemModal from './EditarItemModal';
import { Link, useRouter } from 'expo-router';
import { userAtom } from '@/store/auth';

const Canasta = () => {
  const [pedido, setPedido] = useAtom(pedidoAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState('1');
  const [notas, setNotas] = useState('');

  // Abrir modal para editar producto
  const editarProducto = (index: number) => {
    if (!pedido) return;
    setEditIndex(index);
    const item = pedido.items[index];
    setCantidad(item.quantity.toString());
    setNotas(item.notes || '');
    setModalVisible(true);
  };

  // Guardar cambios de edición
  const handleEditarProducto = () => {
    if (!pedido || editIndex === null) return;
    const nuevosItems = pedido.items.map((item, idx) =>
      idx === editIndex
        ? { ...item, quantity: parseInt(cantidad) || 1, notes: notas }
        : item
    );
    setPedido({ ...pedido, items: nuevosItems });
    setModalVisible(false);
    setEditIndex(null);
  };

  // Eliminar producto
  const eliminarProducto = (index: number) => {
    if (!pedido) return;
    const nuevosItems = pedido.items.filter((_, i) => i !== index);
    setPedido({ ...pedido, items: nuevosItems });
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      {/* Info de pedido */}
      <View className="flex-row gap-3 mb-6">
        <Pressable
          className="bg-green-200 px-4 py-2 rounded-lg"
          onPress={() => router.navigate('../Mesas')}
        >
          <Text className="text-green-900 font-semibold">Mesa: {pedido?.tableId ?? '-'}</Text>
        </Pressable>
        <View className="bg-blue-200 px-4 py-2 rounded-lg">
          <Text className="text-blue-900 font-semibold">
            Mesero: {user?.name ?? pedido?.waiterId ?? '-'}
          </Text>
        </View>
      </View>
      {/* Lista de productos o mensaje vacío */}
      {pedido?.items && pedido.items.length > 0 ? (
        <>
          <ScrollView>
            {pedido.items.map((item, idx) => (
              <View key={idx} className="bg-white rounded-2xl p-4 mb-4 flex-row items-center">
                <Text className="text-2xl font-bold mr-2">x{item.quantity}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{item.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="bg-gray-200 text-gray-500 rounded-xl px-3 py-1 text-base mr-2">
                      Nota: {item.notes ? item.notes : 'Añadir nota'}
                    </Text>
                    <Pressable onPress={() => editarProducto(idx)}>
                      <Ionicons name="pencil-outline" size={20} color="#222" />
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  className="bg-red-200 rounded-full p-2 ml-2"
                  onPress={() => eliminarProducto(idx)}
                >
                  <Ionicons name="trash-outline" size={22} color="#e11d48" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
          <Pressable className="bg-green-700 rounded-xl py-3 mt-4 items-center">
            <Text className="text-white text-lg font-semibold">Enviar Pedido</Text>
          </Pressable>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg font-semibold">No hay productos en el pedido</Text>
          <Link href="/Products" asChild>
            <Text className="text-blue-500 text-lg font-semibold">Agregar productos</Text>
          </Link>
        </View>
      )}
      {/* Modal de edición */}
      <EditarItemModal
        visible={modalVisible}
        cantidad={cantidad}
        notas={notas}
        setCantidad={setCantidad}
        setNotas={setNotas}
        onGuardar={handleEditarProducto}
        onClose={() => { setModalVisible(false); setEditIndex(null); }}
      />
    </View>
  );
};

export default Canasta;
