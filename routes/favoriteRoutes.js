const express = require('express');
const router = express.Router();
const favoriteCtrl = require('../controllers/favoriteController');

//thêm vào phim yêu thích
router.post("/", favoriteCtrl.addFavorite);

//lấy dánh sách phim yêu thích của user
router.get("/:userId", favoriteCtrl.getFavoritesByUser);

//xóa phim khỏi yêu thích
router.delete("/", favoriteCtrl.removeFavorite);

module.exports = router;
