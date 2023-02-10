const jwt = require("jsonwebtoken")
const User = require("../model/auth");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req,res,next) =>{
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)
        if(!user){
            return next(new ErrorResponse("No user found with this id", 404))
        }
        
        req.user = user
        next()
    } catch (error) {
        return next(new ErrorResponse("Token invalid", 401))
    }
}

exports.adminMiddleWare = (req, res, next) => {
  const adminUserId = req.user._id;
  console.log(adminUserId,"adminUserId")
  User.findById(
    { _id: adminUserId }.exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== 1) {
        return res.status(400).json({
          error: "Admin resource access denied",
        });
      }

      req.profile = user;
      next();
    })
  );
};

exports.authmiddleWare = (req, res, nex) => {
    const userId = req.user._id;
    console.log(userId,"userid")
    User.findById(
      { _id: userId }.exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User not found",
          });
        }
        req.profile = user;
        next();
      })
    );
  };