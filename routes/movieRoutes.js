const router = require("express").Router();
const ctrls = require("../controllers/movieController");
const tokenUtils = require("../middlewares/jwt");

// Lấy chi tiết phim theo ID
router.get("/:id", tokenUtils.verifyAccessToken, ctrls.getMovieById);
// Sửa phim manual
router.put(
    "/:id",
    tokenUtils.verifyAccessToken,
    tokenUtils.isAdmin,
    ctrls.updateMovie
);
// Xoá phim manual
router.delete(
    "/:id",
    tokenUtils.verifyAccessToken,
    tokenUtils.isAdmin,
    ctrls.deleteMovie
);
// Tạo phim manual (chỉ admin)
router.post("/", tokenUtils.verifyAccessToken, tokenUtils.isAdmin, ctrls.createMovie);
// Lấy danh sách phim
router.get("/", tokenUtils.verifyAccessToken, ctrls.getMovies);

module.exports = router;
