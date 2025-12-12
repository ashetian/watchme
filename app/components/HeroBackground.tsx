"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";

const VertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid distortion
  float noise = sin(uv.y * 10.0 + uTime) * 0.005 + cos(uv.x * 20.0 + uTime * 0.5) * 0.005;
  
  // RGB Shift for a glass-like effect
  float r = texture2D(uTexture, uv + vec2(noise * 1.0, noise)).r;
  float g = texture2D(uTexture, uv + vec2(noise, noise)).g;
  float b = texture2D(uTexture, uv + vec2(noise * 0.5, noise)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

function BackgroundContent({ onReady }: { onReady?: () => void }) {
  const texture = useTexture("/bg.jpg");
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Calculate scale to cover the viewport (object-cover equivalent)
  const scale = useMemo(() => {
    const image = texture.image as HTMLImageElement;
    const imageAspect = image.width / image.height;
    const viewportAspect = viewport.width / viewport.height;
    
    if (viewportAspect > imageAspect) {
      return [viewport.width, viewport.width / imageAspect, 1];
    } else {
      return [viewport.height * imageAspect, viewport.height, 1];
    }
  }, [viewport, texture]);

  return (
    <mesh ref={meshRef} scale={scale as [number, number, number]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroBackground({ onReady, className = "absolute inset-0 -z-10 bg-black" }: { onReady?: () => void, className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <BackgroundContent onReady={onReady} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
