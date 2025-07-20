require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const os = require("os");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hàm lấy địa chỉ IPv4 cục bộ
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      const { family, address, internal } = iface;
      if (family === "IPv4" && !internal) {
        return address;
      }
    }
  }
  return "127.0.0.1"; // fallback
}

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    const HOST = getLocalIpAddress(); // lấy IP tự động

    app.listen(PORT, HOST, () =>
      console.log(`🚀 Server running at http://${HOST}:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
