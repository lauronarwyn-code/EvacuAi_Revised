import express from 'express';
// Added .js extension
import { register, login, logout } from '../controllers/auth.js';
// Added .js extension
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (requires token to log out)
router.post('/logout', verifyToken, logout);

export default router;
