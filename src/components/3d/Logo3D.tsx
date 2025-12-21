'use client'


import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

export function Logo3D() {
  // Place your logo image in the public/ directory, e.g. public/hex-logo.png
  const texture = useLoader(TextureLoader, '/hex-logo.png');
  const meshRef = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();
  const lastUpdate = useRef(0);

  // Animate bounce only, but throttle updates and manually invalidate when using frameloop="demand"
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // limit updates to ~80fps (adjustable). This reduces CPU on high-refresh devices.
    if (t - lastUpdate.current < 1 / 80) return;
    lastUpdate.current = t;
    if (meshRef.current) {
      meshRef.current.position.y = Math.abs(Math.sin(t * 2)) * 1.5;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
      invalidate();
    }
  });

  return (
    <mesh ref={meshRef} scale={[5, 5, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}