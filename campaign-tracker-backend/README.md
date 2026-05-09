# 🎯 The Campaign Tracker – Backend API

API REST para el registro y análisis de leads de campañas de marketing.

---

## 🛠️ Stack

| Tecnología   | Rol                                |
|--------------|------------------------------------|
| Node.js      | Runtime                            |
| Express      | Framework HTTP                     |
| Sequelize    | ORM                                |
| SQLite       | Base de datos (dev)                |
| Zod          | Validación y sanitización de inputs|
| Helmet       | Cabeceras HTTP seguras             |
| CORS         | Control de acceso de origen        |
| Morgan       | Logging de requests                |

---

## 📁 Estructura del proyecto

```text
back-end/
├── environment/
│   ├── .env                  ← variables de entorno (no commitear)
│   └── .env.example          ← plantilla pública
├── src/
│   ├── config/
│   │   ├── database.js       ← instancia Sequelize
│   │   └── env.js            ← carga y exporta variables de entorno
│   ├── middlewares/
│   │   └── errorHandler.js   ← manejo centralizado de errores
│   ├── modules/
│   │   ├── campaigns/
│   │   │   └── campaign.model.js
│   │   ├── locations/
│   │   │   └── location.model.js
│   │   └── leads/
│   │       ├── lead.controllers.js  ← recibe req, devuelve res
│   │       ├── lead.model.js        ← modelo Sequelize
│   │       ├── lead.repository.js   ← acceso a base de datos
│   │       ├── lead.routes.js       ← definición de rutas
│   │       ├── lead.schema.js       ← esquemas Zod
│   │       └── lead.service.js      ← lógica de negocio
│   ├── server.js             ← factory de la app Express
├── main.js                   ← punto de entrada, sync DB + start server
├── seed.js                   ← script para poblar la base de datos con datos de prueba
├── package.json
└── README.md
```

---

## 🚀 Instalación y ejecución

### 1. Instalar dependencias

```bash
cd campaign-tracker-backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo para crear tus variables de entorno locales:

```bash
cp environment/.env.example environment/.env
```

Editar `environment/.env` si es necesario (por defecto usa SQLite y arranca en el puerto 3001).

### 3. Poblar la Base de Datos (Seeding)

Para crear automáticamente localizaciones, campañas y leads de prueba, ejecuta el siguiente script:

```bash
node seed.js
```
*Nota: Este script sincronizará las tablas y poblará la base de datos con información inicial.*

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3001` y sincronizará la base de datos automáticamente (usando nodemon para reiniciar ante cambios).

### 5. Ejecutar en producción

```bash
npm start
```

### 6. Ejecutar con Docker

Si prefieres usar Docker, asegúrate de tenerlo instalado y ejecuta los siguientes comandos desde la carpeta raíz del backend:

**1. Construir la imagen:**
```bash
docker build -t campaign-tracker-backend .
```

**2. Levantar el contenedor:**
```bash
docker run -p 3001:3001 --name campaign-tracker-backend campaign-tracker-backend
```

*(La base de datos SQLite se creará dentro del contenedor, por lo que debes ejecutar `node seed.js` dentro del mismo o configurar un volumen si necesitas persistencia avanzada).*

---

## 📡 Endpoints Principales

### `POST /api/leads`
Registra un nuevo lead. Requiere `full_name`, `email`, `birth_date`, `location_id`, y `campaign_id`.

### `GET /api/leads/reports/leads-by-city`
Devuelve el total de leads por ciudad, ordenado de mayor a menor.

### `GET /api/leads/reports/leads-by-campaign`
Devuelve el total de leads por campaña, ordenado de mayor a menor.

### `GET /api/campaigns`
Devuelve la lista de campañas disponibles.

### `GET /api/locations`
Devuelve la lista de localizaciones disponibles.

---

## 🏗️ Arquitectura en capas

```text
Request → Controller → Service → Repository → DB
                  ↑         ↑
               Zod       AppError
             (schema)   (middleware)
```

| Capa        | Responsabilidad                                       |
|-------------|-------------------------------------------------------|
| Controller  | Recibe `req`, delega al service, devuelve `res`       |
| Service     | Lógica de negocio, validación Zod, reglas de dominio  |
| Repository  | Queries Sequelize, sin lógica                         |
| Schema      | Definiciones Zod por operación                        |
| Middleware  | Manejo centralizado de errores                        |

---

## 🔒 Seguridad

- **Helmet** – cabeceras HTTP seguras
- **Zod** – validación estricta antes de cualquier operación de negocio
- **Sequelize ORM** – previene SQL injection mediante queries parametrizadas
- **Sanitización** – strings con `.trim()` y email en `.toLowerCase()`
- **Sin exposición de errores internos** – el error handler nunca filtra stack traces en producción

---

## 🗄️ Base de datos

Por defecto usa **SQLite** (archivo `campaign_tracker.sqlite` en la raíz del proyecto).
Para usar **PostgreSQL**, edita `src/config/database.js` siguiendo las instrucciones comentadas en el archivo y configura las variables en `.env`.
