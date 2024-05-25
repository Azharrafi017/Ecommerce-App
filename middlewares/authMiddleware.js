import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // console.log(req.token);
    const decode =JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    console.log("eeror aa gaya in require sign in me");
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    console.log("admin bhi ");
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware ",
    });
  }
};