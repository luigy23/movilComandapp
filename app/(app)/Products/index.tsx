import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Pressable, TextInput, FlatList, useWindowDimensions, Modal } from 'react-native'
import { useAtom } from 'jotai'
import { pedidoAtom, añadirItem } from '@/store/pedido'
import { productCategoriesService, Category, Product, productsService } from '@/services/productsService'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import ItemProducto from '@/components/Productos/ItemProducto'




const Index = () => {
  const [pedido, setPedido] = useAtom(pedidoAtom)
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const { width } = useWindowDimensions();
  const numColumns = width > 300 ? 2 : 1;

  // Estado para el modal global
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Product | null>(null);
  const [cantidad, setCantidad] = useState('1');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    productCategoriesService.getCategories().then(setCategories);
    productsService.getProducts().then((products) => {
      setProducts(products as Product[]);
    });
  }, []);

  // Función para abrir el modal global
  const abrirModalProducto = (producto: Product) => {
    setProductoSeleccionado(producto);
    setCantidad('1');
    setNotas('');
    setModalVisible(true);
  };

  // Función para añadir al pedido
  const handleAgregarAlPedido = () => {
    if (!productoSeleccionado || !pedido) return;
    const item = {
      quantity: parseInt(cantidad) || 1,
      unitPrice: productoSeleccionado.price,
      notes: notas,
      productId: productoSeleccionado.id,
    };
    const nuevoPedido = añadirItem(pedido, item);
    setPedido(nuevoPedido);
    setModalVisible(false);
  };

  // Función para normalizar texto (eliminar tildes y pasar a minúsculas)
  function normalizarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // Filtrado de productos por búsqueda y categoría
  const productosFiltrados = products.filter((producto) => {
    // Filtrar por categoría
    if (selectedCategory !== null && producto.categoryId !== selectedCategory) {
      return false;
    }
    // Filtrar por búsqueda (nombre o descripción)
    if (search.trim() !== '') {
      const termino = normalizarTexto(search);
      const nombre = normalizarTexto(producto.name);
      const descripcion = normalizarTexto(producto.description || '');
      return nombre.includes(termino) || descripcion.includes(termino);
    }
    return true;
  });

  return (
    <View className="flex-1 bg-gray-100">


      <View className="p-4 mb-7 bg-white rounded-lg shadow-sm">
        <Text>{JSON.stringify(pedido)}</Text>

        {/* Barra de búsqueda */}
        <View className="bg-white rounded-lg shadow-sm mb-4">
          <View className="flex-row items-center px-4 py-2">
            <TextInput 
              placeholder="Buscar producto" 
              className="flex-1 text-gray-800" 
              value={search}  
              onChangeText={setSearch}
            />
            <Ionicons name="search" size={20} color="#9CA3AF" />
          </View>
        </View>

        {/* Categorías */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-4"
        >
          <Pressable 
            onPress={() => setSelectedCategory(null)}   
            className={`px-2 py-1 rounded-full text-sm mr-2 ${
              selectedCategory === null 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            <Text>Todas</Text>
          </Pressable>
          {categories.map((category) => (
            <Pressable 
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`px-2 py-1 rounded-full text-sm mr-2 ${
                selectedCategory === category.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              <Text>{category.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* SOLO el FlatList debe estar en flex-1 y después de la cabecera */}
      <View className="flex-1 px-4">
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          key={numColumns}
          columnWrapperStyle={numColumns > 1 ? { gap: 16 } : undefined}
          contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
          renderItem={({ item, index }) => {
            return (
              <ItemProducto product={item} index={index} onAdd={() => abrirModalProducto(item)} /> 
            );
          }}
        />
      </View>

      {/* Modal global para añadir producto al pedido */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg">
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
                  onPress={handleAgregarAlPedido}
                >
                  <Text className="text-white font-bold text-base">Añadir al pedido</Text>
                </Pressable>
                <Pressable
                  className="py-2 items-center"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-gray-500">Cancelar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Index