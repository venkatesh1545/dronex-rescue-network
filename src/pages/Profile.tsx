
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, MapPin, Bell, Shield, Key, Trash, Save, Plus, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockUser } from '@/lib/mock-data';
import { EmergencyContact } from '@/lib/mock-data';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    location: mockUser.location,
    phone: "+91-XXXXXXXXXX",
  });
  
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    mockUser.emergencyContacts
  );
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    pushNotifications: false,
    emergencyAlerts: true,
    weeklyUpdates: false,
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
        variant: "default",
      });
    }, 1000);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
        variant: "default",
      });
    }, 1000);
  };
  
  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setEmergencyContacts(updatedContacts);
  };
  
  const addContact = () => {
    setEmergencyContacts([...emergencyContacts, { id: `contact-${emergencyContacts.length + 1}`, name: '', phone: '', relation: '' }]);
  };
  
  const removeContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      const filteredContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(filteredContacts);
    }
  };
  
  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
        variant: "default",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-12 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Profile</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
              
              <Link to="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="text-sm md:text-base">
                  <User size={16} className="mr-2 hidden md:inline" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="emergency" className="text-sm md:text-base">
                  <Bell size={16} className="mr-2 hidden md:inline" />
                  Emergency Contacts
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm md:text-base">
                  <Bell size={16} className="mr-2 hidden md:inline" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="text-sm md:text-base">
                  <Shield size={16} className="mr-2 hidden md:inline" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and location
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                          <User size={32} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Profile Picture</h3>
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm">
                              Upload
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="flex gap-2">
                            <Input
                              id="location"
                              value={userData.location}
                              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                              required
                              className="flex-1"
                            />
                            <Button type="button" variant="outline" className="flex-shrink-0">
                              <MapPin size={16} className="mr-2" />
                              GPS
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleProfileUpdate}
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="emergency">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>
                      These contacts will be notified in case of an emergency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-700">Contact #{index + 1}</h3>
                            {emergencyContacts.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeContact(index)}
                                className="h-8 text-gray-500 hover:text-red-500"
                              >
                                <X size={16} />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`contact-name-${index}`}>Name</Label>
                              <Input
                                id={`contact-name-${index}`}
                                placeholder="Contact name"
                                value={contact.name}
                                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`contact-phone-${index}`}>Phone Number</Label>
                              <Input
                                id={`contact-phone-${index}`}
                                placeholder="+1234567890"
                                value={contact.phone}
                                onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`contact-relation-${index}`}>Relationship</Label>
                              <Input
                                id={`contact-relation-${index}`}
                                placeholder="Parent, Sibling, etc."
                                value={contact.relation}
                                onChange={(e) => handleContactChange(index, 'relation', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addContact}
                        className="w-full"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Another Contact
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSaving}
                    >
                      <Save size={16} className="mr-2" />
                      {isSaving ? 'Saving...' : 'Save Contacts'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive alerts and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Methods</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-gray-500">Receive alerts via email</div>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                checked={notifications.email}
                                onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                className="toggle"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">SMS Notifications</div>
                              <div className="text-sm text-gray-500">Receive alerts via text message</div>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                checked={notifications.sms}
                                onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                className="toggle"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Push Notifications</div>
                              <div className="text-sm text-gray-500">Receive alerts on your device</div>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                checked={notifications.pushNotifications}
                                onChange={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
                                className="toggle"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Emergency Alerts</div>
                              <div className="text-sm text-gray-500">Critical notifications about disasters</div>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                checked={notifications.emergencyAlerts}
                                onChange={() => setNotifications({ ...notifications, emergencyAlerts: !notifications.emergencyAlerts })}
                                className="toggle"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Weekly Safety Updates</div>
                              <div className="text-sm text-gray-500">Regular safety tips and information</div>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                checked={notifications.weeklyUpdates}
                                onChange={() => setNotifications({ ...notifications, weeklyUpdates: !notifications.weeklyUpdates })}
                                className="toggle"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary/90 mt-2"
                        disabled={isSaving}
                      >
                        <Key size={16} className="mr-2" />
                        {isSaving ? 'Updating...' : 'Update Password'}
                      </Button>
                    </form>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button 
                          type="button"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={handleDeleteAccount}
                        >
                          <Trash size={16} className="mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
