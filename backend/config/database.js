import mysql from 'mysql2/promise'; // REMOVED .js from the library name

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'evacuai_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const executeQuery = async (query, values) => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export default pool;