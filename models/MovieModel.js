const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            enum: ["tmdb", "manual"],
            default: "manual",
            required: true,
        },
        tmdbId: { type: Number, default: null },
        title: {
            type: String,
            required: function () {
                return this.source === "manual";
            },
        },
        overview: String,
        genres: [String],
        releaseDate: Date,
        posterUrl: String,
        trailerUrl: String,
        videoUrl: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
