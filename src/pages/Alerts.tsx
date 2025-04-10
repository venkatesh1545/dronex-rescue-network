
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, MapPin, Clock, Search, AlertCircle, Eye, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockDisasterAlerts } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Filter alerts based on search query and filter type
  const filteredAlerts = mockDisasterAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.location.address.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesType = filterType === 'all' || alert.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return '🌊';
      case 'earthquake':
        return '🏚️';
      case 'fire':
        return '🔥';
      case 'hurricane':
        return '🌪️';
      case 'tsunami':
        return '🌊';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-12 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-2">
                  <AlertCircle size={16} />
                  <span>LIVE ALERTS</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Disaster Alerts</h1>
                <p className="text-gray-600 mt-1">
                  Real-time updates on ongoing disasters and emergency situations
                </p>
              </div>
              
              <div className="relative">
                <Search size={18} className="absolute left-2.5 top-2.5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search alerts by location or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full md:w-80"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setFilterType}>
              <div className="bg-white rounded-t-lg border border-gray-200 p-2">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1">
                  <TabsTrigger value="all" className="text-xs md:text-sm">All Alerts</TabsTrigger>
                  <TabsTrigger value="flood" className="text-xs md:text-sm">Floods</TabsTrigger>
                  <TabsTrigger value="earthquake" className="text-xs md:text-sm">Earthquakes</TabsTrigger>
                  <TabsTrigger value="fire" className="text-xs md:text-sm">Fires</TabsTrigger>
                  <TabsTrigger value="hurricane" className="text-xs md:text-sm">Hurricanes</TabsTrigger>
                  <TabsTrigger value="tsunami" className="text-xs md:text-sm">Tsunamis</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={filterType} className="mt-0">
                <div className="bg-white rounded-b-lg border border-t-0 border-gray-200 p-6">
                  {filteredAlerts.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAlerts.map((alert) => (
                          <div 
                            key={alert.id} 
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            {alert.imageUrl && (
                              <div className="relative h-40 overflow-hidden">
                                <img 
                                  src={alert.imageUrl} 
                                  alt={alert.title} 
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                  <Badge 
                                    className={`font-medium uppercase text-xs ${getSeverityColor(alert.severity)}`}
                                  >
                                    {alert.severity}
                                  </Badge>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-lg">{getTypeIcon(alert.type)}</span>
                                    <h3 className="font-medium text-white">{alert.title}</h3>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="p-4">
                              {!alert.imageUrl && (
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                                  </div>
                                  <Badge 
                                    className={`font-medium uppercase text-xs ${getSeverityColor(alert.severity)}`}
                                  >
                                    {alert.severity}
                                  </Badge>
                                </div>
                              )}
                              
                              <p className="text-gray-600 text-sm mb-4">
                                {alert.description}
                              </p>
                              
                              <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <MapPin size={14} />
                                  <span>{alert.location.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Clock size={14} />
                                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Eye size={14} className="mr-1" />
                                  Details
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <Share2 size={14} className="mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                        <AlertTriangle size={24} className="text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        No disaster alerts match your current filters. Try adjusting your search or filter criteria.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery('');
                          setFilterType('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 p-4 bg-primary/10 rounded-full">
                  <AlertTriangle size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Stay Prepared for Emergencies</h3>
                  <p className="text-gray-600">
                    Access our comprehensive safety guidelines to prepare for different types of disasters. Being prepared can save lives in emergency situations.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link to="/safety">
                    <Button className="bg-primary hover:bg-primary/90">
                      View Safety Guidelines
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Alerts;
