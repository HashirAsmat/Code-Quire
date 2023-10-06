import mongoose from "mongoose";
//time: 1:19:06 -> Data Model.

const PostSchema = new mongoose.Schema({
userId:{
    type: String,
    required:true,
},
firstName:{
    type:String,
    required:true,
},
lastName:{
    type:String,
    required:true,
},
location:String,
description:String,
userPicturePath:String,
picturePath:String,

likes:{
    type:Map,
    of:Boolean,
},
}, {timestamps:true} );

const Post = mongoose.model('Post', PostSchema);
export default Post;












// type: Map:  (source ChatGPT)
// In Mongoose, the type: Map is used to define a field that can store key-value pairs,
// similar to a JavaScript object. Each key in the map can be of any data type, and each 
//value can also be of any data type. This is a flexible way to store structured data
// within a single field. For example, in your schema, the likes field can store information
// about which users have liked a post.


// In this case, likes is a Map where the keys are expected to be strings (user IDs), and the 
//values are expected to be Booleans. You could set the value for each user ID key to true if they have liked the post or false if they haven't.

// of: Boolean:
// The of property is used in conjunction with the type: Map to specify the data type of the values that can be stored in the map. In your schema, you've specified of: Boolean, which means that the values stored in the likes map must be Booleans.
// For example, if you were to use this schema to create a post document, you could store likes as follows:
// const post = new Post({
//     userId: "123",
//     firstName: "John",
//     lastName: "Doe",
//     likes: {
//         "user1": true,
//         "user2": false,
//         "user3": true,
//     },
// });
