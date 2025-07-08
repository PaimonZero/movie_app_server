const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/userController")

router.get("/", ctrl.getAllUsers)
router.get("/:id", ctrl.getUserWithMovies)
router.put("/:id", ctrl.updateUser)
router.delete("/:id", ctrl.deleteUser)

router.post("/:id/watched/:movieId", ctrl.addWatchedMovie)
router.post("/:id/favorite/:movieId", ctrl.addFavoriteMovie)
router.delete("/:id/favorite/:movieId", ctrl.removeFavoriteMovie)

module.exports = router
