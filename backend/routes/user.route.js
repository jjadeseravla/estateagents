import express from 'express';
import verifyToken from '../middleware/verifyToken.js';


import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id',verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.post('/', verifyToken, addPost); 

router.delete('/:id', verifyToken, deleteUser);

export default router;
