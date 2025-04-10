
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  emergencyContacts: EmergencyContact[];
}

export interface DisasterAlert {
  id: string;
  title: string;
  type: "flood" | "earthquake" | "fire" | "hurricane" | "tsunami" | "other";
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  imageUrl?: string;
}

export interface DroneFeed {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl: string;
  videoUrl?: string;
  timestamp: string;
  classification?: {
    type: "flood" | "earthquake" | "fire" | "hurricane" | "tsunami" | "other";
    severity: "low" | "medium" | "high" | "critical";
    confidence: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "admin";
  message: string;
  timestamp: string;
  isEmergency?: boolean;
}

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  location: "Mumbai, India",
  emergencyContacts: [
    {
      id: "contact-1",
      name: "Jane Doe",
      phone: "+91XXXXXXXXXX",
      relation: "Sister"
    },
    {
      id: "contact-2",
      name: "Robert Doe",
      phone: "+91XXXXXXXXXX",
      relation: "Father"
    }
  ]
};

export const mockDisasterAlerts: DisasterAlert[] = [
  {
    id: "alert-1",
    title: "Flash Flood Warning",
    type: "flood",
    description: "Flash flood warning issued for coastal areas. Heavy rainfall expected to continue for the next 24 hours.",
    location: {
      lat: 19.076,
      lng: 72.877,
      address: "Mumbai, Maharashtra"
    },
    timestamp: "2025-04-10T08:30:00Z",
    severity: "high",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "alert-2",
    title: "Earthquake Alert",
    type: "earthquake",
    description: "A 5.8 magnitude earthquake has been detected. Aftershocks are possible in the next few hours.",
    location: {
      lat: 28.704,
      lng: 77.102,
      address: "Delhi, India"
    },
    timestamp: "2025-04-09T23:15:00Z",
    severity: "medium",
    imageUrl: "https://images.unsplash.com/photo-1645968501262-cdb4a456bd5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "alert-3",
    title: "Forest Fire Alert",
    type: "fire",
    description: "Rapidly spreading forest fire detected. Evacuation orders in place for nearby communities.",
    location: {
      lat: 12.972,
      lng: 77.594,
      address: "Bengaluru Rural, Karnataka"
    },
    timestamp: "2025-04-10T14:45:00Z",
    severity: "critical",
    imageUrl: "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "alert-4",
    title: "Hurricane Approaching",
    type: "hurricane",
    description: "Hurricane with wind speeds up to 150 km/h approaching eastern coastline. Expected landfall in 48 hours.",
    location: {
      lat: 13.083,
      lng: 80.270,
      address: "Chennai, Tamil Nadu"
    },
    timestamp: "2025-04-08T11:20:00Z",
    severity: "high",
    imageUrl: "https://images.unsplash.com/photo-1581434271327-8a2410fd192d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

export const mockDroneFeeds: DroneFeed[] = [
  {
    id: "feed-1",
    location: {
      lat: 19.076,
      lng: 72.877,
      address: "Mumbai, Maharashtra"
    },
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://example.com/dronefeed1.mp4",
    timestamp: "2025-04-10T08:35:00Z",
    classification: {
      type: "flood",
      severity: "high",
      confidence: 0.92
    }
  },
  {
    id: "feed-2",
    location: {
      lat: 28.704,
      lng: 77.102,
      address: "Delhi, India"
    },
    imageUrl: "https://images.unsplash.com/photo-1645968501262-cdb4a456bd5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    timestamp: "2025-04-09T23:20:00Z",
    classification: {
      type: "earthquake",
      severity: "medium",
      confidence: 0.87
    }
  },
  {
    id: "feed-3",
    location: {
      lat: 12.972,
      lng: 77.594,
      address: "Bengaluru Rural, Karnataka"
    },
    imageUrl: "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://example.com/dronefeed3.mp4",
    timestamp: "2025-04-10T14:50:00Z",
    classification: {
      type: "fire",
      severity: "critical",
      confidence: 0.95
    }
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    message: "Hello, I need assistance. My area is getting flooded.",
    timestamp: "2025-04-10T09:10:00Z",
    isEmergency: true
  },
  {
    id: "msg-2",
    sender: "bot",
    message: "I understand you're in a flooding situation. Could you please share your exact location?",
    timestamp: "2025-04-10T09:10:30Z"
  },
  {
    id: "msg-3",
    sender: "user",
    message: "I'm at Dadar West, Mumbai. The water level is rising quickly.",
    timestamp: "2025-04-10T09:11:15Z"
  },
  {
    id: "msg-4",
    sender: "bot",
    message: "Thank you for sharing your location. I'm alerting emergency services. Please move to higher ground if possible.",
    timestamp: "2025-04-10T09:11:45Z"
  },
  {
    id: "msg-5",
    sender: "admin",
    message: "This is the Emergency Response Team. We've dispatched a rescue team to your location. ETA 15 minutes. Please stay in a safe spot if possible.",
    timestamp: "2025-04-10T09:13:00Z"
  }
];

export const safetyGuidelines = {
  flood: {
    title: "Flood Safety Guidelines",
    steps: [
      "Move to higher ground immediately",
      "Avoid walking or driving through flood waters",
      "Stay away from power lines and electrical wires",
      "Be prepared to evacuate if instructed",
      "Disconnect utilities if instructed to do so"
    ],
    essentials: ["Drinking water", "Non-perishable food", "Flashlight", "First aid kit", "Battery-powered radio"],
    afterDisaster: [
      "Return home only when authorities say it's safe",
      "Be aware of contaminated water and food",
      "Clean and disinfect everything that got wet",
      "Avoid flood waters as they may be electrically charged or contaminated"
    ]
  },
  earthquake: {
    title: "Earthquake Safety Guidelines",
    steps: [
      "Drop, cover, and hold on",
      "If indoors, stay away from windows and exterior walls",
      "If outdoors, move to a clear area away from buildings and utility wires",
      "If in a car, pull over and stop, set parking brake",
      "Stay inside until shaking stops"
    ],
    essentials: ["Emergency food and water", "Flashlight", "First aid kit", "Battery-powered radio", "Sturdy shoes"],
    afterDisaster: [
      "Check for injuries and provide first aid",
      "Check for damage to utilities",
      "Be prepared for aftershocks",
      "Stay away from damaged areas"
    ]
  },
  fire: {
    title: "Fire Safety Guidelines",
    steps: [
      "Evacuate immediately",
      "Crawl low under smoke",
      "Use back of hand to check if door is hot before opening",
      "If clothes catch fire: stop, drop, and roll",
      "Never use elevators during fire"
    ],
    essentials: ["Emergency contact information", "Escape plan", "Fire extinguisher", "Smoke detectors", "Fire-resistant clothing"],
    afterDisaster: [
      "Don't return until authorities declare it's safe",
      "Watch for hot spots that could reignite",
      "Discard food exposed to heat, smoke, or soot",
      "Document property damage for insurance"
    ]
  },
  hurricane: {
    title: "Hurricane Safety Guidelines",
    steps: [
      "Stay informed about weather updates",
      "Prepare your home by boarding windows and securing loose items",
      "Fill containers with drinking water",
      "Charge phones and essential devices",
      "Evacuate if instructed by authorities"
    ],
    essentials: ["3-day water supply", "Non-perishable food", "Battery-powered radio", "Flashlight", "First aid kit"],
    afterDisaster: [
      "Stay away from loose or dangling power lines",
      "Avoid flooded areas",
      "Take pictures of damage for insurance",
      "Use stored water and food before perishables"
    ]
  },
  tsunami: {
    title: "Tsunami Safety Guidelines",
    steps: [
      "Move inland to higher ground immediately",
      "Follow evacuation routes",
      "If you feel a strong earthquake near the coast, evacuate immediately",
      "Stay away from the coast until authorities say it's safe",
      "Listen to emergency broadcasts"
    ],
    essentials: ["Emergency evacuation plan", "Emergency food and water", "First aid kit", "Battery-powered radio", "Important documents in waterproof container"],
    afterDisaster: [
      "Stay away from flooded and damaged areas",
      "Check for injuries and provide first aid",
      "Be careful reentering buildings",
      "Tap water may be contaminated"
    ]
  }
};
