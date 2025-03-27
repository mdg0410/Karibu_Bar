import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { Express } from 'express';
import path from 'path';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    // Actualizado para usar la versión más reciente de Mongoose
    await mongoose.connect(mongoURI);
    
    console.log('📦 MongoDB Atlas Connected');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

export const createServer = (app: Express): http.Server | https.Server => {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'production' && process.env.SSL_KEY && process.env.SSL_CERT) {
    try {
      // Configuración para producción con HTTPS
      const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
      };
      
      console.log('🔒 HTTPS server created with SSL certificates');
      return https.createServer(options, app);
    } catch (error) {
      console.error('❌ Error loading SSL certificates:', error);
      console.log('⚠️ Falling back to HTTP server');
      return http.createServer(app);
    }
  } else if (env === 'development' && process.env.SSL_KEY && process.env.SSL_CERT) {
    try {
      // Intentar cargar certificados para desarrollo local
      const keyPath = path.resolve(process.env.SSL_KEY);
      const certPath = path.resolve(process.env.SSL_CERT);
      
      if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        const options = {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath)
        };
        
        console.log('🔒 Development HTTPS server created with local SSL certificates');
        return https.createServer(options, app);
      }
    } catch (error) {
      console.warn('⚠️ Could not load development SSL certificates:', error);
    }
    
    console.log('📡 Development HTTP server created');
    return http.createServer(app);
  }
  
  // Configuración predeterminada para desarrollo (HTTP)
  console.log('📡 HTTP server created');
  return http.createServer(app);
};

// Utilidad para verificar si los archivos de certificados existen
export const checkSSLCertificates = (): boolean => {
  const keyPath = process.env.SSL_KEY;
  const certPath = process.env.SSL_CERT;
  
  if (!keyPath || !certPath) {
    return false;
  }
  
  try {
    return fs.existsSync(keyPath) && fs.existsSync(certPath);
  } catch (error) {
    return false;
  }
};