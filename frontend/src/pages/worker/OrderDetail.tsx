import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { orderService } from '@/services';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface SongRequest {
  id: string;
  title: string;
  artist: string;
  status: string;
  requestedAt: string;
}

interface Order {
  id: string;
  table: number;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
  songs: SongRequest[];
}

const WorkerOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        if (id) {
          // Intentamos cargar datos reales
          const response = await orderService.getOrderById(id);
          setOrder(response.data);
        }
      } catch (error) {
        console.error('Error al cargar detalles del pedido:', error);
        setError('No se pudieron cargar los detalles del pedido');
        
        // Datos ficticios para desarrollo
        setOrder({
          id: id || '10001',
          table: 3,
          status: 'en proceso',
          total: 85.50,
          createdAt: new Date().toISOString(),
          items: [
            { id: '1', name: 'Cerveza', quantity: 2, price: 12 },
            { id: '2', name: 'Nachos con queso', quantity: 1, price: 18.50 },
            { id: '3', name: 'Cocktail de frutas', quantity: 1, price: 15 }
          ],
          songs: [
            { 
              id: '101', 
              title: 'Bohemian Rhapsody', 
              artist: 'Queen', 
              status: 'en cola',
              requestedAt: new Date().toISOString() 
            },
            { 
              id: '102', 
              title: 'Sweet Child O Mine', 
              artist: 'Guns N Roses', 
              status: 'pendiente',
              requestedAt: new Date().toISOString() 
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      if (id) {
        await orderService.updateOrderStatus(id, newStatus);
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      setError('No se pudo actualizar el estado del pedido');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado': return 'bg-green-100 text-green-800';
      case 'en proceso': return 'bg-yellow-100 text-yellow-800';
      case 'pendiente': return 'bg-blue-100 text-blue-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSongStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reproducida': return 'bg-green-100 text-green-800';
      case 'en cola': return 'bg-blue-100 text-blue-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !order) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error || 'No se pudo encontrar el pedido solicitado'}</p>
              </div>
            </div>
          </div>
          <Link to="/worker/orders">
            <Button>Volver a la lista de pedidos</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pedido #{order.id}</h1>
            <p className="text-gray-600 mt-1">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className="ml-4 font-bold text-xl">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold mb-4">Artículos</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right font-bold">
                        Total:
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>

            {order.songs.length > 0 && (
              <Card className="mt-6">
                <h2 className="text-xl font-bold mb-4">Solicitudes de Canciones</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Canción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artista
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Solicitada
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.songs.map((song) => (
                        <tr key={song.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{song.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{song.artist}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSongStatusColor(song.status)}`}>
                              {song.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">
                              {new Date(song.requestedAt).toLocaleTimeString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-bold mb-4">Información</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Mesa</p>
                  <p className="font-medium">{order.table}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Fecha y Hora</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h3 className="font-bold text-gray-700">Cambiar Estado</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={order.status === 'en proceso' ? 'primary' : 'outline'} 
                    onClick={() => handleStatusUpdate('en proceso')}
                    disabled={order.status === 'en proceso'}
                    size="sm"
                  >
                    En Proceso
                  </Button>
                  
                  <Button 
                    variant={order.status === 'completado' ? 'primary' : 'outline'} 
                    onClick={() => handleStatusUpdate('completado')}
                    disabled={order.status === 'completado'}
                    size="sm"
                  >
                    Completado
                  </Button>
                  
                  <Button 
                    variant={order.status === 'pendiente' ? 'primary' : 'outline'} 
                    onClick={() => handleStatusUpdate('pendiente')}
                    disabled={order.status === 'pendiente'}
                    size="sm"
                  >
                    Pendiente
                  </Button>
                  
                  <Button 
                    variant={order.status === 'cancelado' ? 'primary' : 'outline'} 
                    onClick={() => handleStatusUpdate('cancelado')}
                    disabled={order.status === 'cancelado'}
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Cancelado
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="mt-6">
              <Button variant="outline" fullWidth onClick={() => window.print()}>
                Imprimir Pedido
              </Button>
            </div>
            
            <div className="mt-3">
              <Link to="/worker/orders">
                <Button variant="secondary" fullWidth>
                  Volver a Pedidos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkerOrderDetail;
