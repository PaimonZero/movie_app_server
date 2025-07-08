const Movie = require("../models/MovieModel");

// 📌 Tạo phim mới
exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: "Lỗi tạo phim", error: err });
    }
};

// 📌 Lấy tất cả phim
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy phim", error: err });
    }
};

// 📌 Lấy 1 phim theo ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ message: "Phim không tồn tại" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy phim", error: err });
    }
};

// 📌 Cập nhật phim
exports.updateMovie = async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ message: "Phim không tồn tại" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Lỗi cập nhật phim", error: err });
    }
};

// 📌 Xoá phim
exports.deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Phim không tồn tại" });
        res.json({ message: "Đã xoá phim" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xoá phim", error: err });
    }
};
