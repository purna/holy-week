// Bible Reading Engine — uses open bible-api.com (no CORS issues from localhost)
window.BibleReader = {
  translation: 'web',
  anchorRef: null,
  verses: [],
  topPrevId: null,
  bottomNextId: null,

  updateTranslation: function(val) {
    this.translation = val;
  },

  closeOverlay: function(event) {
    if (!event || event.target === document.getElementById('passage-overlay')) {
      document.getElementById('passage-overlay').style.display = 'none';
    }
  },

  formatRef: function(raw) {
    return raw.trim().toUpperCase()
      .replace(/[\s_-]+/g, '.')
      .replace(/:/g, '.')
      .replace(/[^\w.]/g, '')
      .replace(/\.+/g, '.')
      .replace(/^\./, '').replace(/\.$/, '');
  },

  fetchVerse: async function(verseId) {
    const parts = verseId.split('.');
    if (parts.length < 2) throw new Error('Invalid reference');

    const book = parts[0];
    const chapter = parts[1];
    let verse = parts[2];

    let url = `https://bible-api.com/${book}+${chapter}`;
    if (verse && verse !== 'LAST') url += `:${verse}`;
    url += `?translation=${this.translation}`;

    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} – Not Found`);
    const j = await r.json();
    if (!j.verses || !j.verses.length) throw new Error('Verse not found');

    const v = (verse === 'LAST') ? j.verses[j.verses.length - 1] : j.verses[0];
    return {
      id: `${v.book_id}.${v.chapter}.${v.verse}`,
      reference: `${v.book_name} ${v.chapter}:${v.verse}`,
      content: v.text.trim(),
      verseNum: v.verse,
      bookId: v.book_id,
      chapter: v.chapter,
      verse: v.verse
    };
  },

  loadChain: async function(startId, count) {
    const chain = [];
    let currentId = startId;
    for (let i = 0; i < count && currentId; i++) {
      try {
        const data = await this.fetchVerse(currentId);
        chain.push(data);
        currentId = `${data.bookId}.${data.chapter}.${data.verse + 1}`;
      } catch (err) {
        try {
          const parts = currentId.split('.');
          const nextChapterId = `${parts[0]}.${parseInt(parts[1]) + 1}.1`;
          const data = await this.fetchVerse(nextChapterId);
          chain.push(data);
          currentId = `${data.bookId}.${data.chapter}.${data.verse + 1}`;
        } catch (err2) {
          currentId = null;
        }
      }
    }
    return chain;
  },

  loadChainBack: async function(startId, count) {
    const chain = [];
    let currentId = startId;
    for (let i = 0; i < count && currentId; i++) {
      try {
        const data = await this.fetchVerse(currentId);
        chain.unshift(data);
        if (data.verse > 1) {
          currentId = `${data.bookId}.${data.chapter}.${data.verse - 1}`;
        } else if (data.chapter > 1) {
          currentId = `${data.bookId}.${data.chapter - 1}.LAST`;
        } else {
          currentId = null;
        }
      } catch (err) {
        currentId = null;
      }
    }
    let furthestPrevId = null;
    if (chain.length > 0) {
      const first = chain[0];
      if (first.verse > 1) furthestPrevId = `${first.bookId}.${first.chapter}.${first.verse - 1}`;
      else if (first.chapter > 1) furthestPrevId = `${first.bookId}.${first.chapter - 1}.LAST`;
    }
    return { chain, furthestPrevId };
  },

  renderVerses: function() {
    const contentArea = document.getElementById('passage-text-content');
    if (!contentArea) return;
    if (!this.verses.length) return;

    const anchorId = this.anchorRef;
    let html = '';

    html += '<div class="load-prev-strip">';
    if (this.topPrevId) {
      html += `<button class="terminal-btn" id="btn-load-prev-verse" style="margin-right:8px;"><i class="fa-solid fa-arrow-up"></i> Load Previous Verses</button>`;
    } else {
      html += '<span class="passage-hint">Beginning of passage</span>';
    }
    html += '</div>';

    this.verses.forEach(v => {
      const isAnchor = v.id === anchorId;
      const anchorIdx = this.verses.findIndex(x => x.id === anchorId);
      const myIdx = this.verses.indexOf(v);
      const isPrev = myIdx < anchorIdx;
      const cls = isAnchor ? 'anchor-verse' : isPrev ? 'prev-verse' : '';
      html += `
        <div class="verse-block ${cls}">
          <span class="verse-num">${v.verseNum}</span>
          <span class="verse-text">${v.content}</span>
        </div>`;
    });

    html += '<div class="load-more-strip">';
    if (this.bottomNextId) {
      html += `<button class="terminal-btn" id="btn-load-next-verse"><i class="fa-solid fa-arrow-down"></i> Read More</button>`;
    } else {
      html += '<span class="passage-hint">End of passage</span>';
    }
    html += '</div>';

    contentArea.innerHTML = html;

    const anchorEl = contentArea.querySelector('.anchor-verse');
    if (anchorEl) anchorEl.scrollIntoView({ block: 'center', behavior: 'smooth' });

    const prevBtn = document.getElementById('btn-load-prev-verse');
    if (prevBtn) {
      prevBtn.onclick = async () => {
        const { chain, furthestPrevId } = await this.loadChainBack(this.topPrevId, 4);
        this.verses = chain.concat(this.verses);
        if (chain.length) {
          const first = chain[0];
          this.topPrevId = furthestPrevId;
        } else {
          this.topPrevId = null;
        }
        this.renderVerses();
        const blocks = contentArea.querySelectorAll('.verse-block');
        if (blocks.length >= chain.length && chain.length > 0) blocks[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }

    const nextBtn = document.getElementById('btn-load-next-verse');
    if (nextBtn) {
      nextBtn.onclick = async () => {
        if (!this.bottomNextId) return;
        const btn = nextBtn;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch spinner"></i> Loading…';
        try {
          const chain = await this.loadChain(this.bottomNextId, 4);
          this.verses = this.verses.concat(chain);
          if (chain.length) {
            const last = chain[chain.length - 1];
            this.bottomNextId = `${last.bookId}.${last.chapter}.${last.verse + 1}`;
          } else {
            this.bottomNextId = null;
          }
          this.renderVerses();
          const blocks = contentArea.querySelectorAll('.verse-block');
          if (blocks.length) blocks[blocks.length - (chain.length || 1)].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-arrow-down"></i> Read More';
        }
      };
    }
  },

  displayPassage: async function(pKey) {
    const contentArea = document.getElementById('passage-text-content');
    const titleArea = document.getElementById('passage-ref-title');
    const overlay = document.getElementById('passage-overlay');

    titleArea.innerText = 'Loading scripture…';
    contentArea.innerHTML = `
      <div class="state-box">
        <div class="icon"><i class="fa-solid fa-circle-notch spinner"></i></div>
        <p>Fetching passage…</p>
      </div>`;
    overlay.style.display = 'flex';

    const formattedRef = this.formatRef(pKey);
    const parts = formattedRef.split('.');
    const verseRef = parts.length >= 2 ? `${parts[0]}.${parts[1]}.${parts[2] || '1'}` : formattedRef;

    try {
      const anchor = await this.fetchVerse(verseRef);
      this.anchorRef = anchor.id;
      this.verses = [anchor];
      this.topPrevId = (anchor.verse > 1) ? `${anchor.bookId}.${anchor.chapter}.${anchor.verse - 1}` : (anchor.chapter > 1 ? `${anchor.bookId}.${anchor.chapter - 1}.LAST` : null);
      this.bottomNextId = `${anchor.bookId}.${anchor.chapter}.${anchor.verse + 1}`;

      if (this.bottomNextId) {
        const after = await this.loadChain(this.bottomNextId, 4);
        this.verses = this.verses.concat(after);
        if (after.length) {
          const last = after[after.length - 1];
          this.bottomNextId = `${last.bookId}.${last.chapter}.${last.verse + 1}`;
        }
      }

      titleArea.innerText = anchor.reference;
      this.renderVerses();
    } catch (err) {
      console.error('BibleReader error:', err);
      contentArea.innerHTML = `
        <div class="state-box">
          <div class="icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <p>Could not load passage.</p>
          <small>${err.message}</small>
          <br><button class="terminal-btn" onclick="window.BibleReader.closeOverlay()" style="margin-top:10px;">Close</button>
        </div>`;
    }
  }
};
