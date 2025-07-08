const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
  {
    posterUrl: { type: String, required: true },
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    runtime: { type: Number, required: true },
    rating: { type: Number, required: true },
    voteCount: { type: Number, required: true },
    overview: { type: String, required: true },
    genres: [{ type: String }],
    budgetUSD: { type: Number, default: 0 },
    revenueUSD: { type: Number, default: 0 },
    productionCompany: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Movie", movieSchema)
