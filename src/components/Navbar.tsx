
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, AlertTriangle, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
