# Fix: Login "Failed to Fetch" Error

## Why This Happens

When you click "Login", your browser tries to send data to the backend API at `http://localhost:5000/api/auth/login`. The "Failed to fetch" error means:

**The backend server is NOT running**

You're only running the frontend (port 3000), but NOT the backend (port 5000).

---

## The Fix: Start Your Backend Server

You need to run BOTH servers at the same time. Here's how:

### Step 1: Check Your Backend is Set Up

First, confirm you have a `.env` file in the `backend` folder:

```
backend/
├── .env                    ← This file must exist!
├── package.json
├── server.js
├── setup-database.js
└── ... other files
```

If `.env` doesn't exist, create it with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=evacuai_db
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_12345
```

Replace `your_mysql_password` with YOUR MySQL root password.

### Step 2: Ensure MySQL is Running

**Windows:**
1. Open "Services" (press Win + R, type `services.msc`)
2. Find "MySQL80" or "MySQL" in the list
3. Right-click → "Start"
4. Status should change to "Running"

**Mac:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### Step 3: Open TWO Terminal Windows

You need TWO separate command prompts running at the same time.

**Terminal Window 1 - Start Backend:**
```bash
cd path/to/your/project/backend
npm install
node setup-database.js
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
Database connected successfully
```

**Terminal Window 2 - Start Frontend:**
```bash
cd path/to/your/project
npm run dev
```

Expected output:
```
VITE v5.4.0 ready in 234 ms
➜ Local:   http://localhost:3000/
```

### Step 4: Test Login

1. Go to: http://localhost:3000/login
2. Use test account:
   - Email: `admin@evacuai.com`
   - Password: `admin123`
3. Click Login

If both servers are running, you should see the dashboard!

---

## Troubleshooting

### Error: "Cannot find module"

Run in backend folder:
```bash
npm install
```

### Error: "ECONNREFUSED 127.0.0.1:3306"

MySQL is not running. Start it:
```bash
# Mac
brew services start mysql

# Windows
# Open Services and start MySQL80

# Linux
sudo systemctl start mysql
```

### Error: "Access denied for user 'root'@'localhost'"

Your MySQL password in `.env` is wrong. Check your password and update:
```
DB_PASSWORD=correct_password
```

### Error: "Table 'evacuai_db.users' doesn't exist"

Database tables not created. Run:
```bash
cd backend
node setup-database.js
```

### Still getting "Failed to fetch"?

Check:
1. Terminal 1 (backend) shows "Server running on http://localhost:5000"
2. Terminal 2 (frontend) shows "ready in XXX ms"
3. Both are running simultaneously
4. MySQL service is running

### Browser Console Shows Error?

Press F12 in browser and check Console tab for error message:
- Red errors = Backend issues
- Network tab shows failed requests = Backend not running
- Blank error = Frontend can't reach backend

---

## Visual Summary

```
Your Computer
│
├─── Terminal 1: Backend Server (Port 5000)
│    ├─ npm run dev
│    └─ "Server running on http://localhost:5000"
│
├─── Terminal 2: Frontend Server (Port 3000)
│    ├─ npm run dev
│    └─ "ready in 234 ms"
│
├─── MySQL Database (Port 3306)
│    └─ Running (service started)
│
└─── Browser
     └─ http://localhost:3000 → Connects to Backend → Works!
```

---

## Commands Reference

```bash
# Backend setup (one-time)
cd backend
npm install
node setup-database.js

# Start backend (every time)
cd backend
npm run dev

# Start frontend (every time)
npm run dev

# Check if MySQL is running
# Windows: Services → MySQL
# Mac: brew services list | grep mysql
# Linux: sudo systemctl status mysql
```

---

## Success Indicators

✓ Backend terminal shows: "Server running on http://localhost:5000"
✓ Frontend terminal shows: "ready in XXX ms"
✓ Browser loads: http://localhost:3000
✓ Login page displays
✓ Click Login with admin@evacuai.com / admin123
✓ Dashboard loads without "Failed to fetch" error

If all above check ✓, your system is working!

---

## If You're Still Stuck

1. Make sure BOTH terminals are open and showing success messages
2. Try hard refresh in browser: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. Check browser Console (F12) for detailed error messages
4. Verify MySQL is running:
   - Windows: Services app
   - Mac: `brew services list`
   - Linux: `sudo systemctl status mysql`

Let me know if you need help with any of these steps!
