const Favorite = require('../models/FavoriteModel');

//thêm phim yêu thích
exports.addFavorite = async (req, res) => {
    try {
        const { userId, movieId, tmdbId } = req.body;
        if (!tmdbId) {
            return res.status(400).json({ message: "Thiếu tmdbId" });
        }
        // Kiểm tra đã favorite chưa (theo user + tmdbId)
        const exists = await Favorite.findOne({ user: userId, tmdbId });
        if (exists) {
            return res.status(400).json({ message: "Phim đã có trong yêu thích" });
        }
        const favorite = await Favorite.create({
            user: userId,
            movie: movieId || undefined,
            tmdbId
        });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi thêm phim yêu thích", error: err });
    }
};

//lấy tất cả phim yêu thích của user
exports.getFavoritesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await Favorite.find({ user: userId }).populate("movie");
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách yêu thích", error: err });
    }
};

//xóa phim yêu thích 
exports.removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.body;
        const deleted = await Favorite.findByIdAndDelete(favoriteId);
        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy phim yêu thích để xóa" });
        }
        res.json({ message: "Đã xóa khỏi phim yêu thích" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa phim yêu thích", error: err });
    }
};