const User = require("../model/auth");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const dotenv = require("dotenv");
const shortID = require("shortid")

dotenv.config();

exports.register = async (req, res,next) => {
  const { name, email, password } = req.body;
  try {
    const exsistUser = await User.findOne({ email });
    if (exsistUser) {
      return next(new ErrorResponse("This email already exsist", 404));
    }

    let username = shortID.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`
    const user = await User.create({
      name,
      email,
      password,
      username,
      profile
    });
    sendToken(user,201,res)
  } catch (error) {
    next(error)
  }
};

exports.login = async (req, res,next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("This email already is not exsist", 401));
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch){
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error)
  }
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
      message: 'Signout success'
  });
};



exports.forgotPassword = async (req,res,next) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetToken = user.getResetPasswordToken()
    console.log(resetToken,"|token")



    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
      await user.save()

    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;


      return next(new ErrorResponse("Email could not be sent", 500));
    }
    await user.save();

  } catch (error) {
    next(error)
  }
};

exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user,"user")

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};



const sendToken = (user,statusCode,res) =>{
  const token = user.getSingedToken()
  res.cookie("token",token,{expiresIn:"1d"})
  // const {_id,role,email,name,username} = user
  res.status(statusCode).json({success:true,token})
}

