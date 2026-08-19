const CACHE_PREFIX = 'holy-week-cache';
const CACHE_VERSION = 'v1.1'; // Increment this to force an update
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

// List all critical assets that need to be cached for offline use.
// This list should be comprehensive and include all HTML, CSS, JS,
// images, fonts, GLB models, audio files, and Ink JSON dialogue files.
// Paths are relative to the service worker's location (e.g., './' for index.html).
const urlsToCache = [
  // Core App Shell
  './index.html',
  './favicon.ico',
  './main.js',
  './gameEngine.js',
  './mobileApp.js',
  './UIManager.js',
  './GameManager.js',
  './dialogueManager.js',
  './audioManager.js',
  './npcSystem.js',
  './evidenceReactionUI.js',
  './ink-dialogue.js',
  './BibleReader2.js',

  // Shared JS modules (adjust paths as needed)
  '../js/config.js',
  '../js/utils.js',
  '../js/gameplay/caseManager.js',
  '../js/gameplay/evidenceSystem.js',
  '../js/gameplay/deductionEngine.js',
  '../js/gameplay/locationSystem.js',
  '../js/gameplay/chainManager.js',
  '../js/gameplay/dialogueMaps.js',
  '../js/ui/AccessibilityManager.js',
  '../js/ui/LabWorkspaceUI.js',
  '../js/ui/PeopleUI.js',
  '../js/ui/SceneUI.js',
  '../js/ui/AccuseUI.js',
  '../js/ui/CodexUI.js',
  '../js/ui/ChatUI.js',

  // Case Data
  '../js/act1_case.js',
  '../js/act2_case.js',
  '../js/act3_case.js',
  '../js/act4_case.js',

  // CSS Files
  './css/tokens.css',
  './css/base.css',
  './css/screens.css',
  './css/header.css',
  './css/map.css',
  './css/cases.css',
  './css/evidence-cards.css',
  './css/lab.css',
  './css/lab-workspace.css',
  './css/codex.css',
  './css/npc-chat.css',
  './css/dialogue-modal.css',
  './css/accusation.css',
  './css/result.css',
  './css/a11y.css',
  './css/game-complete.css',
  './css/misc.css',
  './css/scene-3d.css',
  './css/scene-2d.css',

  // Local Plugins
  '../js/plugins/howler.min.js',
  '../js/plugins/ink.js',
  '../js/plugins/three.module.js',
  '../js/plugins/GLTFLoader.js',
  '../js/plugins/cannon-es.js',

  // Local Font and Icon Assets
  '../fonts/fontawesome/css/all.min.css',
  '../fonts/fontawesome/webfonts/fa-solid-900.woff2',
  '../fonts/fontawesome/webfonts/fa-regular-400.woff2',
  '../fonts/google-fonts.css',
  '../fonts/syne/syne-v15-latin-regular.woff2',
  '../fonts/syne/syne-v15-latin-600.woff2',
  '../fonts/syne/syne-v15-latin-700.woff2',
  '../fonts/syne/syne-v15-latin-800.woff2',
  '../fonts/space-mono/space-mono-v13-latin-regular.woff2',
  '../fonts/space-mono/space-mono-v13-latin-700.woff2',

  // UI Icons from config.js
  '../assets/gfx/list.svg',
  '../assets/gfx/inventory.svg',
  '../assets/gfx/music.svg',
  '../assets/gfx/music_off.svg',
  '../assets/gfx/day.svg',
  '../assets/gfx/night.svg',
  '../assets/gfx/wrench.svg',
  '../assets/gfx/laptop-code.svg',
  '../assets/gfx/first-aid.svg',
  '../assets/gfx/circle.svg',
  '../assets/gfx/memory.svg',
  '../assets/gfx/gem.svg',
  '../assets/gfx/check-square-full.svg',
  '../assets/gfx/check-square-empty.svg',
  '../assets/gfx/hand-pointer.svg',
  '../assets/gfx/heart-duotone.svg',

  // GFX Assets (expand this list with all your SVGs)
  '../assets/gfx/magnifying-glass-duotone.svg',
  '../assets/gfx/search.svg',
  '../assets/gfx/chat-duotone.svg',
  '../assets/gfx/microscope-duotone.svg',
  '../assets/gfx/balance-scale-duotone.svg',
  '../assets/gfx/scroll-duotone.svg',
  '../assets/gfx/x-circle-duotone.svg',
  '../assets/gfx/horse-duotone.svg',
  '../assets/gfx/user-duotone.svg',
  '../assets/gfx/ear-duotone.svg',
  '../assets/gfx/tree-duotone.svg',
  '../assets/gfx/link-duotone.svg',
  '../assets/gfx/shield-duotone.svg',
  '../assets/gfx/coins-duotone.svg',
  '../assets/gfx/feather-duotone.svg',
  '../assets/gfx/leaves-duotone.svg',
  '../assets/gfx/book-open-duotone.svg',
  '../assets/gfx/sparkles-duotone.svg',
  '../assets/gfx/jar-duotone.svg',
  '../assets/gfx/rock-duotone.svg',
  '../assets/gfx/currency-dollar-duotone.svg',
  '../assets/gfx/clipboard-duotone.svg',
  '../assets/gfx/cup-duotone.svg',
  '../assets/gfx/bread-duotone.svg',
  '../assets/gfx/wine-duotone.svg',
  '../assets/gfx/pin-duotone.svg',
  '../assets/gfx/chain-duotone.svg',
  '../assets/gfx/flame-duotone.svg',
  '../assets/gfx/text-align-left-duotone.svg',
  '../assets/gfx/building-columns-duotone.svg',
  '../assets/gfx/sun-duotone.svg',
  '../assets/gfx/stars-duotone.svg',
  '../assets/gfx/earth-duotone.svg',
  '../assets/gfx/dagger-duotone.svg',
  '../assets/gfx/bone-duotone.svg',
  '../assets/gfx/eye-duotone.svg',
  '../assets/gfx/package-duotone.svg',
  '../assets/gfx/boat-duotone.svg',
  '../assets/gfx/fish-duotone.svg',
  '../assets/gfx/house-chimney-duotone.svg',
  '../assets/gfx/sunrise-duotone.svg',
  '../assets/gfx/church-duotone.svg',
  '../assets/gfx/house-duotone.svg',
  '../assets/gfx/skull-duotone.svg',
  '../assets/gfx/theater-masks-duotone.svg',
  '../assets/gfx/arrow-right-duotone.svg',
  '../assets/gfx/check-circle-duotone.svg',
  '../assets/gfx/lock-duotone.svg',
  '../assets/gfx/map-pin-duotone.svg',
  '../assets/gfx/trophy-duotone.svg',
  '../assets/gfx/books-duotone.svg',
  '../assets/gfx/spy-duotone.svg',
  '../assets/gfx/lock-open-duotone.svg',

  // Character Avatars
  '../assets/characters/peter.svg',
  '../assets/characters/john_apostle.svg',
  '../assets/characters/tobias_owner.svg',
  '../assets/characters/local_traveler.svg',
  '../assets/characters/simon_pharisee.svg',
  '../assets/characters/jemimah.svg',
  '../assets/characters/question-duotone.svg',
  '../assets/characters/eleazar.svg',
  '../assets/characters/temple_merchant.svg',
  '../assets/characters/malachi_moneychanger.svg',
  '../assets/characters/garrison_guard.svg',
  '../assets/characters/nathan_gardener.svg',
  '../assets/characters/caiaphas.svg',
  '../assets/characters/senior_scribe.svg',
  '../assets/characters/nicodemus.svg',
  '../assets/characters/maluch.svg',
  '../assets/characters/annas.svg',
  '../assets/characters/simon_leper.svg',
  '../assets/characters/thomas.svg',
  '../assets/characters/andrew_disciple.svg',
  '../assets/characters/judas.svg',
  '../assets/characters/john_mark.svg',
  '../assets/characters/rhoda.svg',
  '../assets/characters/malchus.svg',
  '../assets/characters/ananias_witness.svg',
  '../assets/characters/pontius_pilate.svg',
  '../assets/characters/barabbas.svg',
  '../assets/characters/centurion_longinus.svg',
  '../assets/characters/pashhur.svg',
  '../assets/characters/joseph_arimathea.svg',
  '../assets/characters/mary_magdalene.svg',
  '../assets/characters/marcus.svg',

  // Ink Story JSON files
  '../story/act1/case_a_missing_donkey/peter_donkey.json',
  '../story/act1/case_a_missing_donkey/john_donkey.json',
  '../story/act1/case_a_missing_donkey/galilean_pilgrim.json',
  '../story/act1/case_a_missing_donkey/jerusalem_local.json',
  '../story/act1/case_a_missing_donkey/eleazar_sadducee.json',
  '../story/act1/case_b_overturned_tables/money_changer.json',
  '../story/act1/case_b_overturned_tables/guard_report.json',
  '../story/act1/case_c_fig_tree_incident/peter_fig_tree.json',
  '../story/act1/case_c_fig_tree_incident/john_fig_tree.json',
  '../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json',
  '../story/act1/case_c_fig_tree_incident/local_traveler.json',
  '../story/act2/case_a_silenced_teacher/caiaphas_priest.json',
  '../story/act2/case_a_silenced_teacher/scribe_intro.json',
  '../story/act2/case_a_silenced_teacher/simon_pharisee_authority.json',
  '../story/act2/case_b_lazarus_conspiracy/temple_spy.json',
  '../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json',
  '../story/act2/case_b_lazarus_conspiracy/martha_bethany.json',
  '../story/act2/case_c_olivet_discourse/peter_olivet.json',
  '../story/act2/case_c_olivet_discourse/john_olivet.json',
  '../story/act2/case_c_olivet_discourse/andrew_olivet.json',
  '../story/act2/case_d_anointing_at_bethany/mary_bethany_anointing.json',
  '../story/act2/case_d_anointing_at_bethany/judas_bethany_objection.json',
  '../story/act2/case_d_anointing_at_bethany/simon_leper_host.json',
  '../story/act2/case_d_anointing_at_bethany/temple_inspection_scribe.json',
  '../story/act3/case_a_broken_cup/john_disciple.json',
  '../story/act3/case_a_broken_cup/rhoda_servant.json',
  '../story/act3/case_a_broken_cup/judas_iscariot.json',
  '../story/act3/case_b_severed_ear/malchus.json',
  '../story/act3/case_b_severed_ear/peter_defense.json',
  '../story/act3/case_b_severed_ear/guard_report_gethsemane.json',
  '../story/act3/case_c_midnight_tribunal/caiaphas_priest.json',
  '../story/act3/case_c_midnight_tribunal/peter_denial.json',
  '../story/act3/case_c_midnight_tribunal/false_witness.json',
  '../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json',
  '../story/act3/case_d_roman_interrogation/barabbas_choice.json',
  '../story/act3/case_e_final_sacrifice/roman_assessment.json',
  '../story/act3/case_e_final_sacrifice/temple_curtain.json',
  '../story/act3/case_e_final_sacrifice/joseph_arimathea_cross.json',
  '../story/act4/case_a_empty_tomb/mary_magdalene.json',
  '../story/act4/case_a_empty_tomb/execution_soldier.json',
  '../story/act4/case_a_empty_tomb/joseph_arimathea.json',
  '../story/act4/case_b_guards_report/sentry_lucas.json',
  '../story/act4/case_b_guards_report/caiaphas_roman_inquiry.json',
  '../story/act4/case_c_peters_restoration/peter_restored.json',
  '../story/act4/case_c_peters_restoration/thomas_restoration.json',
  '../story/act4/case_c_peters_restoration/nathanael_disciple.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // For navigation requests, use a network-first strategy to ensure
  // the user always gets the latest HTML and service worker updates.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If the network fails, fall back to the cache.
        return caches.match(event.request);
      })
    );
  } else {
    // For all other requests (assets, etc.), use a cache-first strategy.
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});