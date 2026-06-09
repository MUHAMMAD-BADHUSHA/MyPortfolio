"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Monolith({ height, position, color, index }: {
  height: number; position: [number, number, number]; color: string; index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const c = new THREE.Color(color);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(clock.elapsedTime * 0.6 + index * 1.5) * 0.12;
    }
    if (ref.current) {
      ref.current.rotation.y += 0.003 * (index + 1) * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshPhysicalMaterial
          color={c}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.15}
          wireframe
          emissive={c}
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, height * 0.45, 0.26]}>
        <planeGeometry args={[0.4, height * 0.85]} />
        <meshBasicMaterial color={c} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Pathway() {
  const count = 120;
  const { pos } = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 0.5 - 0.6;
      const r = 3 + t * 4;
      p[i * 3] = Math.cos(angle) * r;
      p[i * 3 + 1] = t * 3 - 1.5;
      p[i * 3 + 2] = Math.sin(angle) * r - 2;
    }
    return { pos: p };
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00f0ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function ParticleStream() {
  const count = 400;
  const { pos, cols } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [new THREE.Color("#00f0ff"), new THREE.Color("#7000ff"), new THREE.Color("#ff0080")];
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      const col = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return { pos: p, cols: c };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0008;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(clock.elapsedTime * 0.3 + i) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[cols, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function FloatingElements() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3.5, 0.5, -3]} scale={0.25}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[3, 1, -4]} scale={0.2}>
          <torusKnotGeometry args={[0.8, 0.25, 32, 8]} />
          <meshBasicMaterial color="#7000ff" transparent opacity={0.12} wireframe />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1.2}>
        <mesh position={[2, -0.5, -2.5]} scale={0.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ff0080" transparent opacity={0.1} wireframe />
        </mesh>
      </Float>
    </>
  );
}

function Rings() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref1.current) ref1.current.rotation.z += delta * 0.15;
    if (ref2.current) ref2.current.rotation.x += delta * 0.1;
  });

  return (
    <group position={[0, 1.5, -4]}>
      <mesh ref={ref1} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ref2} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[2.6, 0.015, 16, 64]} />
        <meshBasicMaterial color="#7000ff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const { pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (pointer.y * 0.02 - groupRef.current.rotation.x) * 0.015;
      groupRef.current.rotation.y += (pointer.x * 0.02 - groupRef.current.rotation.y) * 0.015;
    }
  });

  const monoliths = useMemo(() => [
    { height: 2.5, position: [-2.5, 0, -3] as [number, number, number], color: "#ff0080" },
    { height: 3.8, position: [0, 0.65, -3.5] as [number, number, number], color: "#7000ff" },
    { height: 5, position: [2.5, 1.25, -3] as [number, number, number], color: "#00f0ff" },
  ], []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#00f0ff" />
      <pointLight position={[-3, 5, -5]} intensity={0.3} color="#7000ff" />
      <fog attach="fog" args={["#050008", 5, 20]} />

      {monoliths.map((m, i) => (
        <Monolith key={i} height={m.height} position={m.position} color={m.color} index={i} />
      ))}
      <Pathway />
      <ParticleStream />
      <Rings />
      <FloatingElements />
    </group>
  );
}

export default function ExperienceScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
