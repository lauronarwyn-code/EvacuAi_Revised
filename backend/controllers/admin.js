import { executeQuery } from '../config/database.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT id, email, name, phone, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await executeQuery(
      'SELECT id, email, name, phone, role, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, phone, role } = req.body;

  try {
    await executeQuery(
      'UPDATE users SET name = ?, phone = ?, role = ? WHERE id = ?',
      [name, phone, role, userId]
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await executeQuery('SELECT id FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await executeQuery('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const totalUsers = await executeQuery('SELECT COUNT(*) as count FROM users');
    const adminCount = await executeQuery('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    const userCount = await executeQuery('SELECT COUNT(*) as count FROM users WHERE role = "user"');
    const onlineUsers = await executeQuery('SELECT COUNT(*) as count FROM user_sessions WHERE is_online = 1');

    res.json({
      totalUsers: totalUsers[0].count,
      admins: adminCount[0].count,
      regularUsers: userCount[0].count,
      onlineNow: onlineUsers[0].count,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

export const getUserLocations = async (req, res) => {
  try {
    const locations = await executeQuery(
      'SELECT user_id, lat, lng, timestamp FROM user_locations ORDER BY timestamp DESC LIMIT 100'
    );
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
};
