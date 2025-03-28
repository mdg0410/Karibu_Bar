import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import Button from '@/components/ui/Button';

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl">
                Karaoke Karibu
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
              >
                Inicio
              </Link>
              <Link
                to="/songs"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
              >
                Canciones
              </Link>
              {isAuthenticated && user?.rol?.idRol === 3 && (
                <>
                  <Link
                    to="/user/dashboard"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Mi Panel
                  </Link>
                  <Link
                    to="/user/orders"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Mis Pedidos
                  </Link>
                </>
              )}
              {isAuthenticated && user?.rol?.idRol === 2 && (
                <>
                  <Link
                    to="/worker/dashboard"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Panel de Control
                  </Link>
                  <Link
                    to="/worker/orders"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Pedidos
                  </Link>
                  <Link
                    to="/worker/queue"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Cola de Canciones
                  </Link>
                </>
              )}
              {isAuthenticated && user?.rol?.idRol === 1 && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:border-white"
                  >
                    Administración
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
                  >
                    <span className="sr-only">Abrir menú de usuario</span>
                    <div className="h-8 w-8 rounded-full bg-primary-dark flex items-center justify-center">
                      {user?.nombre?.charAt(0) || 'U'}
                    </div>
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="px-4 py-2 text-gray-800 border-b">
                      <p className="text-sm font-medium">{user?.nombre}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
          >
            Inicio
          </Link>
          <Link
            to="/songs"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
          >
            Canciones
          </Link>
          {isAuthenticated && user?.rol?.idRol === 3 && (
            <>
              <Link
                to="/user/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Mi Panel
              </Link>
              <Link
                to="/user/orders"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Mis Pedidos
              </Link>
            </>
          )}
          {isAuthenticated && user?.rol?.idRol === 2 && (
            <>
              <Link
                to="/worker/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Panel de Control
              </Link>
              <Link
                to="/worker/orders"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Pedidos
              </Link>
              <Link
                to="/worker/queue"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Cola de Canciones
              </Link>
            </>
          )}
          {isAuthenticated && user?.rol?.idRol === 1 && (
            <>
              <Link
                to="/admin/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:bg-primary-dark hover:border-white"
              >
                Administración
              </Link>
            </>
          )}
        </div>
        {isAuthenticated ? (
          <div className="pt-4 pb-3 border-t border-primary-dark">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-dark flex items-center justify-center">
                  {user?.nombre?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user?.nombre}
                </div>
                <div className="text-sm font-medium text-white opacity-75">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/user/profile"
                className="block px-4 py-2 text-base font-medium text-white hover:bg-primary-dark"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-white hover:bg-primary-dark"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-primary-dark px-4 flex flex-col space-y-2">
            <Link to="/login">
              <Button variant="secondary" fullWidth>
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button fullWidth>Registrarse</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
