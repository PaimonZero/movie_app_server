const mongoose = require("mongoose");
const env = require("./environment");

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log(">> MongoDB connected!");
    } catch (error) {
        console.error(error.message);
        process.exit;
    }
};

module.exports = connectDB;
