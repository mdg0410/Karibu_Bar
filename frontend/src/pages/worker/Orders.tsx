import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { orderService } from '@/services';

interface Order {
  id: string;
  table: number;
  status: string;
  total: number;
  createdAt: string;
  items: number;
}

const WorkerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Datos de ejemplo mientras se implementa el backend
        setTimeout(() => {
          const mockOrders = [
            {
              id: '1001',
              table: 3,
              status: 'pendiente',
              total: 85.50,
              createdAt: new Date().toISOString(),
              items: 4,
            },
            {
              id: '1002',
              table: 5,
              status: 'en proceso',
              total: 42.00,
              createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
              items: 2,
            },
            {
              id: '1003',
              table: 1,
              status: 'completado',
              total: 120.75,
              createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
              items: 7,
            },
            {
              id: '1004',
              table: 8,
              status: 'cancelado',
              total: 35.00,
              createdAt: new Date(Date.now() - 240 * 60000).toISOString(),
              items: 3,
            },
          ];
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-blue-100 text-blue-800';
      case 'en proceso': return 'bg-yellow-100 text-yellow-800';
      case 'completado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestión de Pedidos</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos los pedidos</option>
              <option value="pendiente">Pendientes</option>
              <option value="en proceso">En proceso</option>
              <option value="completado">Completados</option>
              <option value="cancelado">Cancelados</option>
            </select>
            
            <Link to="/worker/orders/create">
              <Button>Nuevo Pedido</Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : getFilteredOrders().length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <h2 className="text-xl font-bold text-gray-500 mb-2">No hay pedidos</h2>
              <p className="text-gray-500 mb-4">No se encontraron pedidos con los filtros actuales</p>
              <Button variant="outline" onClick={() => setFilter('all')}>
                Ver todos los pedidos
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredOrders().map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
                    <p className="text-gray-500">Mesa {order.table}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fecha:</span>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Artículos:</span>
                    <span>{order.items}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/worker/orders/${order.id}`}>
                    <Button>Ver Detalles</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WorkerOrders;
