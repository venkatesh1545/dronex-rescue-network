
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, UserPlus, Plus, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: '', phone: '', relation: '' }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setEmergencyContacts(updatedContacts);
  };

  const addContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', phone: '', relation: '' }]);
  };

  const removeContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      const filteredContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(filteredContacts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    // Validate emergency contacts
    const hasEmptyContacts = emergencyContacts.some(
      contact => !contact.name || !contact.phone || !contact.relation
    );
    
    if (hasEmptyContacts) {
      toast({
        title: "Incomplete emergency contacts",
        description: "Please fill in all emergency contact details",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to DRONEX! You can now sign in.",
        variant: "default",
      });
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Create your DRONEX account</h1>
                  <p className="text-gray-600">Join our disaster response network and stay prepared</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, State/Province, Country"
                        value={formData.location}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Emergency Contacts</h2>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addContact}
                      className="h-8"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Contact
                    </Button>
                  </div>
                  
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
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`contact-phone-${index}`}>Phone Number</Label>
                            <Input
                              id={`contact-phone-${index}`}
                              placeholder="+1234567890"
                              value={contact.phone}
                              onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`contact-relation-${index}`}>Relationship</Label>
                            <Input
                              id={`contact-relation-${index}`}
                              placeholder="Parent, Sibling, etc."
                              value={contact.relation}
                              onChange={(e) => handleContactChange(index, 'relation', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3 text-sm text-amber-800">
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Why do we need emergency contacts?</p>
                    <p className="mt-1">
                      In the event of a disaster, DRONEX will automatically notify your emergency contacts with your location and status. This information is kept strictly confidential and is only used for emergency purposes.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign In
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
