import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import { orderService } from '@/services';

interface Table {
  id: string;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  capacity: number;
  currentOrderId?: string;
}

const WorkerTables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        // En lugar de una llamada al API, usamos datos de prueba por ahora
        setTimeout(() => {
          const mockTables = [
            { id: '1', number: 1, status: 'available', capacity: 4 },
            { id: '2', number: 2, status: 'occupied', capacity: 2, currentOrderId: '1001' },
            { id: '3', number: 3, status: 'occupied', capacity: 6, currentOrderId: '1002' },
            { id: '4', number: 4, status: 'reserved', capacity: 8 },
            { id: '5', number: 5, status: 'available', capacity: 4 },
            { id: '6', number: 6, status: 'available', capacity: 2 },
            { id: '7', number: 7, status: 'reserved', capacity: 4 },
            { id: '8', number: 8, status: 'occupied', capacity: 6, currentOrderId: '1003' },
            { id: '9', number: 9, status: 'available', capacity: 4 },
            { id: '10', number: 10, status: 'occupied', capacity: 8, currentOrderId: '1004' },
            { id: '11', number: 11, status: 'available', capacity: 2 },
            { id: '12', number: 12, status: 'available', capacity: 4 },
          ] as Table[];
          
          setTables(mockTables);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar mesas:', error);
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'reserved': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      default: return 'Desconocido';
    }
  };

  const handleStatusChange = async (tableId: string, newStatus: 'available' | 'occupied' | 'reserved') => {
    try {
      // Aquí iría la llamada a la API para actualizar el estado de la mesa
      // await orderService.updateTableStatus(tableId, newStatus);
      
      // Actualizar estado local
      setTables(tables.map(table => 
        table.id === tableId ? { ...table, status: newStatus } : table
      ));
    } catch (error) {
      console.error('Error al actualizar estado de la mesa:', error);
      // Mostrar notificación de error
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Gestión de Mesas</h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tables.map((table) => (
              <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`h-3 ${getStatusColor(table.status)}`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">Mesa {table.number}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(table.status)}`}>
                      {getStatusText(table.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    Capacidad: <span className="font-medium">{table.capacity} personas</span>
                  </p>
                  
                  {table.status === 'occupied' && table.currentOrderId && (
                    <p className="text-sm text-gray-600 mb-4">
                      Pedido: <Link to={`/worker/orders/${table.currentOrderId}`} className="text-primary hover:underline font-medium">
                        #{table.currentOrderId}
                      </Link>
                    </p>
                  )}
                  
                  <div className="mt-4">
                    {table.status === 'available' ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(table.id, 'reserved')}
                        >
                          Reservar
                        </Button>
                        <Link to={`/worker/orders/create?table=${table.id}`}>
                          <Button size="sm" fullWidth>
                            Ocupar
                          </Button>
                        </Link>
                      </div>
                    ) : table.status === 'occupied' ? (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(table.id, 'available')}
                        fullWidth
                      >
                        Liberar Mesa
                      </Button>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(table.id, 'available')}
                        >
                          Cancelar
                        </Button>
                        <Link to={`/worker/orders/create?table=${table.id}`}>
                          <Button size="sm" fullWidth>
                            Ocupar
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WorkerTables;
