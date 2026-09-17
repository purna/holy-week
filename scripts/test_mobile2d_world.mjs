import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { Scene2D } from '../mobile2D/Scene2D.js';
globalThis.document = { getElementById: () => null, addEventListener() {} };
const { UIManager } = await import('../mobile2D/UIManager.js');
for (const act of readdirSync(new URL('../mobile2D/maps/', import.meta.url))) {
  for (const file of readdirSync(new URL(`../mobile2D/maps/${act}/`, import.meta.url))) {
    test(`${file}: loads terrain, witnesses and enemies; rectangular bounds are safe`, () => {
      const map = JSON.parse(readFileSync(new URL(`../mobile2D/maps/${act}/${file}`, import.meta.url)));
      const id = file.replace('.json', '');
      const url = UIManager.prototype._getTilemapPath(id);
      assert.ok(url.endsWith(`/maps/${act}/${file}`));
      const scene = new Scene2D({cm: {getActiveCase: () => ({npcs: [{id: 'witness', name: 'Witness'}, null]})}});
      scene._preRenderTiles = () => {}; // Canvas drawing is verified in the browser.
      scene._initializeGame();
      scene.loadCase(id, map);
      assert.ok(scene.levelMap.flat().some(tile => tile !== 0));
      assert.ok(scene.npcs.length > 0);
      assert.ok(scene.enemies.length > 0);
      assert.equal(scene._isWalkable(0, map.gridSize.rows), false);
      assert.equal(scene._isWalkable(map.gridSize.cols, 0), false);
      assert.equal(scene._isWalkable(-1, 0), false);
    });
  }
}
test('missing map fails explicitly instead of showing an empty world', () => {
  assert.throws(() => new Scene2D({}).loadCase('missing', {}), /Missing terrain/);
});

test('failed map request keeps the introduction and retry loads the complete case', async () => {
  let click, initialized = 0, loaded = 0;
  const classes = new Set();
  const panel = {classList: {add: c => classes.add(c), remove: c => classes.delete(c)}};
  const mount = {style: {}};
  const next = {addEventListener: (_, callback) => { click = callback; }};
  const container = {querySelector: selector => ({'#scene-next-btn': next, '.scene-intro-panel': panel, '#scene-canvas-mount': mount}[selector])};
  const previousDocument = globalThis.document, previousFetch = globalThis.fetch;
  globalThis.document = {getElementById: () => container, contains: () => true};
  globalThis.window = {scene2d: null};
  const ui = Object.create(UIManager.prototype);
  ui.cm = {activeCaseId: 'triumphal_entry', getActiveCase: () => ({id: 'triumphal_entry'})};
  ui.sceneUI = {render: () => ''};
  ui.a11y = {announce() {}};
  ui.init2DScene = async () => {
    initialized++;
    window.scene2d = {container: mount, loadCase: () => { loaded++; }};
  };
  try {
    ui.renderScene();
    globalThis.fetch = async () => ({ok: false, status: 404});
    await click();
    assert.equal(initialized, 0);
    assert.equal(next.disabled, false);
    assert.match(next.textContent, /retry/);
    assert.equal(classes.has('hidden'), false);
    globalThis.fetch = async () => ({ok: true, json: async () => ({background: ['.']})});
    await click();
    assert.equal(initialized, 1);
    assert.equal(loaded, 1);
    assert.equal(classes.has('hidden'), true);
  } finally {
    globalThis.document = previousDocument;
    globalThis.fetch = previousFetch;
    delete globalThis.window;
  }
});
