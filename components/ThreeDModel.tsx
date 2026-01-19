"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial
        color="#6366f1"
        shininess={100}
        emissive="#4f46e5"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingImage() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshPhongMaterial
          color="#ec4899"
          emissive="#be185d"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[0, Math.PI / 2]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <RotatingBox />
      </PresentationControls>

      <FloatingImage />
    </>
  );
}

export default function ThreeDModel() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
