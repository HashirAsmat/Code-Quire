import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import Joi from 'joi';
import JWTService from '../services/jwtService.js'
//Minimum eight characters, at least one letter and one number:
const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

//register User
export const register = async (req,res,next)=>{
    try{
        //userRegisterSchema
        const userRegisterSchema = Joi.object({
            firstName:Joi.string().min(4).max(30).required(),
            lastName:Joi.string().min(4).max(30).required(),
            email:Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
            picturePath:Joi.string(),
            friends:Joi.array(),
            location:Joi.string(),
            occupation:Joi.string(),
            viewedProfile:Joi.number(),
            impressions:Joi.number()
        })
    const error = userRegisterSchema.validate(req.body).error;
    if(error){
        return next(error);
        //next will call the next middleware right below app.use(router);
    }
    
    //now when we are sure that body is error free we will extract information from the body;
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash =await bcrypt.hash(password,salt);

    const emailInUse = await User.exists({email});
    if (emailInUse){
        const error ={
            status:409,
            message:"Email already registered , Use another Email:"
        }
        return next(error);
    };
    const newUser = new User({
        firstName,
        firstName,
        lastName,
        email,
        password:passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random()*10000),
        impressions: Math.floor(Math.random()*10000)
    })
   
    const savedUser = await newUser.save();
    const accessToken = JWTService.signAccessToken({id:newUser._id},'120m')
    
    //send token as cookie   
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24,
            httpOnly:true,//for security purpose , to prevent XSS attack
         }); 

    res.status(201).json({savedUser});
    }
    catch(error){
       return next(error);
    }
}

