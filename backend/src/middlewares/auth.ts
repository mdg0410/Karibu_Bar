import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IRol } from '../models';

// Extender la interfaz de Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Verificar token JWT
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Verificar si el token está en los headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No está autorizado para acceder a este recurso'
    });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as jwt.JwtPayload;

    // Buscar el usuario
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'El usuario asociado a este token no existe'
      });
    }

    // Añadir el usuario a la request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'No está autorizado para acceder a este recurso'
    });
  }
};

// Verificar roles por idRol o nombreRol
export const authorize = (...roleIds: (number | string)[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No está autorizado para acceder a este recurso'
      });
    }

    const userRoleId = req.user.rol.idRol;
    const userRoleName = req.user.rol.nombreRol;

    // Verificar si el rol del usuario coincide con alguno de los roles permitidos
    const hasPermission = roleIds.some(role => 
      (typeof role === 'number' && role === userRoleId) || 
      (typeof role === 'string' && role === userRoleName)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para realizar esta acción'
      });
    }

    next();
  };
};
