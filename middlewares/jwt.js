const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const asyncHandler = require('express-async-handler');

const generateAccessToken = (_id, role) => {
    return jwt.sign({ _id, role }, env.JWT_SECRET, {
        expiresIn: '1h', // Token will expire in 60 minutes
    });
};

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // headers: {authorization: "Bearer <token>"}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, mes: 'Invalid access token!' });
            }
            // console.log(decoded);
            req.user = decoded; 
            next(); 
        });
    } else {
        return res.status(401).json({ success: false, mes: 'Require authentication!' });
    }
});

const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ success: false, mes: 'Access denied!' });
    }
    next();
};

const tokenUtils = {
    generateAccessToken,
    verifyAccessToken,
    isAdmin
};

module.exports = tokenUtils;
