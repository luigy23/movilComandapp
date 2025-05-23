import { View, Pressable, Alert, Platform } from 'react-native';
import { useAtom } from 'jotai';
import { pedidoAtom, inicializarPedido, actualizarMesa, canastaAtom } from '@/store/pedido';
import { userAtom } from '@/store/auth';
import { orderService } from '@/services/orderService';
import {  useRouter } from 'expo-router';
import Txt from '@/components/Txt';

interface ItemMesaProps {
    id: number;
    nombre: string;
    descripcion: string;
    capacidad?: number;
    categoria?: string;
    estado?: string;
}





export default function ItemMesa({ id, nombre, descripcion, capacidad, categoria, estado }: ItemMesaProps) {
    const [pedido, setPedido] = useAtom(pedidoAtom);
    const [canasta, setCanasta] = useAtom(canastaAtom);
    const [user] = useAtom(userAtom);
    const router = useRouter();


    const handlePress = async () => {
         
            const pedido = { //pedido inicial
                tableId: id,
                waiterId: user?.id || 0,
                items: [],
                status: 'OPEN',
                total: 0
            }

            const currentOrder = await orderService.getCurrentOrder(id);
            if (currentOrder) {    //si existe un pedido actual, se actualiza
                setPedido(currentOrder);
            } else {
                const response = await orderService.createOrder(pedido); //si no existe, se crea
                console.log(response);
                setPedido(response);
            }

            const canasta = {
                tableId: id,
                waiterId: user?.id || 0,
                items: [],
                total: 0
            }

            setCanasta(canasta);
            
           
    
        router.navigate('../Products')
        
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
                    <Txt className="text-xl font-semibold">Mesa {nombre}</Txt>
                    {estado && (
                        <Txt className={`ml-4 px-2 py-1 rounded-full text-sm ${obtenerEstado()}`}>
                            {obtenerNombreEstado()}
                        </Txt>
                    )}
                </View>
                <Txt className="text-gray-600 mb-2">{descripcion}</Txt>
                {capacidad && (
                    <View className="mb-2">
                        <Txt className="text-sm text-gray-500">
                            Capacidad: {capacidad} personas
                        </Txt>
                    </View>
                )}
                {categoria && (
                    <View className="mb-2">
                        <Txt className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {categoria}
                        </Txt>
                    </View>
                )}
            </View>
        </Pressable>
    );
}
