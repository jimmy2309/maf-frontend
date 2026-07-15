const form = document.getElementById('chat-form') as HTMLFormElement;
const input = document.getElementById('message-input') as HTMLInputElement;
const messagesArea = document.getElementById('chat-messages') as HTMLDivElement;
const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;

// MAF Engine (Gateway) URL
const ENGINE_URL = 'http://localhost:8000/chat';

function createMessageElement(content: string, type: 'user' | 'agent' | 'error') {
  const msgWrapper = document.createElement('div');
  msgWrapper.className = `message ${type}-message`;
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = content;
  
  msgWrapper.appendChild(bubble);
  return msgWrapper;
}

function createLoaderElement() {
  const msgWrapper = document.createElement('div');
  msgWrapper.className = `message agent-message`;
  msgWrapper.id = 'typing-indicator';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble typing-loader';
  bubble.innerHTML = '<span></span><span></span><span></span>';
  
  msgWrapper.appendChild(bubble);
  return msgWrapper;
}

function scrollToBottom() {
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add User Message to UI
  messagesArea.appendChild(createMessageElement(userMessage, 'user'));
  input.value = '';
  sendBtn.disabled = true;
  scrollToBottom();

  // Add Typing Loader
  const loader = createLoaderElement();
  messagesArea.appendChild(loader);
  scrollToBottom();

  try {
    const response = await fetch(ENGINE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    // Remove Loader
    loader.remove();

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Add Agent Message
    messagesArea.appendChild(createMessageElement(data.reply || 'No reply received', 'agent'));
  } catch (error: any) {
    // Remove Loader if still there
    if (document.getElementById('typing-indicator')) {
      loader.remove();
    }
    
    // Add Error Message
    messagesArea.appendChild(createMessageElement(`Connection failed: ${error.message}. Is the Engine running?`, 'error'));
  } finally {
    sendBtn.disabled = false;
    input.focus();
    scrollToBottom();
  }
});
