import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
