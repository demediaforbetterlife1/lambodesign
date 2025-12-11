'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars, Html } from '@react-three/drei';
import Image from 'next/image';

interface Scene3DProps {
  intensity?: number;
  fallbackImage?: string;
  className?: string;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        <span className="text-white/60 text-sm">Loading 3D Scene...</span>
      </div>
    </Html>
  );
}

function FloatingParticles() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={[2, 1, -3]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function AmbientElements() {
  return (
    <>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
        <mesh position={[-3, 2, -5]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[4, -1, -4]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>
      <FloatingParticles />
    </>
  );
}

function SceneContent({ intensity = 1 }: { intensity: number }) {
  return (
    <>
      <ambientLight intensity={0.3 * intensity} />
      <pointLight position={[10, 10, 10]} intensity={intensity} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5 * intensity} color="#ffffff" />
      <Environment preset="night" />
      <AmbientElements />
    </>
  );
}

function WebGLCheck({ onSupported }: { onSupported: (supported: boolean) => void }) {
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      onSupported(!!gl);
    } catch {
      onSupported(false);
    }
  }, [onSupported]);

  return null;
}

export default function Scene3D({ 
  intensity = 1, 
  fallbackImage = '/redlambo.png',
  className = ''
}: Scene3DProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  if (webGLSupported === null) {
    return (
      <div className={`relative ${className}`}>
        <WebGLCheck onSupported={setWebGLSupported} />
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!webGLSupported) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={fallbackImage}
          alt="Lamborghini"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <SceneContent intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
