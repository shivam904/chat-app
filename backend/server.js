import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app= express();
const PORT= process.env.PORT ;


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);



app.get("/",(req,res)=>{
    res.send("hello");
});


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)});


