import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { songService } from '@/services';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string[];
  language: string;
}

const UserSongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        // Intentamos cargar datos reales
        const response = await songService.getSongs(page);
        setSongs(response.data.songs);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error al cargar canciones:', error);
        setError('No se pudieron cargar las canciones');
        
        // Datos ficticios para desarrollo
        setSongs([
          { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', genre: ['Rock'], language: 'Inglés' },
          { id: '2', title: 'Despacito', artist: 'Luis Fonsi', genre: ['Reggaeton'], language: 'Español' },
          { id: '3', title: 'Imagine', artist: 'John Lennon', genre: ['Pop', 'Rock'], language: 'Inglés' },
          { id: '4', title: 'Vivir Mi Vida', artist: 'Marc Anthony', genre: ['Salsa'], language: 'Español' },
          { id: '5', title: 'Sweet Child O Mine', artist: 'Guns N Roses', genre: ['Rock'], language: 'Inglés' },
        ]);
        setTotalPages(3);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Canciones</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar canciones..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Todos los géneros</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="salsa">Salsa</option>
                <option value="reggaeton">Reggaeton</option>
              </select>

              <select className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Todos los idiomas</option>
                <option value="español">Español</option>
                <option value="inglés">Inglés</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => (
                <Card key={song.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-1">{song.title}</h3>
                      <p className="text-gray-600 mb-2">{song.artist}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {song.genre.map((genre, index) => (
                          <span key={index} className="text-xs bg-gray-100 rounded-full px-2 py-1">{genre}</span>
                        ))}
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">{song.language}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="primary" fullWidth>Solicitar Canción</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
                  <span>
                    Página {page} de {totalPages}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default UserSongList;
