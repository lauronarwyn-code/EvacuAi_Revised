import express from 'express';
// Added .js extension to the controller import
import { getProfile, updateProfile, updatePassword, deleteAccount } from '../controllers/users.js';

// Added .js extension to the middleware import
import { verifyToken, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Get the current logged-in user's profile data
router.get('/profile', verifyToken, getProfile);

// Update profile details (Name, Phone, etc.)
router.put('/profile', verifyToken, updateProfile);

// Securely update the user's password
router.put('/change-password', verifyToken, updatePassword);

// Permanently delete the user's account from the system
router.delete('/account', verifyToken, deleteAccount);

export default router;