/* ═══════════════════════════════════════════
   ECHO PROTOCOL — Branching Conversation Tree
   Narrative / Dialogue Editor
   ═══════════════════════════════════════════ */

import { ConversationStory } from '../../js/gameplay/conversationStory.js';

class NarrativeEditor {
  constructor() {
    // ── DOM refs ──
    this.bubScroll = document.getElementById('bub-scroll');
    this.barChoices = document.getElementById('bar-choices');
    this.inkLinkContainer = document.getElementById('ink-file-link');
    this.tooltip = document.getElementById('tree-tooltip');
    this.treeScroll = document.getElementById('tree-scroll');
    this.svgEl = document.getElementById('tree-svg');
    this.caseListEl = document.getElementById('case-select');
    this.actFilterEl = document.getElementById('act-filter-select');
    this.importBtn = document.getElementById('import-btn');
    this.importInput = document.getElementById('import-dialogue');
    this.preloadBtn = document.getElementById('preload-btn');
    this.preloadLogEl = document.getElementById('preload-log');

    // ── Story data & multi-case-file registry ──
    this.caseFiles = {};        
    this.caseMeta = {};         
    this.currentCaseName = "";  
    this.STORY = {};
    this.selectedActFilter = "ALL";

    // ── Simulation state ──
    this.curNode = "Start";
    this.visited = {};
    this.positions = null;

    // ── Selected Path Highlighting State ──
    this.selectedPathNodes = new Set();
    this.selectedPathEdges = new Set();

    // ── Map structural graph ──
    this.adjacency = {};
    this.orderMap = {};

    // ── Node Sizing & Spacing Adjustments ──
    this.nodeW = 128;      // Default width
    this.nodeH = 60;       // Default height
    this.horizGap = 160;   // Gap between siblings
    this.vertGap = 100;    // Gap between vertical tiers

    // ── Spacebar Drag Panning State ──
    this.isSpacePressed = false;
    this.isPanning = false;
    this.panStartX = 0;
    this.panStartY = 0;
    this.scrollLeftStart = 0;
    this.scrollTopStart = 0;

    this.bindEvents();
    this.preloadDefaultCases(true);
  }

  async initDefaultStory() {
    const defaultPath = 'assets/story/act1/case_a_missing_donkey/eleazar_sadducee.json';
    const pathPrefix = '../../';
    
    try {
      const response = await fetch(pathPrefix + defaultPath);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const dialogue = await response.json();
      
      this.STORY = dialogue;
      this.currentCaseName = defaultPath;
      this.caseFiles[defaultPath] = dialogue;
      this.caseMeta[defaultPath] = "Act I — Missing Donkey: Eleazar Sadducee";
    } catch (err) {
      console.error("Failed to load default story file:", err);
      this.STORY = {
        "Start": {
          content: "Failed to load default story file (eleazar_sadducee.json).",
          choices: []
        }
      };
    }

    this.buildGraph();
    this.renderCaseList();
    this.updateInkLinkAndEvidence();
    
    if (!this.STORY["Start"]) {
      const firstKey = Object.keys(this.STORY)[0];
      if (firstKey) this.curNode = firstKey;
    } else {
      this.curNode = "Start";
    }

    this.visited[this.curNode] = true;
    this.computePathToNode(this.curNode);
    this.renderTree();
    this.centerOnStartNode();
    this.addMsg('system', 'ECHO SECURITY NODE ACCESS HANDSHAKE CONFIRMED.');
    this.revealNode(this.curNode);
  }

  bindEvents() {
    this.importBtn.addEventListener('click', () => this.importInput.click());
    this.importInput.addEventListener('change', (e) => this.handleImport(e));
    if (this.caseListEl) {
      this.caseListEl.addEventListener('change', () => this.loadCaseIntoStory(this.caseListEl.value));
    }
    if (this.actFilterEl) {
      this.actFilterEl.addEventListener('change', (e) => {
        this.selectedActFilter = e.target.value;
        this.renderCaseList();
      });
    }
    if (this.preloadBtn) {
      this.preloadBtn.addEventListener('click', () => this.preloadDefaultCases());
    }

    // ── Node interactions ──
    this.svgEl.addEventListener('click', (e) => {
      if (this.isPanning) return;
      const g = e.target.closest('[data-node-id]');
      if (g) this.jumpTo(g.dataset.nodeId);
    });
    this.svgEl.addEventListener('mouseover', (e) => {
      if (this.isSpacePressed || this.isPanning) return;
      const g = e.target.closest('[data-node-id]');
      if (g) this.showTip(e, g.dataset.nodeId);
    });
    this.svgEl.addEventListener('mousemove', (e) => {
      if (this.isSpacePressed || this.isPanning) return;
      const g = e.target.closest('[data-node-id]');
      if (g) this.positionTip(e);
    });
    this.svgEl.addEventListener('mouseout', (e) => {
      const g = e.target.closest('[data-node-id]');
      if (g) this.hideTip();
    });

    // ── Spacebar Drag Panning Listeners ──
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isSpacePressed) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        
        e.preventDefault();
        this.isSpacePressed = true;
        this.treeScroll.style.cursor = 'grab';
        this.hideTip();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.isSpacePressed = false;
        this.isPanning = false;
        this.treeScroll.style.cursor = 'default';
      }
    });

    this.treeScroll.addEventListener('mousedown', (e) => {
      if (!this.isSpacePressed) return;
      e.preventDefault();
      this.isPanning = true;
      this.treeScroll.style.cursor = 'grabbing';
      this.panStartX = e.clientX;
      this.panStartY = e.clientY;
      this.scrollLeftStart = this.treeScroll.scrollLeft;
      this.scrollTopStart = this.treeScroll.scrollTop;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      e.preventDefault();
      const dx = e.clientX - this.panStartX;
      const dy = e.clientY - this.panStartY;
      this.treeScroll.scrollLeft = this.scrollLeftStart - dx;
      this.treeScroll.scrollTop = this.scrollTopStart - dy;
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.treeScroll.style.cursor = this.isSpacePressed ? 'grab' : 'default';
      }
    });
  }

  // ── Calculate shortest path from 'Start' to target targetNodeId ──
  computePathToNode(targetNodeId) {
    this.selectedPathNodes.clear();
    this.selectedPathEdges.clear();

    const startNode = this.STORY["Start"] ? "Start" : Object.keys(this.STORY)[0];
    if (!startNode || !this.STORY[targetNodeId]) return;

    // BFS Queue to find path
    const queue = [[startNode]];
    const visited = new Set([startNode]);
    let pathFound = null;

    if (startNode === targetNodeId) {
      pathFound = [startNode];
    } else {
      while (queue.length > 0) {
        const path = queue.shift();
        const curr = path[path.length - 1];

        const neighbors = this.adjacency[curr] || [];
        for (const next of neighbors) {
          if (!visited.has(next)) {
            visited.add(next);
            const newPath = [...path, next];
            if (next === targetNodeId) {
              pathFound = newPath;
              break;
            }
            queue.push(newPath);
          }
        }
        if (pathFound) break;
      }
    }

    if (pathFound) {
      pathFound.forEach(id => this.selectedPathNodes.add(id));
      for (let i = 0; i < pathFound.length - 1; i++) {
        this.selectedPathEdges.add(pathFound[i] + '|' + pathFound[i + 1]);
      }
    }
  }

  getNodeEvidence(node) {
    if (!node) return [];
    const textToScan = (node.content || '') + ' ' + (node.steps || []).map(s => s.tag ? '# ' + s.tag : '').join(' ') + ' ' + (node.choices ? node.choices.map(c => c.text).join(' ') : '');
    const matches = textToScan.match(/#\s*UNLOCK_EVIDENCE:\s*[\w-]+/gi);
    if (!matches) return [];
    return matches.map(m => m.replace(/#\s*UNLOCK_EVIDENCE:\s*/i, '').trim());
  }

  updateInkLinkAndEvidence() {
    if (!this.inkLinkContainer) return;
    
    if (!this.currentCaseName) {
      this.inkLinkContainer.innerHTML = '<span style="color:#667781">No file loaded</span>';
      return;
    }

    const pathPrefix = '../../';
    const inkPath = this.currentCaseName.replace(/\.json$/i, '.ink');
    const fullInkUrl = pathPrefix + inkPath;
    const fileName = inkPath.split('/').pop();

    const evidenceMap = [];
    Object.keys(this.STORY).forEach((nodeId) => {
      const items = this.getNodeEvidence(this.STORY[nodeId]);
      items.forEach((item) => {
        evidenceMap.push({ nodeId, evidence: item });
      });
    });

    let html = 
      '<a href="' + escapeAttr(fullInkUrl) + '" target="_blank" rel="noopener noreferrer" class="ink-file-button" style="'
      + 'display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; '
      + 'background: rgba(100, 255, 218, 0.1); border: 1px solid var(--green, #64ffda); '
      + 'color: var(--green, #64ffda); border-radius: 4px; text-decoration: none; '
      + 'font-family: monospace; font-size: 0.8rem; font-weight: bold; transition: all 0.2s ease;'
      + '">'
      + '<span>🔗 OPEN INK FILE:</span> <u>' + escapeXml(fileName) + '</u>'
      + '</a>';

    html += '<div style="margin-top: 12px; font-family: monospace; font-size: 0.75rem;">';
    html += '<div style="color: #ffd54f; font-weight: bold; border-bottom: 1px solid rgba(255, 213, 79, 0.3); padding-bottom: 3px; margin-bottom: 6px;">🔍 UNLOCK_EVIDENCE REFERENCES (' + evidenceMap.length + ')</div>';

    if (evidenceMap.length === 0) {
      html += '<div style="color: #667781; font-style: italic;">No # UNLOCK_EVIDENCE references in this file.</div>';
    } else {
      html += '<ul style="list-style: none; padding: 0; margin: 0;">';
      evidenceMap.forEach((item) => {
        const nodeIndex = this.orderMap[item.nodeId] !== undefined ? '#' + this.orderMap[item.nodeId] : item.nodeId;
        html += '<li style="margin-bottom: 4px; color: #e9edef; background: rgba(255, 213, 79, 0.08); padding: 3px 6px; border-radius: 3px; border-left: 2px solid #ffd54f;">'
          + '<span style="color: #ffd54f; font-weight: bold; cursor: pointer;" onclick="window.narrativeEditorInstance.jumpTo(\'' + escapeAttr(item.nodeId) + '\')">' + nodeIndex + '</span>: '
          + escapeXml(item.evidence)
          + '</li>';
      });
      html += '</ul>';
    }
    html += '</div>';

    this.inkLinkContainer.innerHTML = html;
  }

  addMsg(speaker, text) {
    const el = document.createElement('div');
    el.className = 'msg ' + speaker;
    el.textContent = text;
    this.bubScroll.appendChild(el);
    this.bubScroll.scrollTop = this.bubScroll.scrollHeight;
  }

  addTyping(cb) {
    const row = document.createElement('div');
    row.className = 'typing-row';
    row.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div><span class="typing-lbl">ECHO is typing…</span>';
    this.bubScroll.appendChild(row);
    this.bubScroll.scrollTop = this.bubScroll.scrollHeight;
    setTimeout(() => {
      row.remove();
      cb();
    }, 400 + Math.random() * 200);
  }

  showChoices(choices) {
    this.barChoices.classList.toggle('hide', !choices || choices.length === 0);
    this.barChoices.innerHTML = '';
    if (!choices || choices.length === 0) return;

    choices.forEach((c) => {
      const b = document.createElement('button');
      b.className = 'choice-btn';
      b.textContent = "→ " + c.text;
      b.addEventListener('click', () => this.pickChoice(c));
      this.barChoices.appendChild(b);
    });
  }

  revealNode(nodeId) {
    const node = this.STORY[nodeId];
    if (!node) return;
    const generation = this.simulationGeneration;
    this.showChoices(null);
    this.addTyping(() => {
      if (generation !== this.simulationGeneration) return;
      if (!this.simulation) this.simulation = new ConversationStory(this.STORY);
      if (this.simulation.session.node !== nodeId) {
        this.simulation.session.node = nodeId;
        this.simulation.session.rendered = null;
        this.simulation.canContinue = true;
      }
      const text = this.simulation.Continue();
      if (text.trim()) this.addMsg('npc', text);
      this.curNode = this.simulation.session.node;
      this.visited[this.curNode] = true;
      this.showChoices(this.simulation.currentChoices.length ? this.simulation.currentChoices
        : [{ text: 'Restart interview preview', destination: this.simulation.entry, index: -1 }]);
      this.renderTree();
    });
  }

  pickChoice(choice) {
    this.showChoices(null);
    this.addMsg('player', choice.text);

    if (choice.index === -1) this.simulation = new ConversationStory(this.caseFiles[this.currentCaseName]);
    else this.simulation.ChooseChoiceIndex(choice.index);
    const dest = this.simulation.session.node;
    if (!dest || !this.STORY[dest]) return;

    this.curNode = dest;
    this.visited[dest] = true;
    this.computePathToNode(dest);

    setTimeout(() => this.revealNode(dest), 300);
  }

  jumpTo(nodeId) {
    if (nodeId === this.curNode) return;
    this.curNode = nodeId;
    this.simulationGeneration = (this.simulationGeneration || 0) + 1;
    this.visited[nodeId] = true;
    this.computePathToNode(nodeId);
    this.bubScroll.innerHTML = '';
    this.showChoices(null);
    this.renderTree();
    this.revealNode(nodeId);
  }

  buildGraph() {
    this.adjacency = {};
    this.orderMap = {};
    let index = 0;
    Object.keys(this.STORY).forEach((title) => {
      this.orderMap[title] = index++;
      this.adjacency[title] = [];
      const n = this.STORY[title];
      if (n.choices) {
        n.choices.forEach((c) => this.adjacency[title].push(c.destination));
      }
      (n.steps || []).forEach(step => {
        if (step.divert && this.STORY[step.divert]) this.adjacency[title].push(step.divert);
      });
    });
  }

  layoutTree() {
    const assigned = {};
    const rootKey = this.STORY["Start"] ? "Start" : Object.keys(this.STORY)[0];
    
    const reachable = new Set();
    const reachQueue = [rootKey];
    while (reachQueue.length) {
      const current = reachQueue.shift();
      if (!reachable.has(current)) {
        reachable.add(current);
        const children = this.adjacency[current] || [];
        children.forEach(child => {
          if (this.STORY[child]) reachQueue.push(child);
        });
      }
    }

    const reverseAdjacency = {};
    Object.keys(this.STORY).forEach(id => { reverseAdjacency[id] = []; });
    Object.keys(this.adjacency).forEach(parent => {
      this.adjacency[parent].forEach(child => {
        if (reverseAdjacency[child]) reverseAdjacency[child].push(parent);
      });
    });

    const canReachEnd = new Set();
    const endQueue = [];
    
    Object.keys(this.STORY).forEach(id => {
      const node = this.STORY[id];
      if (!node.choices || node.choices.length === 0) {
        endQueue.push(id);
      }
    });

    while (endQueue.length) {
      const current = endQueue.shift();
      if (!canReachEnd.has(current)) {
        canReachEnd.add(current);
        const parents = reverseAdjacency[current] || [];
        parents.forEach(parent => endQueue.push(parent));
      }
    }

    const queue = [{ node: rootKey, x: 0, depth: 0 }];
    let yPos = 40;
    const horizGap = this.horizGap;
    const vertGap = this.vertGap;

    while (queue.length) {
      const item = queue.shift();
      if (assigned[item.node]) continue;
      
      const isUnreachable = !reachable.has(item.node);
      const isDeadEnd = !canReachEnd.has(item.node);

      assigned[item.node] = { 
        x: item.x, 
        y: yPos, 
        unreachable: isUnreachable,
        deadEnd: isDeadEnd
      };
      yPos += vertGap;

      const kids = this.adjacency[item.node] || [];
      if (kids.length > 0) {
        const totalWidth = (kids.length - 1) * horizGap;
        kids.forEach((childId, i) => {
          const kidX = item.x - totalWidth / 2 + i * horizGap;
          queue.push({ node: childId, x: kidX, depth: item.depth + 1 });
        });
      }
    }

    const unassignedIds = Object.keys(this.STORY).filter((id) => !assigned[id]);
    if (unassignedIds.length) {
      yPos += vertGap * 0.6;
      const orphanCols = 5;
      unassignedIds.forEach((id, i) => {
        const col = i % orphanCols;
        const row = Math.floor(i / orphanCols);
        assigned[id] = {
          x: col * horizGap,
          y: yPos + row * vertGap,
          unreachable: !reachable.has(id),
          deadEnd: !canReachEnd.has(id)
        };
      });
      yPos += (Math.ceil(unassignedIds.length / orphanCols)) * vertGap;
    }

    assigned["__DONE__"] = {
      x: 0,
      y: yPos + vertGap * 0.5,
      unreachable: false,
      deadEnd: false,
      isDoneNode: true
    };

    return assigned;
  }

  buildTreeSVG() {
    if (!this.positions) this.positions = this.layoutTree();

    let maxY = 0, maxX = -Infinity, minX = Infinity;
    Object.keys(this.positions).forEach((id) => {
      const pos = this.positions[id];
      if (pos.y > maxY) maxY = pos.y;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.x < minX) minX = pos.x;
    });

    const margin = 100;
    const offsetX = (minX < margin) ? margin - minX : margin;
    
    this.currentOffsetX = offsetX;

    const width = Math.max(1000, maxX + offsetX + margin + this.nodeW);
    const height = maxY + margin + this.nodeH;

    this.svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.svgEl.style.width = width + 'px';
    this.svgEl.style.height = height + 'px';

    let nodesHTML = '', edgesHTML = '';
    const drawnEdges = new Set();

    Object.keys(this.STORY).forEach((id) => {
      if (!this.positions[id]) return;
      const p = this.positions[id];
      const px = p.x + offsetX;
      const edges = this.adjacency[id] || [];
      
      edges.forEach((childId) => {
        const edgeKey = id + '|' + childId;
        if (drawnEdges.has(edgeKey) || !this.positions[childId]) return;
        drawnEdges.add(edgeKey);

        const isPathEdge = this.selectedPathEdges.has(edgeKey);
        const visitedPath = this.visited[id] && this.visited[childId];
        
        let color = visitedPath ? '#64ffda' : '#233138';
        let strokeWidth = visitedPath ? 2 : 1;
        let dash = visitedPath ? '' : 'stroke-dasharray="4 4"';

        if (isPathEdge) {
          color = '#00e5ff';
          strokeWidth = 3;
          dash = '';
        }

        const x1 = px + this.nodeW / 2, y1 = p.y + this.nodeH;
        const x2 = (this.positions[childId].x + offsetX) + this.nodeW / 2, y2 = this.positions[childId].y;

        edgesHTML += '<path d="M' + x1 + ',' + y1 + ' C' + x1 + ',' + ((y1 + y2) / 2) + ' ' + x2 + ',' + ((y1 + y2) / 2) + ' ' + x2 + ',' + y2 + '" stroke="' + color + '" stroke-width="' + strokeWidth + '" fill="none" ' + dash + '/>';
      });

      const node = this.STORY[id];
      const ended = (!node.choices || node.choices.length === 0);
      if (ended && this.positions["__DONE__"]) {
        const doneP = this.positions["__DONE__"];
        const x1 = px + this.nodeW / 2, y1 = p.y + this.nodeH;
        const x2 = (doneP.x + offsetX) + this.nodeW / 2, y2 = doneP.y;
        const color = this.visited[id] ? '#64ffda' : '#ffb74d';
        
        edgesHTML += '<path d="M' + x1 + ',' + y1 + ' C' + x1 + ',' + ((y1 + y2) / 2) + ' ' + x2 + ',' + ((y1 + y2) / 2) + ' ' + x2 + ',' + y2 + '" stroke="' + color + '" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>';
      }
    });

    Object.keys(this.positions).forEach((id) => {
      const p = this.positions[id];
      const px = p.x + offsetX;
      const w = this.nodeW, h = this.nodeH;

      if (id === '__DONE__') {
        nodesHTML += '<g class="tree-node" transform="translate(' + px + ',' + p.y + ')">'
          + '<polygon points="' + (w/2) + ',0 ' + w + ',' + (h/2) + ' ' + w + ',' + h + ' 0,' + h + ' 0,' + (h/2) + '" fill="rgba(255, 183, 77, 0.2)" stroke="var(--amber)" stroke-width="1.5"/>'
          + '<text x="' + (w / 2) + '" y="' + (h / 2 + 5) + '" text-anchor="middle" fill="var(--amber)" font-size="14" font-family="monospace" font-weight="bold">END</text>'
          + '</g>';
        return;
      }

      const node = this.STORY[id];
      if (!node) return;

      const active = (id === this.curNode);
      const isPathNode = this.selectedPathNodes.has(id);
      const done = !!this.visited[id];
      const ended = (!node.choices || node.choices.length === 0);
      const isStart = (id === 'Start');
      const hasEvidence = this.getNodeEvidence(node).length > 0;

      let fill, stroke;

      if (active) {
        fill = 'rgba(255, 68, 68, 0.25)';
        stroke = 'var(--red)';
      } else if (isPathNode) {
        fill = 'rgba(0, 229, 255, 0.25)';
        stroke = '#00e5ff';
      } else if (isStart) {
        fill = 'rgba(156, 39, 176, 0.3)';
        stroke = '#e040fb';
      } else if (hasEvidence) {
        fill = 'rgba(255, 213, 79, 0.22)';
        stroke = '#ffd54f';
      } else if (p.unreachable) {
        fill = 'rgba(173, 20, 87, 0.2)';
        stroke = '#ff4081';
      } else if (p.deadEnd) {
        fill = 'rgba(230, 81, 0, 0.2)';
        stroke = '#ff6e40';
      } else if (ended) {
        fill = done ? 'rgba(100, 255, 218, 0.08)' : 'rgba(255,255,255,0.02)';
        stroke = 'var(--amber)';
      } else if (done) {
        fill = 'rgba(100, 255, 218, 0.08)';
        stroke = 'var(--green)';
      } else {
        fill = 'rgba(255,255,255,0.02)';
        stroke = '#233138';
      }

      const sw = (active || isPathNode || isStart || hasEvidence) ? 2 : 1.5;
      const dash = (p.unreachable || p.deadEnd) && !active && !hasEvidence && !isPathNode ? ' stroke-dasharray="3 3"' : '';
      const textCol = active ? 'var(--red)' : (isPathNode ? '#00e5ff' : (isStart ? '#e040fb' : (hasEvidence ? '#ffd54f' : (p.unreachable ? '#ff4081' : (p.deadEnd ? '#ff6e40' : (done ? '#e9edef' : '#667781'))))));

      let shapeMarkup;
      if (isStart) {
        shapeMarkup = '<rect width="' + w + '" height="' + h + '" rx="' + (h / 2) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '"' + dash + '/>';
      } else if (ended) {
        const c = 12;
        const pts = [[c, 0], [w - c, 0], [w, c], [w, h - c], [w - c, h], [c, h], [0, h - c], [0, c]]
          .map((pt) => pt.join(',')).join(' ');
        shapeMarkup = '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '"' + dash + '/>';
      } else {
        shapeMarkup = '<rect width="' + w + '" height="' + h + '" rx="6" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '"' + dash + '/>';
      }

      const labelText = isStart ? 'START' : '#' + this.orderMap[id];

      nodesHTML += '<g class="tree-node" style="cursor:pointer;" data-node-id="' + escapeAttr(id) + '" transform="translate(' + px + ',' + p.y + ')">'
        + shapeMarkup
        + '<text x="' + (w / 2) + '" y="' + (h / 2 + 5) + '" text-anchor="middle" fill="' + textCol + '" font-size="14" font-family="monospace" font-weight="bold">' + labelText + '</text>'
        + '</g>';
    });

    this.svgEl.innerHTML = edgesHTML + nodesHTML;
  }

  centerOnStartNode() {
    if (!this.positions || !this.treeScroll) return;
    
    const startId = this.STORY["Start"] ? "Start" : Object.keys(this.STORY)[0];
    const startPos = this.positions[startId];
    if (!startPos) return;

    const startX = startPos.x + (this.currentOffsetX || 0) + (this.nodeW / 2);
    const startY = startPos.y + (this.nodeH / 2);

    const scrollWidth = this.treeScroll.clientWidth;
    const scrollHeight = this.treeScroll.clientHeight;

    this.treeScroll.scrollLeft = startX - (scrollWidth / 2);
    this.treeScroll.scrollTop = Math.max(0, startY - (scrollHeight / 3));
  }

  showTip(ev, id) {
    if (id === '__DONE__') {
      this.tooltip.innerHTML = '<b>TERMINAL STATE</b> — <span style="color:var(--amber)">[DONE] NODE</span><br><span style="color:#8696a0">All valid terminal pathways converge here.</span>';
      this.tooltip.style.display = 'block';
      this.positionTip(ev);
      return;
    }

    const node = this.STORY[id];
    if (!node) return;

    const evidenceList = this.getNodeEvidence(node);
    const hasEvidence = evidenceList.length > 0;
    const ended = (!node.choices || node.choices.length === 0);

    let type = ended ? '<span style="color:var(--amber)">TERMINAL MATRIX NODE</span>' : '<span style="color:var(--green-neon)">DIVERGENT ROUTE</span>';
    if (hasEvidence) type += ' | <span style="color:#ffd54f">🔍 CONTAINS EVIDENCE UNLOCK</span>';

    const status = this.visited[id] ? '<br><span style="color:var(--green-neon)">✓ VISITED PROTOCOL</span>' : '';
    const evText = hasEvidence ? '<br><span style="color:#ffd54f"><b>Unlocks:</b> ' + escapeXml(evidenceList.join(', ')) + '</span>' : '';

    this.tooltip.innerHTML = '<b>NODE #' + this.orderMap[id] + '</b> — ' + type + '<br>'
      + '<span style="color:#8696a0">' + escapeXml((node.content || '').replace(/\n/g, ' ').slice(0, 65)) + '...</span>' 
      + evText + status;
    this.tooltip.style.display = 'block';
    this.positionTip(ev);
  }

  positionTip(ev) {
    this.tooltip.style.left = (ev.clientX + 14) + 'px';
    this.tooltip.style.top = (ev.clientY - 10) + 'px';
  }

  hideTip() {
    this.tooltip.style.display = 'none';
  }

  renderTree() {
    this.buildTreeSVG();
  }

  formatCaseLabel(name) {
    const m = name.match(/^act(\d+)[_-]?(.*)\.(js|json)$/i);
    if (m) {
      const rest = m[2] ? ' ' + m[2].replace(/[_-]+/g, ' ') : '';
      return ('Act ' + m[1] + rest).trim().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return name;
  }

  getActFromPath(filePath) {
    if (filePath.includes('assets/story/act1/')) return 'ACT1';
    if (filePath.includes('assets/story/act2/')) return 'ACT2';
    if (filePath.includes('assets/story/act3/')) return 'ACT3';
    if (filePath.includes('assets/story/act4/')) return 'ACT4';
    if (filePath.includes('assets/story/system/')) return 'SYSTEM';
    return 'OTHER';
  }

  renderCaseList() {
    if (!this.caseListEl) return;
    this.caseListEl.innerHTML = '';

    const makeOption = (name, displayName, nodeCount) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = displayName + ' (' + nodeCount + ' nodes)';
      if (name === this.currentCaseName) opt.selected = true;
      this.caseListEl.appendChild(opt);
    };

    Object.keys(this.caseFiles)
      .sort()
      .filter((name) => {
        if (!this.selectedActFilter || this.selectedActFilter === 'ALL') return true;
        return this.getActFromPath(name) === this.selectedActFilter;
      })
      .forEach((name) => {
        const label = this.caseMeta[name] || this.formatCaseLabel(name);
        makeOption(name, label, Object.keys(this.caseFiles[name]).filter(key => key !== '_meta').length);
      });
  }

  loadCaseIntoStory(name) {
    const data = this.caseFiles[name];
    if (!data) return;

    this.currentCaseName = name;
    if (this.caseListEl) this.caseListEl.value = this.currentCaseName;

    this.STORY = JSON.parse(JSON.stringify(data));
    delete this.STORY._meta;
    this.simulation = new ConversationStory(data);
    this.simulationGeneration = (this.simulationGeneration || 0) + 1;

    this.visited = {};
    this.positions = null;

    this.bubScroll.innerHTML = '';
    this.showChoices(null);

    this.buildGraph();
    this.updateInkLinkAndEvidence();

    if (!this.STORY["Start"]) {
      const firstKey = data._meta?.entry || Object.keys(this.STORY)[0];
      if (firstKey) {
        this.curNode = firstKey;
      } else {
        this.STORY["Start"] = { content: "Empty file loaded.", choices: [] };
        this.curNode = "Start";
      }
    } else {
      this.curNode = "Start";
    }

    this.visited[this.curNode] = true;
    this.computePathToNode(this.curNode);
    this.renderTree();
    this.centerOnStartNode();

    this.addMsg('system', 'CASE FILE LOADED: ' + (this.caseMeta[name] || name));
    this.revealNode(this.curNode);

    this.renderCaseList();
  }

  validateStoryStructure(importedStory) {
    if (typeof importedStory !== 'object' || importedStory === null) return false;
    for (const key in importedStory) {
      if (Object.prototype.hasOwnProperty.call(importedStory, key)) {
        const node = importedStory[key];
        if (typeof node === 'object' && node !== null && ('content' in node || 'choices' in node)) {
          return true;
        }
      }
    }
    return false;
  }

  handleImport(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const loadedNames = [];
    const failedNames = [];
    let pending = files.length;

    const finishImportBatch = () => {
      this.renderCaseList();

      if (failedNames.length) {
        alert('Some case files could not be loaded:\n' + failedNames.join('\n'));
      }

      if (loadedNames.length) {
        this.loadCaseIntoStory(loadedNames.sort()[0]);
        this.flash('📥 ' + loadedNames.length + ' CASE FILE' + (loadedNames.length > 1 ? 'S' : '') + ' IMPORTED');
      }

      e.target.value = '';
    };

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedStory = JSON.parse(event.target.result);

          if (!this.validateStoryStructure(importedStory)) {
            failedNames.push(file.name);
            return;
          }

          this.caseFiles[file.name] = importedStory;
          loadedNames.push(file.name);
        } catch (error) {
          failedNames.push(file.name + ' (' + error.message + ')');
        } finally {
          pending--;
          if (pending === 0) finishImportBatch();
        }
      };
      reader.onerror = () => {
        failedNames.push(file.name + ' (read error)');
        pending--;
        if (pending === 0) finishImportBatch();
      };
      reader.readAsText(file);
    });
  }

  async preloadDefaultCases(auto = false) {
    const manifest = {
      "Act I — Missing Donkey": [
        "assets/story/act1/case_a_missing_donkey/eleazar_sadducee.json",
        "assets/story/act1/case_a_missing_donkey/excited_child_donkey.json",
        "assets/story/act1/case_a_missing_donkey/galilean_pilgrim.json",
        "assets/story/act1/case_a_missing_donkey/guard_entry.json",
        "assets/story/act1/case_a_missing_donkey/jerusalem_local.json",
        "assets/story/act1/case_a_missing_donkey/john_donkey.json",
        "assets/story/act1/case_a_missing_donkey/nathanael_pharisee_entry.json",
        "assets/story/act1/case_a_missing_donkey/peter_donkey.json",
        "assets/story/act1/case_a_missing_donkey/sadducee_opposition.json"
      ],
      "Act I — Overturned Tables": [
        "assets/story/act1/case_b_overturned_tables/barabbas_insurgent.json",
        "assets/story/act1/case_b_overturned_tables/corrupt_seller.json",
        "assets/story/act1/case_b_overturned_tables/guard_report.json",
        "assets/story/act1/case_b_overturned_tables/guard_report_temple.json",
        "assets/story/act1/case_b_overturned_tables/hillel_scribe.json",
        "assets/story/act1/case_b_overturned_tables/informant_bribe.json",
        "assets/story/act1/case_b_overturned_tables/market_rumors.json",
        "assets/story/act1/case_b_overturned_tables/money_changer.json",
        "assets/story/act1/case_b_overturned_tables/pharisee_critique.json",
        "assets/story/act1/case_b_overturned_tables/pilates_secretary.json",
        "assets/story/act1/case_b_overturned_tables/pontius_pilate.json",
        "assets/story/act1/case_b_overturned_tables/pontius_pilate_temple.json",
        "assets/story/act1/case_b_overturned_tables/priest_objection.json",
        "assets/story/act1/case_b_overturned_tables/priest_objection_temple.json",
        "assets/story/act1/case_b_overturned_tables/trial_rumors.json",
        "assets/story/act1/case_b_overturned_tables/upset_buyer.json",
        "assets/story/act1/case_b_overturned_tables/woman_cloak.json"
      ],
      "Act I — Fig Tree Incident": [
        "assets/story/act1/case_c_fig_tree_incident/john_fig_tree.json",
        "assets/story/act1/case_c_fig_tree_incident/local_traveler.json",
        "assets/story/act1/case_c_fig_tree_incident/nathan_fig_tree.json",
        "assets/story/act1/case_c_fig_tree_incident/peter_fig_tree.json"
      ],
      "Act II — Silenced Teacher": [
        "assets/story/act2/case_a_silenced_teacher/caiaphas_priest.json",
        "assets/story/act2/case_a_silenced_teacher/parable_meaning.json",
        "assets/story/act2/case_a_silenced_teacher/parable_vineyard.json",
        "assets/story/act2/case_a_silenced_teacher/rich_young_ruler.json",
        "assets/story/act2/case_a_silenced_teacher/scribe_intro.json",
        "assets/story/act2/case_a_silenced_teacher/simon_pharisee_authority.json",
        "assets/story/act2/case_a_silenced_teacher/teaching_mount.json",
        "assets/story/act2/case_a_silenced_teacher/witness_healed.json"
      ],
      "Act II — Lazarus Conspiracy": [
        "assets/story/act2/case_b_lazarus_conspiracy/annas_patriarch.json",
        "assets/story/act2/case_b_lazarus_conspiracy/caiaphas_lazarus.json",
        "assets/story/act2/case_b_lazarus_conspiracy/martha_bethany.json",
        "assets/story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json",
        "assets/story/act2/case_b_lazarus_conspiracy/parable_meaning.json",
        "assets/story/act2/case_b_lazarus_conspiracy/rumor_whisper.json",
        "assets/story/act2/case_b_lazarus_conspiracy/simon_leper.json",
        "assets/story/act2/case_b_lazarus_conspiracy/temple_inspection_scribe.json",
        "assets/story/act2/case_b_lazarus_conspiracy/temple_spy.json",
        "assets/story/act2/case_b_lazarus_conspiracy/the_king.json"
      ],
      "Act II — Olivet Discourse": [
        "assets/story/act2/case_c_olivet_discourse/andrew_olivet.json",
        "assets/story/act2/case_c_olivet_discourse/john_olivet.json",
        "assets/story/act2/case_c_olivet_discourse/parable_meaning_olivet.json",
        "assets/story/act2/case_c_olivet_discourse/peter_olivet.json"
      ],
      "Act II — Anointing at Bethany": [
        "assets/story/act2/case_d_anointing_at_bethany/judas_bethany_objection.json",
        "assets/story/act2/case_d_anointing_at_bethany/mary_bethany_anointing.json",
        "assets/story/act2/case_d_anointing_at_bethany/simon_leper_host.json",
        "assets/story/act2/case_d_anointing_at_bethany/temple_inspection_scribe.json"
      ],
      "Act III — Broken Cup": [
        "assets/story/act3/case_a_broken_cup/john_disciple.json",
        "assets/story/act3/case_a_broken_cup/judas_iscariot.json",
        "assets/story/act3/case_a_broken_cup/rhoda_servant.json"
      ],
      "Act III — Severed Ear": [
        "assets/story/act3/case_b_severed_ear/guard_report_gethsemane.json",
        "assets/story/act3/case_b_severed_ear/malchus.json",
        "assets/story/act3/case_b_severed_ear/peter_defense.json",
        "assets/story/act3/case_b_severed_ear/peter_defense_simple.json",
        "assets/story/act3/case_b_severed_ear/secret_visit.json"
      ],
      "Act III — Midnight Tribunal": [
        "assets/story/act3/case_c_midnight_tribunal/caiaphas_priest.json",
        "assets/story/act3/case_c_midnight_tribunal/false_witness.json",
        "assets/story/act3/case_c_midnight_tribunal/peter_denial.json",
        "assets/story/act3/case_c_midnight_tribunal/trial_rumors.json"
      ],
      "Act III — Roman Interrogation": [
        "assets/story/act3/case_d_roman_interrogation/barabbas_choice.json",
        "assets/story/act3/case_d_roman_interrogation/pilate_interrogation.json",
        "assets/story/act3/case_d_roman_interrogation/pilates_secretary.json",
        "assets/story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json",
        "assets/story/act3/case_d_roman_interrogation/roman_council.json",
        "assets/story/act3/case_d_roman_interrogation/roman_soldier.json"
      ],
      "Act III — Final Sacrifice": [
        "assets/story/act3/case_e_final_sacrifice/centurion_background.json",
        "assets/story/act3/case_e_final_sacrifice/centurion_witness.json",
        "assets/story/act3/case_e_final_sacrifice/guard_report_crucifixion.json",
        "assets/story/act3/case_e_final_sacrifice/joseph_arimathea_cross.json",
        "assets/story/act3/case_e_final_sacrifice/mary_james_joses.json",
        "assets/story/act3/case_e_final_sacrifice/pashhur.json",
        "assets/story/act3/case_e_final_sacrifice/penitent_thief.json",
        "assets/story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json",
        "assets/story/act3/case_e_final_sacrifice/roman_assessment.json",
        "assets/story/act3/case_e_final_sacrifice/salome_crucifixion.json",
        "assets/story/act3/case_e_final_sacrifice/simon_cyrene.json",
        "assets/story/act3/case_e_final_sacrifice/temple_curtain.json",
        "assets/story/act3/case_e_final_sacrifice/upper_room_prep.json"
      ],
      "Act IV — Empty Tomb": [
        "assets/story/act4/case_a_empty_tomb/execution_soldier.json",
        "assets/story/act4/case_a_empty_tomb/joseph_arimathea.json",
        "assets/story/act4/case_a_empty_tomb/mary_magdalene.json"
      ],
      "Act IV — Guards Report": [
        "assets/story/act4/case_b_guards_report/caiaphas_roman_inquiry.json",
        "assets/story/act4/case_b_guards_report/herods_servant.json",
        "assets/story/act4/case_b_guards_report/judas_betrayal.json",
        "assets/story/act4/case_b_guards_report/mary_resurrection.json",
        "assets/story/act4/case_b_guards_report/sentry_lucas.json"
      ],
      "Act IV — Peters Restoration": [
        "assets/story/act4/case_c_peters_restoration/jesus_reinstatement.json",
        "assets/story/act4/case_c_peters_restoration/mary_magdalene_restoration.json",
        "assets/story/act4/case_c_peters_restoration/nathanael_disciple.json",
        "assets/story/act4/case_c_peters_restoration/peter_reinstated.json",
        "assets/story/act4/case_c_peters_restoration/peter_restored.json",
        "assets/story/act4/case_c_peters_restoration/thomas_restoration.json"
      ],
      "Act IV — Ascension": [
        "assets/story/act4/case_d_ascension/angelic_messengers_ascension.json",
        "assets/story/act4/case_d_ascension/john_ascension.json",
        "assets/story/act4/case_d_ascension/peter_ascension.json",
        "assets/story/act4/case_d_ascension/thomas_ascension.json"
      ],
      "System Files": [
        "assets/story/system/board_debate.json",
        "assets/story/system/board_review.json"
      ]
    };

    if (!auto && !window.confirm('Preload default case files from the repo? Unsaved changes will be lost.')) return;

    this.caseFiles = {};
    this.caseMeta = {};
    this.setStatusPreloading(true);
    this.flash('Preloading default case files...');

    const problems = [];
    if (location.protocol === 'file:') {
      problems.push('Page is open via file:// — browsers block fetch() of local files. Serve this folder over HTTP.');
    }

    const pathPrefix = '../../';

    for (const [groupTitle, paths] of Object.entries(manifest)) {
      for (const relPath of paths) {
        const fetchUrl = pathPrefix + relPath;
        const filename = relPath.split('/').pop();
        const characterName = filename.replace('.json', '').replace(/_/g, ' ');
        const label = `${groupTitle}: ${characterName.charAt(0).toUpperCase() + characterName.slice(1)}`;

        try {
          const response = await fetch(fetchUrl + '?dialogue=2', { cache: 'no-store' });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const dialogue = await response.json();
          if (!this.validateStoryStructure(dialogue)) {
            problems.push(filename + ' — dialogue JSON format unrecognized');
            continue;
          }
          this.caseFiles[relPath] = dialogue;
          this.caseMeta[relPath] = label;
        } catch (err) {
          console.error(`Failed to load ${relPath} from ${fetchUrl}:`, err);
          problems.push(filename + ' — ' + fetchUrl + ' (' + err.message + ')');
        }
      }
    }

    this.setStatusPreloading(false);
    this.renderCaseList();

    const loadedKeys = Object.keys(this.caseFiles);
    if (loadedKeys.length) {
      this.loadCaseIntoStory(loadedKeys[0]);
      this.flash('📥 PRELOADED ' + loadedKeys.length + ' CASE FILE(S)');
    } else {
      this.flash('⚠ PRELOAD FAILED — falling back to single default file');
      await this.initDefaultStory();
    }
  }

  setStatusPreloading(isPreloading) {
    if (this.preloadBtn) {
      this.preloadBtn.disabled = isPreloading;
      this.preloadBtn.textContent = isPreloading ? 'PRELOADING...' : 'PRELOAD DEFAULT CASES';
    }
  }

  flash(msg) {
    if (this.preloadLogEl) {
      this.preloadLogEl.textContent = msg;
      this.preloadLogEl.style.opacity = '1';
      setTimeout(() => {
        this.preloadLogEl.style.opacity = '0.7';
      }, 3000);
    }
  }
}

// ── Global Helper Functions ──
function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeAttr(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Instantiate Editor ──
window.addEventListener('DOMContentLoaded', () => {
  window.narrativeEditorInstance = new NarrativeEditor();
});
