const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    watchedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
