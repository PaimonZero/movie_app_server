const mongoose = require('mongoose');

const watchedMovieSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }, // không required
    tmdbId: { type: String, required: true },
    watchedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WatchedMovie', watchedMovieSchema); 