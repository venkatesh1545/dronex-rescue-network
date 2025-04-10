
document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const quickResponseButtons = document.querySelectorAll('.quick-response-btn');
    
    // Sample responses for the chatbot
    const botResponses = {
        "hello": "Hello! How can I assist you with emergency information today?",
        "hi": "Hi there! How can I help you with disaster-related information?",
        "help": "I'm here to help. Could you please provide more details about your situation?",
        "emergency": "If you're experiencing a life-threatening emergency, please call 911 immediately. What type of emergency are you facing?",
        "shelter": "The nearest emergency shelters in your area are: Community Center (2.1 miles) and North High School (3.5 miles). Would you like directions?",
        "flood": "During a flood: 1) Move to higher ground, 2) Avoid walking or driving through flood waters, 3) Stay away from power lines and electrical wires. Do you need specific flood safety information?",
        "fire": "In case of fire: 1) Get out and stay out, 2) Call 911, 3) If trapped, cover vents and cracks around doors with cloth to keep smoke out. Do you need help with fire safety?",
        "earthquake": "During an earthquake: 1) Drop, cover, and hold on, 2) If indoors, stay away from windows, 3) If outdoors, move away from buildings and utility wires. Do you need more earthquake safety tips?",
        "medical": "For medical emergencies, please call 911. Can you describe the medical situation so I can provide relevant first aid information?",
        "evacuation": "For evacuation information, please provide your current location, and I'll share the recommended evacuation routes.",
        "trapped": "If someone is trapped, please provide the exact location and situation details so emergency services can be notified.",
        "water": "Emergency drinking water is available at all designated shelters. You can also request water delivery by providing your address.",
        "food": "Emergency food supplies are being distributed at Community Center, North High School, and First Baptist Church. Do you need directions to these locations?",
        "weather": "The current weather forecast shows more rain expected in the next 24 hours. Please stay tuned to local alerts for flash flood warnings.",
        "power": "Power outages have been reported in several areas. Utility companies are working to restore power. Do you need information about backup power options?",
        "missing": "To report a missing person, please provide their name, description, last known location, and when they were last seen.",
        "drone": "DRONEX rescue drones are currently operating in flood-affected areas. They're equipped with thermal cameras to locate people in need of rescue.",
        "help me": "I understand you need help. To provide the most relevant assistance, could you please specify what kind of emergency you're facing?"
    };
    
    // Add event listener for form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            // Generate bot response
            const response = getBotResponse(message);
            
            // Add bot message to chat
            addMessage(response, 'bot');
            
            // Scroll to latest message
            scrollToBottom();
        }, 1000);
    });
    
    // Add event listeners for quick response buttons
    quickResponseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            messageInput.value = message;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });
    
    // Function to add a message to the chat
    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        let timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-time">You • ${timestamp}</div>
            `;
        } else if (type === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-time">Support • ${timestamp}</div>
            `;
        } else if (type === 'system') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-time">System • ${timestamp}</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to get bot response based on user input
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords in the message
        for (const keyword in botResponses) {
            if (lowerMessage.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        
        // Default response if no keywords match
        return "I understand you need assistance. Could you provide more details about your situation so I can better help you? If this is a life-threatening emergency, please call 911 immediately.";
    }
    
    // Function to scroll to the bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
