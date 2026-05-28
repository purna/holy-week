// Bible API Configuration
const BIBLE_API_CONFIG = {
  apiKey: '40uwrV5VD_g7dxygwU-WK',
  baseUrl: 'https://api.bible/v1',
  translations: {
    NIV: 'de4e12af7c28f528-02', // API ID for New International Version
    GNT: 'c3154be53a35ca34-01'  // API ID for Good News Translation
  }
};

// Bible Reading Engine
window.BibleReader = {
  selectedTranslation: 'NIV',

  updateTranslation: function(val) {
    this.selectedTranslation = val;
  },

  closeOverlay: function(event) {
    // If clicked out or explicitly via close button, drop layout visibility
    if (!event || event.target === document.getElementById('passage-overlay')) {
      document.getElementById('passage-overlay').style.display = 'none';
    }
  },

  displayPassage: async function(pKey) {
    // 1. Prepare UI State & Window References
    const contentArea = document.getElementById('passage-text-content');
    const titleArea = document.getElementById('passage-ref-title');
    const versionLabel = document.getElementById('passage-version-lbl');
    const overlay = document.getElementById('passage-overlay');

    titleArea.innerText = "Connecting to API.Bible...";
    versionLabel.innerText = this.selectedTranslation;
    contentArea.innerHTML = `
        <div style="text-align:center; padding:30px; color:var(--text-muted);">
            <i class="fa-solid fa-circle-notch spinner" style="font-size:1.5rem; margin-bottom:10px; color:var(--accent);"></i>
            <div>Fetching context trail...</div>
        </div>
    `;
    overlay.style.display = 'flex';

    // Format the passage key (e.g., 'ZECH_9_9') to standard API structure ('ZECH.9.9')
    const formattedVerseId = pKey.replace(/_/g, '.');
    const targetBibleId = BIBLE_API_CONFIG.translations[this.selectedTranslation] || BIBLE_API_CONFIG.translations.NIV;

    // Track context position for chaining verses
    let nextVerseId = null;

    try {
      // Query initial passage
      const response = await fetch(`${BIBLE_API_CONFIG.baseUrl}/bibles/${targetBibleId}/verses/${formattedVerseId}?content-type=text`, {
        method: 'GET',
        headers: { 'api-key': BIBLE_API_CONFIG.apiKey }
      });

      if (!response.ok) throw new Error(`Server returned error status: ${response.status}`);
      const result = await response.json();

      const currentData = result.data;
      titleArea.innerText = currentData.reference;
      nextVerseId = currentData.next?.id; // Get the target ID for sequential chaining

      // Render the current verse
      contentArea.innerHTML = `
          <p class="current-v">
              <strong>${currentData.reference}</strong> ${currentData.content}
          </p>
          <div id="extended-verses"></div>
          
          ${nextVerseId ? `
              <button id="btn-load-next-verse" class="terminal-btn">
                  <i class="fa-solid fa-arrow-down"></i> Read Next Verse
              </button>
          ` : ''}
      `;

      // Set up the "Read Next Verse" button functionality
      if (nextVerseId) {
        document.getElementById('btn-load-next-verse').onclick = async (e) => {
          const targetButton = e.currentTarget;
          targetButton.disabled = true;
          targetButton.innerHTML = `<i class="fa-solid fa-circle-notch spinner"></i> Loading...`;

          try {
            // Request the next verse
            const nextResponse = await fetch(`${BIBLE_API_CONFIG.baseUrl}/bibles/${targetBibleId}/verses/${nextVerseId}?content-type=text`, {
              method: 'GET',
              headers: { 'api-key': BIBLE_API_CONFIG.apiKey }
            });

            if (!nextResponse.ok) throw new Error("Failed to load next verse.");
            const nextResult = await nextResponse.json();
            const nextData = nextResult.data;

            // Append the next verse
            const extendedArea = document.getElementById('extended-verses');
            const paragraph = document.createElement('p');
            paragraph.className = 'context-v';
            paragraph.innerHTML = `<strong>${nextData.reference}</strong> ${nextData.content}`;
            extendedArea.appendChild(paragraph);

            // Update pointer for further continuity
            nextVerseId = nextData.next?.id;

            if (!nextVerseId) {
              targetButton.remove(); // End of passage
            } else {
              targetButton.disabled = false;
              targetButton.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Read Next Verse`;
            }

          } catch (err) {
            console.error("Error loading next verse:", err);
            targetButton.innerHTML = `<span style="color:var(--accent-error);">Error loading verse</span>`;
            targetButton.disabled = false;
          }
        };
      }

    } catch (error) {
      console.error("API Error:", error);
      contentArea.innerHTML = `
          <div style="color:var(--accent-error); padding:10px; text-align:center; border:1px solid rgba(255,68,68,0.2); border-radius:6px; background:rgba(255,68,68,0.05);">
              <i class="fa-solid fa-triangle-exclamation" style="font-size:1.2rem; margin-bottom:6px;"></i>
              <p style="margin:4px 0; font-size:0.9rem;">Failed to fetch live content.</p>
              <small style="color:var(--text-muted); font-size:0.75rem;">${error.message}</small>
          </div>
      `;
    }
  }
};