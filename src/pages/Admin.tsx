
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Users, MapPin, Activity, Phone, Send, Video, UserCheck, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockDisasterAlerts, mockDroneFeeds } from '@/lib/mock-data';
import { Link, useNavigate } from 'react-router-dom';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: string;
  severity: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  
  // Generate map markers from disaster alerts and drone feeds
  const mapMarkers: MapMarker[] = [
    ...mockDisasterAlerts.map(alert => ({
      id: alert.id,
      lat: alert.location.lat,
      lng: alert.location.lng,
      title: alert.title,
      type: alert.type,
      severity: alert.severity
    })),
    ...mockDroneFeeds.map(feed => ({
      id: feed.id,
      lat: feed.location.lat,
      lng: feed.location.lng,
      title: `Drone Feed: ${feed.location.address}`,
      type: feed.classification?.type || 'unknown',
      severity: feed.classification?.severity || 'unknown'
    }))
  ];
  
  const filteredMarkers = filterSeverity === 'all' 
    ? mapMarkers 
    : mapMarkers.filter(marker => marker.severity === filterSeverity);
  
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending broadcast
    setTimeout(() => {
      setIsSending(false);
      setBroadcastMessage('');
      toast({
        title: "Emergency broadcast sent",
        description: "Your message has been sent to all users in affected areas.",
        variant: "default",
      });
    }, 1500);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your admin account",
      variant: "default",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Admin Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-2">
                  ADMIN DASHBOARD
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Disaster Response Command Center</h1>
                <p className="text-gray-600">Monitor and manage disaster response operations</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Users size={16} className="mr-2" />
                  Manage Users
                </Button>
                <Button variant="ghost" size="sm" className="h-9" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Disasters</p>
                    <h3 className="text-2xl font-bold text-gray-900">7</h3>
                  </div>
                  <div className="p-2 bg-red-100 text-red-600 rounded-full">
                    <AlertTriangle size={24} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                  <span className="font-medium">+2</span>
                  <span>since yesterday</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Users Affected</p>
                    <h3 className="text-2xl font-bold text-gray-900">1,243</h3>
                  </div>
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-full">
                    <Users size={24} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                  <span className="font-medium">+186</span>
                  <span>in the last 24 hours</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Drones</p>
                    <h3 className="text-2xl font-bold text-gray-900">14</h3>
                  </div>
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    <Video size={24} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <span className="font-medium">100%</span>
                  <span>operational status</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Rescue Teams</p>
                    <h3 className="text-2xl font-bold text-gray-900">36</h3>
                  </div>
                  <div className="p-2 bg-green-100 text-green-600 rounded-full">
                    <UserCheck size={24} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                  <span className="font-medium">8 teams</span>
                  <span>currently deployed</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Map View - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white">
                <CardHeader className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Disaster Map</CardTitle>
                      <CardDescription>
                        Real-time view of active disaster zones and drone locations
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Critical</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>High</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Medium</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="w-full h-[400px] bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200">
                    {/* This would be replaced with an actual map component */}
                    <div className="w-full h-full bg-cover bg-center opacity-60" style={{backgroundImage: "url('https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
                    
                    {/* Map markers */}
                    {filteredMarkers.map(marker => (
                      <div 
                        key={marker.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`
                        }}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                          ${marker.severity === 'critical' ? 'bg-red-500' : 
                            marker.severity === 'high' ? 'bg-orange-500' : 
                            marker.severity === 'medium' ? 'bg-yellow-500' : 
                            'bg-blue-500'} 
                          text-white shadow-lg`}
                        >
                          <AlertTriangle size={14} />
                        </div>
                        <div className="bg-white px-2 py-1 rounded text-xs shadow-md mt-1">
                          {marker.title.substring(0, 15)}...
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-2">Filter Disaster Severity</div>
                    <RadioGroup defaultValue="all" className="flex flex-wrap gap-4" onValueChange={setFilterSeverity}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="critical" id="critical" />
                        <Label htmlFor="critical">Critical</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4">
                  <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin size={16} className="mr-2" />
                      View Full Map
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Activity size={16} className="mr-2" />
                        Analytics
                      </Button>
                      <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                        <Phone size={16} className="mr-2" />
                        Contact Responders
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Drone Feed Grid */}
              <Card className="bg-white">
                <CardHeader className="border-b border-gray-100 pb-4">
                  <CardTitle>Live Drone Feeds</CardTitle>
                  <CardDescription>
                    Real-time footage from deployed drones
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockDroneFeeds.map((feed) => (
                      <div key={feed.id} className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={feed.imageUrl} 
                          alt={`Drone feed from ${feed.location.address}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          LIVE
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <div className="text-white font-medium text-sm">{feed.location.address}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              feed.classification?.severity === 'critical' ? 'bg-red-500' :
                              feed.classification?.severity === 'high' ? 'bg-orange-500' :
                              feed.classification?.severity === 'medium' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}></div>
                            <span className="text-white/80 text-xs capitalize">
                              {feed.classification?.type} - {feed.classification?.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4">
                  <Button variant="outline" className="w-full">
                    <Video size={16} className="mr-2" />
                    View All Drone Feeds
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Emergency Broadcast */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500" />
                    Emergency Broadcast
                  </CardTitle>
                  <CardDescription>
                    Send emergency messages to users in affected areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <form onSubmit={handleBroadcast} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="broadcast-type">Broadcast Type</Label>
                      <select 
                        id="broadcast-type" 
                        className="w-full border-gray-300 rounded-md h-10 px-3"
                        defaultValue="evacuation"
                      >
                        <option value="evacuation">Evacuation Order</option>
                        <option value="warning">Warning Alert</option>
                        <option value="update">Status Update</option>
                        <option value="allclear">All Clear Notice</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="affected-area">Affected Area</Label>
                      <select 
                        id="affected-area" 
                        className="w-full border-gray-300 rounded-md h-10 px-3"
                        defaultValue="mumbai"
                      >
                        <option value="mumbai">Mumbai, Maharashtra</option>
                        <option value="delhi">Delhi, India</option>
                        <option value="bangalore">Bengaluru, Karnataka</option>
                        <option value="chennai">Chennai, Tamil Nadu</option>
                        <option value="all">All Regions</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="broadcast-message">Message</Label>
                      <Input
                        id="broadcast-message"
                        placeholder="Enter emergency broadcast message"
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <Button 
                    onClick={handleBroadcast}
                    disabled={isSending || !broadcastMessage}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Send size={16} className="mr-2" />
                    {isSending ? 'Sending Broadcast...' : 'Send Emergency Broadcast'}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Alerts */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    Recent Alerts
                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-3 max-h-[400px] overflow-auto">
                  {mockDisasterAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-600' : 
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{alert.location.address}</p>
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
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <Link to="/alerts" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Alerts
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Quick Actions */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-3">
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck size={16} className="mr-2" />
                    Deploy Rescue Team
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Video size={16} className="mr-2" />
                    Launch Drone
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone size={16} className="mr-2" />
                    Contact Emergency Services
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users size={16} className="mr-2" />
                    View Affected Users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
