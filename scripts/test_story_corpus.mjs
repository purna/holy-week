import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ConversationStory } from '../js/gameplay/conversationStory.js';

const root = fileURLToPath(new URL('../assets/story/', import.meta.url));
function files(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
        ? files(path.join(dir, entry.name)) : entry.name.endsWith('.ink') ? [path.join(dir, entry.name)] : []);
}
for (const ink of files(root)) {
    const data = JSON.parse(fs.readFileSync(ink.replace(/\.ink$/, '.json'), 'utf8'));
    const dependencies = [...JSON.stringify(data).matchAll(/"variable":"([^"]+)"/g)].map(m => m[1]);
    for (const withEvidence of [false, true]) {
        test(`${path.relative(root, ink)} — ${withEvidence ? 'collected' : 'missing'} evidence`, () => {
            const facts = () => Object.fromEntries(dependencies.filter(key => key.startsWith('evidence_')).map(key => [key, withEvidence]));
            const queue = [null], seen = new Set();
            let endings = 0;
            while (queue.length) {
                const saved = queue.shift();
                const story = new ConversationStory(data, { saved, facts });
                const text = story.Continue();
                assert.doesNotMatch(text, /(^|\n)\s*(VAR\s|~\s|\{\s*not\s|#\s*UNLOCK_EVIDENCE)/);
                if (story.session.completed) { endings++; continue; }
                assert.ok(story.currentChoices.length, `No available continuation at ${story.session.node}`);
                const signature = JSON.stringify([story.session.node, story.session.variables,
                    dependencies.filter(key => key.startsWith('visited_')).map(key => Math.min(2, story.variables[key] || 0))]);
                if (seen.has(signature)) continue;
                seen.add(signature);
                assert.ok(seen.size < 10000, 'State-space limit exceeded; inspect this story manually');
                for (const choice of story.currentChoices) {
                    const branch = new ConversationStory(data, { saved: story.session, facts });
                    branch.Continue();
                    branch.ChooseChoiceIndex(choice.index);
                    queue.push(JSON.parse(JSON.stringify(branch.session)));
                }
            }
            assert.ok(endings > 0, 'No ending reached');
        });
    }
}
