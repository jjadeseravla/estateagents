import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getPosts, getPost, addPost, updatePost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/', verifyToken, addPost);
router.get('/:id', verifyToken, updatePost);
router.get('/:id', verifyToken, deletePost);

export default router;