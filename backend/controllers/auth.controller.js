import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateTokens.js";
export const loginUser =async (req,res)=>{
    try{
        const {username,password}= req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect= await bcryptjs.compare(password,user?.password );
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"invalid values"});
        }
        generateTokenAndSetCookies(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profielPicture:user.profielPicture,
        });


    }catch(err){
        console.log("login error",err.message);
        res.status(500).json({err:"internal server error"});
    }

    
};

export const signupUser =async (req,res)=>{
    try{
        const {fullName,username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Password doesn,t match"});
        }
        const user= await User.findOne({username});
        if(user){
            return res.status(400).json({error:"user already exists"});
        }
        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt);

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser= new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profielPicture: gender==="male"?boyProfilePic: girlProfilePic

        });
        if(newUser){
        generateTokenAndSetCookies(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profielPicture:newUser.profielPicture
        });}
        else{
            res.status(500).json({error:"invalid user data"});
        }

    }
    catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({error:"internal server error"});
    }

};

export const logoutUser =(req,res)=>{
try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});

}catch(err){
    console.log("error in logout",err.message);
    res.status(500).json({err:"internal server error"});
}
}