const express=require("express");
const userModel=require("../model/userModel");
const {signUp, login}=require("../controller/userController")

const userRouter=express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/login",login);



module.exports=userRouter;