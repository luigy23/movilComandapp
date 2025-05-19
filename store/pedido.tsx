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
    tableId: number;
    waiterId: number;

    items: ItemPedido[];
    total: number;
}


export const canastaAtom = atom<Canasta | null>(null);
export const canastasPorMesaAtom = atom<{ [tableId: number]: Canasta }>({});



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

export const inicializarCanasta = (tableId: number, waiterId: number) => {
    return {
        tableId,
        waiterId,
        items: [],
        total: 0
    };
};

// Función para añadir un item a la canasta
export const añadirItemCanasta = (canasta: Canasta, item: ItemPedido): Canasta => {
  // Calcular el subtotal del item
  const subtotal = item.quantity * item.unitPrice;
  
  // Crear una nueva canasta con el item añadido y actualizar el total
  return {
    ...canasta,
    items: [...canasta.items, item],
    total: canasta.total + subtotal
  };
};

//limpiar canasta
export const limpiarCanasta = (canasta: Canasta) => {
        
    const canastaVacia: Canasta = {
        tableId: canasta.tableId,
        waiterId: canasta.waiterId,
        items: [],
        total: 0
    }
    return canastaVacia;
};
// Función para actualizar canastas por mesa
export const actualizarCanastasPorMesa = (
  canastasPorMesa: { [tableId: number]: Canasta },
  tableId: number,
  canasta: Canasta
): { [tableId: number]: Canasta } => {
  return {
    ...canastasPorMesa,
    [tableId]: canasta
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






