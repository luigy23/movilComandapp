import axiosClient from "@/lib/axios";
import { AxiosError } from "axios";

// // Rutas básicas CRUD
// router.post('/', createOrder);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

// // Rutas adicionales
// router.get('/table/:tableId', getOrdersByTable);
// router.get('/waiter/:waiterId', getOrdersByWaiter);
// router.get('/status/:status', getOrdersByStatus);
// router.put('/:orderId/items/:itemId/status', updateOrderItemStatus);
// router.get('/current/:tableId', getCurrentOrder);



const API_ROUTES = {
    ORDERS: '/orders',
    ORDER_ITEMS: '/orders/items',
    ORDER_STATUS: '/orders/status',
    ORDER_TABLE: '/orders/table',
    ORDER_WAITER: '/orders/waiter',
    ORDER_CURRENT: '/orders/current',
    ORDER_ID: '/orders',
    ORDER_ITEM_ID: '/orders/:orderId/items/:itemId',
}


export interface Pedido {
    id?: number;
    tableId: number;
    waiterId: number; //user id
    status: string;
    total: number;

    items: ItemPedido[];
}

export interface ItemPedido {
    quantity: number;
    unitPrice: number;
    notes: string;
    productId: number;
    name: string;
}


export const orderService = {
    createOrder: async (pedido: Pedido) => {
        const response = await axiosClient.post(API_ROUTES.ORDERS, pedido);
        return response.data;
    },
    getCurrentOrder: async (tableId: number) => {
        const response = await axiosClient.get(API_ROUTES.ORDER_CURRENT + `/${tableId}`);
        return response.data;
    },
    updateOrder: async (orderId: number | undefined, items: ItemPedido[]) => {
        if (!orderId) return;
        const response = await axiosClient.put(API_ROUTES.ORDER_ID + `/${orderId}`, {items: items});
        return response.data;
    }
}


