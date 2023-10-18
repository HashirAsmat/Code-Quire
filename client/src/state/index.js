import {createSlice} from '@reduxjs/toolkit';

const initialState = {
mode:light,
user:null,
token:null,
posts:[]

};

//reducers are functions that help us to modify the global state , reducer can access the global state because in createSlide we have passed an object as an argument that contain initial state (global state) as a key , which stores the global state , so reducer simply access to that key ,and the state it's storing;

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setMode: (state)=>{
            state = state.mode === 'light'?'dark':'light';
        },

        //when user login , we will get that user from backend and we will send the user object to frontend , after that we will simply globalize the user object state , so that the loggedin user profile and properities is accessible to all pages and componenets ,so for that we will need to globalize the user object by sending it as a payload to the reducer, and then the reducer will modify the global state user key to the user object that was sent as a payload ...
        setLogin: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state)=>{
            state.user = null;
            state.token= null;
        },

        setFriends: (state)=>{
            //updating friends: we have a friend api that add or remove friends from the friend array and then the backend us the updated friends array as a response, 
            //here we are checking if the user is login , if user is logged in mean state.user will have some object then it will be true for if statement ,
            // now we will access the global state "user" key , user key contain the object of user that has a key of friends i-e all the user friends .
            if(state.user){
                state.user.friends = state.payload.friends;
            }
            else{
                console.log("user friends does not exists");
            }
        },
        //get all the posts
        setPosts: (state,action)=>{
            state.posts = action.payload.posts;
        },



        //whenever u hit the update api of post, backend will update a specific post and it will also return the updated post ,
        // now that updated post needs to be replaced with the old post in the state , so we pass the post _id to find the particular post 
        //with in the array and the post object is required to place it with the old object, so that's why we pass _id and post to the action payload , 
        //to update the the post array in the state object
        setPost: (state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id == action.payload._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts=updatedPosts;
        }
    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer; 