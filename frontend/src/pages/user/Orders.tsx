import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  songs?: {
    title: string;
    artist: string;
    status: string;
  }[];
}

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de pedidos
    const loadOrders = async () => {
      setLoading(true);
      // Aquí normalmente haríamos una llamada API
      // const response = await orderService.getUserOrders();
      
      // Datos de ejemplo
      setTimeout(() => {
        setOrders([
          {
            id: '10001',
            date: '2023-05-15T20:30:00',
            total: 85.50,
            status: 'completado',
            items: [
              { name: 'Cerveza', quantity: 2, price: 12 },
              { name: 'Nachos con queso', quantity: 1, price: 18.50 },
              { name: 'Cocktail de frutas', quantity: 1, price: 15 },
            ],
            songs: [
              { title: 'Bohemian Rhapsody', artist: 'Queen', status: 'reproducida' },
              { title: 'Sweet Child O Mine', artist: 'Guns N Roses', status: 'reproducida' },
            ]
          },
          {
            id: '10002',
            date: '2023-05-20T19:15:00',
            total: 45.00,
            status: 'en proceso',
            items: [
              { name: 'Margarita', quantity: 1, price: 20 },
              { name: 'Palomitas', quantity: 1, price: 10 },
              { name: 'Agua mineral', quantity: 3, price: 5 },
            ],
            songs: [
              { title: 'Despacito', artist: 'Luis Fonsi', status: 'en cola' },
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    loadOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado': return 'bg-green-100 text-green-800';
      case 'en proceso': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSongStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reproducida': return 'bg-green-100 text-green-800';
      case 'en cola': return 'bg-blue-100 text-blue-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">No tienes pedidos</h2>
            <p className="text-gray-600 mb-6">Aún no has realizado ningún pedido.</p>
            <Link to="/songs">
              <Button>Ver Canciones Disponibles</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
                    <p className="text-gray-600">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="ml-4 font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold mb-2">Artículos</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {order.songs && order.songs.length > 0 && (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <h3 className="font-bold mb-2">Canciones</h3>
                    <ul className="space-y-2">
                      {order.songs.map((song, index) => (
                        <li key={index} className="flex justify-between">
                          <span>
                            {song.title} - {song.artist}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getSongStatusColor(song.status)}`}>
                            {song.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserOrders;
