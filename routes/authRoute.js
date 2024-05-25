import express from "express";
import {
  registerController,
  loginController,
  testController,
  ForgotPassswordController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
// console.log("teri maa ki chut");
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
})

//protected route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
})

//Forgot-Password
router.post("/forgot-password",ForgotPassswordController);
export default router;