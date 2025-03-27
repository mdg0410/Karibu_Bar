import { Request, Response, NextFunction } from 'express';

// Interfaz para errores personalizados
interface AppError extends Error {
  statusCode?: number;
  code?: number | string;
}

// Middleware para manejar errores
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Valores por defecto
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error del servidor';

  // Errores de MongoDB - Duplicados
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err as any)[0];
    message = `El valor para ${field} ya existe. Por favor utilice otro valor.`;
  }

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values((err as any).errors).map((val: any) => val.message);
    message = `Datos inválidos: ${errors.join(', ')}`;
  }

  // Errores de cast de Mongoose (IDs inválidos)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Recurso no encontrado. ID inválido: ${(err as any).value}`;
  }

  // Enviar respuesta de error
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
