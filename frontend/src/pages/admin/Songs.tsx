import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';

const AdminSongs: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gestión de Canciones</h1>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <p>Página en construcción</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminSongs;
