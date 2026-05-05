import { executeQuery } from '../config/database.js';

export const updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    await executeQuery(
      'INSERT INTO user_locations (user_id, lat, lng, timestamp) VALUES (?, ?, ?, NOW())',
      [req.user.id, lat, lng]
    );

    res.json({ message: 'Location updated' });
  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ message: 'Error updating location' });
  }
};

export const getNearbyEvacuationCenters = async (req, res) => {
  const { lat, lng, radius = 5 } = req.query;

  try {
    const centers = await executeQuery(
      `SELECT id, name, lat, lng, capacity, occupancy, risk_level, distance
       FROM evacuation_centers
       WHERE (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) <= ?
       ORDER BY distance ASC`,
      [lat, lng, lat, radius]
    );

    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nearby centers' });
  }
};

export const getUserLocationHistory = async (req, res) => {
  try {
    const locations = await executeQuery(
      'SELECT lat, lng, timestamp FROM user_locations WHERE user_id = ? ORDER BY timestamp DESC LIMIT 50',
      [req.user.id]
    );

    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location history' });
  }
};
