'use client'


import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

export function Logo3D() {
  // Place your logo image in the public/ directory, e.g. public/hex-logo.png
  const texture = useLoader(TextureLoader, '/hex-logo.png');
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate bounce only
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y = Math.abs(Math.sin(t * 2)) * 1.5;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
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