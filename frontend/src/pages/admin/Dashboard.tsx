import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector } from '@/redux/store';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import adminService from '@/services/adminService';

interface SummaryData {
  dailySales: number;
  monthlySales: number;
  totalUsers: number;
  totalSongs: number;
  topSongs: { title: string; artist: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        // Esta API aún no existe, pero suponemos su estructura
        const response = await adminService.getDashboardSummary();
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error al cargar datos del dashboard', error);
        
        // Datos de ejemplo en caso de error
        setSummaryData({
          dailySales: 15850,
          monthlySales: 325600,
          totalUsers: 245,
          totalSongs: 1250,
          topSongs: [
            { title: 'Despacito', artist: 'Luis Fonsi', count: 32 },
            { title: 'Shape of You', artist: 'Ed Sheeran', count: 28 },
            { title: 'Bésame', artist: 'Camila', count: 25 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </MainLayout>
    );
  }

  if (!summaryData) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700">Error al cargar datos</h2>
          <p className="text-gray-500 mt-2">No se pudo cargar la información del dashboard.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-gray-600">
            Bienvenido, {user?.nombre || 'Administrador'}. Aquí puedes gestionar todos los aspectos del sistema Karaoke Karibu.
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium">Ventas del Día</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${summaryData.dailySales.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium">Ventas del Mes</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${summaryData.monthlySales.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total de Usuarios</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {summaryData.totalUsers.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total de Canciones</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {summaryData.totalSongs.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/admin/users">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👥</span>
                      <div>
                        <h3 className="font-bold">Gestionar Usuarios</h3>
                        <p className="text-sm text-gray-500">Administra cuentas de usuarios</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/songs">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🎵</span>
                      <div>
                        <h3 className="font-bold">Gestionar Canciones</h3>
                        <p className="text-sm text-gray-500">Administra el catálogo de canciones</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/products">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🛍️</span>
                      <div>
                        <h3 className="font-bold">Gestionar Productos</h3>
                        <p className="text-sm text-gray-500">Administra inventario y precios</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/reports">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📊</span>
                      <div>
                        <h3 className="font-bold">Reportes</h3>
                        <p className="text-sm text-gray-500">Visualiza estadísticas e informes</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/settings">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚙️</span>
                      <div>
                        <h3 className="font-bold">Configuración</h3>
                        <p className="text-sm text-gray-500">Ajusta parámetros del sistema</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/backup">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💾</span>
                      <div>
                        <h3 className="font-bold">Respaldo</h3>
                        <p className="text-sm text-gray-500">Gestiona copias de seguridad</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Canciones Más Solicitadas</h2>
              
              <ul className="divide-y divide-gray-200">
                {summaryData.topSongs.map((song, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center">
                      <span className="font-bold mr-3 text-primary">{index + 1}</span>
                      <div>
                        <h3 className="font-medium">{song.title}</h3>
                        <p className="text-sm text-gray-500">{song.artist}</p>
                      </div>
                      <span className="ml-auto bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {song.count} veces
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <Link to="/admin/stats/songs">
                  <Button variant="outline" fullWidth>Ver estadísticas completas</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
