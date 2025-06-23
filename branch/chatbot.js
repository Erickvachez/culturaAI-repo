// Chatbot logic for CulturaAi
// ==========================
// This file contains all chatbot-related code. Add or expand responses below.

// Extract country name from user message (simple version)
function extractCountryFromText(text) {
    // Looks for the last word after 'culture of' or 'tell me about'
    let match = text.match(/culture of ([\w\s]+)/i) || text.match(/tell me about ([\w\s]+)/i);
    if (match && match[1]) {
        // Remove punctuation and trim
        return match[1].replace(/[.?!]/g, '').trim();
    }
    // fallback: just return the last word
    const words = text.split(' ');
    return words[words.length - 1].replace(/[.?!]/g, '');
}

// Handle sending a chat message (now async for API calls)
async function handleUserMessage(message) {
    if (!message) return '';
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('culture of') || lowerMsg.includes('tell me about')) {
        const country = extractCountryFromText(message);
        try {
            const module = await import('../src/chatbot/DiskovAfrikaAPI.js');
            const data = await module.getCountryCulture(country);
            if (data.error || !data.name) {
                return "Sorry, I couldn't find cultural info.";
            }
            return `Here's what I found about ${data.name}:<br>- Languages: ${data.languages?.join(', ') || 'N/A'}<br>- Religions: ${data.religions?.join(', ') || 'N/A'}`;
        } catch (error) {
            console.error('Chatbot API error:', error);
            return '[Error fetching country details or loading API module: ' + error.message + ']';
        }
    }
    return "I'm not sure how to answer that yet. Try asking about a country's culture!";
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbot initializing...');
    
    // Event listener for Send button
    const sendBtn = document.getElementById('sendBtn');
    const chatInputBox = document.getElementById('chatInput');
    const chatContent = document.getElementById('chatContent');
    
    if (!sendBtn || !chatInputBox || !chatContent) {
        console.error('Chatbot elements not found:', { sendBtn: !!sendBtn, chatInputBox: !!chatInputBox, chatContent: !!chatContent });
        return;
    }
    
    console.log('Chatbot elements found, setting up event listeners...');
    
    sendBtn.addEventListener('click', async () => {
        const chatInput = chatInputBox.value.trim();
        if (chatInput) {
            console.log('Sending message:', chatInput);
            chatContent.innerHTML += `<p><strong>User:</strong> ${chatInput}</p>`;
            const botReply = await handleUserMessage(chatInput);
            chatContent.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
            chatContent.scrollTop = chatContent.scrollHeight;
            chatInputBox.value = '';
        }
    });

    // Handle Enter key for chat input
    chatInputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendBtn.click();
        }
    });
    
    console.log('Chatbot initialized successfully!');
});

// ========== Add more chatbot features below ==========
// For example, keyword-based responses, API calls, etc. 