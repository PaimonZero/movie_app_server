const Movie = require("../models/MovieModel");
const asyncHandler = require("express-async-handler");

// Tạo phim manual (chỉ admin)
const createMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(movie);
});

// Lấy danh sách phim
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Lấy chi tiết phim theo tmdbId
const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findOne({ tmdbId: req.params.id });
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
});

// Sửa phim manual
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.source === "tmdb") {
        return res.status(403).json({ error: "Cannot edit TMDB movie" });
    }

    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.json(updated);
});

// Xoá phim manual
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.source === "tmdb") {
        return res.status(403).json({ error: "Cannot delete TMDB movie" });
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
};
