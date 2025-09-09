const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 Get these from your Supabase project settings
const SUPABASE_URL = "https://fkxnxuhsakdiqgtfvlis.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZreG54dWhzYWtkaXFndGZ2bGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODU5MDcsImV4cCI6MjA3Mjk2MTkwN30.y-YwTtcFfS3hO2an_rTyYBVIHTmH_1eqwo5EphVTz-8";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// GET all movies
app.get("/movies", async (req, res) => {
  const { data, error } = await supabase.from("movies").select("*");
  if (error) return res.status(500).json(error);
  res.json(data);
});

// POST new movie
app.post("/movies", async (req, res) => {
  const { title, director, genre, release_year, rating } = req.body;
  const { data, error } = await supabase.from("movies").insert([
    { title, director, genre, release_year, rating }
  ]);
  if (error) return res.status(500).json(error);
  res.json({ message: "Movie added!", data });
});

// PUT update movie
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { title, director, genre, release_year, rating } = req.body;
  const { data, error } = await supabase
    .from("movies")
    .update({ title, director, genre, release_year, rating })
    .eq("id", id);
  if (error) return res.status(500).json(error);
  res.json({ message: "Movie updated!", data });
});

// DELETE movie
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("movies").delete().eq("id", id);
  if (error) return res.status(500).json(error);
  res.json({ message: "Movie deleted!" });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
