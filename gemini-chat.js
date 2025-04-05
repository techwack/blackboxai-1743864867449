import { auth, db } from './firebase.js';

// DOM elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Conversation state
let conversationHistory = [];
const MAX_HISTORY = 10; // Keep last 10 messages for context

// Initialize
setupEventListeners();

function setupEventListeners() {
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Add user message to chat
    addMessageToChat(messageText, 'user');
    messageInput.value = '';
    
    try {
        // Show typing indicator
        const typingId = showTypingIndicator();
        
        // In production, this would call the Gemini API
        // For now, we'll use simulated responses
        const aiResponse = await generateAIResponse(messageText);
        
        // Remove typing indicator and add AI response
        removeTypingIndicator(typingId);
        addMessageToChat(aiResponse, 'ai');
        
        // Save conversation snippet to Firebase
        saveConversationSnippet(messageText, aiResponse);
        
    } catch (error) {
        console.error("Error generating response:", error);
        addMessageToChat("I'm having trouble responding right now. Please try again later.", 'ai');
    }
}

function addMessageToChat(text, sender) {
    // Add to conversation history
    conversationHistory.push({ text, sender });
    if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory.shift();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message rounded-lg p-3 mb-3 ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="flex items-start">
            <div class="mr-2 mt-1">
                ${sender === 'ai' ? 
                    '<i class="fas fa-robot text-blue-500"></i>' : 
                    '<i class="fas fa-user text-pink-500"></i>'}
            </div>
            <div class="flex-1">
                <p class="whitespace-pre-line">${text}</p>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'message ai-message rounded-lg p-3 mb-3';
    typingDiv.innerHTML = `
        <div class="flex items-start">
            <div class="mr-2 mt-1">
                <i class="fas fa-robot text-blue-500"></i>
            </div>
            <div class="flex-1">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingId;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Simulated AI response (in production, this would call Gemini API)
async function generateAIResponse(userMessage) {
    // Simple response patterns
    const responses = [
        "I hear you. Would you like to share more about that?",
        "That sounds difficult. I'm here to listen.",
        "Thank you for sharing that with me. How does that make you feel?",
        "I understand. Would it help to talk through this more?",
        "That's an important thing to notice about yourself. What do you think might help?",
        "I appreciate you telling me this. You're not alone in feeling this way.",
        "That sounds like it's been on your mind. Would you like to explore it further?",
        "I'm listening. Take your time with this."
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Return a random response (in production, this would analyze the message)
    return responses[Math.floor(Math.random() * responses.length)];
}

async function saveConversationSnippet(userMessage, aiResponse) {
    try {
        const userId = auth.currentUser?.uid || 'anonymous';
        await db.collection('chatHistory').add({
            userId,
            userMessage,
            aiResponse,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error("Error saving conversation:", error);
    }
}

// Handle auth state changes
auth.onAuthStateChanged((user) => {
    if (!user) {
        auth.signInAnonymously().catch(error => {
            console.error("Anonymous sign-in failed:", error);
        });
    }
});