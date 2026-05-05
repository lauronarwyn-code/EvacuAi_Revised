import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header'
import HomePage from './pages/home'
import MapPage from './pages/map'
import DashboardPage from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/protected-route'
import { useAuth } from './contexts/AuthContext'

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}
