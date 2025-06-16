require('dotenv').config(); // Load biến môi trường từ .env

const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    HOST: process.env.HOST,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = env;
