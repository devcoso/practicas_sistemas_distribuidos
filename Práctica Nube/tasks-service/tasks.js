const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.TASKS_PORT || 8001;
const HOST = process.env.TASKS_HOST || "0.0.0.0";
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

// Configuración de MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'todoapp',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Función para inicializar la base de datos
async function initDatabase() {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                done BOOLEAN DEFAULT 0,
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Middleware para autenticar el token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", service: "tasks-service" });
});

// Aplicar middleware de autenticación a todas las rutas excepto health
app.use((req, res, next) => {
    if (req.path === '/health') {
        return next();
    }
    authenticateToken(req, res, next);
});

// Obtener todas las tareas del usuario
app.get("/tasks", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT tasks.id, tasks.title, tasks.done, tasks.created_at, tasks.updated_at, users.username 
             FROM tasks 
             INNER JOIN users ON tasks.user_id = users.id
             WHERE tasks.user_id = ?
             ORDER BY tasks.created_at DESC`,
            [req.user.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const [result] = await pool.execute(
            "INSERT INTO tasks (title, user_id) VALUES (?, ?)", 
            [title, req.user.id]
        );

        res.status(201).json({ 
            id: result.insertId, 
            title, 
            done: false, 
            username: req.user.username 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una tarea
app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, done } = req.body;

        const [result] = await pool.execute(
            "UPDATE tasks SET title = COALESCE(?, title), done = COALESCE(?, done) WHERE id = ? AND user_id = ?",
            [title, done, id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found or access denied" });
        }

        res.json({ id: parseInt(id), title, done });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?", 
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found or access denied" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicializar y arrancar servidor
initDatabase().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Tasks server running on http://${HOST}:${PORT}`);
    });
});