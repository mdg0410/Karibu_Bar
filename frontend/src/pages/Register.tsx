import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/store';
import { loginSuccess } from '@/redux/slices/authSlice';
import { authService } from '@/services';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/ui/Button';

interface RegisterForm {
  nombre: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  numeroTelefono?: string;
  direccion?: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    // Verificar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Eliminar la confirmación de contraseña antes de enviar al servidor
      const { confirmPassword, ...registerData } = data;
      
      const response = await authService.register(registerData);
      
      // Si el registro es exitoso y el backend devuelve un token, iniciar sesión automáticamente
      dispatch(loginSuccess({
        token: response.data.token,
        user: response.data.user
      }));
      
      navigate('/');
    } catch (error: any) {
      console.error('Error al registrarse:', error);
      setError(error.response?.data?.message || 'Ocurrió un error al intentar registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Crear Cuenta" 
      subtitle="Regístrate para disfrutar de Karaoke Karibu"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
          label="Nombre Completo"
          name="nombre"
          register={register}
          rules={{ 
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres'
            }
          }}
          error={errors.nombre?.message}
          placeholder="Tu nombre completo"
        />

        <FormInput
          label="Nombre de Usuario"
          name="username"
          register={register}
          rules={{ 
            required: 'El nombre de usuario es obligatorio',
            minLength: {
              value: 3,
              message: 'El nombre de usuario debe tener al menos 3 caracteres'
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Solo se permiten letras, números y guiones bajos'
            }
          }}
          error={errors.username?.message}
          placeholder="usuario123"
        />

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

        <FormInput
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          register={register}
          rules={{ 
            required: 'Confirma tu contraseña',
            validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
          }}
          error={errors.confirmPassword?.message}
          placeholder="••••••"
        />

        <FormInput
          label="Teléfono (opcional)"
          name="numeroTelefono"
          register={register}
          error={errors.numeroTelefono?.message}
          placeholder="(123) 456-7890"
        />

        <div className="mt-6">
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            disabled={loading}
          >
            Registrarme
          </Button>
        </div>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">¿Ya tienes una cuenta?</span>{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            Iniciar Sesión
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
