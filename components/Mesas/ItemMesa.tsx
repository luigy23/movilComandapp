import { View, Text, Pressable, Alert } from 'react-native';

interface ItemMesaProps {
    id: number;
    nombre: string;
    descripcion: string;
    capacidad?: number;
    categoria?: string;
    estado?: string;
}



  // enum TableStatus {
  //   AVAILABLE     // Disponible
  //   OCCUPIED      // Ocupada
  //   BILL_PENDING  // Ocupada, esperando pago
  //   DISABLED      // Deshabilitada (fuera de servicio)
  // }

export default function ItemMesa({ id, nombre, descripcion, capacidad, categoria, estado }: ItemMesaProps) {
    const handlePress = () => {
        Alert.alert(
            "los datos de la mesa",
            `La mesa es: ${nombre}
            la descripcion es: ${descripcion}
            la capacidad es: ${capacidad}
            la categoria es: ${categoria}
            el estado es: ${estado}`
        );
    };

    const obtenerEstado = () => {
        if (estado === "AVAILABLE") {
            return "bg-green-200 text-green-700"
        }
        if (estado === "OCCUPIED") {
            return "bg-red-200 text-red-700"
        }
        if (estado === "BILL_PENDING") {
            return "bg-yellow-200 text-yellow-700"
        }
        if (estado === "DISABLED") {
            return "bg-gray-200 text-gray-700"
        }
    }

    const obtenerNombreEstado = () => {
        if (estado === "AVAILABLE") {
            return "Disponible"
        }
        if (estado === "OCCUPIED") {
            return "Ocupada"
        }
        if (estado === "BILL_PENDING") {
            return "Esperando Pago"
        }
        if (estado === "DISABLED") {
            return "Fuera de Servicio"
        }
        return "Desconocido"
    }



    return (
        <Pressable 
            onPress={handlePress}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-4 active:bg-gray-50"
        >
            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-xl font-semibold">Mesa {nombre}</Text>
                    {estado && (
                        <Text className={`ml-4 px-2 py-1 rounded-full text-sm ${obtenerEstado()}`}>
                            {obtenerNombreEstado()}
                        </Text>
                    )}
                </View>
                <Text className="text-gray-600 mb-2">{descripcion}</Text>
                {capacidad && (
                    <View className="mb-2">
                        <Text className="text-sm text-gray-500">
                            Capacidad: {capacidad} personas
                        </Text>
                    </View>
                )}
                {categoria && (
                    <View className="mb-2">
                        <Text className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {categoria}
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}
