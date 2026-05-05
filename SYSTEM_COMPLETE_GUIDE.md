# EvacuAi Complete System Guide

## Welcome to Your Complete Evacuation Management System!

You now have a fully-featured, production-ready evacuation management system with:
- User authentication (login/register)
- Real-time Leaflet maps showing Cebu City
- Live geolocation tracking
- User and Admin CRUD operations
- MySQL database for persistent data storage
- Real-time Socket.io updates

---

## System Architecture

```
EvacuAi/
├── Frontend (React + Vite) - Runs on http://localhost:3000
│   ├── /pages - User pages (home, login, register, map, dashboard)
│   ├── /components - React components
│   ├── /contexts - Auth context for state management
│   └── /lib - Utilities and data
│
└── Backend (Express.js) - Runs on http://localhost:5000
    ├── /routes - API endpoints
    ├── /controllers - Business logic
    ├── /middleware - Authentication & authorization
    ├── /config - Database configuration
    └── /models - Database queries
```

---

## Data Storage: MySQL Database

All user data is stored in MySQL with the following tables:

### 1. `users` table
Stores user account information:
```
id (Primary Key)
email (Unique)
password (Hashed with bcryptjs)
name
phone
role (user or admin)
created_at
updated_at
```

### 2. `user_locations` table
Stores live location data:
```
id (Primary Key)
user_id (Foreign Key)
lat (Latitude)
lng (Longitude)
timestamp (When location was recorded)
```

### 3. `evacuation_centers` table
Stores evacuation center information:
```
id (Primary Key)
name
lat / lng (Coordinates)
address
capacity
occupancy
risk_level (safe, moderate, high, flooded)
facilities (JSON array)
contact_person
contact_phone
```

### 4. `user_sessions` table
Tracks who's online:
```
id (Primary Key)
user_id
last_seen
is_online
```

---

## Feature Breakdown

### 1. Authentication System

**Login/Register Pages**
- Secure registration with password hashing
- JWT token-based authentication
- Password validation (min 6 characters)
- Email validation

**Flow:**
```
User registers → Password hashed → Stored in DB
User logs in → Password checked → JWT token generated → Token stored locally
Subsequent requests → Token sent in Authorization header
```

### 2. Real Map with Geolocation

**Leaflet Map Component**
- Shows actual OpenStreetMap tiles of Cebu City
- User's location marked with blue dot
- 10 evacuation centers marked with colored pins:
  - Green (#5B7E3C) = Safe
  - Light Green (#A2CB8B) = Moderate
  - Red (#C44545) = High Risk
  - Black (#080616) = Flooded

**Location Tracking:**
```
Geolocation.getCurrentPosition() → Get initial location
Geolocation.watchPosition() → Track location every 30 sec
Location sent to backend → Stored in DB
Backend broadcasts to all admin users via Socket.io
```

**Nearby Evacuation Centers:**
- Displays centers within 5km radius
- Calculates distance using Haversine formula
- Shows closest 3 centers with distances

### 3. User CRUD Operations

**User Profile:**
- View profile (name, email, phone, role)
- Update name and phone
- Change password (old password verified first)
- Delete account (removes all associated data)

**Admin Dashboard:**
- View all users (paginated list)
- Edit any user's information
- Delete users
- View system statistics:
  - Total users
  - Admin count
  - Regular user count
  - Currently online users

### 4. Real-time Updates with Socket.io

**Events:**
```
user-location → User sends location update
location-update → Server broadcasts to all admins
user-offline → User disconnects
```

**Admin Benefits:**
- See all active users on map in real-time
- Get alerts when users report evacuation center status
- Track user movements during emergencies

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MySQL Server (v5.7+)
- Git (optional)

### Quick Setup (5 minutes)

#### 1. Frontend Setup
```bash
# Navigate to project root
cd /path/to/evacuai-project

# Install dependencies (already done if npm install was run)
npm install

# Start frontend dev server
npm run dev

# Opens http://localhost:3000
```

#### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Create .env file with your MySQL credentials
cp .env.example .env

# Edit .env with your MySQL password:
# DB_PASSWORD=your_mysql_root_password

# Install backend dependencies
npm install

# Setup database (creates tables and sample data)
node setup-database.js

# Start backend server
npm run dev

# Opens http://localhost:5000
```

### Expected Output

**Frontend (localhost:3000):**
```
VITE v5.x.x ready in XXX ms
➜  Local:   http://localhost:3000/
```

**Backend (localhost:5000):**
```
Server running on http://localhost:5000
```

---

## Using the System

### As a Regular User

1. **Register Account**
   - Go to http://localhost:3000/register
   - Fill in: Name, Email, Phone, Password
   - Submit

2. **Login**
   - Go to http://localhost:3000/login
   - Enter email and password
   - Click Login

3. **View Map**
   - Click "Map" in header
   - You'll see Cebu City with:
     - Your location (blue dot)
     - 10 evacuation centers (colored pins)
     - Nearby centers within 5km
   - Click any center for details

4. **Report Status**
   - Click an evacuation center
   - Click "Report Status" button
   - Select risk level (Safe, Moderate, High Risk, Flooded)
   - Submit report

5. **Profile Management**
   - Click your name in header
   - View/edit your profile
   - Change password
   - Delete account

### As an Admin

1. **Login with Admin Account**
   - Email: admin@evacuai.com
   - Password: password123

2. **View Dashboard**
   - Click "Dashboard" in header
   - See real-time statistics
   - View all users

3. **Manage Users**
   - Search users in table
   - Edit user roles and information
   - Delete users if needed

4. **Monitor Live Locations**
   - See all online users' locations
   - Track movements during emergencies
   - Send broadcasts (feature available)

---

## API Reference

All API calls require JWT token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Authentication Endpoints

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+63 912 345 6789",
  "role": "user"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+63 912 345 6789",
    "role": "user"
  }
}
```

### User Endpoints

**Get Profile**
```http
GET /api/users/profile
Authorization: Bearer [token]
```

**Update Profile**
```http
PUT /api/users/profile
Authorization: Bearer [token]
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+63 912 345 6790"
}
```

**Change Password**
```http
PUT /api/users/change-password
Authorization: Bearer [token]
Content-Type: application/json

{
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

### Location Endpoints

**Update Location**
```http
POST /api/locations/update
Authorization: Bearer [token]
Content-Type: application/json

{
  "lat": 10.3157,
  "lng": 123.8854
}
```

**Get Nearby Centers**
```http
GET /api/locations/nearby?lat=10.3157&lng=123.8854&radius=5
Authorization: Bearer [token]
```

### Admin Endpoints

**Get All Users**
```http
GET /api/admin/users
Authorization: Bearer [admin-token]
```

**Get Statistics**
```http
GET /api/admin/statistics
Authorization: Bearer [admin-token]

Response:
{
  "totalUsers": 42,
  "admins": 2,
  "regularUsers": 40,
  "onlineNow": 15
}
```

**Get All Locations**
```http
GET /api/admin/locations
Authorization: Bearer [admin-token]
```

---

## Database Queries Examples

### Find nearby users within 5km
```sql
SELECT u.id, u.name, u.email, ul.lat, ul.lng,
       (6371 * acos(cos(radians(?)) * cos(radians(ul.lat)) * 
        cos(radians(ul.lng) - radians(?)) + sin(radians(?)) * 
        sin(radians(ul.lat)))) AS distance
FROM users u
JOIN user_locations ul ON u.id = ul.user_id
WHERE (6371 * acos(cos(radians(?)) * cos(radians(ul.lat)) * 
       cos(radians(ul.lng) - radians(?)) + sin(radians(?)) * 
       sin(radians(ul.lat)))) <= 5
ORDER BY distance ASC;
```

### Get evacuation center statistics
```sql
SELECT 
  SUM(capacity) as total_capacity,
  SUM(occupancy) as total_occupancy,
  COUNT(*) as total_centers,
  SUM(CASE WHEN risk_level = 'safe' THEN 1 ELSE 0 END) as safe_count
FROM evacuation_centers;
```

### Track user location history
```sql
SELECT user_id, lat, lng, timestamp
FROM user_locations
WHERE user_id = ?
ORDER BY timestamp DESC
LIMIT 100;
```

---

## Troubleshooting

### Frontend Issues

**"Cannot reach backend" error**
- Check backend is running: `npm run dev` in backend folder
- Verify port 5000 is open
- Check firewall settings

**"Login not working"**
- Check backend is running
- Verify MySQL database exists
- Check .env file in backend folder

**Map not showing location**
- Allow location permission in browser
- Check browser location services are enabled
- Some browsers require HTTPS for geolocation

### Backend Issues

**"MySQL connection refused"**
- Check MySQL is running
- Verify DB credentials in .env
- Try: `mysql -u root -p` to test MySQL

**"Cannot find module"**
- Run `npm install` in backend folder
- Check node_modules exists

**Port 5000 already in use**
- Change PORT in .env to 5001
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Database Issues

**"No database selected" error**
- Run: `node setup-database.js`
- Check for errors during execution

**"Access denied for user"**
- Verify DB_USER and DB_PASSWORD in .env
- Check MySQL root password

---

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy (automatic)
4. Update backend URL in code

### Backend (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect MySQL database (JawsDB, Planetscale, etc)
3. Set environment variables
4. Deploy

### Database
- Use managed MySQL (Heroku, DigitalOcean, AWS RDS)
- Regular backups essential
- Encrypt sensitive data

---

## File Structure Summary

```
/evacuai-system
├── frontend/
│   ├── src/
│   │   ├── pages/ (login, register, map, dashboard, home)
│   │   ├── components/ (header, forms, maps)
│   │   ├── contexts/ (AuthContext)
│   │   ├── lib/ (utilities, API calls)
│   │   └── App.tsx (routing)
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── routes/ (auth, users, admin, locations)
│   ├── controllers/ (business logic)
│   ├── middleware/ (authentication)
│   ├── config/ (database)
│   ├── server.js (main server)
│   ├── setup-database.js (DB initialization)
│   ├── package.json
│   └── .env (credentials)
│
├── BACKEND_SETUP.md
├── SYSTEM_COMPLETE_GUIDE.md (this file)
└── [other docs]
```

---

## Next Steps

1. Test the system locally
2. Create more user accounts
3. Test geolocation tracking
4. Test admin dashboard
5. Deploy to production
6. Configure SSL/HTTPS
7. Set up monitoring and logging
8. Add additional features (push notifications, SMS alerts, etc.)

---

## Support & Resources

**Documentation Files:**
- `BACKEND_SETUP.md` - Backend installation
- `QUICKSTART.md` - Quick start guide
- `README.md` - Project overview
- `SEO_GUIDE.md` - Deployment guide

**External Resources:**
- Express.js Docs: https://expressjs.com/
- React Docs: https://react.dev/
- Leaflet Docs: https://leafletjs.com/
- MySQL Docs: https://dev.mysql.com/doc/
- Socket.io Docs: https://socket.io/docs/

---

## Congratulations!

You now have a complete, fully-functional evacuation management system for Cebu City with:
✓ User authentication and profiles
✓ Real-time location tracking
✓ Interactive Leaflet maps
✓ Admin dashboard
✓ MySQL database
✓ Socket.io real-time updates

Time to deploy and save lives!
