/**
 * levelRegistry.js
 *
 * Static import registry for all phase level data files.
 * Replaces dynamic import('./levelNN.js') — which was flagged by CSP scanners
 * as string-based code evaluation (dynamic import path).
 *
 * Each level is imported here at build time, typed as LevelData.
 */

import level01 from './levels/act1_case.js';
import level02 from './levels/act2_case.js';
import level03 from './levels/act3_case.js';
import level04 from './levels/act4_case.js';

/**
 * @type {import('../levels/LevelManager.js').LevelData[]}
 */
export const levelRegistry = [
    level01,
    level02,
    level03,
    level04,

];
