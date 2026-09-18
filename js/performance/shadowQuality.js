export const SHADOW_PROFILES = Object.freeze({
  low: Object.freeze({ sun: 512, moon: 0, torch: false }),
  medium: Object.freeze({ sun: 1024, moon: 512, torch: false }),
  high: Object.freeze({ sun: 2048, moon: 1024, torch: true })
});

export function shadowProfile(quality) {
  const fallback = globalThis.matchMedia?.('(pointer: coarse)').matches ? 'low' : 'high';
  return SHADOW_PROFILES[quality] || SHADOW_PROFILES[fallback];
}

export function applyShadowProfile(profile, sun, moon, torch) {
  for (const [light, size] of [[sun, profile.sun], [moon, profile.moon]]) {
    if (!light) continue;
    light.castShadow = size > 0;
    if (size && light.shadow.mapSize.x !== size) {
      light.shadow.mapSize.set(size, size);
      light.shadow.map?.dispose();
      light.shadow.mapPass?.dispose();
      light.shadow.map = null;
      light.shadow.mapPass = null;
      light.shadow.needsUpdate = true;
    }
  }
  if (torch) torch.castShadow = profile.torch;
}
