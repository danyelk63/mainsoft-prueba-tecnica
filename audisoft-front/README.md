# Audisoft Front - Angular Application

Frontend desarrollado con Angular 21 para la gestión de estudiantes, docentes y notas.

## 🚀 Tecnologías Utilizadas

- Angular 21
- PrimeNG
- RxJS
- TypeScript
- Angular Forms (Reactive Forms)

## 📁 Estructura del Proyecto

```
audisoft-front/
├── src/
│   ├── app/
│   │   ├── core/              # Servicios y componentes principales
│   │   │   ├── header/
│   │   │   └── services/
│   │   ├── features/          # Módulos por funcionalidad
│   │   │   ├── grade/
│   │   │   ├── student/
│   │   │   └── teacher/
│   │   ├── shared/            # Componentes compartidos
│   │   │   └── table/
│   │   └── pages/             # Páginas adicionales
│   └── environments/          # Configuración de entornos
├── angular.json
├── package.json
└── tsconfig.json
```

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Backend API ejecutándose en `http://localhost:3000`

## 🔧 Instalación

1. Desde la raíz del monorepo, navegar al frontend:
```bash
cd audisoft-front
```

2. Instalar dependencias:
```bash
npm install
```

## 🏃 Ejecución

### Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

### Build de Producción

```bash
npm run build
# o
ng build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## 🧪 Tests

### Ejecutar Tests Unitarios

```bash
npm test
# o
ng test
```

### Ejecutar Tests en Modo Watch

```bash
npm test -- --watch
```

### Ejecutar Tests una Sola Vez

```bash
npm test -- --watch=false
```

## ⚙️ Configuración

El proyecto utiliza variables de entorno para configurar la URL de la API. Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

Para producción, edita `src/environments/environment.prod.ts`.

## 📚 Características

- **Arquitectura Feature-based**: Organización por funcionalidades
- **Componentes Reutilizables**: Tabla genérica, drawer, header
- **Reactive Forms**: Formularios reactivos con validación
- **PrimeNG**: Componentes UI de PrimeNG
- **RxJS**: Manejo de observables y operadores
- **Tests Unitarios**: Cobertura de componentes y servicios

## 🎨 Componentes Principales

- **Table**: Componente reutilizable para tablas con paginación
- **Grade**: Gestión de notas (grades)
- **Student**: Gestión de estudiantes
- **Teacher**: Gestión de docentes
- **Drawer**: Componente lateral para mostrar detalles

## 📡 Integración con API

El frontend se comunica con el backend mediante:

- **HttpStudentService**: Servicio HTTP para estudiantes
- **HttpTeacherService**: Servicio HTTP para docentes
- **HttpGradeService**: Servicio HTTP para notas

Todos los servicios incluyen paginación y manejo de errores.

## 🔍 Rutas

- `/students` - Gestión de estudiantes
- `/teachers` - Gestión de docentes
- `/grades` - Gestión de notas

## 📝 Scripts Disponibles

```bash
npm start          # Inicia servidor de desarrollo
npm run build      # Compila para producción
npm test           # Ejecuta tests unitarios
npm run lint       # Ejecuta linter (si está configurado)
```

## 📄 Notas Adicionales

Este proyecto forma parte del monorepo de Audisoft. Para más información sobre el backend y la configuración general, consulta el README.md principal en la raíz del monorepo.
