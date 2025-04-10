
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, AlertTriangle, User, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Determine if user is logged in by checking if we're on a protected route
  // This is a simple approach - in a real app, you'd use an auth context/state
  const isLoggedIn = window.location.pathname.includes('/admin') || 
                    window.location.pathname.includes('/dashboard') ||
                    window.location.pathname.includes('/profile');
  
  const handleSignOut = () => {
    // Clear any auth state here
    
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account",
    });
    
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
              <AlertTriangle size={20} />
            </div>
            <span className="font-bold text-xl text-gray-900">DRONEX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link to="/safety" className="text-gray-700 hover:text-primary font-medium">Safety</Link>
            <Link to="/alerts" className="text-gray-700 hover:text-primary font-medium">Alerts</Link>
            <Link to="/chatbot" className="text-gray-700 hover:text-primary font-medium">Live Chat</Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {window.location.pathname.includes('/admin') && (
                  <Link to="/admin">
                    <Button variant="outline" className="font-medium">
                      <User size={16} className="mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                {!window.location.pathname.includes('/admin') && (
                  <Link to="/dashboard">
                    <Button variant="outline" className="font-medium">
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button onClick={handleSignOut} variant="outline" className="font-medium text-red-500 border-red-200 hover:bg-red-50">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-medium bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/safety" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Safety
              </Link>
              <Link 
                to="/alerts" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Alerts
              </Link>
              <Link 
                to="/chatbot" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Live Chat
              </Link>
              
              {isLoggedIn ? (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {window.location.pathname.includes('/admin') ? (
                    <Link to="/admin" className="w-full sm:w-auto" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User size={16} className="mr-2" />
                        Admin
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="w-full sm:w-auto" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User size={16} className="mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Link to="/login" className="w-full sm:w-auto" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full sm:w-auto" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
