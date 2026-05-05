# EvacuAi Backend Setup Guide

This guide will help you set up the Node.js + Express backend with MySQL database for the EvacuAi system.

## Prerequisites

Before you start, make sure you have:
- **Node.js** (v16+) - Download from https://nodejs.org/
- **MySQL Server** (v5.7+) - Download from https://www.mysql.com/downloads/
- **npm** or **pnpm** - Comes with Node.js

## Step 1: Setup MySQL Database

### Windows:
1. Install MySQL Server from https://dev.mysql.com/downloads/mysql/
2. During installation, set root password (remember this!)
3. MySQL should run on port 3306

### Mac:
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

### Linux (Ubuntu):
```bash
sudo apt-get install mysql-server
sudo mysql_secure_installation
```

## Step 2: Create Backend Environment File

In the `backend/` folder, create a `.env` file:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your MySQL credentials:

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=evacuai_db

JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:3000
```

## Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express - Web framework
- mysql2 - MySQL driver
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin requests
- socket.io - Real-time features
- dotenv - Environment variables

## Step 4: Setup Database

Run the database setup script:

```bash
node setup-database.js
```

This will:
- Create the `evacuai_db` database
- Create all required tables:
  - `users` - User accounts and authentication
  - `user_locations` - Geolocation data
  - `evacuation_centers` - Evacuation center data (10 sample centers for Cebu)
  - `user_sessions` - Online/offline tracking

## Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (requires token)

### Users (Require authentication)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete account

### Admin (Require admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get specific user
- `PUT /api/admin/users/:userId` - Update user
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/statistics` - Get system statistics
- `GET /api/admin/locations` - Get all user locations

### Locations (Require authentication)
- `POST /api/locations/update` - Update user location
- `GET /api/locations/nearby` - Get nearby evacuation centers
- `GET /api/locations/history` - Get location history

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

### User Locations Table
```sql
CREATE TABLE user_locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

### Evacuation Centers Table
```sql
CREATE TABLE evacuation_centers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  address VARCHAR(500),
  capacity INT,
  occupancy INT,
  risk_level ENUM('safe', 'moderate', 'high', 'flooded'),
  facilities JSON,
  contact_person VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Testing with Demo Credentials

After setup, use these credentials to test:

**Admin Account:**
- Email: admin@evacuai.com
- Password: password123

**Regular User:**
- Email: user@evacuai.com
- Password: password123

## Troubleshooting

### "Cannot connect to MySQL"
- Check MySQL is running
- Verify credentials in `.env` file
- Ensure DB_HOST is correct (usually `localhost`)

### "EADDRINUSE: address already in use :::5000"
- Port 5000 is in use
- Change PORT in `.env` to 5001, 5002, etc.
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### "ER_ACCESS_DENIED_FOR_USER"
- MySQL root password is wrong
- Reset MySQL password and update `.env`

### "ER_NO_DB_ERROR: No database selected"
- Run `node setup-database.js` first

## Frontend Setup

The frontend (React app running on localhost:3000) will connect to this backend automatically. Make sure:
1. Backend is running on port 5000
2. CORS is enabled (already configured)
3. Frontend `.env` or config has `VITE_API_URL=http://localhost:5000`

## Production Deployment

For production deployment:
1. Change `JWT_SECRET` to a strong random key
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Use proper MySQL backups
5. Deploy to Heroku, Railway, or similar

## Socket.io for Real-time Updates

The server supports WebSocket connections for:
- Real-time location broadcasting
- Live user status updates
- Instant alerts

The frontend will automatically connect to Socket.io when a user is logged in.

## Next Steps

1. Frontend setup (React app)
2. Connect frontend to backend API
3. Test authentication flow
4. Test geolocation tracking
5. Test admin dashboard with real-time updates

For more help, check the main README.md or QUICKSTART.md
