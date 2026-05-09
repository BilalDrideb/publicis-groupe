# 🎯 The Campaign Tracker – Frontend

Interfaz de usuario para el registro y análisis de leads de campañas de marketing. Desarrollado con Nuxt 4, Vue 3, Pinia y TailwindCSS.

---

## 🛠️ Stack Tecnológico

| Tecnología      | Rol                                |
|-----------------|------------------------------------|
| Nuxt 4 / Vue 3  | Framework de aplicación y UI       |
| Pinia           | Gestión de estado global           |
| TailwindCSS     | Estilos y diseño responsivo        |
| Yup             | Validación de esquemas (formularios)|
| Vue Sonner      | Notificaciones Toast               |

---

## 🚀 Instalación y ejecución

### 1. Requisitos previos

- Node.js (v18 o superior)
- El servidor Backend ejecutándose (por defecto en `http://localhost:3001`).

### 2. Clonar e Instalar dependencias

```bash
cd campaign-tracker-frontend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del frontend (puedes basarte en tus necesidades, pero por defecto el backend corre en el puerto 3001):

```bash
NUXT_PUBLIC_API_BASE_URL="http://localhost:3001/api"
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3000`.

*(Nota: Si hiciste cambios recientes al `.env` o experimentas errores de rutas como `/undefined/campaigns`, asegúrate de detener el servidor de Vite y volver a arrancar con `npm run dev` para limpiar la caché).*

---

## 📁 Estructura Principal

- `app/api/`: Servicios que hacen peticiones HTTP (fetch) al backend (e.g. `lead.service.ts`, `campaign.service.ts`, `location.service.ts`).
- `app/components/`: Componentes UI reutilizables (`LeadForm.vue`, `PerformanceGrid.vue`, etc.).
- `app/interfaces/`: Tipos e interfaces de TypeScript.
- `app/pages/`: Rutas y vistas de la aplicación Nuxt.
- `app/stores/`: Stores de Pinia para manejar el estado (`leads.ts`, `campaigns.ts`, `locations.ts`).
- `app/validations/`: Esquemas de validación con Yup (`lead.schema.ts`).
