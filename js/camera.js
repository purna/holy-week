/**
 * Camera Manager - Handles camera presets and smooth transitions
 * Works alongside main.js updateCamera() for basic follow behavior
 */

import { config } from './config.js';

// Camera transition state
let activeTransition = null;
let cameraOverride = null; // Override target when zooming to specific position

// Preset definitions
export const cameraPresets = {
  // Standard follow distances
  normal: {
    distance: config.physics.camDistanceStill,
    height: config.physics.camHeightStill,
    duration: 1.0
  },
  close: {
    distance: 50,
    height: 30,
    duration: 0.8
  },
  veryClose: {
    distance: 25,
    height: 15,
    duration: 0.8
  },
  far: {
    distance: config.physics.camDistanceStill * 1.5,
    height: config.physics.camHeightStill * 1.5,
    duration: 1.2
  },
  // Conversation/npc presets
  conversation: {
    distance: 40,
    height: 25,
    duration: 0.8
  },
  // Cinematic presets
  cinematicClose: {
    distance: 20,
    height: 10,
    duration: 1.5
  },
  wide: {
    distance: 500,
    height: 200,
    duration: 2.0
  }
};

/**
 * Initialize camera manager
 */
export function initCamera() {
  // Nothing needed here - main.js init handles base setup
}

/**
 * Set a camera zoom preset
 * @param {string} presetName - Name of preset from cameraPresets
 * @param {number} customDistance - Optional custom distance override
 * @param {number} customHeight - Optional custom height override
 * @returns {Object} Applied preset values
 */
export function setZoomPreset(presetName, customDistance = null, customHeight = null) {
  const preset = cameraPresets[presetName];
  if (!preset) {
    console.warn(`Unknown camera preset: ${presetName}`);
    return null;
  }

  return {
    distance: customDistance !== null ? customDistance : preset.distance,
    height: customHeight !== null ? customHeight : preset.height
  };
}

/**
 * Start a smooth camera transition to a preset
 * @param {string} presetName - Target preset
 * @param {Function} onComplete - Callback when transition completes
 * @returns {Object} Transition object
 */
export function transitionToPreset(presetName, onComplete = null) {
  const preset = cameraPresets[presetName];
  if (!preset) {
    console.warn(`Cannot transition: unknown preset ${presetName}`);
    return null;
  }

  return startTransition(preset.distance, preset.height, preset.duration, onComplete);
}

/**
 * Start a transition to custom distance/height
 * @param {number} distance - Target distance from player
 * @param {number} height - Target height above player  
 * @param {number} duration - Transition duration in seconds
 * @param {Function} onComplete - Callback when complete
 * @returns {Object} Transition object
 */
export function transitionToCustom(distance, height, duration = 1.0, onComplete = null) {
  return startTransition(distance, height, duration, onComplete);
}

/**
 * Return to normal follow mode (cancel any active transition)
 * @param {number} duration - Return transition duration
 * @param {Function} onComplete - Callback when complete
 */
export function returnToNormal(duration = 1.0, onComplete = null) {
  activeTransition = {
    type: 'return',
    targetDistance: config.physics.camDistanceStill,
    targetHeight: config.physics.camHeightStill,
    duration: duration,
    elapsed: 0,
    onComplete: onComplete
  };
}

/**
 * Internal: Start a transition with stored start values
 */
function startTransition(targetDistance, targetHeight, duration, onComplete) {
  activeTransition = {
    type: 'custom',
    startDistance: currentCamDistance,
    startHeight: currentCamHeight,
    targetDistance: targetDistance,
    targetHeight: targetHeight,
    duration: duration,
    elapsed: 0,
    onComplete: onComplete
  };

  return activeTransition;
}

/**
 * Cancel any active camera transition
 */
export function cancelTransition() {
  activeTransition = null;
}

/**
 * Update active camera transition
 * @param {number} deltaTime - Time delta in seconds
 * @param {Object} currentState - Current camera state {distance, height}
 * @returns {Object} New target values or null if no active transition
 */
export function updateTransition(deltaTime, currentState) {
  if (!activeTransition) return null;

  activeTransition.elapsed += deltaTime;
  const progress = Math.min(activeTransition.elapsed / activeTransition.duration, 1);
  const easedProgress = easeInOutCubic(progress);

  // Get start values from current state
  const startDistance = currentState.distance;
  const startHeight = currentState.height;
  const targetDistance = activeTransition.targetDistance;
  const targetHeight = activeTransition.targetHeight;

  // Interpolate
  const newDistance = lerp(startDistance, targetDistance, easedProgress);
  const newHeight = lerp(startHeight, targetHeight, easedProgress);

  // Check completion
  if (progress >= 1) {
    if (activeTransition.onComplete) {
      activeTransition.onComplete();
    }

    if (activeTransition.type === 'return') {
      // Returned to normal
    }

    activeTransition = null;
  }

  return {
    distance: newDistance,
    height: newHeight,
    transitioning: true
  };
}

/**
 * Check if a transition is active
 * @returns {boolean}
 */
export function isTransitioning() {
  return activeTransition !== null;
}

/**
 * Get current transition info
 * @returns {Object|null}
 */
export function getTransitionInfo() {
  if (!activeTransition) return null;
  return {
    type: activeTransition.type,
    elapsed: activeTransition.elapsed,
    duration: activeTransition.duration,
    progress: Math.min(activeTransition.elapsed / activeTransition.duration, 1),
    targetDistance: activeTransition.targetDistance,
    targetHeight: activeTransition.targetHeight
  };
}

/**
 * Add a custom preset
 * @param {string} name - Preset name
 * @param {Object} settings - Preset settings {distance, height, duration}
 */
export function addPreset(name, settings) {
  cameraPresets[name] = {
    distance: config.physics.camDistanceStill,
    height: config.physics.camHeightStill,
    duration: 1.0,
    ...settings
  };
}

/**
 * Linear interpolation helper
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Ease in-out cubic
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
