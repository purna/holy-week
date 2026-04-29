import * as THREE from 'three';
import { config } from './config.js';

/**
 * ToonShader - Configurable cel-shading (toon) shader material
 */
export class ToonShader {
  /**
   * Create a toon shader material
   * @param {Object} params - Shader parameters
   * @param {THREE.Color} [params.baseColor] - Base surface color
   * @param {THREE.Color} [params.shadowColor] - Shadow color
   * @param {THREE.Color} [params.highlightColor] - Highlight color
   * @param {number} [params.rampLevels] - Number of tonal levels (default: from config)
   * @param {boolean} [params.fog] - Enable fog (default: true)
   * @param {THREE.Side} [params.side] - Rendering side (default: THREE.DoubleSide)
   */
  static createMaterial(params = {}) {
    const baseColor = params.baseColor || new THREE.Color(config.toon.baseColor || 0x4a86e8);
    const shadowColor = params.shadowColor || new THREE.Color(config.toon.shadowColor || 0x2d5a9e);
    const highlightColor = params.highlightColor || new THREE.Color(config.toon.highlightColor || 0x6ba3f2);
    const rampLevels = params.rampLevels !== undefined ? params.rampLevels : config.toon.rampLevels;
    const side = params.side !== undefined ? params.side : THREE.DoubleSide;
    const opacity = params.opacity !== undefined ? params.opacity : 1.0;

    return new THREE.ShaderMaterial({
      uniforms: {
        uLightDirection: { value: new THREE.Vector3(5, 10, 5).normalize() },
        uBaseColor:      { value: baseColor },
        uShadowColor:    { value: shadowColor },
        uHighlightColor: { value: highlightColor },
        uRampLevels:     { value: rampLevels },
        uOpacity:        { value: opacity }
      },
      vertexShader: ToonShader.vertexShader,
      fragmentShader: ToonShader.fragmentShader,
      side: side,
      transparent: opacity < 1.0
    });
  }

  /**
   * Create a basic toon material using config defaults
   * @returns {THREE.ShaderMaterial}
   */
  static createDefault() {
    return ToonShader.createMaterial({});
  }

  /**
   * Create toon material for world (planet) mesh
   * @returns {THREE.ShaderMaterial}
   */
  static createForWorld() {
    return ToonShader.createMaterial({
      side: THREE.DoubleSide
    });
  }

  /**
   * Create toon material for player mesh
   * @returns {THREE.ShaderMaterial}
   */
  static createForPlayer() {
    return ToonShader.createMaterial({
      side: THREE.DoubleSide
    });
  }

  /**
   * Create toon material for NPC mesh with optional custom color
   * @param {THREE.Color} [color] - Custom NPC color
   * @returns {THREE.ShaderMaterial}
   */
  static createForNPC(color) {
    const npcColor = color || new THREE.Color(0x4488ff);
    return ToonShader.createMaterial({
      baseColor: npcColor,
      shadowColor: new THREE.Color().copy(npcColor).multiplyScalar(0.5),
      highlightColor: new THREE.Color().copy(npcColor).multiplyScalar(1.5),
      side: THREE.DoubleSide
    });
  }

  static get vertexShader() {
    return `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }

  static get fragmentShader() {
    return `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      uniform vec3 uLightDirection;
      uniform vec3 uBaseColor;
      uniform vec3 uShadowColor;
      uniform vec3 uHighlightColor;
      uniform float uRampLevels;
      
      void main() {
        float diffuse = dot(vNormal, normalize(uLightDirection));
        float ramp = floor((diffuse * 0.5 + 0.5) * uRampLevels) / (uRampLevels - 1.0);
        
        vec3 color = mix(uShadowColor, uBaseColor, ramp);
        color = mix(color, uHighlightColor, smoothstep(0.8, 1.0, diffuse));
        
        float poleFalloff = abs(vNormal.y);
        color = mix(color * 0.85, color, poleFalloff);
        
        vec3 viewDir = normalize(cameraPosition - vPosition);
        vec3 reflectDir = reflect(-uLightDirection, vNormal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        spec = floor(spec * 2.0) / 2.0; 
        color += spec * vec3(0.3, 0.3, 0.35);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  }
}
