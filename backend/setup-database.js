import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '@Ar&lau47', // Use your fixed password
  });

  try {
    console.log('Creating database...');
    // CHANGED .execute to .query
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'evacuai_db'}`);
    console.log('Database created successfully');

    await connection.query(`USE ${process.env.DB_NAME || 'evacuai_db'}`);

    console.log('Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      )
    `);

    console.log('Creating user_locations table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        lat DECIMAL(10, 8) NOT NULL,
        lng DECIMAL(11, 8) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_timestamp (timestamp)
      )
    `);

    console.log('Creating evacuation_centers table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS evacuation_centers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lat DECIMAL(10, 8) NOT NULL,
        lng DECIMAL(11, 8) NOT NULL,
        address VARCHAR(500),
        capacity INT DEFAULT 100,
        occupancy INT DEFAULT 0,
        risk_level ENUM('safe', 'moderate', 'high', 'flooded') DEFAULT 'safe',
        facilities JSON,
        contact_person VARCHAR(255),
        contact_phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_lat_lng (lat, lng)
      )
    `);

    console.log('Creating user_sessions table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_online BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id)
      )
    `);

    console.log('Inserting sample evacuation centers for Cebu...');
    const centers = [
      ['Lapu-Lapu City Sports Complex', 10.3200, 123.9800, 'Lapu-Lapu City', 500, 150, 'safe', '["Drinking water", "Medical aid", "Food"]', 'Maria Reyes', '09171234567'],
      ['Cebu City Hall Parking', 10.2968, 123.8850, 'Osmeña Blvd, Cebu City', 300, 80, 'moderate', '["Emergency supplies", "Medical"]', 'Juan Santos', '09181234567'],
      ['Fuente Osmeña Circle', 10.3020, 123.8750, 'Fuente Osmeña, Cebu City', 400, 120, 'safe', '["Shelter", "Water", "Food"]', 'Pedro Flores', '09191234567']
      // ... other centers
    ];

    for (const center of centers) {
      // .query is safer for these bulk inserts during setup
      await connection.query(
        'INSERT INTO evacuation_centers (name, lat, lng, address, capacity, occupancy, risk_level, facilities, contact_person, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        center
      );
    }
    console.log('Sample evacuation centers inserted');

    console.log('\nDatabase setup completed successfully!');

  } catch (error) {
    console.error('Error setting up database:', error.message);
  } finally {
    await connection.end();
  }
};

setupDatabase();