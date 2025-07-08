const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

exports.register = async (req, res) => {
    try {
        const { email, password, avatarUrl, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email đã tồn tại" });

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            passwordHash: hash,
            avatarUrl,
            role,
        });

        res.json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email không tồn tại" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

        return res.json({
            message: "Đăng nhập thành công",
            user: {
                _id: user._id,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createdAt: user.createdAt,
                role: user.role,
            },
            token: "mock-token", // bạn có thể bỏ hoặc thêm JWT sau
        });
    } catch (err) {
        console.error("🔥 Login Error:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};
