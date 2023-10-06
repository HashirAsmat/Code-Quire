import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Post'
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }
}, {timestamps:true})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;