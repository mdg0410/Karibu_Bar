import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';

// Placeholder para futuros reducers
const rootReducer = {
  auth: authReducer,
  // Aquí se agregarán los slices a medida que se creen
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // Aquí podemos añadir middleware personalizado
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

// Configuración para escuchar acciones asíncronas
setupListeners(store.dispatch);

// Tipos para useDispatch y useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks personalizados
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;