const router = require('express').Router();
const ctrls = require('../controllers/userController');
const tokenUtils = require('../middlewares/jwt');

// [POST] Register user
router.post('/register', ctrls.register);
// [POST] Login user
router.post('/login', ctrls.login);
// [GET] Get all users
router.get('/', [tokenUtils.verifyAccessToken, tokenUtils.isAdmin], ctrls.getAllUsers);

module.exports = router;