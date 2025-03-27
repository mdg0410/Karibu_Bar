# Karaoke Karibu

Una aplicación web de karaoke que permite a los usuarios seleccionar, reproducir y disfrutar de canciones con letras sincronizadas.

## Características

- Biblioteca de canciones
- Reproducción de pistas de karaoke
- Letras sincronizadas
- Sistema de puntuación
- Modo multijugador

## Instalación

1. Clona este repositorio
2. Ejecuta `npm install` para instalar las dependencias
3. Ejecuta `npm start` para iniciar la aplicación

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js

## Descripción
Aplicación web para gestión de karaoke con funcionalidades de reserva, catálogo de canciones y administración.

## Estructura del Proyecto
```
karaoke-karibu-1/
├── backend/                  # Servidor con Express.js y MongoDB
│   ├── src/
│   │   ├── config/           # Configuraciones (base de datos, etc.)
│   │   ├── controllers/      # Controladores
│   │   ├── middlewares/      # Middlewares personalizados
│   │   ├── models/           # Modelos de datos (Mongoose)
│   │   ├── routes/           # Rutas de la API
│   │   ├── services/         # Servicios de la aplicación
│   │   ├── utils/            # Utilidades y helpers
│   │   └── app.ts            # Punto de entrada de la aplicación
│   ├── ssl/                  # Certificados SSL para desarrollo
│   ├── scripts/              # Scripts utilitarios
│   ├── .env                  # Variables de entorno
│   ├── .env.example          # Ejemplo de variables de entorno
│   ├── package.json          # Dependencias del backend
│   └── tsconfig.json         # Configuración de TypeScript
│
├── frontend/                 # Cliente con React, Vite y TypeScript
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/            # Páginas de la aplicación
│   │   ├── redux/            # Estado global con Redux
│   │   ├── services/         # Servicios y API
│   │   └── styles/           # Estilos CSS y Tailwind
│   ├── .env                  # Variables de entorno frontend
│   ├── index.html            # Punto de entrada HTML
│   ├── package.json          # Dependencias del frontend
│   ├── tailwind.config.js    # Configuración de Tailwind CSS
│   └── vite.config.ts        # Configuración de Vite
│
└── README.md                 # Documentación principal
```

## Configuración Inicial

### Backend

1. Instalación de dependencias:
```bash
cd backend
npm install
```

2. Configuración de variables de entorno:
```bash
# Copia el archivo de ejemplo
cp .env.example .env
# Edita las variables en el archivo .env según tu entorno
```

3. Configuración de MongoDB Atlas:
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster y obtén la URL de conexión
   - Actualiza la variable `MONGO_URI` en el archivo `.env`

4. Configuración de SSL para desarrollo local:
```bash
# Genera certificados SSL para desarrollo
npm run generate-ssl
```

5. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

### Frontend

1. Instalación de dependencias:
```bash
cd frontend
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Características Principales
- Autenticación de usuarios con JWT
- Gestión de reservas de karaoke
- Catálogo de canciones
- Panel de administración
- Comunicación en tiempo real

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, TypeScript, MongoDB, Socket.io
- **Frontend**: React, Redux, TypeScript, Tailwind CSS, Vite
- **Seguridad**: JWT, HTTPS, Helmet

## Contribución
Para contribuir a este proyecto, por favor sigue los siguientes pasos:
1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Envía tu rama al repositorio (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

