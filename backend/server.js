import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

// Route Imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import locationRoutes from './routes/locations.js';
import centerRoutes from './routes/centers.js'; // Added this import

dotenv.config();

const app = express();
const httpServer = createServer(app);

// 1. Configure CORS for Express
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// 2. Configure CORS for Socket.io
const io = new SocketIOServer(httpServer, {
  cors: corsOptions
});

const PORT = process.env.PORT || 4000;

// --- Routes ---

// Authentication routes (Login/Register)
app.use('/api/auth', authRoutes);

// User management routes
app.use('/api/users', userRoutes);

// Admin panel routes
app.use('/api/admin', adminRoutes);

// Real-time GPS location routes
app.use('/api/locations', locationRoutes);

// Evacuation Centers routes (This fixed your "Cannot GET /api/centers" error)
app.use('/api/centers', centerRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Root route to prevent "Cannot GET /" in the browser
export default function handler(req, res) {
  res.status(200).json({ ok: true, message: "route works" });
}

// --- Socket.io Logic ---
// Handles real-time location updates for the Cebu City MapView
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user-location', (data) => {
    // Broadcast location update to all connected clients
    io.emit('location-update', {
      userId: data.userId,
      lat: data.lat,
      lng: data.lng,
      timestamp: new Date(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// --- Start Server ---
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test centers at: http://localhost:${PORT}/api/centers`);
  console.log("CLIENT_URL =", process.env.CLIENT_URL);
});

export { io };