const express = require("express")
const { register, login, forgotPassword, resetPassword, signout } = require("../controller/auth")

const router = express.Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/signout').get(signout);


router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);


module.exports = router


