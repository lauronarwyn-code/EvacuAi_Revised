import express from 'express';
// Ensure the .js extension is present at the end of the file paths
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStatistics,
  getUserLocations,
} from '../controllers/admin.js';

// Ensure the .js extension is present for the middleware import as well
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route for getting all users
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

// Route for getting a specific user by ID
router.get('/users/:userId', verifyToken, verifyAdmin, getUserById);

// Route for updating user information
router.put('/users/:userId', verifyToken, verifyAdmin, updateUser);

// Route for deleting a user
router.delete('/users/:userId', verifyToken, verifyAdmin, deleteUser);

// Route for system-wide statistics (e.g., total evacuations, active users)
router.get('/statistics', verifyToken, verifyAdmin, getStatistics);

// Route for viewing all real-time user locations on the admin map
router.get('/locations', verifyToken, verifyAdmin, getUserLocations);

export default router;