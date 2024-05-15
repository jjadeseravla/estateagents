import express from 'express';
import { shouldBeLoggedIn, shouldBeAdmin } from '../controllers/test.controller.js';
import { veryifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// run our middleware first, called verifyToken and then continue to shouldBeLoggedIn
router.get('/should-be-logged-in', veryifyToken, shouldBeLoggedIn);

router.get('/should-be-admin', shouldBeAdmin);

export default router;