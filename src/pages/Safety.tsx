import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Droplets, Home, Flame, Wind, Waves } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { safetyGuidelines } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

const Safety = () => {
  const [currentDisaster, setCurrentDisaster] = useState<keyof typeof safetyGuidelines>("flood");
  
  const DisasterIcon = () => {
    switch (currentDisaster) {
      case 'flood':
        return <Droplets size={20} />;
      case 'earthquake':
        return <Home size={20} />;
      case 'fire':
        return <Flame size={20} />;
      case 'hurricane':
        return <Wind size={20} />;
      case 'tsunami':
        return <Waves size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-12 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <AlertTriangle size={16} />
                <span>Safety First</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Disaster Safety Guidelines</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Detailed instructions to stay safe before, during, and after different types of disasters. Being prepared can save lives.
              </p>
            </div>
            
            <Tabs 
              defaultValue="flood" 
              className="w-full"
              onValueChange={(value) => setCurrentDisaster(value as keyof typeof safetyGuidelines)}
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
                <TabsTrigger value="flood" className="flex items-center gap-2">
                  <Droplets size={16} />
                  <span className="hidden sm:inline">Flood</span>
                </TabsTrigger>
                <TabsTrigger value="earthquake" className="flex items-center gap-2">
                  <Home size={16} />
                  <span className="hidden sm:inline">Earthquake</span>
                </TabsTrigger>
                <TabsTrigger value="fire" className="flex items-center gap-2">
                  <Flame size={16} />
                  <span className="hidden sm:inline">Fire</span>
                </TabsTrigger>
                <TabsTrigger value="hurricane" className="flex items-center gap-2">
                  <Wind size={16} />
                  <span className="hidden sm:inline">Hurricane</span>
                </TabsTrigger>
                <TabsTrigger value="tsunami" className="flex items-center gap-2">
                  <Waves size={16} />
                  <span className="hidden sm:inline">Tsunami</span>
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(safetyGuidelines).map(([key, guideline]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-secondary/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-primary">
                          <DisasterIcon />
                        </div>
                        <div>
                          <CardTitle>{guideline.title}</CardTitle>
                          <CardDescription>
                            Critical safety steps to follow during a {key} disaster
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column: Immediate Steps */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-red-500" />
                            Immediate Steps to Take
                          </h3>
                          <ul className="space-y-3">
                            {guideline.steps.map((step, index) => (
                              <li key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="flex-shrink-0 bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center">
                                  {index + 1}
                                </div>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Right column: Essential Items */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            Essential Emergency Items
                          </h3>
                          <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="grid grid-cols-2 gap-3">
                              {guideline.essentials.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-amber-500" />
                            After the Disaster
                          </h3>
                          <Accordion type="single" collapsible className="w-full">
                            {guideline.afterDisaster.map((tip, index) => (
                              <AccordionItem key={index} value={`after-${index}`}>
                                <AccordionTrigger className="text-sm font-medium">
                                  Tip #{index + 1}
                                </AccordionTrigger>
                                <AccordionContent>
                                  {tip}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Reminder</h3>
                        <p className="text-amber-800">
                          Every disaster situation is unique. Always follow official instructions from local emergency management agencies. These guidelines are general and may need to be adapted to your specific situation.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-100">
                            Download as PDF
                          </Button>
                          <Link to="/alerts">
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                              View Current Alerts
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Safety;
