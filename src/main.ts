interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Config {
  gatewayUrl: string;
  token: string;
  userId: string;
}

class QClawMobile {
  private messages: Message[] = [];
  private config: Config;
  private isConnected = false;

  private messagesEl: HTMLElement;
  private inputEl: HTMLInputElement;
  private sendBtn: HTMLButtonElement;
  private statusEl: HTMLElement;
  private typingEl: HTMLElement;

  constructor() {
    // Load saved config
    const saved = localStorage.getItem('qclaw-config');
    this.config = saved ? JSON.parse(saved) : {
      gatewayUrl: 'http://192.168.31.100:28789',
      token: 'cf97ab4412bea2c394b73d291c4ea2cf96843f1801d7cd3b',
      userId: '1F0C0F1FFED429F64227E788F6F710E6'
    };

    // Get DOM elements
    this.messagesEl = document.getElementById('messages')!;
    this.inputEl = document.getElementById('message-input') as HTMLInputElement;
    this.sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
    this.statusEl = document.getElementById('status')!;
    this.typingEl = document.getElementById('typing-indicator')!;

    // Fill settings
    (document.getElementById('gateway-url') as HTMLInputElement).value = this.config.gatewayUrl;
    (document.getElementById('auth-token') as HTMLInputElement).value = this.config.token;
    (document.getElementById('user-id') as HTMLInputElement).value = this.config.userId;

    this.setupEventListeners();
    this.connect();
  }

  private setupEventListeners() {
    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Save settings
    document.getElementById('save-settings')?.addEventListener('click', () => this.saveSettings());

    // Settings toggle (tap header)
    document.querySelector('header')?.addEventListener('click', () => {
      const panel = document.getElementById('settings-panel');
      panel?.classList.toggle('hidden');
    });
  }

  private saveSettings() {
    this.config = {
      gatewayUrl: (document.getElementById('gateway-url') as HTMLInputElement).value,
      token: (document.getElementById('auth-token') as HTMLInputElement).value,
      userId: (document.getElementById('user-id') as HTMLInputElement).value
    };
    localStorage.setItem('qclaw-config', JSON.stringify(this.config));
    document.getElementById('settings-panel')?.classList.add('hidden');
    this.updateStatus('connecting');
    this.connect();
  }

  private async connect() {
    try {
      const response = await fetch(`${this.config.gatewayUrl}/status`, {
        headers: { 'Authorization': `Bearer ${this.config.token}` }
      });
      
      if (response.ok) {
        this.isConnected = true;
        this.updateStatus('connected');
      } else {
        throw new Error('Auth failed');
      }
    } catch {
      this.isConnected = false;
      this.updateStatus('disconnected');
    }
  }

  private updateStatus(status: 'connected' | 'disconnected' | 'connecting') {
    this.statusEl.className = `status ${status}`;
    this.statusEl.textContent = 
      status === 'connected' ? '已连接' :
      status === 'connecting' ? '连接中...' : '未连接';
  }

  private async sendMessage() {
    const content = this.inputEl.value.trim();
    if (!content || !this.isConnected) return;

    // Add user message
    this.addMessage('user', content);
    this.inputEl.value = '';
    this.sendBtn.disabled = true;

    // Show typing
    this.typingEl.classList.remove('hidden');
    this.scrollToBottom();

    try {
      // Call QClaw API
      const response = await fetch(`${this.config.gatewayUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`
        },
        body: JSON.stringify({
          model: 'modelroute',
          messages: [
            { role: 'user', content }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMessage = this.addMessage('assistant', '');
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                fullContent += delta;
                assistantMessage.textContent = fullContent;
                this.scrollToBottom();
              }
            } catch {}
          }
        }
      }

      // Update message with final content
      assistantMessage.textContent = fullContent || '（无回复）';

    } catch (error) {
      const lastMsg = this.messagesEl.lastElementChild;
      if (lastMsg?.classList.contains('assistant')) {
        lastMsg.textContent = `错误: ${error}`;
      }
    } finally {
      this.typingEl.classList.add('hidden');
      this.sendBtn.disabled = false;
      this.inputEl.focus();
    }
  }

  private addMessage(role: 'user' | 'assistant', content: string): HTMLElement {
    const msg = document.createElement('div');
    msg.className = `message ${role}`;
    
    if (role === 'assistant') {
      const sender = document.createElement('div');
      sender.className = 'sender';
      sender.textContent = 'QClaw';
      msg.appendChild(sender);
    }
    
    msg.appendChild(document.createTextNode(content));
    this.messagesEl.appendChild(msg);
    this.scrollToBottom();
    
    return msg;
  }

  private scrollToBottom() {
    const container = document.getElementById('chat-container')!;
    container.scrollTop = container.scrollHeight;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new QClawMobile();
});
