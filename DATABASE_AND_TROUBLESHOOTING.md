# Database Structure & Troubleshooting Guide

## Why Login Failed to Fetch

The "failed to fetch" error means the frontend cannot connect to the backend server.

### Common Causes:
1. **Backend is not running** - Most common issue
2. **MySQL is not running** - Database connection fails
3. **Wrong port** - Backend on different port
4. **CORS issues** - Frontend/backend mismatch
5. **Database not created** - Tables don't exist

---

## Solution: Step-by-Step Setup

### Step 1: Install MySQL

**Windows:**
1. Download from https://www.mysql.com/downloads/mysql/
2. Run installer
3. Choose "Server only" or "Full"
4. Installation folder: `C:\Program Files\MySQL\MySQL Server 8.0`
5. Configure MySQL Server as Windows Service
6. Choose port 3306 (default)
7. MySQL Server Instance Config Wizard
8. Set root password (remember this!)

**Mac:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Step 2: Create .env File

In the `backend` folder, create `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=evacuai_db
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_12345
```

Replace `your_mysql_password` with the password you set for MySQL root user.

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express
- mysql2
- bcryptjs
- jsonwebtoken
- cors
- socket.io
- dotenv

### Step 4: Create Database and Tables

```bash
cd backend
node setup-database.js
```

You should see:
```
Creating database...
Database created successfully
Creating users table...
Users table created
Creating user_locations table...
User locations table created
Creating evacuation_centers table...
Evacuation centers table created
Creating user_sessions table...
User sessions table created
Inserting sample evacuation centers for Cebu...
Sample evacuation centers inserted

Database setup completed successfully!
```

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Server running on http://localhost:5000
```

### Step 6: Start Frontend (in another terminal)

```bash
npm run dev
```

You should see:
```
VITE v5.4.0 ready in 234 ms
➜ Local:   http://localhost:3000/
```

### Step 7: Test Login

Go to http://localhost:3000/login

Demo accounts (created by setup-database.js):
- Email: admin@evacuai.com
- Password: admin123

Or register a new account.

---

## Database Structure

### 1. Users Table
Stores user account information.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Columns:**
- `id` - Unique user identifier
- `email` - Login email (unique)
- `password` - Hashed password (bcryptjs)
- `name` - Full name
- `phone` - Phone number
- `role` - Either 'user' or 'admin'
- `created_at` - Account creation time
- `updated_at` - Last update time

**Example Row:**
```
id: 1
email: user@evacuai.com
password: $2b$10$N9qo8uLOickgx2ZMRZoMyeABjEw13... (hashed)
name: John Doe
phone: 09171234567
role: user
created_at: 2024-04-27 12:00:00
updated_at: 2024-04-27 12:00:00
```

---

### 2. User_Locations Table
Tracks real-time user locations (geolocation history).

```sql
CREATE TABLE user_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

**Columns:**
- `id` - Unique location record
- `user_id` - Which user (references users.id)
- `lat` - Latitude (Cebu: 10.3157)
- `lng` - Longitude (Cebu: 123.8854)
- `timestamp` - When location was recorded

**Example Row:**
```
id: 1
user_id: 1
lat: 10.31234567
lng: 123.88654321
timestamp: 2024-04-27 14:30:45
```

**Cebu City Coordinates:**
- Center: 10.3157, 123.8854
- North: 10.3500, 123.9500
- South: 10.2500, 123.8200
- East: 10.3200, 123.9600
- West: 10.3100, 123.8200

---

### 3. Evacuation_Centers Table
Stores all evacuation center information (10 for Cebu).

```sql
CREATE TABLE evacuation_centers (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Columns:**
- `id` - Center identifier
- `name` - Center name
- `lat` - Latitude
- `lng` - Longitude
- `address` - Physical address
- `capacity` - Max people (e.g., 500)
- `occupancy` - Current people inside
- `risk_level` - safe/moderate/high/flooded
- `facilities` - JSON: ["Drinking water", "Medical", "Food"]
- `contact_person` - Manager name
- `contact_phone` - Manager phone

**10 Pre-populated Centers:**

1. Lapu-Lapu City Sports Complex
   - Lat: 10.3200, Lng: 123.9800
   - Capacity: 500, Risk: SAFE

2. Cebu City Hall Parking
   - Lat: 10.2968, Lng: 123.8850
   - Capacity: 300, Risk: MODERATE

3. Fuente Osmeña Circle
   - Lat: 10.3020, Lng: 123.8750
   - Capacity: 400, Risk: SAFE

4. Plaza Independencia
   - Lat: 10.3040, Lng: 123.8820
   - Capacity: 350, Risk: SAFE

5. Greenery Ecopark
   - Lat: 10.3450, Lng: 123.9050
   - Capacity: 600, Risk: MODERATE

6. San Carlos University Grounds
   - Lat: 10.3180, Lng: 123.8950
   - Capacity: 1000, Risk: SAFE

7. Abellana National School
   - Lat: 10.3100, Lng: 123.8880
   - Capacity: 450, Risk: MODERATE

8. Punta Engaño Beach Area
   - Lat: 10.3400, Lng: 123.9600
   - Capacity: 800, Risk: FLOODED

9. Banilad Town Center
   - Lat: 10.3300, Lng: 123.9100
   - Capacity: 200, Risk: HIGH

10. South Road Properties
    - Lat: 10.2850, Lng: 123.8900
    - Capacity: 700, Risk: SAFE

---

### 4. User_Sessions Table
Tracks online/offline status.

```sql
CREATE TABLE user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_online BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

**Columns:**
- `id` - Session record
- `user_id` - Which user
- `last_seen` - Last activity time
- `is_online` - Currently online? (true/false)

**Example Row:**
```
id: 1
user_id: 1
last_seen: 2024-04-27 15:00:00
is_online: true
```

---

## How Data Flows

### User Registration
1. User fills form with email, password, name, phone
2. Frontend sends to: `POST /api/auth/register`
3. Backend receives, hashes password with bcryptjs
4. Stores in `users` table
5. Returns success/error

### User Login
1. User enters email + password
2. Frontend sends to: `POST /api/auth/login`
3. Backend looks up user in `users` table
4. Compares hashed password
5. Creates JWT token
6. Stores token in browser localStorage
7. Frontend shows dashboard

### Location Tracking
1. User opens map page
2. Browser requests permission for geolocation
3. Gets latitude, longitude
4. Frontend sends to: `POST /api/locations/update`
5. Backend saves to `user_locations` table
6. Socket.io broadcasts location to all users
7. Map updates with blue dot showing user position

### Nearby Evacuation Centers
1. User's location: lat 10.3157, lng 123.8854
2. App calculates distance to each center using Haversine formula
3. Shows centers within 5km radius
4. Color-codes by risk_level from `evacuation_centers` table
5. Displays info: name, distance, capacity, facilities

---

## Troubleshooting Checklist

### Error: "Cannot GET /api/auth/login"
- Backend not running
- Fix: `npm run dev` in backend folder

### Error: "Failed to fetch"
- Backend not running or wrong URL
- MySQL not running
- Fix: Start MySQL, then start backend

### Error: "ECONNREFUSED 127.0.0.1:3306"
- MySQL not running
- Fix: `mysql.server start` (Mac) or start MySQL service (Windows)

### Error: "Unknown database 'evacuai_db'"
- Database not created
- Fix: Run `node setup-database.js`

### Error: "Table 'evacuai_db.users' doesn't exist"
- Tables not created
- Fix: Run `node setup-database.js`

### Error: "Access denied for user 'root'@'localhost'"
- Wrong MySQL password in .env
- Fix: Update DB_PASSWORD in .env file

### Login page won't load
- Frontend not running on port 3000
- Fix: `npm run dev` in project root

### Map won't show user location
- Geolocation permission denied
- Fix: Allow location in browser permissions

### Can't register new user
- Email already exists
- Password too short
- Fix: Use different email, password 8+ chars

---

## Viewing Database in MySQL

### Connect to MySQL:
```bash
mysql -u root -p
```
Enter password when prompted.

### List databases:
```sql
SHOW DATABASES;
```

### Select your database:
```sql
USE evacuai_db;
```

### View all tables:
```sql
SHOW TABLES;
```

### View users:
```sql
SELECT * FROM users;
```

### View evacuation centers:
```sql
SELECT name, lat, lng, risk_level FROM evacuation_centers;
```

### View user locations:
```sql
SELECT u.name, ul.lat, ul.lng, ul.timestamp 
FROM user_locations ul 
JOIN users u ON ul.user_id = u.id;
```

### Count online users:
```sql
SELECT COUNT(*) as online_users 
FROM user_sessions 
WHERE is_online = true;
```

---

## Summary

Your system has:

**Frontend:**
- Login/Register pages
- Real Leaflet map of Cebu
- User geolocation tracking
- Nearby evacuation center finder

**Backend:**
- Express.js API server
- JWT authentication
- CRUD operations

**Database:**
- 4 tables with relationships
- 10 evacuation centers
- User location history
- Session tracking

All user data is permanently stored in MySQL!
