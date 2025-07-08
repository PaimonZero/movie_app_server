const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

// 📌 Lấy tất cả users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate(
            "watchedMovies favoriteMovies"
        );
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Lỗi lấy danh sách người dùng",
            error: err,
        });
    }
};

// 📌 Lấy 1 user theo ID
exports.getUserWithMovies = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("watchedMovies")
            .populate("favoriteMovies");
        if (!user)
            return res.status(404).json({ message: "Không tìm thấy user" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy user", error: err });
    }
};

// 📌 Cập nhật thông tin user
exports.updateUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        const updateData = { ...rest };

        // Nếu cập nhật mật khẩu mới
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            updateData.passwordHash = hash;
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
            }
        );

        if (!updated)
            return res.status(404).json({ message: "User không tồn tại" });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Lỗi cập nhật user", error: err });
    }
};

// 📌 Xoá user
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "User không tồn tại" });
        res.json({ message: "Đã xoá user" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xoá user", error: err });
    }
};

// 📌 Thêm phim đã xem
exports.addWatchedMovie = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $addToSet: { watchedMovies: req.params.movieId },
    });
    res.json({ message: "Đã thêm vào watched" });
};

// 📌 Thêm phim yêu thích
exports.addFavoriteMovie = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $addToSet: { favoriteMovies: req.params.movieId },
    });
    res.json({ message: "Đã thêm vào favorite" });
};

// 📌 Xoá phim khỏi yêu thích
exports.removeFavoriteMovie = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $pull: { favoriteMovies: req.params.movieId },
    });
    res.json({ message: "Đã xoá khỏi favorite" });
};
