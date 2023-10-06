import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import { getUser, getUserFriends, AddRemoveFriend } from '../controller/user.js';

router.get('/:id', auth, getUser);
router.get('/:id/friends', auth, getUserFriends);
router.get('/:id/:friendId', auth, AddRemoveFriend);
export default router;