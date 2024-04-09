const express=require("express");
require("dotenv").config();
const dbConnect=require("./config/dataBase");
const bookRouter=require("./router/bookRouter");
const reviewRouter=require("./router/reviewRouter");
const userRouter=require("./router/userRouter");
const cookieParser=require("cookie-parser");

PORT=process.env.PORT||4000;
dbConnect();

app=express()
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/book",bookRouter);
app.use("/api/review/",reviewRouter);

app.listen(PORT, ()=>{
    console.log(`app is listning at ${PORT}`);
})