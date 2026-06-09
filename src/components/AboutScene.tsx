"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  cyan: "#06B6D4",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#A855F7",
};

function Shape({ position, color, type, delay = 0 }: { position: [number, number, number]; color: string; type: "ico" | "torusKnot" | "octa"; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  const geo = useMemo(() => {
    if (type === "ico") return new THREE.IcosahedronGeometry(0.8, 1);
    if (type === "torusKnot") return new THREE.TorusKnotGeometry(0.6, 0.25, 64, 8);
    return new THREE.OctahedronGeometry(0.7);
  }, [type]);

  useFrame((_, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y += Math.sin(time.current * 0.5 + delay) * 0.002;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <primitive object={geo} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.2}
          wireframe
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh position={position} scale={0.6}>
        <primitive object={geo} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 400;
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const palette = [new THREE.Color(COLORS.cyan), new THREE.Color(COLORS.blue), new THREE.Color(COLORS.purple), new THREE.Color(COLORS.pink)];
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [pos, cols];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function ConnectionLines() {
  const count = 30;
  const ref = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < count; i++) {
      const a = (Math.random() - 0.5) * 12;
      const b = (Math.random() - 0.5) * 8;
      const c = (Math.random() - 0.5) * 6;
      const d = (Math.random() - 0.5) * 12;
      const e = (Math.random() - 0.5) * 8;
      const f = (Math.random() - 0.5) * 6;
      points.push(a, b, c, d, e, f);
    }
    return new Float32Array(points);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={COLORS.cyan} transparent opacity={0.06} />
    </lineSegments>
  );
}

function SceneContent() {
  const { pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (pointer.y * 0.05 - groupRef.current.rotation.x) * 0.015;
      groupRef.current.rotation.y += (pointer.x * 0.08 - groupRef.current.rotation.y) * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color={COLORS.cyan} />
      <pointLight position={[-4, 3, -5]} intensity={0.4} color={COLORS.purple} />
      <pointLight position={[4, -2, -5]} intensity={0.3} color={COLORS.pink} />
      <fog attach="fog" args={["#020014", 6, 18]} />

      <Shape position={[-2.5, 1.5, -2]} color={COLORS.cyan} type="ico" delay={0} />
      <Shape position={[2.8, -1, -3]} color={COLORS.purple} type="torusKnot" delay={1} />
      <Shape position={[-1.5, -2, -4]} color={COLORS.pink} type="octa" delay={2} />
      <Shape position={[2, 2.2, -5]} color={COLORS.blue} type="ico" delay={0.5} />

      <ParticleField />
      <ConnectionLines />
    </group>
  );
}

export default function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
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
