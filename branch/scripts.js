document.getElementById('translateBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value.trim();
    const lang = document.getElementById('languageSelect').value;

    if (!text) {
        alert('Please enter some text.');
        return;
    }

    // Call your translation API
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, target_language: lang })
        });
        if (!response.ok) throw new Error('Translation failed');
        const data = await response.json();
        const translatedText = data.translated_text || '[No translation returned]';

        // Chat Bot Functionality (optional: you can move this to chatbot.js if you want)
        const chatContent = document.getElementById('chatContent');
        chatContent.innerHTML += `<p>User: ${text}</p><p>Bot: Translated to ${lang}: ${translatedText}</p>`;
        chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
        alert('Error: ' + error.message);
    }

    document.getElementById('inputText').value = '';
});

document.getElementById('sendBtn').addEventListener('click', () => {
    const chatInput = document.getElementById('chatInput').value.trim();
    const chatContent = document.getElementById('chatContent');

    if (chatInput) {
        chatContent.innerHTML += `<p>User: ${chatInput}</p><p>Bot: Thanks for your message! How can I help with African culture today?</p>`;
        chatContent.scrollTop = chatContent.scrollHeight;
        document.getElementById('chatInput').value = '';
    }
});