"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import * as THREE from "three";

// Silence harmless GLTFLoader texture blob errors caused by React Strict Mode double-mounting in dev.
// Since we completely override the materials in RotatingModel, we don't care about the broken textures in the .glb.
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Couldn't load texture")) return;
    originalError.call(console, ...args);
  };
}

function RotatingModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Center and scale the model on load
  React.useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4.5 / maxDim; // Normalize to fit nicely in view

    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    // Explicitly apply "Valve Blue" material to all meshes in case textures are missing
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // We preserve the original material but override its color and physical properties
        // to look like polished industrial blue paint
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color = new THREE.Color("#1E40AF"); // Deep Valve Blue
          mat.roughness = 0.4;
          mat.metalness = 0.5;
          mat.envMapIntensity = 1.2; // Enhances the reflection from the Environment map
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent">
      <Loader2 className="w-8 h-8 text-[#F97316] animate-spin mb-4" />
    </div>
  );
}

function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [2, 1, 3], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#3B82F6" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Model */}
      <Suspense fallback={null}>
        <RotatingModel url="/3d/model.glb" />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}

export function ProductModel() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-transparent flex items-center justify-center mix-blend-screen transition-opacity duration-700">
      {/* Soft natural glow Effect behind the model */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none" />

      <Suspense fallback={<LoadingFallback />}>
        <Scene />
      </Suspense>
    </div>
  );
}

useGLTF.preload("/3d/model.glb");
