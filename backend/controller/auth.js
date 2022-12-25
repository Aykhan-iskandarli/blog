const User = require("../model/auth");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res,next) => {
  const { name, email, password } = req.body;
  try {
    const exsistUser = await User.findOne({ email });
    if (exsistUser) {
      return next(new ErrorResponse("This email already exsist", 404));
    }
    const user = await User.create({
      name,
      email,
      password,
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


const sendToken = (user,statusCode,res) =>{
    const token = user.getSingedToken()
    res.status(statusCode).json({success:true,token})
}


