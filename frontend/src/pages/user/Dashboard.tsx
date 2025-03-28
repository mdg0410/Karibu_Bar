import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector } from '@/redux/store';
import songService from '@/services/songService';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const UserDashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentSongs = async () => {
      try {
        setLoading(true);
        // Esta API aún no existe, pero suponemos su estructura
        const response = await songService.getRecentSongs();
        setRecentSongs(response.data.songs.slice(0, 5));
      } catch (error) {
        console.error('Error al cargar canciones recientes', error);
        // Datos de ejemplo en caso de error
        setRecentSongs([
          { id: 1, title: 'Despacito', artist: 'Luis Fonsi' },
          { id: 2, title: 'Shape of You', artist: 'Ed Sheeran' },
          { id: 3, title: 'Bésame', artist: 'Camila' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSongs();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Bienvenido, {user?.nombre || 'Usuario'}</h1>
          <p className="text-gray-600">
            Desde tu panel de control puedes buscar canciones, hacer pedidos y disfrutar de tu experiencia en Karaoke Karibu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Canciones Populares</h2>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentSongs.map((song) => (
                  <li key={song.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{song.title}</h3>
                        <p className="text-sm text-gray-500">{song.artist}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Solicitar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-4">
              <Link to="/songs">
                <Button variant="outline" fullWidth>Ver todas las canciones</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <Link to="/songs/search">
                <Button fullWidth leftIcon={<span>🔍</span>}>
                  Buscar Canciones
                </Button>
              </Link>
              <Link to="/user/orders">
                <Button variant="secondary" fullWidth leftIcon={<span>📋</span>}>
                  Mis Pedidos
                </Button>
              </Link>
              <Link to="/user/profile">
                <Button variant="outline" fullWidth leftIcon={<span>👤</span>}>
                  Mi Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
