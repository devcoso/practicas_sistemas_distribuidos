# Task AUTH API 📋🔐

Task AUTH API es un servicio web RESTful construido con **Node.js**, **Express**, **SQLite** y **JSON Web Tokens (JWT)**. Permite gestionar tareas con operaciones CRUD (Crear, Leer, Actualizar y Eliminar), con autenticación segura por tokens.

---

## 🚀 Instalación y Ejecución

### **1️⃣ Requisitos Previos**
- Tener **Node.js** instalado (versión 14 o superior).
- Tener **npm** instalado.

---

### **2️⃣ Instalar dependencias**
```bash
npm install
```

---

### **3️⃣ Configurar variables de entorno**

Crea un archivo `.env` basado en `.env.example` y coloca las variables de entorno que tu gustes.

---

### **4️⃣ Iniciar el servidor de autenticación**
```bash
node auth.js
```
📍 Corre en `http://localhost:8000`

---

### **5️⃣ Iniciar el servidor de tareas**
```bash
node tasks.js
```
📍 Corre en `http://localhost:8001`

---

## 📂 Endpoints de Autenticación (AUTH API)

### 🔐 **Registro de usuario**
**POST** `/register`

```bash
curl -X POST http://localhost:8000/register \
-H "Content-Type: application/json" \
-d '{"username": "david", "password": "1234"}'
```

📥 **Respuesta**
```json
{ "message": "Usuario registrado correctamente" }
```

---

### 🔐 **Inicio de sesión**
**POST** `/login`

```bash
curl -X POST http://localhost:8000/login \
-H "Content-Type: application/json" \
-d '{"username": "david", "password": "1234"}'
```

📥 **Respuesta**
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

> 🛡️ Este token se usa en todos los endpoints de tareas como:
> `Authorization: Bearer <token>`

---

## 📂 Endpoints de Tareas (TASKS API)

> 🛡️ Todos estos endpoints requieren autenticación con JWT en los headers:

```http
Authorization: Bearer <tu_token_aquí>
```

---

### 📋 **Obtener todas las tareas**
**GET** `/tasks`

```bash
curl http://localhost:8001/tasks \
-H "Authorization: Bearer <tu_token>"
```

📥 **Respuesta**
```json
[
  { "id": 1, "title": "Aprender Express", "done": false },
  { "id": 2, "title": "Hacer ejercicio", "done": true }
]
```

---

### ➕ **Crear una nueva tarea**
**POST** `/tasks`

```bash
curl -X POST http://localhost:8001/tasks \
-H "Authorization: Bearer <tu_token>" \
-H "Content-Type: application/json" \
-d '{"title": "Leer un libro"}'
```

📥 **Respuesta**
```json
{ "id": 3, "title": "Leer un libro", "done": false }
```

---

### 🔄 **Actualizar una tarea**
**PUT** `/tasks/:id`

```bash
curl -X PUT http://localhost:8001/tasks/3 \
-H "Authorization: Bearer <tu_token>" \
-H "Content-Type: application/json" \
-d '{"done": true}'
```

📥 **Respuesta**
```json
{ "id": 3, "title": "Leer un libro", "done": true }
```

---

### 🗑️ **Eliminar una tarea**
**DELETE** `/tasks/:id`

```bash
curl -X DELETE http://localhost:8001/tasks/3 \
-H "Authorization: Bearer <tu_token>"
```

📥 **Respuesta**
```json
{ "message": "Task deleted successfully" }
```

---

## 🛠 Tecnologías Utilizadas

- **Node.js** + **Express** (Backend)
- **SQLite** (Base de Datos)
- **JWT** (Autenticación por Token)
- **dotenv** (Variables de entorno)
- **CORS** (Manejo de políticas de acceso)
- **Body-parser** (Procesamiento de JSON en las peticiones)
