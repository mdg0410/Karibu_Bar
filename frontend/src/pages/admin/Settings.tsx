import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { adminService } from '@/services';

interface SettingsForm {
  siteName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  openingHours: string;
  taxRate: number;
  songRequestLimit: number;
  allowAnonymousRequests: boolean;
  maintenance: boolean;
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsForm>({
    siteName: 'Karaoke Karibu',
    contactEmail: 'info@karaokekaribu.com',
    phoneNumber: '(123) 456-7890',
    address: 'Calle Principal #123, Ciudad',
    openingHours: 'Lun-Jue: 17:00-01:00, Vie-Sáb: 17:00-03:00, Dom: Cerrado',
    taxRate: 16,
    songRequestLimit: 3,
    allowAnonymousRequests: false,
    maintenance: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        // En una implementación real, cargaríamos datos desde la API
        // const response = await adminService.getSettings();
        // setSettings(response.data);
        
        // Simulamos carga de datos
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar configuración:', error);
        setError('No se pudo cargar la configuración');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      // En una implementación real, guardaríamos los datos en la API
      // await adminService.updateSettings(settings);
      
      // Simulamos guardado
      setTimeout(() => {
        setSaving(false);
        setSuccess(true);
        
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      setError('No se pudo guardar la configuración');
      setSaving(false);
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Configuración del Sistema</h1>
        
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
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Configuración guardada correctamente</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Información General">
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Sitio
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo de Contacto
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={settings.phoneNumber}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows={2}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-1">
                    Horario de Atención
                  </label>
                  <textarea
                    id="openingHours"
                    name="openingHours"
                    value={settings.openingHours}
                    onChange={handleChange}
                    rows={2}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </Card>
            
            <Card title="Configuración del Sistema">
              <div className="space-y-4">
                <div>
                  <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                    Tasa de Impuesto (%)
                  </label>
                  <input
                    type="number"
                    id="taxRate"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="songRequestLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Límite de Solicitudes de Canciones por Cliente
                  </label>
                  <input
                    type="number"
                    id="songRequestLimit"
                    name="songRequestLimit"
                    value={settings.songRequestLimit}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowAnonymousRequests"
                    name="allowAnonymousRequests"
                    checked={settings.allowAnonymousRequests}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="allowAnonymousRequests" className="ml-2 block text-sm text-gray-700">
                    Permitir solicitudes anónimas de canciones
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenance"
                    name="maintenance"
                    checked={settings.maintenance}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700">
                    Modo mantenimiento
                  </label>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-4"
                  >
                    Crear Respaldo
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                  >
                    Restaurar Sistema
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-4"
              onClick={() => setSettings({
                siteName: 'Karaoke Karibu',
                contactEmail: 'info@karaokekaribu.com',
                phoneNumber: '(123) 456-7890',
                address: 'Calle Principal #123, Ciudad',
                openingHours: 'Lun-Jue: 17:00-01:00, Vie-Sáb: 17:00-03:00, Dom: Cerrado',
                taxRate: 16,
                songRequestLimit: 3,
                allowAnonymousRequests: false,
                maintenance: false
              })}
            >
              Restaurar Predeterminados
            </Button>
            
            <Button
              type="submit"
              isLoading={saving}
              disabled={saving}
            >
              Guardar Configuración
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AdminSettings;
