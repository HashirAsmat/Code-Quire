import User from "../models/Users.js";

//GET A PARTICULAR USER DATA
export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            const error = {
                status: 404,
                message: "user not found"
            }
            return next(error)
        }

        return res.status(200).json(user);
    }
    catch (error) {
        return next(error);
    }
}


//Getting the friendlist of a particular user
export const getUserFriends = async (req, res, next) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            const error = {
                status: 404,
                message: "user not found"
            }
            return next(error)
        }
        //time -> 1:06:00
        const friendsIds = user.friends;

        Promise.all(friendsIds.map(id => User.findById(id)))   //Bug fixed with the help of chatGPT
        .then(friends => {
          // Now 'friends' is an array of user objects
          const formattedFriends = friends.map(({ id, firstName, lastName, occupation, location, picturepath }) => {
            return { id, firstName, lastName, occupation, location, picturepath };
          })
          return res.status(200).json(formattedFriends);
        });
       
    }
    catch (error) {
        return next(error)
    }
}


//Update - add or remove a particular friend
export const AddRemoveFriend = async (req, res, next) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => {
                return id !== friendId
            });

            //1:10:50
            friend.friends = friend.friends.filter((frndid) => {
                return id !== frndid;
            });
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        //save changes to database
        await user.save();
        await friend.save();

        const friendsIds = user.friends;
        Promise.all(friendsIds.map(id => User.findById(id)))   
        .then(friends => {
          // Now 'friends' is an array of user objects
          const formattedFriends = friends.map(({ id, firstName, lastName, occupation, location, picturepath }) => {
            return { id, firstName, lastName, occupation, location, picturepath };
          })
          return res.status(200).json(formattedFriends);
        });

    }
    catch (error) {
        return next(error);
    }
}