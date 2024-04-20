// import { Promise } from "mongoose";
import Conversation from "../models/conversationSchema.js";
import Message from "../models/message.model.js";

const sendMessage=async (req,res)=>{
    try{
        const {message}=req.body;
        const {id:receiverId}= req.params;
        const senderId=req.user._id;
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId,receiverId],
                
            })
        }

        const newMessage = new Message({
           senderId,
           receiverId,
           message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //socket io functionality

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);

        }catch(err){
        res.status(500).json({err:"internal server error"});
    }
};

const getMessages= async(req,res)=>{
    try {
        const {id:userToChatId}= req.params;
        const senderId= req.user._id;
        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}

        }).populate("messages");
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages= conversation.messages;
        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("error in getmessages :", error.message);
        res.status(500).json({error:"internal server error"});
        
    }

}
export  {sendMessage, getMessages};