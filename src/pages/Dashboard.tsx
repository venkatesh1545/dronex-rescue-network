
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Upload, Camera, Send, MapPin, Bell, User, LogOut, Video, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockDisasterAlerts, mockUser, mockDroneFeeds } from '@/lib/mock-data';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [isUploading, setIsUploading] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  
  const latestDroneFeed = mockDroneFeeds[0];
  const recentAlerts = mockDisasterAlerts.slice(0, 3);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: `${uploadType === 'image' ? 'Image' : 'Video'} processed successfully`,
        description: "Our AI has classified this as a potential flood event with high severity.",
        variant: "default",
      });
    }, 2000);
  };

  const handleEmergencyAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingAlert(true);
    
    // Simulate sending alert
    setTimeout(() => {
      setIsSendingAlert(false);
      setEmergencyMessage('');
      toast({
        title: "Emergency alert sent",
        description: "Your location has been shared with emergency services and your emergency contacts.",
        variant: "default",
      });
    }, 1500);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "default",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-gray-600">Welcome back, {mockUser.name}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="h-9">
                    <User size={16} className="mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="h-9" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Feed */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    Live Drone Feed
                  </CardTitle>
                  <CardDescription>
                    Real-time drone footage from disaster areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                    <img 
                      src={latestDroneFeed.imageUrl} 
                      alt="Live drone feed" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                      <MapPin size={14} />
                      <span>{latestDroneFeed.location.address}</span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 text-white text-sm px-3 py-1 rounded-full">
                      <span>LIVE</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 mb-1">Classification</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          latestDroneFeed.classification?.severity === 'critical' ? 'bg-red-500' :
                          latestDroneFeed.classification?.severity === 'high' ? 'bg-orange-500' :
                          latestDroneFeed.classification?.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                        <span className="text-gray-900 font-medium capitalize">
                          {latestDroneFeed.classification?.type} - {latestDroneFeed.classification?.severity} severity
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        AI confidence: {(latestDroneFeed.classification?.confidence || 0) * 100}%
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 mb-1">Location Details</div>
                      <div className="text-gray-900">
                        {latestDroneFeed.location.address}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Lat: {latestDroneFeed.location.lat}, Long: {latestDroneFeed.location.lng}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4">
                  <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2">
                    <Button variant="outline" size="sm">
                      View Historical Feeds
                    </Button>
                    <Link to="/chatbot">
                      <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                        Request Emergency Assistance
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Upload & Alert Tabs */}
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="upload" className="text-sm">
                    <Upload size={16} className="mr-2" />
                    Upload Drone Data
                  </TabsTrigger>
                  <TabsTrigger value="alert" className="text-sm">
                    <AlertTriangle size={16} className="mr-2" />
                    Send Emergency Alert
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Data</CardTitle>
                      <CardDescription>
                        Upload images or videos from drones for AI analysis and classification
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpload} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Upload Type</Label>
                          <div className="flex gap-4">
                            <div 
                              className={`flex flex-1 flex-col items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer ${uploadType === 'image' ? 'bg-primary/10 border-primary/30' : 'bg-gray-100 border-gray-200 hover:bg-gray-50'}`}
                              onClick={() => setUploadType('image')}
                            >
                              <Camera size={24} className={uploadType === 'image' ? 'text-primary' : 'text-gray-500'} />
                              <span className={`text-sm font-medium ${uploadType === 'image' ? 'text-primary' : 'text-gray-700'}`}>Image</span>
                            </div>
                            
                            <div 
                              className={`flex flex-1 flex-col items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer ${uploadType === 'video' ? 'bg-primary/10 border-primary/30' : 'bg-gray-100 border-gray-200 hover:bg-gray-50'}`}
                              onClick={() => setUploadType('video')}
                            >
                              <Video size={24} className={uploadType === 'video' ? 'text-primary' : 'text-gray-500'} />
                              <span className={`text-sm font-medium ${uploadType === 'video' ? 'text-primary' : 'text-gray-700'}`}>Video</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="upload-file">File Upload</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-primary">Click to upload</span>{' '}
                              or drag and drop
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {uploadType === 'image' ? 'PNG, JPG or JPEG' : 'MP4, MOV or AVI'} (max. 100MB)
                            </p>
                            <input 
                              id="upload-file" 
                              type="file" 
                              className="hidden"
                              accept={uploadType === 'image' ? 'image/*' : 'video/*'}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            placeholder="Enter location or use current GPS" 
                            defaultValue={mockUser.location}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Input id="description" placeholder="Brief description of the situation" />
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="justify-between border-t border-gray-100 pt-4">
                      <Button variant="outline" disabled={isUploading}>Cancel</Button>
                      <Button 
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {isUploading ? 'Processing...' : 'Upload and Analyze'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="alert">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Alert</CardTitle>
                      <CardDescription>
                        Send an emergency alert with your location to authorities and emergency contacts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleEmergencyAlert} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="alert-type">Emergency Type</Label>
                          <select 
                            id="alert-type" 
                            className="w-full border-gray-300 rounded-md h-10 px-3"
                            defaultValue="trapped"
                          >
                            <option value="trapped">Trapped in disaster area</option>
                            <option value="medical">Medical emergency</option>
                            <option value="fire">Fire emergency</option>
                            <option value="flood">Flood emergency</option>
                            <option value="other">Other emergency</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="alert-location">Your Location</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="alert-location" 
                              placeholder="Your current location"
                              defaultValue={mockUser.location}
                              className="flex-1"
                            />
                            <Button variant="outline" type="button" className="flex-shrink-0">
                              <MapPin size={16} className="mr-2" />
                              Use GPS
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergency-message">Emergency Message</Label>
                          <Input
                            id="emergency-message"
                            placeholder="Describe your emergency situation"
                            value={emergencyMessage}
                            onChange={(e) => setEmergencyMessage(e.target.value)}
                          />
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3 text-sm text-amber-800">
                          <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Important</p>
                            <p className="mt-1">
                              This will send an alert to all emergency services in your area and notify your emergency contacts with your current location.
                            </p>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4">
                      <div className="w-full">
                        <Button 
                          onClick={handleEmergencyAlert}
                          disabled={isSendingAlert}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isSendingAlert ? 'Sending Alert...' : 'Send Emergency Alert'}
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Use this button only in case of an actual emergency
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <User size={32} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{mockUser.name}</h3>
                      <p className="text-sm text-gray-500">{mockUser.email}</p>
                      <p className="text-sm text-gray-500">{mockUser.location}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <div className="w-full flex justify-between">
                    <Button variant="ghost" size="sm">
                      <User size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell size={16} className="mr-2" />
                      Notifications
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Emergency Contacts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-3">
                  {mockUser.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.relation}</p>
                      </div>
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add Contact
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Alerts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    Recent Alerts
                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
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
                        <p className="text-xs text-gray-500">
                          {alert.location.address} • {new Date(alert.timestamp).toLocaleString()}
                        </p>
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
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
