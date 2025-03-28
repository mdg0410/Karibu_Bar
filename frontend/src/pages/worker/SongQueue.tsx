import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { songService } from '@/services';

interface SongRequest {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
  table: number;
  requestTime: string;
  status: 'pending' | 'playing' | 'completed' | 'cancelled';
}

const WorkerSongQueue: React.FC = () => {
  const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<SongRequest | null>(null);

  useEffect(() => {
    const fetchSongQueue = async () => {
      try {
        setLoading(true);
        // En lugar de una llamada al API, usamos datos de prueba por ahora
        setTimeout(() => {
          const mockRequests = [
            {
              id: '1',
              title: 'Bohemian Rhapsody',
              artist: 'Queen',
              requestedBy: 'Juan Pérez',
              table: 3,
              requestTime: new Date(Date.now() - 15 * 60000).toISOString(),
              status: 'playing' as const
            },
            {
              id: '2',
              title: 'Despacito',
              artist: 'Luis Fonsi ft. Daddy Yankee',
              requestedBy: 'María López',
              table: 5,
              requestTime: new Date(Date.now() - 10 * 60000).toISOString(),
              status: 'pending' as const
            },
            {
              id: '3',
              title: 'Sweet Child O\' Mine',
              artist: 'Guns N\' Roses',
              requestedBy: 'Carlos Rodríguez',
              table: 8,
              requestTime: new Date(Date.now() - 5 * 60000).toISOString(),
              status: 'pending' as const
            },
            {
              id: '4',
              title: 'Shape of You',
              artist: 'Ed Sheeran',
              requestedBy: 'Ana Martínez',
              table: 2,
              requestTime: new Date().toISOString(),
              status: 'pending' as const
            }
          ];
          
          setSongRequests(mockRequests.filter(r => r.status !== 'playing'));
          setCurrentSong(mockRequests.find(r => r.status === 'playing') || null);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar cola de canciones:', error);
        setLoading(false);
      }
    };

    fetchSongQueue();
  }, []);

  const handleStartSong = (songId: string) => {
    if (currentSong) {
      // Si hay una canción actual, la marcamos como completada
      setCurrentSong(null);
      setSongRequests(prevRequests => [
        ...prevRequests,
        { ...currentSong, status: 'completed' as const }
      ]);
    }

    // Establecemos la nueva canción actual
    const newCurrentSong = songRequests.find(song => song.id === songId);
    if (newCurrentSong) {
      setCurrentSong({ ...newCurrentSong, status: 'playing' as const });
      setSongRequests(prevRequests => 
        prevRequests.filter(song => song.id !== songId)
      );
    }
  };

  const handleCompleteSong = () => {
    if (currentSong) {
      setCurrentSong(null);
    }
  };

  const handleCancelRequest = (songId: string) => {
    setSongRequests(prevRequests => 
      prevRequests.filter(song => song.id !== songId)
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cola de Canciones</h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-bold mb-4">Próximas Canciones</h2>
                
                {songRequests.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-2">No hay canciones en la cola</p>
                    <p className="text-sm text-gray-400">Las solicitudes de canciones aparecerán aquí</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {songRequests.map((song, index) => (
                      <div key={song.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold">{song.title}</h3>
                            <p className="text-gray-600">{song.artist}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span>Mesa {song.table} • </span>
                              <span className="ml-1">{song.requestedBy} • </span>
                              <span className="ml-1">{new Date(song.requestTime).toLocaleTimeString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleStartSong(song.id)}
                              disabled={!!currentSong}
                            >
                              Comenzar
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelRequest(song.id)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            
            <div>
              <Card>
                <h2 className="text-xl font-bold mb-4">Reproduciendo Ahora</h2>
                
                {currentSong ? (
                  <div className="border-2 border-primary rounded-lg p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-3xl">
                        🎤
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">{currentSong.title}</h3>
                    <p className="text-gray-600 text-center mb-4">{currentSong.artist}</p>
                    
                    <div className="bg-gray-100 rounded-full h-2 mb-4">
                      <div className="bg-primary h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500 mb-6">
                      <span>Solicitada por: {currentSong.requestedBy}</span>
                      <p>Mesa: {currentSong.table}</p>
                    </div>
                    
                    <Button
                      fullWidth
                      onClick={handleCompleteSong}
                    >
                      Finalizar Canción
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No hay canciones reproduciéndose</p>
                    <p className="text-sm text-gray-400 mt-2">Selecciona "Comenzar" en una canción de la cola</p>
                  </div>
                )}
              </Card>
              
              <Card className="mt-6">
                <h2 className="text-xl font-bold mb-4">Canciones Populares</h2>
                
                <ul className="divide-y">
                  <li className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Despacito</h3>
                        <p className="text-sm text-gray-500">Luis Fonsi ft. Daddy Yankee</p>
                      </div>
                      <span className="text-gray-500 text-sm">32</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Bohemian Rhapsody</h3>
                        <p className="text-sm text-gray-500">Queen</p>
                      </div>
                      <span className="text-gray-500 text-sm">28</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Bailando</h3>
                        <p className="text-sm text-gray-500">Enrique Iglesias</p>
                      </div>
                      <span className="text-gray-500 text-sm">25</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WorkerSongQueue;
