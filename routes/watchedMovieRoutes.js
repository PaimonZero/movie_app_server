const express = require('express');
const router = express.Router();
const watchedCtrl = require('../controllers/watchedMovieController');

router.post("/", watchedCtrl.addWatched);
router.get("/:userId", watchedCtrl.getWatchedByUser);

module.exports = router; 