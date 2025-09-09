const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",   
  password: "a4cool@sql",  
  database: "movies_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// GET all movies
app.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST new movie
app.post("/movies", (req, res) => {
  const { title, director, genre, release_year, rating } = req.body;
  db.query(
    "INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)",
    [title, director, genre, release_year, rating],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Movie added!", id: result.insertId });
    }
  );
});

// PUT update movie
app.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, genre, release_year, rating } = req.body;
  db.query(
    "UPDATE movies SET title=?, director=?, genre=?, release_year=?, rating=? WHERE id=?",
    [title, director, genre, release_year, rating, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Movie updated!" });
    }
  );
});

// DELETE movie
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM movies WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Movie deleted!" });
  });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
