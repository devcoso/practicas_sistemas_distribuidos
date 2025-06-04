const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.AUTH_PORT || 8000;
const HOST = process.env.AUTH_HOST || "0.0.0.0";
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
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", service: "auth-service" });
});

// Registro
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        
        await pool.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Username already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE username = ?", 
            [username]
        );
        
        if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = rows[0];
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            SECRET_KEY, 
            { expiresIn: "24h" }
        );
        
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verificar token
app.get("/verify", (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Invalid token format" });
        }
        
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid token" });
            res.json({ message: "Token is valid", user });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicializar y arrancar servidor
initDatabase().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Auth server running on http://${HOST}:${PORT}`);
    });
});