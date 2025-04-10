
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                <AlertTriangle size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">DRONEX</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Advanced drone-powered disaster response network helping save lives with real-time data and AI technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-gray-600 hover:text-primary text-sm">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-gray-600 hover:text-primary text-sm">
                  Disaster Alerts
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Drone Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Emergency Response
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary text-sm">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-600 hover:text-primary text-sm">
                  Live Chat
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                  Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} DRONEX Rescue Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
