import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { authService } from '@/services';
import { loginSuccess } from '@/redux/slices/authSlice';
import NotificationsContainer from '@/components/ui/NotificationsContainer';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Componente de carga
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  </div>
);

// Componente placeholder para páginas no implementadas
const PlaceholderPage = ({ title }: { title: string }) => (
  <MainLayout>
    <div className="container mx-auto px-4 py-8">
      <Card className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">Esta página está en construcción</p>
        <div className="flex justify-center">
          <Button onClick={() => window.history.back()}>Volver</Button>
        </div>
      </Card>
    </div>
  </MainLayout>
);

// Componentes reales e implementados (mantener estos)
const WorkerOrderDetail = lazy(() => import('@/pages/worker/OrderDetail'));
const WorkerTables = lazy(() => import('@/pages/worker/Tables'));
const WorkerSongQueue = lazy(() => import('@/pages/worker/SongQueue'));
const AdminUsers = lazy(() => import('@/pages/admin/Users'));
const AdminSongs = lazy(() => import('@/pages/admin/Songs'));
const AdminProducts = lazy(() => import('@/pages/admin/Products'));
const AdminReports = lazy(() => import('@/pages/admin/Reports'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));

// Componentes placeholder en lugar de importaciones que no existen
const Home = () => <PlaceholderPage title="Página de Inicio" />;
const Login = () => <PlaceholderPage title="Iniciar Sesión" />;
const Register = () => <PlaceholderPage title="Registro" />;
const NotFound = () => <PlaceholderPage title="Página no encontrada" />;

// Panel de usuario
const UserDashboard = () => <PlaceholderPage title="Panel de Usuario" />;
const UserSongList = () => <PlaceholderPage title="Lista de Canciones" />;
const UserProfile = () => <PlaceholderPage title="Perfil de Usuario" />;
const UserOrders = () => <PlaceholderPage title="Mis Pedidos" />;

// Panel de trabajador
const WorkerDashboard = () => <PlaceholderPage title="Panel de Trabajador" />;
const WorkerOrders = () => <PlaceholderPage title="Gestión de Pedidos" />;

// Panel de administrador
const AdminDashboard = () => <PlaceholderPage title="Panel de Administrador" />;

// Componente de ruta protegida para acceso solo a rutas autenticadas
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.rol.idRol))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  // Verificar estado de autenticación al inicio
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated && localStorage.getItem('token')) {
          const response = await authService.getCurrentUser();
          if (response.data) {
            dispatch(loginSuccess({
              token: localStorage.getItem('token') as string,
              user: response.data
            }));
          }
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, [dispatch, isAuthenticated]);

  // Determina la página de inicio según el rol del usuario
  const getHomePage = () => {
    if (!isAuthenticated) return <Home />;
    
    // Roles: 1 = Admin, 2 = Trabajador, 3 = Usuario
    switch (user?.rol.idRol) {
      case 1: return <Navigate to="/admin/dashboard" replace />;
      case 2: return <Navigate to="/worker/dashboard" replace />;
      case 3: return <Navigate to="/user/dashboard" replace />;
      default: return <Home />;
    }
  };

  return (
    <>
      <NotificationsContainer />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={getHomePage()} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas de usuario */}
          <Route path="/user/dashboard" element={
            <ProtectedRoute allowedRoles={[3]}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/songs" element={
            <ProtectedRoute allowedRoles={[3]}>
              <UserSongList />
            </ProtectedRoute>
          } />
          <Route path="/user/profile" element={
            <ProtectedRoute allowedRoles={[3]}>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/user/orders" element={
            <ProtectedRoute allowedRoles={[3]}>
              <UserOrders />
            </ProtectedRoute>
          } />
          
          {/* Rutas de trabajador */}
          <Route path="/worker/dashboard" element={
            <ProtectedRoute allowedRoles={[2, 1]}>
              <WorkerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/worker/orders" element={
            <ProtectedRoute allowedRoles={[2, 1]}>
              <WorkerOrders />
            </ProtectedRoute>
          } />
          <Route path="/worker/orders/:id" element={
            <ProtectedRoute allowedRoles={[2, 1]}>
              <WorkerOrderDetail />
            </ProtectedRoute>
          } />
          <Route path="/worker/tables" element={
            <ProtectedRoute allowedRoles={[2, 1]}>
              <WorkerTables />
            </ProtectedRoute>
          } />
          <Route path="/worker/queue" element={
            <ProtectedRoute allowedRoles={[2, 1]}>
              <WorkerSongQueue />
            </ProtectedRoute>
          } />
          
          {/* Rutas de administrador */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/songs" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminSongs />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminReports />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminSettings />
            </ProtectedRoute>
          } />
          
          {/* Ruta para página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
