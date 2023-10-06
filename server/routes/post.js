import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import { getFeedPosts,getUserPosts,likePosts} from '../controller/post.js';

//Read
router.get('/', auth, getFeedPosts);
router.get('/:userId/posts',getUserPosts);

//update
router.patch('/:id/like',auth,likePosts);


//in Express.js, the patch method is an HTTP method that is used to partially update an existing resource. 
//It is one of the standard HTTP methods along with get, post, put, delete, and others. 
//The patch method is typically used when you want to update only specific fields or properties 
//of a resource without replacing the entire resource.

export default router;