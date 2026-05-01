// Ink dialogue renderer for HTML/CSS/JS
// This script dynamically injects dialogue UI + CSS, loads inkjs runtime and renders compiled ink JSON stories.
// Adds: portrait loading, simple HTML sanitiser for Ink content, sound pack support, and typewriter effect.
// Usage: window.inkDialogue.startStoryFromPath('assets/dialogue/Story/Chapter_01/The Basket.json')

(function(){
    const INK_RUNTIME_CDN = 'https://unpkg.com/inkjs/dist/ink.js';
    
    // Get accent color from config or use default
    const ACCENT_COLOR = (typeof COLORS !== 'undefined' && COLORS.cyan) ? COLORS.cyan : '#00f2ff';
    
    // Inject CSS for the dialogue UI (chat-style)
    const css = `
/* Chat-style Dialogue */
#ink-dialogue-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: min(500px, 92vw);
  max-height: 60vh;
  background: #f0f0f0;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  z-index: 9999;
  overflow: hidden;
  animation: chatSlideIn 0.3s ease-out;
}
@keyframes chatSlideIn {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
#ink-dialogue-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 60vh;
}
#ink-dialogue-header {
  background: #075e54;
  color: white;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
#ink-dialogue-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #075e54;
  font-size: 18px;
  flex-shrink: 0;
}
#ink-dialogue-header-info {
  flex: 1;
  overflow: hidden;
}
#ink-dialogue-speaker {
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#ink-dialogue-status {
  font-size: 11px;
  opacity: 0.8;
  margin-top: 2px;
}
#ink-dialogue-header-typing {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 16px;
}
#ink-dialogue-header-typing .dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: typingBounce 1.4s infinite;
}
#ink-dialogue-header-typing .dot:nth-child(2) { animation-delay: 0.2s; }
#ink-dialogue-header-typing .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}
#ink-dialogue-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #e5ddd5;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.chat-message {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.4;
  word-wrap: break-word;
  animation: messageSlideIn 0.3s ease-out;
  position: relative;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.1);
}
@keyframes messageSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.chat-message.sent {
  background: #dcf8c6;
  border-bottom-right-radius: 4px;
  align-self: flex-end;
  color: #000;
}
.chat-message.received {
  background: white;
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  color: #000;
}
.chat-message.sent.system {
  background: #e3f2fd;
  color: #1565c0;
  font-style: italic;
  font-size: 13px;
}
.message-time {
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-top: 4px;
  display: block;
}
.chat-message.sent .message-time {
  color: #53694a;
}
#ink-dialogue-choices {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  border-top: 1px solid #e0e0e0;
  max-height: 200px;
  overflow-y: auto;
}
.choice-poll {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  position: relative;
  overflow: hidden;
}
.choice-poll:hover {
  background: #f5f5f5;
  border-color: #075e54;
  transform: translateX(4px);
}
.choice-poll:active {
  transform: scale(0.98);
}
.choice-poll.selected {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}
.choice-poll.selected::after {
  content: '✓';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #4caf50;
  font-weight: bold;
  font-size: 18px;
}
.choice-poll:focus {
  outline: 2px solid #075e54;
  outline-offset: 2px;
}
#ink-dialogue-next {
  margin: 8px 16px 16px;
  padding: 12px 24px;
  background: #075e54;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  align-self: center;
  box-shadow: 0 2px 8px rgba(7, 94, 84, 0.2);
}
#ink-dialogue-next:hover {
  background: #054c3e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 94, 84, 0.3);
}
#ink-dialogue-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
#ink-dialogue-close:hover { background: rgba(255, 255, 255, 0.3); }
#ink-dialogue-messages::-webkit-scrollbar { width: 6px; }
#ink-dialogue-messages::-webkit-scrollbar-track { background: transparent; }
#ink-dialogue-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.npc-bubble {
  position: absolute;
  background: rgba(0, 5, 10, 0.95);
  color: #00f2ff;
  padding: 12px 18px;
  border: 1px solid #00f2ff;
  border-radius: 2px;
  font-size: 0.85em;
  text-align: center;
  transform: translate(-50%, -100%);
  display: none;
  width: 220px;
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
  z-index: 150;
}
.npc-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #00f2ff;
}
#loc-box {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
  display: none;
  z-index: 150;
}
#loc-name {
  font-size: 2.8em;
  color: #ffaa00;
  margin: 0;
  text-shadow: 0 0 20px #000;
  animation: locTypewriter 2s steps(20) 1s 1 normal both;
}
@keyframes locTypewriter { from { width: 0; } to { width: 100%; } }
.typewriter-skip {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #00f2ff;
  border: 1px solid rgba(0, 242, 255, 0.3);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  z-index: 10000;
  display: none;
}
.typewriter-skip:hover { background: rgba(0, 242, 255, 0.1); }
.typewriter-skip.visible { display: block; }
`;
    
    // Typewriter effect for chat messages
    class InkTypewriter {
      constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.speed = options.speed || 25;
        this.delay = options.delay || 30;
        this.onComplete = options.onComplete || null;
        
        element.textContent = '';
        element.style.borderRight = '2px solid ' + ACCENT_COLOR;
        element.style.whiteSpace = 'nowrap';
        element.style.overflow = 'hidden';
        
        this.chars = [...this.text];
        this.currentIndex = 0;
        this.isRunning = false;
        this.timeoutId = null;
      }
      
      start() {
        if (this.isRunning) return;
        this.isRunning = true;
        setTimeout(() => this.typeNext(), this.delay);
      }
      
      typeNext() {
        if (this.currentIndex < this.chars.length) {
          const charsToShow = this.chars.slice(0, this.currentIndex + 1).join('');
          this.element.textContent = charsToShow + '\u200B';
          this.currentIndex++;
          const speed = this.speed + Math.random() * 8 - 4;
          this.timeoutId = setTimeout(() => this.typeNext(), speed);
        } else {
          this.finish();
        }
      }
      
      skip() {
        this.stop();
        this.element.textContent = this.text;
        this.element.style.borderRight = 'none';
        this.currentIndex = this.chars.length;
        this.finish();
      }
      
      stop() {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
        this.isRunning = false;
      }
      
      finish() {
        this.stop();
        this.element.style.borderRight = 'none';
        if (this.onComplete) this.onComplete();
      }
      
      destroy() {
        this.stop();
        this.element.textContent = this.text;
        this.element.style.borderRight = '';
      }
    }
    
    let inkInstance = null;
    let currentTypewriter = null;
    let inkDialogueLoaded = false;
    let waitingForInk = false;
    let queuedStory = null;
    let skipButton = null;
    let allMessages = [];
    let choiceButtons = [];
    
    // Wait for Ink runtime
    function waitForInk(callback, maxWait = 10000) {
      const start = Date.now();
      function check() {
        const inkLib = window.inkjs || window.ink;
        if (inkLib && inkLib.Story) {
          callback(inkLib);
          return true;
        }
        if (Date.now() - start < maxWait) {
          setTimeout(check, 50);
          return false;
        }
        console.error('Ink runtime failed to load within timeout');
        return false;
      }
      return check();
    }
    
    // Create skip button
    function createSkipButton() {
      if (skipButton) return;
      skipButton = document.createElement('button');
      skipButton.className = 'typewriter-skip';
      skipButton.textContent = 'Skip';
      skipButton.onclick = () => {
        if (currentTypewriter) {
          currentTypewriter.skip();
          updateSkipButton(false);
        }
      };
      document.body.appendChild(skipButton);
    }
    
    function updateSkipButton(visible) {
      if (!skipButton) return;
      skipButton.classList.toggle('visible', visible);
    }
    
    // Create chat UI
    function createDialogueUI() {
      if (document.getElementById('ink-dialogue-container')) return;
      
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      
      const container = document.createElement('div');
      container.id = 'ink-dialogue-container';
      container.innerHTML = `
        <div id="ink-dialogue-header">
          <div id="ink-dialogue-avatar"></div>
          <div id="ink-dialogue-header-info">
            <div id="ink-dialogue-speaker"></div>
            <div id="ink-dialogue-status"></div>
            <div id="ink-dialogue-header-typing" style="display:none;">
              <div class="dot"></div><div class="dot"></div><div class="dot"></div>
            </div>
          </div>
          <button id="ink-dialogue-close">&times;</button>
        </div>
        <div id="ink-dialogue-messages"></div>
        <div id="ink-dialogue-choices"></div>
        <button id="ink-dialogue-next" style="display:none;">Next</button>
      `;
      document.body.appendChild(container);
      
      const nextBtn = document.getElementById('ink-dialogue-next');
      const closeBtn = document.getElementById('ink-dialogue-close');
      
      nextBtn.addEventListener('click', () => {
        if (currentTypewriter && currentTypewriter.isRunning) {
          currentTypewriter.skip();
          updateSkipButton(false);
        } else {
          continueStory();
        }
      });
      
      closeBtn.addEventListener('click', () => closeDialogue());
      createSkipButton();
    }
    
    // Add message to chat
    function addMessage(text, type = 'received', sender = '', isSystem = false) {
      const messagesEl = document.getElementById('ink-dialogue-messages');
      if (!messagesEl) return;
      
      const msgEl = document.createElement('div');
      msgEl.className = `chat-message ${type}${isSystem ? ' system' : ''}`;
      msgEl.innerHTML = text + '<span class="message-time"></span>';
      
      // Update timestamp
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                      now.getMinutes().toString().padStart(2, '0');
      msgEl.querySelector('.message-time').textContent = timeStr;
      
      messagesEl.appendChild(msgEl);
      allMessages.push(msgEl);
      
      // Scroll to bottom
      messagesEl.scrollTop = messagesEl.scrollHeight;
      
      // Update header typing indicator
      const typingEl = document.getElementById('ink-dialogue-header-typing');
      if (typingEl) typingEl.style.display = 'none';
      
      return msgEl;
    }
    
    // Clear choices
    function clearChoices() {
      const choicesEl = document.getElementById('ink-dialogue-choices');
      if (choicesEl) choicesEl.innerHTML = '';
      choiceButtons = [];
    }
    
    // Add choice button
    function addChoice(text, index) {
      const choicesEl = document.getElementById('ink-dialogue-choices');
      if (!choicesEl) return;
      
      const btn = document.createElement('button');
      btn.className = 'choice-poll';
      btn.textContent = text;
      btn.onclick = () => {
        choiceButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        inkInstance.ChooseChoiceIndex(index);
        continueStory();
      };
      
      choicesEl.appendChild(btn);
      choiceButtons.push(btn);
      
      // Scroll choices into view
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Strip Ink markup
    function stripInkMarkers(s) {
      if (!s) return '';
      return s
        .replace(/^#.*$/gm, '')
        .replace(/^\/\/.*$/gm, '')
        .replace(/^#$/gm, '')
        .replace(/^\/\/#$/gm, '')
        .replace(/\^\s*/g, '')
        .replace(/\n+\s*\n+/g, '\n\n')
        .trim()
        .replace(/\n\s*\n/g, '\n\n');
    }
    
    // Close dialogue
    function closeDialogue() {
      const container = document.getElementById('ink-dialogue-container');
      const typingEl = document.getElementById('ink-dialogue-header-typing');
      
      if (currentTypewriter) {
        currentTypewriter.destroy();
        currentTypewriter = null;
      }
      
      if (container) container.style.display = 'none';
      clearChoices();
      allMessages = [];
      updateSkipButton(false);
      
      if (typingEl) typingEl.style.display = 'none';
      
      // Resume game
      const player = getPlayer && getPlayer();
      if (player && player.body) player.body.wakeUp();
      
      window.inkDialogue.isDialogueOpen = false;
      document.dispatchEvent(new CustomEvent('inkDialogueClose'));
    }
    
    // Continue story
    function continueStory() {
      const container = document.getElementById('ink-dialogue-container');
      const choicesEl = document.getElementById('ink-dialogue-choices');
      const nextBtn = document.getElementById('ink-dialogue-next');
      const typingEl = document.getElementById('ink-dialogue-header-typing');
      
      if (!container || !inkInstance) return;
      
      if (currentTypewriter) {
        currentTypewriter.stop();
        currentTypewriter = null;
      }
      
      clearChoices();
      
      if (inkInstance.canContinue) {
        const rawText = inkInstance.Continue();
        const cleanText = stripInkMarkers(rawText);
        
        addMessage(cleanText, 'received');
        
        if (inkInstance.currentChoices.length > 0) {
          nextBtn.style.display = 'block';
          if (typingEl) typingEl.style.display = 'none';
        } else if (!inkInstance.canContinue) {
          nextBtn.style.display = 'none';
          if (typingEl) typingEl.style.display = 'none';
          setTimeout(closeDialogue, 1500);
          window.dispatchEvent(new CustomEvent('storyComplete'));
        } else {
          nextBtn.style.display = 'none';
          if (typingEl) typingEl.style.display = 'flex';
        }
      } else if (inkInstance.currentChoices.length > 0) {
        nextBtn.style.display = 'block';
        if (typingEl) typingEl.style.display = 'none';
      } else {
        closeDialogue();
      }
    }
    
    // Public API
    window.inkDialogue = {
      isDialogueOpen: false,
      currentStory: null,
      
      startStoryFromPath: function(path, options = {}) {
        if (this.isDialogueOpen) return;
        this.isDialogueOpen = true;
        
        createDialogueUI();
        const container = document.getElementById('ink-dialogue-container');
        const header = document.getElementById('ink-dialogue-header');
        const avatar = document.getElementById('ink-dialogue-avatar');
        const speaker = document.getElementById('ink-dialogue-speaker');
        const status = document.getElementById('ink-dialogue-status');
        const messagesEl = document.getElementById('ink-dialogue-messages');
        const choicesEl = document.getElementById('ink-dialogue-choices');
        const nextBtn = document.getElementById('ink-dialogue-next');
        
        if (container) container.style.display = 'flex';
        
        // Pause game
        const player = getPlayer && getPlayer();
        if (player && player.body) player.body.sleep();
        
        // Setup header
        const npcName = options.npcName || options.name || 'Speaker';
        const npcInitial = npcName.charAt(0).toUpperCase();
        
        if (avatar) {
          if (options.portrait) {
            avatar.innerHTML = `<img src="${options.portrait}" alt="${npcName}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
          } else {
            avatar.textContent = npcInitial;
            avatar.style.background = options.color || '#075e54';
            avatar.style.color = 'white';
          }
        }
        
        if (speaker) speaker.textContent = npcName;
        if (status) status.textContent = options.status || 'Typing...';
        
        // Clear previous messages
        allMessages = [];
        if (messagesEl) messagesEl.innerHTML = '';
        clearChoices();
        nextBtn.style.display = 'none';
        
        // Add system message
        if (options.systemMessage) {
          addMessage(options.systemMessage, 'sent system');
        }
        
        // Load story
        if (inkDialogueLoaded && inkInstance) {
          this._loadStory(path, options);
        } else {
          queuedStory = { path, options };
          if (!waitingForInk) this._loadInkRuntime();
        }
      },
      
      _loadInkRuntime: function() {
        waitingForInk = true;
        
        if (waitForInk((inkLib) => {
          inkInstance = inkLib;
          this._onInkReady();
        })) return;
        
        const existing = document.querySelector('script[src="' + INK_RUNTIME_CDN + '"]');
        if (existing) {
          const checkInterval = setInterval(() => {
            if (window.inkjs || window.ink) {
              clearInterval(checkInterval);
              inkInstance = window.inkjs || window.ink;
              this._onInkReady();
            }
          }, 100);
          return;
        }
        
        const script = document.createElement('script');
        script.src = INK_RUNTIME_CDN;
        script.onload = () => {
          const checkInterval = setInterval(() => {
            if (window.inkjs || window.ink) {
              clearInterval(checkInterval);
              inkInstance = window.inkjs || window.ink;
              this._onInkReady();
            }
          }, 50);
        };
        script.onerror = () => {
          console.error('Failed to load Ink.js');
          waitingForInk = false;
        };
        document.head.appendChild(script);
      },
      
      _onInkReady: function() {
        waitingForInk = false;
        inkDialogueLoaded = true;
        if (queuedStory) {
          this._loadStory(queuedStory.path, queuedStory.options);
          queuedStory = null;
        }
      },
      
      _loadStory: function(path, options = {}) {
        fetch(path)
          .then(response => {
            if (!response.ok) throw new Error('Failed to load: ' + response.status);
            return response.json();
          })
          .then(storyData => {
            inkInstance = new inkInstance.Story(storyData);
            this.currentStory = inkInstance;
            continueStory();
            document.dispatchEvent(new CustomEvent('inkDialogueOpen'));
          })
          .catch(error => {
            console.error('Error loading story:', error);
            this.close();
          });
      },
      
      close: function() {
        closeDialogue();
      },
      
      isOpen: function() {
        return this.isDialogueOpen;
      }
    };
    
    console.log('Chat-style Ink Dialogue system loaded');
    
})();
