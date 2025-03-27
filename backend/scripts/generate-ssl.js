/**
 * Script para generar certificados SSL para desarrollo local
 * 
 * Requiere tener instalado mkcert: https://github.com/FiloSottile/mkcert
 * 
 * Instrucciones de instalación de mkcert:
 * - Windows (usando chocolatey): choco install mkcert
 * - macOS (usando homebrew): brew install mkcert
 * - Linux: ver instrucciones en el repo de mkcert
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Directorio para almacenar los certificados
const SSL_DIR = path.join(__dirname, '..', 'ssl');

// Verificar si mkcert está instalado
try {
  execSync('mkcert -version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: mkcert no está instalado.');
  console.log('Por favor instala mkcert siguiendo las instrucciones en https://github.com/FiloSottile/mkcert');
  process.exit(1);
}

// Crear directorio SSL si no existe
if (!fs.existsSync(SSL_DIR)) {
  fs.mkdirSync(SSL_DIR, { recursive: true });
  console.log(`📁 Directorio SSL creado en ${SSL_DIR}`);
}

// Generar certificados
try {
  console.log('🔐 Generando certificados SSL para desarrollo local...');
  
  // Instalar CA local
  execSync('mkcert -install', { stdio: 'inherit' });
  
  // Generar certificados para localhost
  execSync(`mkcert -key-file ${path.join(SSL_DIR, 'localhost-key.pem')} -cert-file ${path.join(SSL_DIR, 'localhost.pem')} localhost 127.0.0.1 ::1`, { 
    stdio: 'inherit' 
  });
  
  console.log('✅ Certificados SSL generados correctamente');
  console.log(`📂 Ubicación: ${SSL_DIR}`);
  console.log('🔒 Ahora puedes usar HTTPS en tu entorno de desarrollo');
  
  // Actualizar el archivo .env si existe
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Actualizar las rutas SSL en el archivo .env
    envContent = envContent.replace(/SSL_KEY=.*$/m, `SSL_KEY=./ssl/localhost-key.pem`);
    envContent = envContent.replace(/SSL_CERT=.*$/m, `SSL_CERT=./ssl/localhost.pem`);
    
    fs.writeFileSync(envPath, envContent);
    console.log('📝 Archivo .env actualizado con las rutas de los certificados');
  }
  
} catch (error) {
  console.error('❌ Error al generar certificados SSL:', error);
  process.exit(1);
}
