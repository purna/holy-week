/**
 * levelRegistry.js
 *
 * Static import registry for all phase level data files.
 * Replaces dynamic import('./levelNN.js') — which was flagged by CSP scanners
 * as string-based code evaluation (dynamic import path).
 *
 * Each level is imported here at build time, typed as LevelData.
 */

import level01 from './levels/level01.js';
import level02 from './levels/level02.js';
import level03 from './levels/level03.js';
import level04 from './levels/level04.js';
import level05 from './levels/level05.js';
import level06 from './levels/level06.js';
import level07 from './levels/level07.js';
import level08 from './levels/level08.js';
import level09 from './levels/level09.js';
import level10 from './levels/level10.js';
import level11 from './levels/level11.js';
import level12 from './levels/level12.js';

/**
 * @type {import('../levels/LevelManager.js').LevelData[]}
 */
export const levelRegistry = [
    level01,
    level02,
    level03,
    level04,
    level05,
    level06,
    level07,
    level08,
    level09,
    level10,
    level11,
    level12,
];
