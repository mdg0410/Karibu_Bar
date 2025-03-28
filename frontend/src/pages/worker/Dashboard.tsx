import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector } from '@/redux/store';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import orderService from '@/services/orderService';

const WorkerDashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [activeTables, setActiveTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Estas APIs aún no existen, pero suponemos su estructura
        const [ordersResponse, tablesResponse] = await Promise.all([
          orderService.getPendingOrders(),
          orderService.getActiveTables()
        ]);
        
        setPendingOrders(ordersResponse.data.orders);
        setActiveTables(tablesResponse.data.tables);
      } catch (error) {
        console.error('Error al cargar datos del dashboard', error);
        
        // Datos de ejemplo en caso de error
        setPendingOrders([
          { id: 101, table: 3, items: 2, createdAt: new Date().toISOString() },
          { id: 102, table: 5, items: 1, createdAt: new Date().toISOString() },
        ]);
        
        setActiveTables([
          { id: 1, number: 3, status: 'occupied', songRequests: 5 },
          { id: 2, number: 5, status: 'occupied', songRequests: 2 },
          { id: 3, number: 8, status: 'reserved', songRequests: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Simulamos una actualización cada 30 segundos
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'available': return 'Disponible';
      default: return 'Desconocido';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Panel de Control - {user?.nombre || 'Trabajador'}</h1>
          <p className="text-gray-600">
            Gestiona pedidos, mesas y solicitudes de canciones desde este panel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pedidos Pendientes</h2>
              <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                {pendingOrders.length}
              </span>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : pendingOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay pedidos pendientes</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {pendingOrders.map((order) => (
                  <li key={order.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Pedido #{order.id}</h3>
                        <p className="text-sm text-gray-500">
                          Mesa {order.table} • {order.items} artículos
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Link to={`/worker/orders/${order.id}`}>
                        <Button size="sm">Ver Detalles</Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-4">
              <Link to="/worker/orders">
                <Button variant="outline" fullWidth>Ver todos los pedidos</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Mesas Activas</h2>
              <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                {activeTables.length}
              </span>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : activeTables.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay mesas activas</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {activeTables.map((table) => (
                  <li key={table.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Mesa {table.number}</h3>
                          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getStatusColor(table.status)}`}>
                            {getStatusText(table.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {table.songRequests} solicitudes de canciones
                        </p>
                      </div>
                      <Link to={`/worker/tables/${table.id}`}>
                        <Button size="sm" variant="outline">Gestionar</Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-4">
              <Link to="/worker/tables">
                <Button variant="outline" fullWidth>Ver todas las mesas</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/worker/orders/create">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:bg-gray-50 transition-colors">
              <div className="text-primary text-3xl mb-2">🛒</div>
              <h3 className="font-bold">Nuevo Pedido</h3>
            </div>
          </Link>
          
          <Link to="/worker/queue">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:bg-gray-50 transition-colors">
              <div className="text-primary text-3xl mb-2">🎵</div>
              <h3 className="font-bold">Cola de Canciones</h3>
            </div>
          </Link>
          
          <Link to="/worker/tables/status">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:bg-gray-50 transition-colors">
              <div className="text-primary text-3xl mb-2">🪑</div>
              <h3 className="font-bold">Estado de Mesas</h3>
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkerDashboard;
