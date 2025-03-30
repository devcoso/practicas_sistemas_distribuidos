# Task API 📋

Task API es un servicio web RESTful construido con **Node.js**, **Express** y **SQLite**. Permite gestionar tareas con operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

## 🚀 Instalación y Ejecución

### **1️⃣ Requisitos Previos**
- Tener **Node.js** instalado (versión 14 o superior).
- Tener **npm** instalado.

### **2️⃣ Instalar dependencias**
```bash
    npm install
```

### **3️⃣ Iniciar el servidor**
```bash
    node server.js
```
El servidor correrá en `http://localhost:3000`.

---

## 📂 Endpoints

### 🔹 **Obtener todas las tareas**
**GET** `/tasks`
```bash
curl http://localhost:3000/tasks
```
📥 **Respuesta**
```json
[
  { "id": 1, "title": "Aprender Express", "done": false },
  { "id": 2, "title": "Hacer ejercicio", "done": true }
]
```

---

### 🔹 **Crear una nueva tarea**
**POST** `/tasks`
```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Leer un libro"}' http://localhost:3000/tasks
```
📥 **Respuesta**
```json
{ "id": 3, "title": "Leer un libro", "done": false }
```

---

### 🔹 **Actualizar una tarea**
**PUT** `/tasks/:id`
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"done": true}' http://localhost:3000/tasks/3
```
📥 **Respuesta**
```json
{ "id": 3, "title": "Leer un libro", "done": true }
```

---

### 🔹 **Eliminar una tarea**
**DELETE** `/tasks/:id`
```bash
curl -X DELETE http://localhost:3000/tasks/3
```
📥 **Respuesta**
```json
{ "message": "Task deleted successfully" }
```

---

## 🛠 Tecnologías Utilizadas
- **Node.js** + **Express** (Backend)
- **SQLite** (Base de Datos)
- **CORS** (Manejo de políticas de acceso)
- **Body-parser** (Procesamiento de JSON en las peticiones)