// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

// CRUD routes for users
router.get("/", ctrl.getAllUsers); // GET /api/users
router.get("/:id", ctrl.getUserWithMovies); // GET /api/users/:id
router.put("/:id", ctrl.updateUser); // PUT /api/users/:id
router.delete("/:id", ctrl.deleteUser); // DELETE /api/users/:id

// Routes for watched and favorite movies
router.get("/:id/watched", ctrl.getWatchedMovies); // GET /api/users/:id/watched
router.get("/:id/favorite", ctrl.getFavoriteMovies); // GET /api/users/:id/favorite
router.post("/:id/watched/:movieId", ctrl.addWatchedMovie); // POST /api/users/:id/watched/:movieId
router.post("/:id/favorite/:movieId", ctrl.addFavoriteMovie); // POST /api/users/:id/favorite/:movieId
router.delete("/:id/favorite/:movieId", ctrl.removeFavoriteMovie); // DELETE /api/users/:id/favorite/:movieId

module.exports = router;