const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const sendMail = require("../utils/sendMail");
const { mailResetPassword } = require("../templates/resetPasswordEmail");

exports.register = async (req, res) => {
    try {
        const { email, password, avatarUrl } = req.body;

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email đã tồn tại" });

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hash,
            avatarUrl: avatarUrl || "https://avatar.iran.liara.run/public",
            role: "user",
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

exports.sendOtpResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email không tồn tại" });

        // Tạo OTP 6 số
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendMail(email, {
            subject: "MovieApp - Reset Password OTP",
            html: mailResetPassword(otp),
            text: `Your OTP code is: ${otp}`,
        });

        res.json({ message: "OTP đã được gửi về email" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi gửi OTP", error: err.message });
    }
};

exports.resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email, otp });

        if (!user) return res.status(400).json({ message: "OTP không đúng" });
        if (!user.otpExpires || user.otpExpires < new Date())
            return res.status(400).json({ message: "OTP đã hết hạn" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi đổi mật khẩu", error: err.message });
    }
};