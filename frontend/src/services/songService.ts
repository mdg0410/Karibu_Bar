import api from './api';

interface SongSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  language?: string;
}

const songService = {
  /**
   * Obtener lista de canciones paginada
   */
  getSongs: (page = 1, limit = 20, searchParams?: SongSearchParams) => {
    return api.get('/songs', { 
      params: { 
        page, 
        limit,
        ...searchParams
      } 
    });
  },

  /**
   * Obtener una canción por ID
   */
  getSongById: (id: string) => {
    return api.get(`/songs/${id}`);
  },

  /**
   * Solicitar una canción
   */
  requestSong: (songId: string, tableId: string) => {
    return api.post('/song-requests', { songId, tableId });
  },

  /**
   * Obtener canciones más recientes
   */
  getRecentSongs: (limit = 5) => {
    return api.get('/songs/recent', { params: { limit } });
  },

  /**
   * Obtener canciones más populares
   */
  getPopularSongs: (limit = 10) => {
    return api.get('/songs/popular', { params: { limit } });
  },

  /**
   * Obtener géneros disponibles
   */
  getGenres: () => {
    return api.get('/songs/genres');
  },

  /**
   * Obtener idiomas disponibles
   */
  getLanguages: () => {
    return api.get('/songs/languages');
  },

  /**
   * Buscar canciones
   */
  searchSongs: (query: string, page = 1, limit = 20) => {
    return api.get('/songs/search', { 
      params: { query, page, limit } 
    });
  },

  /**
   * Obtener cola de canciones solicitadas
   */
  getSongQueue: () => {
    return api.get('/song-requests/queue');
  },

  /**
   * Actualizar estado de una solicitud de canción
   */
  updateSongRequestStatus: (requestId: string, status: 'pending' | 'playing' | 'completed' | 'cancelled') => {
    return api.put(`/song-requests/${requestId}/status`, { status });
  }
};

export default songService;
