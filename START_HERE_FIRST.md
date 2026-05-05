# START HERE FIRST - EvacuAi Complete System

Welcome! You have just built a complete evacuation management system for Cebu City. This guide will help you get started.

---

## What You Have

A **production-ready** evacuation management system with:
- User authentication (login/register with MySQL)
- Real Leaflet maps with Cebu City geolocation tracking
- Admin dashboard with user management
- Real-time Socket.io updates
- Persistent MySQL database
- Responsive mobile design

---

## Quick Start (5 Minutes)

### 1. Prerequisites
- **Node.js** installed (v16+) from https://nodejs.org/
- **MySQL Server** installed from https://www.mysql.com/downloads/
- Project already has React frontend

### 2. Setup Backend Database

```bash
# Navigate to backend
cd backend

# Create environment file
cp .env.example .env

# IMPORTANT: Edit .env file with your MySQL password
# Open .env and change:
#   DB_PASSWORD=your_mysql_root_password_here

# Install backend dependencies
npm install

# Setup database (creates tables, sample data)
node setup-database.js

# Start backend server
npm run dev
```

You should see: `Server running on http://localhost:5000`

### 3. Start Frontend

In a NEW terminal window:

```bash
# From root directory
npm run dev
```

You should see: `Local: http://localhost:3000/`

### 4. Test It!

Go to http://localhost:3000 and:
1. Click "Register" to create an account
2. Login with your account
3. Click "Map" to see Cebu City with geolocation
4. Click your user name to see profile

---

## Documentation Guide

Read these files in order:

### 1. **This File** (You are here)
   - Overview and quick start

### 2. **QUICK_SETUP.txt**
   - Simple checklist format
   - Command reference
   - Troubleshooting tips

### 3. **WHAT_YOU_HAVE.md**
   - Complete feature list
   - Architecture overview
   - Data storage explanation
   - What's included

### 4. **SYSTEM_COMPLETE_GUIDE.md**
   - Detailed usage guide
   - API reference
   - Database queries
   - Deployment instructions

### 5. **BACKEND_SETUP.md**
   - Step-by-step backend installation
   - Database schema details
   - API endpoint documentation
   - Production deployment

### 6. **README.md**
   - Project overview
   - Getting started
   - Features list

---

## Test with Demo Accounts

After setup, login with:

**Admin Account:**
- Email: admin@evacuai.com
- Password: password123

Can do: View all users, edit/delete users, see statistics

**Regular User:**
- Email: user@evacuai.com
- Password: password123

Can do: Use map, report locations, update profile

---

## System Architecture

```
Frontend (React)         Backend (Express)         Database (MySQL)
  localhost:3000  ←→  localhost:5000  ←→  evacuai_db
  
Pages:                Routes:                Tables:
- Home              /api/auth              users
- Login             /api/users             user_locations
- Register          /api/admin             evacuation_centers
- Map (with geo)    /api/locations         user_sessions
- Dashboard (admin)
```

### Data Flow Example:

1. User logs in at `/login` page
2. Frontend sends credentials to `/api/auth/login`
3. Backend checks MySQL users table
4. Password validated with bcryptjs
5. JWT token returned
6. Frontend stores token locally
7. Token used for all future requests
8. Admin dashboard shows real-time user data from MySQL

---

## Key Features Explained

### 1. User Authentication
- Secure login/register system
- Password hashing with bcryptjs
- JWT token-based auth
- Protected routes (only logged-in users can access)

### 2. Real Map with Geolocation
- Shows actual map of Cebu City (Leaflet.js)
- Your location shown as blue dot
- 10 evacuation centers marked with pins
- Color-coded by safety level:
  - Green = Safe
  - Light Green = Moderate
  - Red = High Risk
  - Black = Flooded
- Shows nearby centers within 5km
- Real-time location tracking

### 3. MySQL Database
ALL data is permanently stored:
- User accounts (email, name, phone, hashed password)
- Location history (lat, lng, timestamp)
- Evacuation center info (10 pre-populated)
- Online/offline status

Example:
```
User registration → Password hashed → Stored in MySQL
User logs in → Password checked → Access granted
Location update → Saved to DB → Persists forever
Admin views stats → Queries MySQL → Shows real data
```

### 4. Admin Dashboard
- See all registered users
- Edit/delete users
- View real-time statistics
- Monitor live locations
- Manage system

---

## Files Overview

### Frontend Files (React)
- `src/pages/login.tsx` - Login page
- `src/pages/register.tsx` - Registration page
- `src/pages/map.tsx` - Map with geolocation
- `src/pages/dashboard.tsx` - Admin dashboard
- `src/components/cebu-leaflet-map.tsx` - Real Leaflet map
- `src/contexts/AuthContext.tsx` - Authentication state

### Backend Files (Express)
- `backend/server.js` - Main server
- `backend/routes/auth.js` - Auth endpoints
- `backend/routes/users.js` - User endpoints
- `backend/routes/admin.js` - Admin endpoints
- `backend/routes/locations.js` - Geolocation endpoints
- `backend/config/database.js` - MySQL connection

### Configuration
- `backend/.env` - Backend environment variables
- `backend/setup-database.js` - Database initialization

---

## How to Use Features

### As a Regular User:

1. **Sign Up**
   - Go to http://localhost:3000/register
   - Fill in name, email, phone, password
   - Click "Create Account"

2. **Login**
   - Go to http://localhost:3000/login
   - Enter email and password
   - Click "Login"

3. **View Map**
   - Click "Map" in header
   - Grant location permission when prompted
   - See your location and nearby evacuation centers
   - Click any center to see details

4. **Report Status**
   - Click an evacuation center
   - Click "Report Status"
   - Select status (Safe, Moderate, High, Flooded)
   - Submit

5. **View Profile**
   - Click your name in header
   - See your profile information
   - Can update name/phone
   - Can change password

### As an Admin:

1. **Login**
   - Use admin@evacuai.com / password123

2. **View Dashboard**
   - Click "Dashboard" in header
   - See real-time statistics
   - View all users in table

3. **Manage Users**
   - Search for users by name/email
   - Edit user information
   - Delete users if needed
   - See their roles (admin/user)

4. **Monitor Locations**
   - See all live user locations
   - Track movements
   - View location history

---

## Common Issues & Fixes

### "Cannot connect to backend"
```bash
# Check backend is running
cd backend
npm run dev

# If port 5000 is already in use, change in .env:
PORT=5001
npm run dev
```

### "MySQL connection failed"
```bash
# Check MySQL is running
# Windows: Check Services for MySQL
# Mac: brew services list
# Linux: sudo systemctl status mysql

# Check credentials in backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
```

### "Database setup failed"
```bash
# Make sure MySQL is running first, then:
cd backend
node setup-database.js
```

### "Location not showing"
- Give browser permission to access location
- Ensure HTTPS or localhost (browsers require)
- Some browsers disable on HTTP

---

## Database Structure

All data is in MySQL, persistently stored:

**Users Table**
- id, email, password (hashed), name, phone, role
- Role can be "user" or "admin"

**Locations Table**
- user_id, latitude, longitude, timestamp
- Tracks every location update

**Evacuation Centers Table**
- 10 pre-populated Cebu locations
- name, latitude, longitude, capacity, occupancy, risk_level

**Sessions Table**
- Tracks who's online right now

---

## Next Steps

1. **Complete Setup** (5 min)
   - Install MySQL
   - Setup backend (.env file)
   - Start backend and frontend

2. **Test System** (10 min)
   - Create test account
   - Login and use map
   - Test admin dashboard

3. **Review Code** (optional)
   - Read documentation files
   - Understand API endpoints
   - Explore React components

4. **Deploy** (when ready)
   - Push to GitHub
   - Deploy frontend to Vercel
   - Deploy backend to Heroku/Railway
   - Use managed MySQL database

---

## Getting Help

### Read These Files:
1. `QUICK_SETUP.txt` - Command reference
2. `WHAT_YOU_HAVE.md` - Feature list and architecture
3. `SYSTEM_COMPLETE_GUIDE.md` - Detailed usage guide
4. `BACKEND_SETUP.md` - Backend installation details

### Check Logs:
- Terminal where backend is running
- Browser Developer Console (F12)
- MySQL error logs

### Common Errors:
- Port already in use → Change PORT in .env
- MySQL password wrong → Update .env with correct password
- CORS error → Check CLIENT_URL in backend .env

---

## Tech Stack Overview

**Frontend:**
- React 19 - UI framework
- Vite 5 - Fast build tool
- React Router 6 - Page navigation
- Leaflet.js - Real maps
- Tailwind CSS - Styling
- Socket.io - Real-time updates

**Backend:**
- Express.js - Web framework
- Node.js - Runtime
- MySQL - Database
- JWT - Authentication
- bcryptjs - Password hashing

**Database:**
- MySQL 5.7+
- 4 tables with relationships
- Persistent data storage

---

## What's Already Done

✓ React frontend with login/register
✓ Express backend with API
✓ MySQL database setup script
✓ User authentication system
✓ Real Leaflet map with geolocation
✓ Admin dashboard
✓ User management CRUD
✓ Socket.io real-time setup
✓ Error handling
✓ Input validation
✓ Protected routes
✓ Responsive design
✓ Documentation

---

## You're Ready!

Everything is set up and ready to go. Follow the **Quick Start** section above and you'll have the system running in 5 minutes.

### Quick Commands:

```bash
# Terminal 1: Start Backend
cd backend
npm install  # First time only
node setup-database.js  # First time only
npm run dev

# Terminal 2: Start Frontend
npm run dev  # In root directory

# Then open: http://localhost:3000
```

---

## Questions?

Everything is documented. Check:
- `QUICK_SETUP.txt` - Quick reference
- `SYSTEM_COMPLETE_GUIDE.md` - Complete guide
- `BACKEND_SETUP.md` - Backend details
- `WHAT_YOU_HAVE.md` - Full feature list

---

**Let's get started! Your evacuation system is ready to deploy and save lives.** 🚀

Next: Go to **QUICK_SETUP.txt** for command-by-command instructions.
