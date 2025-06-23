// Translator functionality for CulturaAi
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Translator initializing...');
    
    const translateBtn = document.getElementById('translateBtn');
    const inputText = document.getElementById('inputText');
    const languageSelect = document.getElementById('languageSelect');
    
    if (!translateBtn || !inputText || !languageSelect) {
        console.error('Translator elements not found');
        return;
    }
    
    console.log('Translator elements found, setting up event listeners...');
    
    // Translation button event listener
    translateBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();
        const language = languageSelect.value;

        if (!text) {
            alert("Please enter some text.");
            return;
        }

        try {
            console.log('Translating:', text, 'to', language);
            
            // Show loading state
            translateBtn.textContent = 'Translating...';
            translateBtn.disabled = true;
            
            const response = await fetch(`/api/translate?text=${encodeURIComponent(text)}&lang=${language}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const { translated, audioUrl } = await response.json();
            
            console.log('Translation received:', translated);
            console.log('Audio URL:', audioUrl);

            // Display translation in chat
            const chatContent = document.getElementById('chatContent');
            if (chatContent) {
                chatContent.innerHTML += `<p><strong>Translation:</strong> ${translated}</p>`;
                chatContent.scrollTop = chatContent.scrollHeight;
            }

            // Play audio if available
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                audio.play().catch(err => {
                    console.error('Audio playback error:', err);
                });
            }
            
        } catch (err) {
            console.error("Translation error:", err);
            alert("Could not translate. Try again.");
            
            // Show error in chat
            const chatContent = document.getElementById('chatContent');
            if (chatContent) {
                chatContent.innerHTML += `<p><strong>Error:</strong> Translation failed. Please try again.</p>`;
                chatContent.scrollTop = chatContent.scrollHeight;
            }
        } finally {
            // Reset button state
            translateBtn.textContent = 'Translate & Speak';
            translateBtn.disabled = false;
        }
    });
    
    // Enter key support for textarea
    inputText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            translateBtn.click();
        }
    });
    
    console.log('Translator initialized successfully!');
}); 