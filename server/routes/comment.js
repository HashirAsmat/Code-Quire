import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import { create, getById} from '../controller/comment.js';

//create comment
router.post('/create',auth,create);
//read comment by blog id
router.get('/:id',auth,getById);

export default router;