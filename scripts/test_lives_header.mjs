import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const scene = read('mobile2D/Scene2D.js');

test('2D lives have one header home, immediately after the score', () => {
    const html = read('mobile2d.html');
    assert.equal((html.match(/id="lives-display"/g) || []).length, 1);
    const investigation = html.slice(html.indexOf('<!-- Investigation status bar -->'));
    assert.match(investigation, /Current Insight Points -->\s*<div id="lives-display"/);
    assert.doesNotMatch(scene, /<div id="lives-display"/);
    assert.match(scene, /gc\.appendChild\(this\.app\.canvas\)/);
    assert.doesNotMatch(read('mobile2D/css/scene-2d.css'), /#lives-display/);
});

test('2D header reflects remaining lives and reset without replacing its accessible markup', () => {
    const value = { textContent: '' };
    const element = { querySelector: selector => {
        assert.equal(selector, '.val-lives');
        return value;
    } };
    const body = scene.match(/    updateLivesDisplay\(\) \{([\s\S]*?)\n    \}/)[1];
    const update = vm.runInNewContext('(function () {' + body + '})', {
        document: { getElementById: () => element }, Math
    });
    for (const lives of [3, 2, 1, 0, -1, 3]) {
        update.call({ player: { lives } });
        assert.equal(value.textContent, Math.max(0, lives));
    }
    assert.match(scene, /this\._initializeGame\(\);\s*this\.updateLivesDisplay\(\)/);
});
