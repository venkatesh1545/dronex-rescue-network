
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertTriangle, Upload, MessageSquare, MapPin, Shield, Radio, ArrowRight } from 'lucide-react';
import { mockDisasterAlerts } from '@/lib/mock-data';

const Index = () => {
  // Get the most recent alerts for the hero section
  const recentAlerts = mockDisasterAlerts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative hero-pattern bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <AlertTriangle size={16} />
                <span>Disaster Response Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Saving Lives with <span className="text-primary">Drone</span><span className="text-secondary">X</span>
              </h1>
              <p className="text-lg text-gray-600">
                Advanced drone technology and AI to monitor, classify, and respond to disasters in real-time. Connecting people, emergency services, and data when it matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/alerts">
                  <Button size="lg" variant="outline">
                    View Live Alerts
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-secondary/20 rounded-lg animate-bounce-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full animate-pulse-slow"></div>
              
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-gray-900">Recent Alerts</h3>
                    <span className="animate-ping-slow inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  </div>
                  
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-lg ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 
                          alert.severity === 'high' ? 'bg-orange-100 text-orange-600' : 
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <AlertTriangle size={16} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-500">{alert.location.address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 
                              alert.severity === 'high' ? 'bg-orange-100 text-orange-600' : 
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/alerts" className="mt-4 text-sm text-primary font-medium flex items-center justify-center gap-1 hover:underline">
                    View all alerts
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advanced Disaster Response Technology</h2>
            <p className="text-gray-600 text-lg">
              Our platform combines drone capabilities, AI classification, and emergency communication to save lives during disasters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Upload size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Drone Footage</h3>
              <p className="text-gray-600">
                Real-time video and image feeds from drones deployed to disaster zones, giving emergency services immediate visual data.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Classification</h3>
              <p className="text-gray-600">
                Advanced neural networks classify disaster type and severity from drone footage, enabling faster and more effective responses.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">GPS Tracking</h3>
              <p className="text-gray-600">
                Precise location tracking of affected areas and users, with automatic sharing of coordinates to emergency services.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Radio size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Broadcast</h3>
              <p className="text-gray-600">
                Instant notifications to users in affected areas with real-time updates, evacuation routes, and safety instructions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat Support</h3>
              <p className="text-gray-600">
                Direct communication channel between affected individuals and emergency response teams for immediate assistance.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Alerts</h3>
              <p className="text-gray-600">
                Automated alert system that notifies users, emergency contacts, and authorities when disasters are detected.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join our network?</h2>
              <p className="text-lg mb-8 text-white/90">
                Sign up today to access real-time alerts, emergency communication, and contribute to a safer community during disasters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/safety">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Safety Guidelines
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
