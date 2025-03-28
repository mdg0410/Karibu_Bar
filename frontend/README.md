# Karaoke KARIBU - Frontend

## Descripción

Este proyecto es la interfaz de usuario para la aplicación Karaoke KARIBU, desarrollada utilizando React, TypeScript, y Tailwind CSS. Proporciona una experiencia intuitiva y atractiva para usuarios, trabajadores y administradores del sistema de karaoke.

## Estructura del Proyecto

El frontend está organizado de manera modular siguiendo prácticas recomendadas:

```
frontend/
├── public/                # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── form/          # Componentes de formulario
│   │   ├── layouts/       # Layouts de la aplicación
│   │   ├── navigation/    # Componentes de navegación
│   │   └── ui/            # Componentes de interfaz de usuario
│   ├── pages/             # Páginas de la aplicación
│   │   ├── admin/         # Vistas para administradores
│   │   ├── user/          # Vistas para usuarios
│   │   └── worker/        # Vistas para trabajadores
│   ├── redux/             # Gestión del estado global
│   │   ├── slices/        # Slices de Redux Toolkit
│   │   └── store.ts       # Configuración de la tienda
│   ├── services/          # Servicios para comunicación con el backend
│   ├── styles/            # Estilos y configuraciones CSS
│   ├── utils/             # Utilidades y helpers
│   ├── App.tsx            # Componente principal
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Punto de entrada
├── .env                   # Variables de entorno
├── index.html             # Plantilla HTML
├── package.json           # Dependencias y scripts
├── tailwind.config.js     # Configuración de Tailwind CSS
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## Arquitectura

### Componentes

Los componentes siguen una estructura modular con diferentes categorías:

- **UI**: Componentes básicos como botones, inputs, cards y modales.
- **Layout**: Estructuras de página como MainLayout y AuthLayout.
- **Navigation**: Componentes para navegación como Navbar y Footer.
- **Form**: Componentes especializados para formularios.

### Páginas

Las páginas están organizadas por roles de usuario:

- **User**: Vistas para usuarios finales (dashboard, perfil, canciones).
- **Worker**: Vistas para trabajadores (gestión de pedidos, mesas).
- **Admin**: Vistas para administradores (usuarios, reportes, configuración).

### Estado Global

Utilizamos Redux Toolkit para la gestión del estado global, con slices para diferentes funcionalidades:

- **Auth**: Gestión de autenticación y usuario.
- **Cart**: Estado del carrito de pedidos.
- **Notification**: Sistema de notificaciones.
- **Dashboard**: Datos para los paneles de control.

### Servicios

Los servicios manejan la comunicación con el backend:

- **API**: Cliente Axios configurado con interceptores.
- **AuthService**: Funciones de autenticación.
- **SongService**: Gestión de canciones.
- **OrderService**: Gestión de pedidos y mesas.
- **AdminService**: Funciones administrativas.

## Integración con el Backend

El frontend se comunica con el backend a través de una API RESTful:

1. **Configuración Base**: La URL base de la API está configurada en `services/api.ts`.
2. **Interceptores**: Se manejan tokens de autenticación y errores comunes.
3. **Servicios Específicos**: Cada entidad tiene su propio servicio con métodos para las diferentes operaciones.

### Flujo de Datos

1. Los componentes disparan acciones.
2. Las acciones pueden llamar a servicios que interactúan con el backend.
3. Las respuestas se procesan y se actualiza el estado global.
4. Los componentes se vuelven a renderizar con los nuevos datos.

## Gestión de Rutas

Las rutas están protegidas según el rol del usuario:

- **Rutas Públicas**: Accesibles para todos (home, login, register).
- **Rutas de Usuario**: Solo para usuarios autenticados con rol de usuario.
- **Rutas de Trabajador**: Solo para trabajadores.
- **Rutas de Administrador**: Solo para administradores.

## Estilización

Utilizamos Tailwind CSS para la estilización:

- **Componentes UI**: Diseñados con clases de Tailwind CSS.
- **Responsive**: Diseño adaptable para diferentes tamaños de pantalla.
- **Temas**: Colores primarios y secundarios configurables.

## Scripts Disponibles

```bash
# Instalación de dependencias
npm install

# Desarrollo con hot-reload
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## Contribución

1. Clona el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz tus cambios
4. Confirma tus cambios (`git commit -m 'Añadir nueva característica'`)
5. Envía tu rama (`git push origin feature/nueva-caracteristica`)
6. Abre un Pull Request