import { atom, useAtom } from 'jotai';
import { Pedido, ItemPedido } from '@/services/orderService';

// {
//     "tableId": 1,
//     "waiterId": 1,
//     "items": [
//         {
//             "quantity": 2,
//             "unitPrice": 15.99,
//             "notes": "Sin cebolla",
//             "productId": 1
//         },
//         {
//             "quantity": 1,
//             "unitPrice": 8.50,
//             "notes": "Extra picante",
//             "productId": 2
//         }
//     ]
// }

interface Canasta {
    items: ItemPedido[];
    total: number;
}


export const canastaAtom = atom<Canasta | null>(null);



export const pedidoAtom = atom<Pedido | null>(null);

// Función para inicializar un pedido
export const inicializarPedido = (tableId: number, waiterId: number) => {
    return {
        tableId,
        waiterId,
        items: [],
        status: 'OPEN',
        total: 0
    };
};

// Función para añadir un item al pedido
export const añadirItem = (pedido: Pedido, item: ItemPedido): Pedido => {
    return {
        ...pedido,
        items: [...pedido.items, item]
    };
};

// Función para actualizar la mesa
export const actualizarMesa = (pedido: Pedido, tableId: number): Pedido => {
    return {
        ...pedido,
        tableId
    };
};

// Función para actualizar el mesero
export const actualizarMesero = (pedido: Pedido, waiterId: number): Pedido => {
    return {
        ...pedido,
        waiterId
    };
};






