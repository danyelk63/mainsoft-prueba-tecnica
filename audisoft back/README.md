# Audisoft Back - API REST con Arquitectura Hexagonal

API REST desarrollada en Node.js con TypeScript, implementando arquitectura hexagonal (ports and adapters) para la gestión de estudiantes, profesores y notas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
- [Migraciones](#migraciones)
- [Docker](#docker)
- [Endpoints de la API](#endpoints-de-la-api)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## 🚀 Características

- Arquitectura hexagonal (ports and adapters)
- TypeScript para tipado estático
- TypeORM para gestión de base de datos
- SQL Server como base de datos
- Migraciones automáticas
- Docker y Docker Compose para contenedorización
- RESTful API
- Validación de llaves foráneas
- CORS habilitado para todos los orígenes
- Paginación opcional en endpoints de listado

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal** (también conocida como Ports and Adapters), que separa la lógica de negocio de los detalles técnicos mediante:

### Capas de la Arquitectura

1. **Domain Layer** (`src/domain/`)
   - **Entities**: Entidades puras de dominio (Estudiante, Profesor, Nota)
   - **Repositories**: Interfaces que definen los contratos de acceso a datos

2. **Application Layer** (`src/application/`)
   - **Use Cases**: Casos de uso que implementan la lógica de negocio
   - Cada caso de uso es independiente y reutilizable

3. **Infrastructure Layer** (`src/infrastructure/`)
   - **Database Entities**: Entidades de TypeORM para mapeo a base de datos
   - **Repositories**: Implementaciones concretas de los repositorios
   - **Migrations**: Migraciones de base de datos

4. **Presentation Layer** (`src/presentation/`)
   - **Controllers**: Controladores que manejan las peticiones HTTP
   - **Routes**: Definición de rutas REST

### Diagrama de Flujo

```
HTTP Request → Routes → Controller → Use Case → Repository Interface
                                                      ↓
                                              Repository Implementation
                                                      ↓
                                                 Database (SQL Server)
```

## 📁 Estructura del Proyecto

```
audisoft-back/
├── src/
│   ├── application/              # Capa de aplicación (casos de uso)
│   │   └── use-cases/
│   │       ├── estudiante/
│   │       ├── profesor/
│   │       └── nota/
│   ├── config/                   # Configuraciones
│   │   └── data-source.ts        # Configuración de TypeORM
│   ├── domain/                   # Capa de dominio
│   │   ├── entities/             # Entidades de dominio
│   │   └── repositories/         # Interfaces de repositorios
│   ├── infrastructure/           # Capa de infraestructura
│   │   ├── database/
│   │   │   ├── entities/         # Entidades de TypeORM
│   │   │   └── migrations/       # Migraciones de base de datos
│   │   └── repositories/         # Implementaciones de repositorios
│   ├── presentation/             # Capa de presentación
│   │   ├── controllers/          # Controladores REST
│   │   └── routes/               # Rutas de la API
│   └── index.ts                  # Punto de entrada de la aplicación
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- SQL Server 2022 o superior (o usar Docker)
- Docker y Docker Compose (opcional, para desarrollo con contenedores)

## 🔧 Instalación

### Opción 1: Instalación Local

1. Clonar el repositorio (si aplica) o asegurarse de estar en el directorio del proyecto

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (ver sección [Configuración](#configuración))

4. Iniciar la base de datos SQL Server

5. Ejecutar migraciones:
```bash
npm run migration:run
```

6. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

### Opción 2: Usando Docker (Recomendado)

1. Construir e iniciar los contenedores:
```bash
docker-compose up --build
```

Esto iniciará automáticamente:
- Base de datos SQL Server
- API Node.js
- Ejecutará las migraciones automáticamente

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourStrong!Passw0rd
DB_DATABASE=audisoft_db
DB_ENCRYPT=false

# Server Configuration
PORT=3000
NODE_ENV=development
```

Si usas Docker, estas variables se configuran automáticamente a través de `docker-compose.yml`.

## 🗄️ Base de Datos

### Esquema de Base de Datos

#### Tabla: `estudiante`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, IDENTITY) | Identificador único |
| nombre | VARCHAR(255) | Nombre del estudiante |

#### Tabla: `profesor`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, IDENTITY) | Identificador único |
| nombre | VARCHAR(255) | Nombre del profesor |

#### Tabla: `nota`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, IDENTITY) | Identificador único |
| nombre | VARCHAR(255) | Nombre de la nota |
| id_profesor | INT (FK) | Referencia a profesor.id |
| id_estudiante | INT (FK) | Referencia a estudiante.id |
| valor | NUMERIC(10,2) | Valor numérico de la nota |

### Restricciones de Llaves Foráneas

- `FK_nota_profesor`: `nota.id_profesor` → `profesor.id`
  - `ON DELETE RESTRICT`: No permite eliminar un profesor si tiene notas asociadas
  - `ON UPDATE CASCADE`: Actualiza automáticamente las referencias si cambia el ID del profesor

- `FK_nota_estudiante`: `nota.id_estudiante` → `estudiante.id`
  - `ON DELETE RESTRICT`: No permite eliminar un estudiante si tiene notas asociadas
  - `ON UPDATE CASCADE`: Actualiza automáticamente las referencias si cambia el ID del estudiante

## 🔄 Migraciones

El proyecto incluye tres migraciones que se ejecutan en el siguiente orden:

1. **CreateEstudianteTable** (1703000000001): Crea la tabla `estudiante`
2. **CreateProfesorTable** (1703000000002): Crea la tabla `profesor`
3. **CreateNotaTable** (1703000000003): Crea la tabla `nota` con sus llaves foráneas

### Comandos de Migración

```bash
# Ejecutar migraciones pendientes
npm run migration:run

# Revertir la última migración
npm run migration:revert

# Generar una nueva migración (después de cambiar entidades)
npm run migration:generate -- -n NombreMigracion
```

## 🐳 Docker

### Docker Compose

El proyecto incluye un archivo `docker-compose.yml` que configura:

- **Servicio `db`**: Contenedor SQL Server 2022
- **Servicio `app`**: Contenedor con la API Node.js

### Comandos Docker

```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Construir e iniciar
docker-compose up --build

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v

# Ver logs
docker-compose logs -f app
```

### Dockerfile

El `Dockerfile` está optimizado para producción:
- Usa Node.js 18 Alpine (imagen ligera)
- Instala dependencias
- Compila TypeScript
- Expone el puerto 3000

## 🌐 Endpoints de la API

Base URL: `http://localhost:3000/api`

**Nota:** La API tiene CORS habilitado para todos los orígenes. Todos los endpoints de listado (`GET /api/estudiantes`, `GET /api/profesores`, `GET /api/notas`) soportan paginación opcional mediante query parameters `page` y `limit`.

### Estudiantes

#### Crear Estudiante
```
POST /api/estudiantes
Content-Type: application/json

{
  "nombre": "Juan Pérez"
}
```

#### Obtener Todos los Estudiantes
```
GET /api/estudiantes
GET /api/estudiantes?page=1&limit=10
```

**Paginación:**
- `page`: Número de página (default: 1)
- `limit`: Cantidad de resultados por página (default: 10)

**Respuesta sin paginación:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez"
  }
]
```

**Respuesta con paginación:**
```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Obtener Estudiante por ID
```
GET /api/estudiantes/:id
```

#### Actualizar Estudiante
```
PUT /api/estudiantes/:id
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez"
}
```

#### Eliminar Estudiante
```
DELETE /api/estudiantes/:id
```

### Profesores

#### Crear Profesor
```
POST /api/profesores
Content-Type: application/json

{
  "nombre": "Dr. García"
}
```

#### Obtener Todos los Profesores
```
GET /api/profesores
GET /api/profesores?page=1&limit=10
```

**Paginación:** Ver sección de Estudiantes para formato de respuesta.

#### Obtener Profesor por ID
```
GET /api/profesores/:id
```

#### Actualizar Profesor
```
PUT /api/profesores/:id
Content-Type: application/json

{
  "nombre": "Dr. Carlos García"
}
```

#### Eliminar Profesor
```
DELETE /api/profesores/:id
```

### Notas

#### Crear Nota
```
POST /api/notas
Content-Type: application/json

{
  "nombre": "Examen Final",
  "idProfesor": 1,
  "idEstudiante": 1,
  "valor": 85.5
}
```

**Validaciones:**
- `idProfesor` debe existir en la tabla `profesor`
- `idEstudiante` debe existir en la tabla `estudiante`

#### Obtener Todas las Notas
```
GET /api/notas
GET /api/notas?page=1&limit=10
```

**Paginación:** Ver sección de Estudiantes para formato de respuesta.

#### Obtener Nota por ID
```
GET /api/notas/:id
```

#### Actualizar Nota
```
PUT /api/notas/:id
Content-Type: application/json

{
  "nombre": "Examen Final Actualizado",
  "idProfesor": 1,
  "idEstudiante": 1,
  "valor": 90.0
}
```

#### Eliminar Nota
```
DELETE /api/notas/:id
```

### Health Check

```
GET /health
```

Respuesta:
```json
{
  "status": "OK",
  "message": "API is running"
}
```

## 📝 Ejemplos de Uso con cURL

### Crear un Estudiante
```bash
curl -X POST http://localhost:3000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Pérez"}'
```

### Crear un Profesor
```bash
curl -X POST http://localhost:3000/api/profesores \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Dr. García"}'
```

### Crear una Nota
```bash
curl -X POST http://localhost:3000/api/notas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Examen Final",
    "idProfesor": 1,
    "idEstudiante": 1,
    "valor": 85.5
  }'
```

### Obtener Todos los Estudiantes
```bash
curl http://localhost:3000/api/estudiantes
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor en modo desarrollo con hot-reload

# Producción
npm run build           # Compila TypeScript a JavaScript
npm start               # Inicia servidor de producción

# Migraciones
npm run migration:run   # Ejecuta migraciones pendientes
npm run migration:revert # Revierte la última migración
npm run migration:generate -- -n NombreMigracion  # Genera nueva migración
```

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **TypeScript**: Superset tipado de JavaScript
- **Express**: Framework web para Node.js
- **TypeORM**: ORM para TypeScript y JavaScript
- **SQL Server**: Base de datos relacional
- **Docker**: Contenedorización
- **Docker Compose**: Orquestación de contenedores

## 📚 Notas Adicionales

- La arquitectura hexagonal permite cambiar fácilmente la implementación de la base de datos o el framework web sin afectar la lógica de negocio
- Las migraciones aseguran que el esquema de la base de datos esté versionado y sea reproducible
- Las restricciones de llaves foráneas garantizan la integridad referencial de los datos
- El proyecto está preparado para escalar y agregar nuevas funcionalidades siguiendo los mismos patrones

## 📄 Licencia

ISC
