"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Vertex shader — fullscreen quad written directly into clip space
// ---------------------------------------------------------------------------
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// Fragment shader — transparent coloured blobs composited over white.
// Each blob is a gaussian falloff; blobs add together additively then are
// mixed back toward white so the result never oversaturates.
// ---------------------------------------------------------------------------
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;

  varying vec2 vUv;

  // Aspect-correct distance so blobs stay circular on any viewport.
  float adist(vec2 a, vec2 b) {
    vec2 d = (a - b) * vec2(uAspect, 1.0);
    return length(d);
  }

  // Smooth gaussian blob weight.
  float blob(vec2 uv, vec2 center, float radius) {
    float d = adist(uv, center);
    return exp(-(d * d) / (radius * radius));
  }

  void main() {
    vec2 uv = vUv;
    float t  = uTime * 0.14;

    // ── Five drifting anchor positions ────────────────────────────────────
    vec2 p0 = vec2(0.18 + 0.32 * sin(t * 0.71),       0.22 + 0.22 * cos(t * 0.53));
    vec2 p1 = vec2(0.78 + 0.18 * cos(t * 0.43),       0.72 + 0.25 * sin(t * 0.61));
    vec2 p2 = vec2(0.50 + 0.28 * sin(t * 0.89 + 1.1), 0.85 + 0.12 * cos(t * 0.67));
    vec2 p3 = vec2(0.90 + 0.09 * cos(t * 0.57 + 2.0), 0.15 + 0.18 * sin(t * 0.79));
    vec2 p4 = vec2(0.10 + 0.10 * sin(t * 0.63 + 1.5), 0.60 + 0.20 * cos(t * 0.47));

    // ── Soft pastel colours (clearly visible on white, not neon) ─────────
    vec3 col0 = vec3(0.78, 0.84, 1.00);  // periwinkle blue
    vec3 col1 = vec3(0.84, 0.76, 0.98);  // soft lavender
    vec3 col2 = vec3(0.80, 0.90, 1.00);  // sky blue
    vec3 col3 = vec3(0.90, 0.80, 1.00);  // pale violet
    vec3 col4 = vec3(0.80, 0.86, 0.94);  // cool gray-blue

    // ── Accumulate blobs with gaussian weights ────────────────────────────
    float r = 0.55;
    float w0 = blob(uv, p0, r * 0.95);
    float w1 = blob(uv, p1, r * 1.00);
    float w2 = blob(uv, p2, r * 0.85);
    float w3 = blob(uv, p3, r * 0.80);
    float w4 = blob(uv, p4, r * 0.90);

    vec3 tint = col0 * w0 + col1 * w1 + col2 * w2 + col3 * w3 + col4 * w4;
    float totalW = w0 + w1 + w2 + w3 + w4;

    // ── Blend accumulated tint back toward white ──────────────────────────
    // strength controls maximum saturation of the gradient (0.22 = 22% tint)
    float strength = clamp(totalW, 0.0, 1.0) * 0.22;
    vec3 blendedColor = mix(vec3(1.0), tint / max(totalW, 0.001), strength);

    gl_FragColor = vec4(blendedColor, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MeshGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    // White clear so the background is white when shader runs.
    renderer.setClearColor(0xffffff, 1);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:   { value: 0 },
        uAspect: { value: 1 },
      },
      depthTest:  false,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    // ── Sizing helper ──────────────────────────────────────────────────────
    const applySize = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      material.uniforms.uAspect.value = w / h;
    };

    // Bootstrap — prefer measured canvas size, fall back to window
    applySize(
      canvas.offsetWidth  || window.innerWidth,
      canvas.offsetHeight || window.innerHeight,
    );

    // ── Resize via ResizeObserver ──────────────────────────────────────────
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      applySize(width, height);
    });
    ro.observe(canvas);

    // ── Animation loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}

