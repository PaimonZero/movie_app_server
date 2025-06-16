const asyncHandler = require("express-async-handler");
const env = require("../config/environment");
const User = require("../models/userModel");
const tokenUtils = require("../middlewares/jwt");

// [POST] register user
const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing input!",
        });
    }
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            mes: "User already exists!",
        });
    } else {
        // Create new user
        const newUser = await User.create({ email, password });
        return res.status(201).json({
            success: newUser ? true : false,
            mes: newUser
                ? "User created successfully!"
                : "Failed to create user!",
        });
    }
});

// [POST] login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing input!",
        });
    }
    // Check if user exists
    const userResponse = await User.findOne({ email });
    if (!userResponse) {
        return res.status(400).json({
            success: false,
            mes: "User not found!",
        });
    }
    // Check password
    const isMatch = await userResponse.isCorrectPassword(password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            mes: "Invalid credentials!",
        });
    }
    // Token generation
    const accessToken = tokenUtils.generateAccessToken(
        userResponse._id,
        userResponse.role
    );
    // Return user data (excluding password, role and refreshToken)
    const { password: _, ...userData } = userResponse.toObject();
    return res.status(200).json({
        success: true,
        accessToken,
        userData,
    });
});

// [GET] get all users (for admin)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -refreshToken -role');
    return res.status(200).json({
        success: users ? true : false,
        users,
    });
});

module.exports = {
    register,
    login,
    getAllUsers,
};
