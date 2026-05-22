import express from "express";
import { registerUser, loginUser, logoutUser, verifyUser } from "../controllers/userController.js";
import { isAuth } from "../middleware/authController.js";
const userRouter= express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.delete('/logout', logoutUser);
userRouter.get('/verify', verifyUser);

userRouter.get('/dashboard',isAuth,(req,res)=>{
    console.log("Access Granted")
});

export default userRouter;