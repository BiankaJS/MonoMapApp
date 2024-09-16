# MonoApi (Node.js con TypeScript y Clean Architecture)

Este proyecto es una API RESTful construida con Node.js y TypeScript, siguiendo los principios de **Clean Architecture**. La API proporciona un CRUD completo para registrar casos de virus del mono y un servicio adicional para visualizar los casos en los últimos 7 días. Además, se integra con **Docker** y **GitHub Actions** para facilitar la implementación y la automatización de pruebas.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias](#dependencias)
- [Uso](#uso)
- [Docker](#docker)
- [GitHub Actions](#github-actions)

## Requisitos

- [Node.js](https://nodejs.org/) v14 o superior
- [Docker](https://www.docker.com/) (opcional)
- [Git](https://git-scm.com/)

Asegúrate de tener instalado **Node.js** y **npm** (Node Package Manager). También puedes optar por ejecutar el proyecto en **Docker** para evitar la configuración manual del entorno.

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
```

### Instalar dependencias

```bash
npm install
```

### Variables de entorno

Renombra el archivo `.env.example` a `.env` y configura las variables de entorno:

```bash
cp .env.example .env
```

Ejemplo de archivo `.env`:

```env
MONGO_URL=mongodb://localhost:27017/miapp
PORT=3000
MAIL_SERVICE=gmail
MAIL_USER=tu_email@gmail.com
MAIL_SECRET_KEY=tu_clave_secreta
MAPBOX_ACCESS_TOKEN=tu_token_mapbox
```

### Iniciar la aplicación

Para iniciar el servidor en modo de desarrollo:

```bash
npm run dev
```

Para iniciar el servidor en modo de producción:

```bash
npm run build
npm start
```

## Estructura del Proyecto

Este proyecto sigue la estructura de **Clean Architecture**, organizando el código en capas bien definidas:

```
src/
│
├── config/           # Configuraciones generales y carga de variables de entorno
├── data/             # Implementación de acceso a datos (repositorios, modelos)
├── domain/           # Entidades y casos de uso (lógica de negocio)
├── presentation/     # Controladores, rutas, validaciones y respuestas HTTP
└── app.ts            # Punto de entrada de la aplicación
```

### Carpetas principales:

- **config**: Contiene la configuración de la aplicación, como la carga de variables de entorno.
- **data**: Aquí se encuentran los repositorios de acceso a la base de datos y la interacción con las fuentes de datos (utilizando **Mongoose**).
- **domain**: Lógica de negocio, entidades y casos de uso.
- **presentation**: Controladores, rutas y todo lo relacionado con la presentación de datos (respuesta HTTP).

## Dependencias

Las principales dependencias utilizadas en este proyecto son:

- **[cors](https://www.npmjs.com/package/cors)**: Middleware para habilitar CORS en la API.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Manejo de variables de entorno.
- **[env-var](https://www.npmjs.com/package/env-var)**: Validación y lectura de variables de entorno.
- **[express](https://www.npmjs.com/package/express)**: Framework minimalista para crear aplicaciones web y API.
- **[mongoose](https://mongoosejs.com/)**: ODM para trabajar con MongoDB.
- **[node-cron](https://www.npmjs.com/package/node-cron)**: Programación de tareas cron en Node.js.
- **[nodemailer](https://www.npmjs.com/package/nodemailer)**: Envío de correos electrónicos.
- **[axios](https://www.npmjs.com/package/axios)**: Cliente HTTP para realizar solicitudes a APIs externas.
- **[rimraf](https://www.npmjs.com/package/rimraf)**: Eliminación de archivos y directorios de forma segura.

## Uso

La API proporciona las siguientes funcionalidades:

### CRUD para Casos de Virus del Mono

- **POST /api/cases/new**: Registrar un nuevo caso de virus del mono.
- **GET /api/cases**: Obtener todos los casos registrados.
- **GET /api/cases/:id**: Obtener detalles de un caso específico por ID.
- **PUT /api/cases/:id**: Actualizar un caso existente por ID.
- **DELETE /api/cases/:id**: Eliminar un caso existente por ID.

### Visualizar Casos en los Últimos 7 Días

- **GET /api/cases/recent**: Obtener todos los casos registrados en los últimos 7 días.

## Docker

El proyecto incluye un archivo `Dockerfile` y `docker-compose.yml` para facilitar la ejecución y despliegue en contenedores.

### Construir la imagen Docker

```bash
docker build -t miapp .
```

### Ejecutar con Docker Compose

Para levantar tanto la aplicación como la base de datos MongoDB, utiliza `docker-compose`:

```bash
docker-compose up -d
```

Esto levantará los contenedores y la aplicación estará disponible en `http://localhost:3001`.

### Detener los contenedores

```bash
docker-compose down
```

## GitHub Actions

Este proyecto incluye un flujo de trabajo automatizado con **GitHub Actions**. El pipeline incluye:

- Ejecución de pruebas unitarias.
- Validación de código.
- Construcción de la imagen Docker.

El archivo de configuración de GitHub Actions se encuentra en `.github/workflows/publish.yml`.
