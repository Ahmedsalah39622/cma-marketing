"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Logo3D } from './Logo3D';
import { useState } from 'react';

export default function TechScene() {
  const [interactive, setInteractive] = useState(false);
  const cappedDPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

  return (
    <div
      className="w-full h-[360px]"
      onPointerEnter={() => setInteractive(true)}
      onPointerLeave={() => setInteractive(false)}
    >
      <Canvas camera={{ position: [0, 0, 5] }} dpr={cappedDPR} frameloop={interactive ? 'always' : 'demand'}>
        <Logo3D />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}