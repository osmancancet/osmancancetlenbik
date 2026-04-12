"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function WireSphere({ accent }: { accent: string }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.15;
      outer.current.rotation.x += delta * 0.05;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25;
      inner.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.32} />
      </mesh>
    </>
  );
}

function getThemeAccent(): string {
  if (typeof document === "undefined") return "#60a5fa";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "#2563eb"
    : "#60a5fa";
}

export default function HeroScene() {
  const [accent, setAccent] = useState<string>(getThemeAccent);

  useEffect(() => {
    setAccent(getThemeAccent());
    const observer = new MutationObserver(() => setAccent(getThemeAccent()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <WireSphere accent={accent} />
    </Canvas>
  );
}
