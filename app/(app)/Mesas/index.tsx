import ItemMesa from '@/components/Mesas/ItemMesa';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, FlatList, useWindowDimensions } from 'react-native';
import { tablesService, Table, TableCategory, tableCategoriesService } from '@/services/tableService';
import { Ionicons } from '@expo/vector-icons';
import { pedidoAtom } from '@/store/pedido';
import { useAtom } from 'jotai';

// Función para normalizar texto (eliminar tildes)
const normalizarTexto = (texto: string): string => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export default function Mesas() {
    const [pedido, setPedido] = useAtom(pedidoAtom);

    const [mesas, setMesas] = useState<Table[]>([]);
    const [categorias, setCategorias] = useState<TableCategory[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');

    const { width } = useWindowDimensions();
    const numColumns = width > 900 ? 4 : width > 600 ? 3 : 2;

    useEffect(() => {
        tablesService.getTables().then((mesas) => {
            setMesas(mesas);
        });
        tableCategoriesService.getCategories().then((categorias) => {
            setCategorias(categorias);
        });

    }, [pedido]);

    // Función para filtrar las mesas
    const mesasFiltradas = mesas.filter((mesa) => {
        const terminoBusqueda = normalizarTexto(busqueda);
        const coincideConBusqueda = 
            normalizarTexto(mesa.number).includes(terminoBusqueda) ||
            normalizarTexto(mesa.description).includes(terminoBusqueda) ||
            (mesa.category?.name && normalizarTexto(mesa.category.name).includes(terminoBusqueda));
        
        const coincideConCategoria = categoriaSeleccionada === 'Todas' || 
                                   mesa.category?.name === categoriaSeleccionada;

        return coincideConBusqueda && coincideConCategoria;
    });

    return (
        <View className="flex-1 bg-gray-100">




            {/* Contenido principal */}
            <View className="p-4">
                {/* Barra de búsqueda */}
                <View className="bg-white rounded-lg shadow-sm mb-4">
                    <View className="flex-row items-center px-4 py-2">
                        <TextInput 
                            placeholder="Buscar mesa" 
                            className="flex-1 text-gray-800" 
                            value={busqueda}
                            onChangeText={setBusqueda}
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
                        onPress={() => setCategoriaSeleccionada('Todas')}
                        className={`px-2 py-1 rounded-full text-sm mr-2 ${
                            categoriaSeleccionada === 'Todas' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                        <Text>Todas</Text>
                    </Pressable>
                    {categorias.map((categoria) => (
                        <Pressable 
                            key={categoria.id}
                            onPress={() => setCategoriaSeleccionada(categoria.name)}
                            className={`px-2 py-1 rounded-full text-sm mr-2 ${
                                categoriaSeleccionada === categoria.name 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                            <Text>{categoria.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Grid de mesas */}
                <FlatList
                    data={mesasFiltradas}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={numColumns}
                    columnWrapperStyle={{ gap: 8 }}
                    contentContainerStyle={{ gap: 8 }}
                    renderItem={({ item }) => (
                        <ItemMesa
                            id={item.id}
                            nombre={item.number}
                            descripcion={item.description}
                            capacidad={item.capacity}
                            categoria={item.category?.name}
                            estado={item.status}
                        />
                    )}
                />
            </View>
        </View>
    );
}
