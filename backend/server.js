const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "todo_db"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database");
  }
});

db.query(`
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL
)
`);

app.get("/api/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

app.post("/api/todos", (req, res) => {
  const { task } = req.body;

  db.query("INSERT INTO todos (task) VALUES (?)", [task], err => {
    if (err) {
      return res.status(500).json({ error: "Insert failed" });
    }
    res.json({ message: "Todo added" });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
