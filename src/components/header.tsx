import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Menu, LogOut, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EvacuAi
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                Cebu Evacuation System
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-8 items-center"
            >
              <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors">
                Home
              </Link>
              <Link to="/map" className="text-foreground hover:text-primary font-medium transition-colors">
                Map
              </Link>
              <Link to="/dashboard" className="text-foreground hover:text-primary font-medium transition-colors">
                Dashboard
              </Link>
              
              {/* User Profile and Logout */}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Animated top border gradient */}
      <motion.div
        className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </header>
  );
};

export default Header;
