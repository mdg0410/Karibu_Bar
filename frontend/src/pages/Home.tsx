import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a Karaoke Karibu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-10">
            La mejor experiencia de karaoke para disfrutar con amigos y familiares. Encuentra tus canciones favoritas y canta como nunca antes.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <Button size="lg">Iniciar Sesión</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">Registrarse</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-3xl mb-4">🎵</div>
              <h3 className="text-xl font-bold mb-2">Miles de Canciones</h3>
              <p className="text-gray-600">
                Accede a nuestro extenso catálogo con miles de canciones de todos los géneros y épocas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-3xl mb-4">🎤</div>
              <h3 className="text-xl font-bold mb-2">Karaoke de Calidad</h3>
              <p className="text-gray-600">
                Disfruta de pistas de alta calidad y letras sincronizadas para una experiencia perfecta.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-3xl mb-4">🥂</div>
              <h3 className="text-xl font-bold mb-2">Servicio Completo</h3>
              <p className="text-gray-600">
                Además de karaoke, disfruta de nuestro servicio de bebidas y alimentos directamente en tu mesa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;