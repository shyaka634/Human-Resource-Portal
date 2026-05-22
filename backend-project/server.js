import express from "express";
import session from "express-session";
import cors from "cors";
import sequelize,{connectDB} from "./config/db.js";
import employeeRouter from "./Routes/employeeRoute.js";
import postRouter from "./Routes/postRoute.js";
import userRouter from "./Routes/userRoute.js";
const app= express();
connectDB();
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(session({
    secret:"My-banana",
    saveUninitialized:false,
    resave:false,
    cookie:{secure:false}
}))

app.use('/api/auth', userRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/post', postRouter)

import userSchema from "./models/userModel.js";
import postSchema from "./models/postModel.js";
import employeeSchema from "./models/employeeModel.js";

sequelize.sync()
console.error("Database synced")

app.listen(2000,()=>{
    console.log("Listen to port 2000");
})
