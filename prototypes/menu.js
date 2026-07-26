// menu.js - Case Registry & Navigation Menu Controller

// 1. Import all cases from their respective Act modules
import { act1CaseA, act1CaseB, act1CaseC } from '../js/act1_case.js';
import { act2CaseA, act2CaseB, act2CaseC } from '../js/act2_case.js';
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from '../js/act3_case.js';
import { act4CaseA, act4CaseB, act4CaseC } from '../js/act4_case.js';

// 2. Central Registry of all Acts and Cases
export const ACT_REGISTRY = {
  act1: {
    title: "Act I: Promise & Birth",
    color: "#3b82f6",
    cases: [
      act1CaseA,
      act1CaseB,
      act1CaseC
    ].filter(Boolean)
  },
  act2: {
    title: "Act II: Ministry & Miracles",
    color: "#f59e0b",
    cases: [
      act2CaseA,
      act2CaseB,
      act2CaseC
    ].filter(Boolean)
  },
  act3: {
    title: "Act III: The Passion & Trial",
    color: "#34d399",
    cases: [
      act3CaseA,
      act3CaseB,
      act3CaseC,
      act3CaseD,
      act3CaseE
    ].filter(Boolean)
  },
  act4: {
    title: "Act IV: Resurrection & Triumph",
    color: "#a855f7",
    cases: [
      act4CaseA,
      act4CaseB,
      act4CaseC
    ].filter(Boolean)
  }
};

export class NavigationMenu {
  /**
   * @param {string} containerId - DOM ID where the menu renders
   * @param {Function} onSelectCase - Callback function when a user clicks 'Investigate'
   */
  constructor(containerId, onSelectCase) {
    this.container = document.getElementById(containerId);
    this.onSelectCase = onSelectCase;
    this.currentActKey = "act1"; // Default active tab

    // Set of completed case IDs (used to evaluate unlocking prerequisites)
    // Add completed case IDs here as players solve them or for testing progression
    this.completedCases = new Set([
      "triumphal_entry",
      "temple_cleansing",
      "fig_tree_incident",
      "authority_challenged",
      "lazarus_plot",
      "olivet_discourse",
      "last_supper",
      "gethsemane_arrest",
      "sanhedrin_trial",
      "pilate_verdict",
      "crucifixion_burial",
      "empty_tomb",
      "road_to_emmaus"
    ]);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="act-selector-wrapper">
        <div class="act-tabs" id="act-tabs-list">
          ${Object.keys(ACT_REGISTRY).map(actKey => {
      const act = ACT_REGISTRY[actKey];
      const isActive = actKey === this.currentActKey ? 'active' : '';
      return `
              <button 
                class="act-tab ${isActive}" 
                data-act="${actKey}" 
                style="${isActive ? `border-bottom: 3px solid ${act.color};` : ''}">
                ${act.title}
              </button>
            `;
    }).join('')}
        </div>

        <div class="case-grid" id="case-grid-container">
          ${this.renderCaseCards(this.currentActKey)}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderCaseCards(actKey) {
    const act = ACT_REGISTRY[actKey];
    if (!act || !act.cases || act.cases.length === 0) {
      return `<p style="color: #94a3b8; grid-column: 1 / -1;">No active cases registered in this Act.</p>`;
    }

    return act.cases.map(caseObj => {
      if (!caseObj) return '';

      // Determine lock status based on required previous case ID
      const isLocked = caseObj.requires && !this.completedCases.has(caseObj.requires);
      const stars = '★'.repeat(caseObj.difficulty || 1) + '☆'.repeat(5 - (caseObj.difficulty || 1));

      return `
        <div class="case-card ${isLocked ? 'locked' : ''}">
          <div>
            <div class="case-card-header">
              <span class="act-tag" style="color: ${act.color}">${caseObj.actLabel || 'Case'}</span>
              <span class="difficulty-stars">${stars}</span>
            </div>
            <h3 class="case-title">${caseObj.title}</h3>
            <p class="case-subtitle">${caseObj.subtitle || ''}</p>
          </div>

          <div class="case-card-footer">
            <span class="location-label">📍 ${caseObj.eventLocation || caseObj.location || 'Jerusalem'}</span>
            <button 
              class="select-case-btn" 
              data-case-id="${caseObj.id}" 
              ${isLocked ? 'disabled' : ''}
            >
              ${isLocked ? '🔒 Locked' : 'Investigate'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Act Tab switching
    const tabButtons = this.container.querySelectorAll('.act-tab');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedAct = e.currentTarget.getAttribute('data-act');
        this.currentActKey = selectedAct;
        this.render();
      });
    });

    // Case selection event trigger
    const caseButtons = this.container.querySelectorAll('.select-case-btn:not([disabled])');
    caseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const caseId = e.currentTarget.getAttribute('data-case-id');
        const selectedCase = this.findCaseById(caseId);
        if (selectedCase && typeof this.onSelectCase === 'function') {
          this.onSelectCase(selectedCase);
        }
      });
    });
  }

  findCaseById(caseId) {
    for (const actKey in ACT_REGISTRY) {
      const found = ACT_REGISTRY[actKey].cases.find(c => c && c.id === caseId);
      if (found) return found;
    }
    return null;
  }
}