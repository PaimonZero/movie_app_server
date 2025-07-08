const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/movieController")

router.post("/", ctrl.createMovie)
router.get("/", ctrl.getAllMovies)
router.get("/:id", ctrl.getMovieById)
router.put("/:id", ctrl.updateMovie)
router.delete("/:id", ctrl.deleteMovie)

module.exports = router
