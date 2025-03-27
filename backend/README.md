# Karaoke KARIBU Backend

## Descripción del Proyecto
Karaoke KARIBU es una aplicación de karaoke que permite a los usuarios seleccionar canciones, realizar pedidos y gestionar su experiencia en un entorno nocturno. Este backend está construido utilizando Node.js, Express y MongoDB, y está diseñado para manejar la lógica de negocio, la autenticación de usuarios y la comunicación en tiempo real.

## Estructura del Proyecto
La estructura del backend se organiza de la siguiente manera:

```
/backend
├── /src
│   ├── /controllers      # Lógica de negocio
│   ├── /middlewares      # Middlewares de autenticación y validaciones
│   ├── /models           # Definición de esquemas de Mongoose
│   ├── /routes           # Rutas de la API
│   ├── /services         # Lógica de servicios
│   ├── /utils            # Funciones utilitarias y configuraciones generales
│   └── app.ts            # Punto de entrada de la aplicación
├── package.json          # Configuración del proyecto
└── tsconfig.json         # Configuración de TypeScript
```

## Instalación
Para instalar las dependencias del proyecto, navega a la carpeta `backend` y ejecuta:

```
npm install
```

## Ejecución
Para iniciar el servidor, utiliza el siguiente comando:

```
npm start
```

Asegúrate de tener configuradas las variables de entorno necesarias para la conexión a la base de datos y otros servicios.

## Contribución
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

## Licencia
Este proyecto está bajo la Licencia MIT.