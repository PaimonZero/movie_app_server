const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        tmdbId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Favorite', favoriteSchema);