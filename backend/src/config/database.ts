import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

// Opciones de configuración de Mongoose
const options = {
  autoIndex: true, // Construir índices
  maxPoolSize: 10, // Mantener hasta 10 conexiones socket
  serverSelectionTimeoutMS: 5000, // Timeout de selección de servidor
  socketTimeoutMS: 45000, // Timeout de socket
  family: 4 // Usar IPv4, omitir intentos IPv6
};

// Eventos de Mongoose para mejor monitoreo
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose conectado a MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Error de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟠 Mongoose desconectado de MongoDB Atlas');
});

// Manejar el cierre de la aplicación
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexión a MongoDB cerrada por finalización de aplicación');
  process.exit(0);
});

// Función para conectar a la base de datos
export const connectToDatabase = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('La variable de entorno MONGO_URI no está definida');
    }
    
    await mongoose.connect(MONGO_URI, options);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB Atlas:', error);
    process.exit(1);
  }
};

export default { connectToDatabase };
