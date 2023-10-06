import Post from '../models/Post.js';
import User from '../models/Users.js';
import Joi from 'joi';
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;


export const createPost = async (req,res,next)=>{
try{

    //validate req.body
    const createPostSchema = Joi.object({
        picturePath:Joi.string(),
        description:Joi.string(),
        userId:Joi.string().regex(mongodbIdPattern).required(),
    });

    const {error} = createPostSchema.validate(req.body);
    if (error){
        return next(error);
    }

    const {userId,description,picturePath} = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{},
    })
    await newPost.save();
    //get all the posts now  time -> (1:27:50)
    const allPosts = await Post.find();
    return res.status(201).json({Posts:allPosts});

}
catch(error){
return next(error);
}
}



export const getFeedPosts = async (req,res,next) =>{
try{
    const posts = await Post.find();
    if(!posts){
        res.json({posts: "no posts available"});
    }
    res.status(200).json(posts);
}
   
catch(error){
return next(error);
}
}



export const getUserPosts = async (req,res,next) =>{
try{
const {userId} = req.params;
const userPosts = await Post.find({userId});
if(!userPosts){
    res.json({posts: "no posts available"});
}
res.status(200).json(userPosts);
}
catch(error){
   return next(error); 
}
}

export const likePosts = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);  //1:32:00
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true)
        
        }
        const updatedPost = await Post.findByIdAndUpdate(id,
            {likes:post.likes},
            {new:true}
            )
            res.status(200).json(updatedPost);
        }   
    catch(error){
    return next(error);
    }
}

