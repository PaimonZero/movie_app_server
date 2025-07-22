const express = require("express")
const router = express.Router()
const authCtrl = require("../controllers/authController")

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/send-otp-reset", authCtrl.sendOtpResetPassword);
router.post("/reset-password-otp", authCtrl.resetPasswordWithOtp);

module.exports = router
