import api from './api';

/**
 * Servicio para operaciones administrativas
 */
const adminService = {
  /**
   * Obtiene resumen de estadísticas para el dashboard
   */
  getDashboardSummary: () => {
    return api.get('/admin/dashboard/summary');
  },

  /**
   * Obtiene lista de usuarios con paginación
   */
  getUsers: (page = 1, limit = 20) => {
    return api.get(`/admin/users?page=${page}&limit=${limit}`);
  },

  /**
   * Crea un nuevo usuario
   */
  createUser: (userData: any) => {
    return api.post('/admin/users', userData);
  },

  /**
   * Actualiza datos de un usuario
   */
  updateUser: (id: string, userData: any) => {
    return api.put(`/admin/users/${id}`, userData);
  },

  /**
   * Elimina un usuario
   */
  deleteUser: (id: string) => {
    return api.delete(`/admin/users/${id}`);
  },

  /**
   * Gestión de canciones: obtiene lista de canciones
   */
  getSongs: (page = 1, limit = 20) => {
    return api.get(`/admin/songs?page=${page}&limit=${limit}`);
  },

  /**
   * Crea una nueva canción
   */
  createSong: (songData: any) => {
    return api.post('/admin/songs', songData);
  },

  /**
   * Actualiza una canción
   */
  updateSong: (id: string, songData: any) => {
    return api.put(`/admin/songs/${id}`, songData);
  },

  /**
   * Elimina una canción
   */
  deleteSong: (id: string) => {
    return api.delete(`/admin/songs/${id}`);
  },

  /**
   * Gestión de productos: obtiene lista de productos
   */
  getProducts: (page = 1, limit = 20) => {
    return api.get(`/admin/products?page=${page}&limit=${limit}`);
  },

  /**
   * Crea un nuevo producto
   */
  createProduct: (productData: any) => {
    return api.post('/admin/products', productData);
  },

  /**
   * Actualiza un producto
   */
  updateProduct: (id: string, productData: any) => {
    return api.put(`/admin/products/${id}`, productData);
  },

  /**
   * Elimina un producto
   */
  deleteProduct: (id: string) => {
    return api.delete(`/admin/products/${id}`);
  },

  /**
   * Obtiene reportes de ventas por período
   */
  getSalesReport: (startDate: string, endDate: string) => {
    return api.get(`/admin/reports/sales?startDate=${startDate}&endDate=${endDate}`);
  },

  /**
   * Obtiene estadísticas de canciones más solicitadas
   */
  getSongStats: (limit = 10) => {
    return api.get(`/admin/reports/songs?limit=${limit}`);
  },

  /**
   * Crear respaldo de la base de datos
   */
  createBackup: () => {
    return api.post('/admin/backup');
  },

  /**
   * Restaurar respaldo de la base de datos
   */
  restoreBackup: (backupId: string) => {
    return api.post(`/admin/backup/restore/${backupId}`);
  },

  /**
   * Obtener configuraciones del sistema
   */
  getSettings: () => {
    return api.get('/admin/settings');
  },

  /**
   * Actualizar configuraciones del sistema
   */
  updateSettings: (settings: any) => {
    return api.put('/admin/settings', settings);
  }
};

export default adminService;
