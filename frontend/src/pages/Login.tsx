import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginStart, loginSuccess, loginFailure } from '@/redux/slices/authSlice';
import { authService } from '@/services';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/ui/Button';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector(state => state.auth);
  
  // Obtener la URL de redirección si la hay
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data: LoginForm) => {
    try {
      dispatch(loginStart());
      const response = await authService.login(data);
      dispatch(loginSuccess({
        token: response.data.token,
        user: response.data.user
      }));
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      dispatch(loginFailure(
        error.response?.data?.message || 'Ocurrió un error al intentar iniciar sesión'
      ));
    }
  };

  return (
    <AuthLayout 
      title="Iniciar Sesión" 
      subtitle="Ingresa tus credenciales para acceder a tu cuenta"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
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

        <FormInput
          label="Correo Electrónico"
          name="email"
          type="email"
          register={register}
          rules={{ 
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido'
            }
          }}
          error={errors.email?.message}
          placeholder="correo@ejemplo.com"
        />

        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          register={register}
          rules={{ 
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres'
            }
          }}
          error={errors.password?.message}
          placeholder="••••••"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            disabled={loading}
          >
            Iniciar Sesión
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">¿No tienes una cuenta?</span>{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
            Regístrate
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
