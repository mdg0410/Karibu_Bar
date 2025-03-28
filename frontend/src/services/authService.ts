import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  username: string;
  email: string;
  password: string;
  numeroTelefono?: string;
  direccion?: string;
}

export interface ProfileUpdateData {
  nombre?: string;
  username?: string;
  email?: string;
  numeroTelefono?: string;
  direccion?: string;
}

/**
 * Servicio para operaciones de autenticación
 */
const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  login: (credentials: LoginCredentials) => {
    return api.post('/auth/login', credentials);
  },

  /**
   * Registrar un nuevo usuario
   */
  register: (userData: RegisterData) => {
    return api.post('/auth/register', userData);
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },

  /**
   * Obtener datos del usuario actual
   */
  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  /**
   * Actualizar perfil de usuario
   */
  updateProfile: (profileData: ProfileUpdateData) => {
    return api.put('/auth/profile', profileData);
  },

  /**
   * Cambiar contraseña
   */
  changePassword: (data: { currentPassword: string; newPassword: string }) => {
    return api.put('/auth/password', data);
  },

  /**
   * Solicitar recuperación de contraseña
   */
  requestPasswordReset: (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },

  /**
   * Restablecer contraseña con token
   */
  resetPassword: (data: { token: string; password: string }) => {
    return api.post('/auth/reset-password', data);
  }
};

export default authService;
