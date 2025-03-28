import api from './api';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface OrderData {
  tableId: string;
  items: OrderItem[];
}

/**
 * Servicio para operaciones relacionadas con pedidos y mesas
 */
const orderService = {
  /**
   * Obtener todos los pedidos
   */
  getOrders: (page = 1, limit = 20, status?: string) => {
    return api.get('/orders', { 
      params: { page, limit, status } 
    });
  },

  /**
   * Obtener un pedido por ID
   */
  getOrderById: (id: string) => {
    return api.get(`/orders/${id}`);
  },

  /**
   * Crear un nuevo pedido
   */
  createOrder: (orderData: OrderData) => {
    return api.post('/orders', orderData);
  },

  /**
   * Actualizar estado de un pedido
   */
  updateOrderStatus: (id: string, status: string) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  /**
   * Agregar artículos a un pedido existente
   */
  addItemsToOrder: (orderId: string, items: OrderItem[]) => {
    return api.post(`/orders/${orderId}/items`, { items });
  },

  /**
   * Obtener mesas disponibles
   */
  getTables: () => {
    return api.get('/tables');
  },

  /**
   * Actualizar estado de una mesa
   */
  updateTableStatus: (tableId: string, status: 'available' | 'occupied' | 'reserved') => {
    return api.put(`/tables/${tableId}/status`, { status });
  },

  /**
   * Obtener pedidos pendientes
   */
  getPendingOrders: () => {
    return api.get('/orders/pending');
  },

  /**
   * Obtener mesas activas
   */
  getActiveTables: () => {
    return api.get('/tables/active');
  },

  /**
   * Obtener pedidos de un usuario
   */
  getUserOrders: (userId: string) => {
    return api.get(`/users/${userId}/orders`);
  },

  /**
   * Obtener pedidos actuales de un usuario
   */
  getCurrentUserOrders: () => {
    return api.get('/orders/my-orders');
  }
};

export default orderService;
