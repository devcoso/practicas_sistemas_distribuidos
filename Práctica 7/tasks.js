const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const PORT = process.env.TASKS_PORT || 8001;
const HOST = process.env.TASKS_HOST || "localhost";
const DB_PATH = process.env.DB_PATH || "database.db";
const SECRET_KEY = process.env.SECRET_KEY || '123456789';

const app = express();
const db = new sqlite3.Database(DB_PATH);

app.use(cors());
app.use(bodyParser.json());

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT 0,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

// Middleware para autenticar el token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}
app.use(authenticateToken);

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Crear una nueva tarea
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, done: false });
    });
});

// Actualizar una tarea
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, done } = req.body;

    db.run(
        "UPDATE tasks SET title = COALESCE(?, title), done = COALESCE(?, done) WHERE id = ?",
        [title, done, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Task not found" });

            res.json({ id, title, done });
        }
    );
});

// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Task server running http://${HOST}:${PORT}`);
});
