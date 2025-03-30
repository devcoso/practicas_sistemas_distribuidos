const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("tasks.db");

app.use(cors());
app.use(bodyParser.json());

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT 0
    )
`);

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

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
