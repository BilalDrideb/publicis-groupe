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

```
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
├── package.json
└── README.md
```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd back-end
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp environment/.env.example environment/.env
```

Editar `environment/.env` si es necesario (por defecto usa SQLite en puerto 3001).

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3001` y sincronizará la base de datos automáticamente.

### 5. Ejecutar en producción

```bash
npm start
```

---

## 📡 Endpoints

### `POST /leads`
Registra un nuevo lead.

**Body (JSON):**
```json
{
  "full_name": "Ana García",
  "email": "ana.garcia@example.com",
  "birth_date": "1995-06-15",
  "location_id": 1,
  "campaign_id": 1
}
```

**Respuesta exitosa `201`:**
```json
{
  "data": {
    "id": 1,
    "full_name": "Ana García",
    "email": "ana.garcia@example.com",
    "birth_date": "1995-06-15",
    "location_id": 1,
    "campaign_id": 1,
    "createdAt": "2024-05-09T11:00:00.000Z"
  },
  "message": "Lead created successfully"
}
```

**Error de validación `400`:**
```json
{ "message": "birth_date must be in ISO format YYYY-MM-DD" }
```

**Email duplicado `409`:**
```json
{ "message": "A lead with this email already exists" }
```

---

### `GET /leads/reports/leads-by-city`
Total de leads por ciudad, ordenado de mayor a menor.

**Respuesta `200`:**
```json
{
  "data": [
    { "city": "Madrid", "total_leads": 42 },
    { "city": "Barcelona", "total_leads": 31 }
  ],
  "message": "success"
}
```

---

### `GET /leads/reports/leads-by-campaign`
Total de leads por campaña, ordenado de mayor a menor.

**Respuesta `200`:**
```json
{
  "data": [
    { "campaign": "Summer 2024", "total_leads": 55 },
    { "campaign": "Black Friday", "total_leads": 18 }
  ],
  "message": "success"
}
```

---

## 🏗️ Arquitectura en capas

```
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

---

## 📝 Notas de desarrollo

- Las tablas se crean/actualizan automáticamente al arrancar (`sequelize.sync({ alter: true })`)
- Para poblar la BD con datos de prueba, inserta manualmente registros en `locations` y `campaigns` antes de crear leads
