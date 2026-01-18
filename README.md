# Audisoft - Prueba Técnica

Sistema de gestión de estudiantes, docentes y notas desarrollado con TypeScript, Node.js/Express y Angular.

## 📁 Estructura del Proyecto

```
audisoft-prueba-tecnica/
├── audisoft-back/          # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── audisoft-front/         # Frontend (Angular 21)
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── README.md              # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Docker y Docker Compose (para la base de datos)

### Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd audisoft-prueba-tecnica
```

2. Configurar Backend:
```bash
cd "audisoft-back"
npm install
```

3. Configurar Frontend:
```bash
cd ../audisoft-front
npm install
```

### Ejecución

#### Base de Datos

El backend incluye configuración de Docker para la base de datos SQL Server:

```bash
cd "audisoft-back"
docker-compose up -d
```

#### Backend

```bash
cd "audisoft-back"
npm run dev
```

El backend estará disponible en: `http://localhost:3000`

#### Frontend

```bash
cd audisoft-front
npm start
```

El frontend estará disponible en: `http://localhost:4200`

## 🧪 Ejecutar Tests

### Tests del Backend
```bash
cd "audisoft-back"
npm test
```

### Tests del Frontend
```bash
cd audisoft-front
npm test
```

## 📚 Tecnologías Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- SQL Server
- Docker

### Frontend
- Angular 21
- PrimeNG
- RxJS
- TypeScript

## 📝 Endpoints de la API

- `GET /api/students` - Obtener estudiantes (paginado)
- `GET /api/students/:id` - Obtener estudiante por ID
- `POST /api/students` - Crear estudiante
- `PUT /api/students/:id` - Actualizar estudiante
- `DELETE /api/students/:id` - Eliminar estudiante

- `GET /api/teachers` - Obtener docentes (paginado)
- `GET /api/teachers/:id` - Obtener docente por ID
- `POST /api/teachers` - Crear docente
- `PUT /api/teachers/:id` - Actualizar docente
- `DELETE /api/teachers/:id` - Eliminar docente

- `GET /api/grades` - Obtener notas (paginado)
- `GET /api/grades/:id` - Obtener nota por ID
- `GET /api/grades/filter` - Filtrar notas por studentId o teacherId
- `POST /api/grades` - Crear nota
- `PUT /api/grades/:id` - Actualizar nota
- `DELETE /api/grades/:id` - Eliminar nota

## 🏗️ Arquitectura

### Backend (Clean Architecture)
- **Domain**: Entidades y repositorios
- **Application**: Casos de uso
- **Infrastructure**: Implementaciones de repositorios y base de datos
- **Presentation**: Controladores y rutas

### Frontend (Feature-based)
- **Features**: Módulos por funcionalidad (student, teacher, grade)
- **Shared**: Componentes y servicios compartidos
- **Core**: Servicios principales (drawer, header)

## 📄 Notas Adicionales

Para más detalles sobre cada proyecto, consulta los README.md específicos en cada carpeta.
