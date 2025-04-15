const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.AUTH_PORT || 8000;
const HOST = process.env.AUTH_HOST || "localhost";
const DB_PATH = process.env.DB_PATH || "database.db";
const SECRET_KEY = process.env.SECRET_KEY || '123456789';

const db = new sqlite3.Database(DB_PATH);
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Crear tabla de usuarios si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

// Registro
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Username and password required" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User registered successfully" });
        }
    );
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ token });
    });
});

app.listen(PORT, () => {
    console.log(`Auth server corriendo en http://${HOST}:${PORT}`);
});
