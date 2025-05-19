import React, { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { canastaAtom, limpiarCanasta } from '@/store/pedido';
import { Ionicons } from '@expo/vector-icons';
import EditarItemModal from './EditarItemModal';
import { Link, useRouter } from 'expo-router';
import { userAtom } from '@/store/auth';
import { orderService } from '@/services/orderService';
import Txt from '@/components/Txt';

const Canasta = () => {
  const [canasta, setCanasta] = useAtom(canastaAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState('1');
  const [notas, setNotas] = useState('');

  // Abrir modal para editar producto
  const editarProducto = (index: number) => {
    if (!canasta) return;
    setEditIndex(index);
    const item = canasta.items[index];
    setCantidad(item.quantity.toString());
    setNotas(item.notes || '');
    setModalVisible(true);
  };

  // Guardar cambios de edición
  const handleEditarProducto = () => {
    if (!canasta || editIndex === null) return;
    const nuevosItems = canasta.items.map((item, idx) =>
      idx === editIndex
        ? { ...item, quantity: parseInt(cantidad) || 1, notes: notas }
        : item
    );
    setCanasta({ ...canasta, items: nuevosItems });
    setModalVisible(false);
    setEditIndex(null);
  };

  // Eliminar producto
  const eliminarProducto = (index: number) => {
    if (!canasta) return;
    const nuevosItems = canasta.items.filter((_, i) => i !== index);
    setCanasta({ ...canasta, items: nuevosItems });
  };

  const enviarPedido = async () => {
    if (!canasta) return;

    const response = await orderService.updateOrder(canasta.tableId, canasta.items);
    const canastaVacia = limpiarCanasta(canasta);
    setCanasta(canastaVacia);
    console.log(response);
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      {/* Info de pedido */}
      <View className="flex-row gap-3 mb-6">
        <Pressable
          className="bg-green-200 px-4 py-2 rounded-lg"
          onPress={() => router.navigate('../Mesas')}
        >
          <Txt className="text-green-900 font-semibold">Mesa: {canasta?.tableId ?? '-'}</Txt>
        </Pressable>
        <View className="bg-blue-200 px-4 py-2 rounded-lg">
          <Txt className="text-blue-900 font-semibold">
            Mesero: {user?.name ?? canasta?.waiterId ?? '-'}
          </Txt>
        </View>
      </View>
      {/* Lista de productos o mensaje vacío */}
      {canasta?.items && canasta.items.length > 0 ? (
        <>
          <ScrollView>
            {canasta.items.map((item, idx) => (
              <View key={idx} className="bg-white rounded-2xl p-4 mb-4 flex-row items-center">
                <Txt className="text-2xl font-bold mr-2">x{item.quantity}</Txt>
                <View className="flex-1">
                  <Txt className="text-lg font-semibold">{item.name}</Txt>
                  <View className="flex-row items-center mt-1">
                    <Txt className="bg-gray-200 text-gray-500 rounded-xl px-3 py-1 text-base mr-2">
                      Nota: {item.notes ? item.notes : 'Añadir nota'}
                    </Txt>
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
          <Pressable className="bg-green-700 rounded-xl py-3 mt-4 items-center" onPress={enviarPedido}>
            <Txt className="text-white text-lg font-semibold">Enviar Pedido</Txt>
          </Pressable>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Txt className="text-gray-500 text-lg font-semibold">No hay productos en el pedido</Txt>
          <Link href="/Products" asChild>
            <Txt className="text-blue-500 text-lg font-semibold">Agregar productos</Txt>
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
