import User from "../models/Users.js";

//GET A PARTICULAR USER DATA
export  const getUser = async (req,res,next) => {
try{
const {id} = req.params;
const user = await User.findById(id);
if(!user){
    const error = {
        status:404,
        message:"user not found"
    }
    return next(error)
}

return res.status(200).json(user);
}
catch(error){
    return next(error);
}
}


//Getting the friendlist of a particular user
 export const getUserFriends = async (req,res,next) => {
try{
    
    const {id} = req.params;
    const user = await User.findById(id);
        if(!user){
        const error = {
            status:404,
            message:"user not found"
        }
        return next(error)
    }
    //time -> 1:06:00
    const friends = Promise.all(user.friends.map(((id) => { return User.findById(id)})));

        const formattedFriends = friends.map(
            ({id,firstName,LastName,occupation,location,picturepath}) => {
            return {id,firstName,LastName,occupation,location,picturepath};
        });
     return res.status(200).json(formattedFriends);
}
catch(error){
    return next(error)
}
}


//Update - add or remove a particular friend
export const AddRemoveFriend = async (req,res,next) => {
try{
const {id,friendId} = body.params;

const user = await User.findById(id);
const friend = await User.findById(friendId);

if(user.friends.includes(friendId)){
    user.friends = user.friends.filter((id)=>{
        return id !== friendId
     });

     //1:10:50
     friend.friends = friend.friends.filter((frndid)=>{
        return id !== frndid;
     });
}
else{
    user.friends.push(friendId);
    friend.friends.push(id);
}

//save changes to database
await user.save();
await friend.save();

const friends = Promise.all(user.friends.map(((id) => { return User.findById(id)})));

        const formattedFriends = friends.map(
            ({id,firstName,LastName,occupation,location,picturepath}) => {
            return {id,firstName,LastName,occupation,location,picturepath};
        });
        return res.status(200).json(formattedFriends);

}
    catch(error){
    return next(error);
}}