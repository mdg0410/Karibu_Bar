import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { updateUserProfile } from '@/redux/slices/authSlice';
import { authService } from '@/services';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ProfileForm {
  nombre: string;
  username: string;
  email: string;
  numeroTelefono?: string;
  direccion?: string;
}

const UserProfile: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: {
      nombre: user?.nombre || '',
      username: user?.username || '',
      email: user?.email || '',
      numeroTelefono: user?.numeroTelefono || '',
      direccion: user?.direccion || '',
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      // Llamar al servicio para actualizar el perfil
      const response = await authService.updateProfile(data);
      
      // Actualizar el estado con los nuevos datos
      dispatch(updateUserProfile(response.data));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error);
      setError(error.response?.data?.message || 'Ocurrió un error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Usuario no encontrado</h2>
            <p>No se pudo cargar la información del usuario.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-1">{user.nombre}</h2>
                <p className="text-gray-600 mb-4">{user.username}</p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Rol:</span> {user.rol?.nombreRol || 'Usuario'}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Correo:</span> {user.email}
                </p>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card title="Editar Información">
              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">Perfil actualizado con éxito.</p>
                    </div>
                  </div>
                </div>
              )}

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

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Nombre Completo"
                    name="nombre"
                    register={register}
                    rules={{ required: 'El nombre es obligatorio' }}
                    error={errors.nombre?.message}
                  />

                  <FormInput
                    label="Nombre de Usuario"
                    name="username"
                    register={register}
                    rules={{ required: 'El nombre de usuario es obligatorio' }}
                    error={errors.username?.message}
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
                  />

                  <FormInput
                    label="Teléfono"
                    name="numeroTelefono"
                    register={register}
                    error={errors.numeroTelefono?.message}
                  />

                  <div className="md:col-span-2">
                    <FormInput
                      label="Dirección"
                      name="direccion"
                      register={register}
                      error={errors.direccion?.message}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    isLoading={loading}
                    disabled={loading}
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </Card>

            <Card title="Cambiar Contraseña" className="mt-6">
              <p className="text-gray-600 mb-4">
                Para cambiar tu contraseña, haz clic en el botón de abajo.
              </p>
              <Button variant="outline">
                Cambiar Contraseña
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
