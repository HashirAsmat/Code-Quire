import Joi from "joi";
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
 import Comment from "../models/Comment.js";
// const CommentDTO = require('../dto/comment');


export const create = async  (req,res,next)=>{
const createCommentSchema = Joi.object({
content:Joi.string().required(),
post:Joi.string().regex(mongodbIdPattern).required(),
author:Joi.string().regex(mongodbIdPattern).required()
});

const {error} = createCommentSchema.validate(req.body);
if(error){
    return next(error);
}
const {content,post,author} = req.body; //post refer to post id , while author refer to user id
try{
const newComment =  new Comment({
    content,
    post,
    author
});
await newComment.save();
res.status(201).json({message:'comment created!', comment:newComment});
}
catch(error){
return next(error)
}
}

 export const getById = async (req,res,next) => {
    const getByIdSchema = Joi.object({
        id:Joi.string().regex(mongodbIdPattern).required()
        });
        const {error} = getByIdSchema.validate(req.params);
        if(error){
            return next(error);
        }
        const {id} = req.params;
        try{
            const comments = await Comment.find({post:id}).populate('author');
            res.status(200).json({comments});
        }
        
        catch(error){
            return next(error)
        }
}


