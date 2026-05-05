import express from 'express';
import { executeQuery } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const centers = await executeQuery('SELECT * FROM evacuation_centers');
    res.json(centers);
  } catch (error) {
    console.error('Error fetching centers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;