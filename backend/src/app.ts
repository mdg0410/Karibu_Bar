import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import routes from './routes/index';
import { createServer, checkSSLCertificates } from './utils/index';
import { connectToDatabase } from './config/database';

// Cargar variables de entorno
dotenv.config();

// Inicializar aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configurar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Seguridad HTTP
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging

// Servir archivos estáticos (si es necesario)
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a la base de datos
connectToDatabase();

// Configurar rutas
app.use('/api', routes);

// Ruta para verificar el estado del servidor
app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    https: checkSSLCertificates()
  });
});

// Crear servidor (HTTP o HTTPS según configuración)
const server = createServer(app);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`
    🚀 Servidor iniciado en el puerto ${PORT}
    🌎 Entorno: ${NODE_ENV}
    🔒 HTTPS: ${checkSSLCertificates() ? 'Habilitado' : 'Deshabilitado'}
    ⏱️ ${new Date().toISOString()}
  `);
});

// Manejar errores no capturados
process.on('unhandledRejection', (error: Error) => {
  console.error('🔴 Error no manejado:', error);
});

export default app;