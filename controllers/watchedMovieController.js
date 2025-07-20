const WatchedMovie = require('../models/WatchedMovieModel');

exports.addWatched = async (req, res) => {
    try {
        const { userId, movieId, tmdbId } = req.body;
        if (!tmdbId) {
            return res.status(400).json({ message: "Thiếu tmdbId" });
        }
        // Không cần kiểm tra trùng, vì lịch sử có thể lưu nhiều lần
        const watched = await WatchedMovie.create({
            user: userId,
            movie: movieId || undefined,
            tmdbId
        });
        res.status(201).json(watched);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi thêm vào lịch sử đã xem", error: err });
    }
};

exports.getWatchedByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const watched = await WatchedMovie.find({ user: userId }).populate("movie");
        res.json(watched);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy lịch sử đã xem", error: err });
    }
}; 