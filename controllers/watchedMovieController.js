const WatchedMovie = require('../models/WatchedMovieModel');

exports.addWatched = async (req, res) => {
    try {
        const { userId, movieId, tmdbId } = req.body;
        if (!tmdbId) {
            return res.status(400).json({ message: "Thiếu tmdbId" });
        }

        // Xóa bản ghi trùng nếu đã tồn tại
        await WatchedMovie.deleteMany({ user: userId, tmdbId: tmdbId });

        // Thêm bản ghi mới (sẽ ở đầu nếu sort theo thời gian tạo -1)
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
        const watched = await WatchedMovie.find({ user: userId })
            .populate("movie")
            .sort({ createdAt: -1 }); // Sắp xếp mới nhất lên đầu
        res.json(watched);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy lịch sử đã xem", error: err });
    }
};