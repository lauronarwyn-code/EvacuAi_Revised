import express from 'express';
// Added .js extension to the controller import
import {
  updateLocation,
  getNearbyEvacuationCenters,
  getUserLocationHistory,
} from '../controllers/locations.js';

// Added .js extension to the middleware import
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Update user's current GPS coordinates
router.post('/update', verifyToken, updateLocation);

// Get evacuation centers relative to the user's current position in Cebu
router.get('/nearby', verifyToken, getNearbyEvacuationCenters);

// Retrieve the user's past location data
router.get('/history', verifyToken, getUserLocationHistory);

export default router;