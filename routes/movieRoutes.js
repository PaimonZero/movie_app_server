// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/movieController");

// CRUD routes for movies
router.post("/", ctrl.createMovie); // POST /api/movies
router.get("/", ctrl.getAllMovies); // GET /api/movies
router.get("/:id", ctrl.getMovieById); // GET /api/movies/:id
router.put("/:id", ctrl.updateMovie); // PUT /api/movies/:id
router.delete("/:id", ctrl.deleteMovie); // DELETE /api/movies/:id

module.exports = router;