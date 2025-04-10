
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Send, MapPin, Mic, PaperclipIcon, User, Bot, UserCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockChatMessages, mockUser } from '@/lib/mock-data';

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'admin';
  message: string;
  timestamp: string;
  isEmergency?: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${messages.length + 1}`,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isEmergency
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Show emergency notification if needed
    if (isEmergency) {
      toast({
        title: "Emergency Alert Sent",
        description: "Your emergency has been escalated to response teams. Help is on the way.",
        variant: "destructive",
      });
    }
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse: Message;
      
      if (isEmergency) {
        botResponse = {
          id: `msg-${messages.length + 2}`,
          sender: 'bot',
          message: "I've escalated your emergency to our response team. Please stay where you are if it's safe. Can you share your exact location?",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
        
        // Simulate admin response for emergency
        setTimeout(() => {
          const adminResponse: Message = {
            id: `msg-${messages.length + 3}`,
            sender: 'admin',
            message: `This is the Emergency Response Team. We've received your alert and are dispatching help to ${mockUser.location}. Please stay on this chat for further instructions.`,
            timestamp: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, adminResponse]);
        }, 3000);
      } else {
        const botResponses = [
          "I understand. How can I assist you further?",
          "Thanks for the information. Is there anything specific you need help with?",
          "I've noted that down. Do you have any questions about evacuation procedures?",
          "Would you like me to connect you with emergency services?",
          "I can provide safety information for your situation. What type of disaster are you facing?"
        ];
        
        botResponse = {
          id: `msg-${messages.length + 2}`,
          sender: 'bot',
          message: botResponses[Math.floor(Math.random() * botResponses.length)],
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1000);
    
    // Reset emergency flag
    setIsEmergency(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleEmergency = () => {
    setIsEmergency(!isEmergency);
    
    if (!isEmergency) {
      toast({
        title: "Emergency Mode Activated",
        description: "Your next message will be treated as an emergency and prioritized.",
        variant: "destructive",
      });
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice Recording Started",
        description: "Speak clearly to record your message.",
        variant: "default",
      });
      
      // Simulate recording and speech-to-text conversion
      setTimeout(() => {
        setIsRecording(false);
        setNewMessage("I need assistance with evacuation. The water level is rising quickly.");
        
        toast({
          title: "Voice Recording Completed",
          description: "Your message has been transcribed.",
          variant: "default",
        });
      }, 3000);
    }
  };
  
  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-12 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Emergency Assistance Chat</h1>
              <p className="text-gray-600 mt-2">
                Get real-time assistance and communicate with emergency responders
              </p>
            </div>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Bot size={20} />
                    </div>
                    <div>
                      <CardTitle>DRONEX Assistant</CardTitle>
                      <CardDescription>24/7 Emergency Support</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">
                    <span className="flex h-2 w-2 rounded-full bg-green-600 mr-1.5"></span>
                    Online
                  </Badge>
                </div>
              </CardHeader>
              
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex items-center gap-3">
                <AlertTriangle size={18} className="text-amber-600" />
                <p className="text-sm text-amber-800">
                  In case of immediate danger, please call emergency services directly. This chat provides supplementary assistance.
                </p>
              </div>
              
              <CardContent className="p-0">
                <div 
                  ref={chatContainerRef}
                  className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gray-50"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                          message.sender === 'user' ? 'bg-primary text-white' : 
                          message.sender === 'admin' ? 'bg-red-500 text-white' : 
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {message.sender === 'user' ? (
                            <User size={14} />
                          ) : message.sender === 'admin' ? (
                            <UserCircle2 size={14} />
                          ) : (
                            <Bot size={14} />
                          )}
                        </div>
                        
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'user' ? 'bg-primary text-white' : 
                          message.sender === 'admin' ? 'bg-red-500 text-white' : 
                          'bg-white border border-gray-200'
                        }`}>
                          {message.isEmergency && (
                            <div className="mb-1">
                              <Badge variant="outline" className="bg-red-100 text-red-600 border-red-200 text-xs">
                                EMERGENCY
                              </Badge>
                            </div>
                          )}
                          <p className="text-sm">{message.message}</p>
                          <div className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 
                            message.sender === 'admin' ? 'text-white/70' : 
                            'text-gray-500'
                          }`}>
                            {formatMessageTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-100 p-4">
                <form onSubmit={handleSendMessage} className="w-full">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={`flex-shrink-0 ${isEmergency ? 'bg-red-100 text-red-600 border-red-200' : ''}`}
                      onClick={toggleEmergency}
                    >
                      <AlertTriangle size={18} />
                    </Button>
                    
                    <div className="relative flex-1">
                      <Input
                        placeholder={isEmergency ? "Type your emergency message..." : "Type your message..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`pr-10 ${isEmergency ? 'border-red-300 bg-red-50' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 opacity-70"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <PaperclipIcon size={18} />
                        <input id="file-upload" type="file" className="hidden" />
                      </Button>
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={`flex-shrink-0 ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : ''}`}
                      onClick={toggleRecording}
                    >
                      <Mic size={18} />
                    </Button>
                    
                    <Button type="submit" size="icon" className="flex-shrink-0 bg-primary">
                      <Send size={18} />
                    </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
            
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Location</h2>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 text-gray-700 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{mockUser.location}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    This location will be shared with emergency services when you report an emergency.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Update Location
                  </Button>
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

export default Chatbot;
