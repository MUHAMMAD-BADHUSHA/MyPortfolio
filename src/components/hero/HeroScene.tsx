"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function genBuildings() {
  const b: { x: number; height: number; z: number }[] = [];
  for (let row = 0; row < 3; row++) {
    const z = -10 - row * 3;
    const count = 20 + row * 5;
    for (let i = 0; i < count; i++) {
      b.push({ x: (Math.random() - 0.5) * 35, height: 1.5 + Math.random() * 4.5 * (1 - row * 0.2), z });
    }
  }
  return b;
}

function genParticles() {
  const count = 1500;
  const pos = new Float32Array(count * 3);
  const cols = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 60;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    const c = Math.random();
    if (c < 0.33) { cols[i * 3] = 0.024; cols[i * 3 + 1] = 0.71; cols[i * 3 + 2] = 0.83; }
    else if (c < 0.66) { cols[i * 3] = 0.54; cols[i * 3 + 1] = 0.36; cols[i * 3 + 2] = 0.96; }
    else { cols[i * 3] = 0.66; cols[i * 3 + 1] = 0.33; cols[i * 3 + 2] = 0.97; }
  }
  return { pos, cols };
}

const BUILDINGS = genBuildings();
const PARTICLE_DATA = genParticles();

function Building({ x, height, z }: { x: number; height: number; z: number }) {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(clock.elapsedTime * 0.5 + x) * 0.1;
    }
  });
  return (
    <group position={[x, height * 0.5 - 1.8, z]}>
      <mesh>
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshStandardMaterial
          color="#0a0a2e"
          emissive="#1a1050"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, height * 0.45, 0.31]}>
        <planeGeometry args={[0.5, height * 0.8]} />
        <meshBasicMaterial
          color="#06B6D4"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function CitySkyline() {
  return (
    <group>
      {BUILDINGS.map((b, i) => (
        <Building key={i} x={b.x} height={b.height} z={b.z} />
      ))}
    </group>
  );
}

function HolographicPlanet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.12;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.6}>
      <group position={[5.5, 3.8, -6]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshPhongMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.4, 24, 24]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.1} />
        </mesh>
        <mesh ref={ring1Ref} rotation={[0.8, 0.3, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 64]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.25} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[1.2, -0.5, 0.3]}>
          <torusGeometry args={[2.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_DATA.pos, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[PARTICLE_DATA.cols, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function EnergyPlatform() {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    ringRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.y += delta * (0.25 + i * 0.12);
        ref.rotation.x += delta * 0.04 * (i % 2 === 0 ? 1 : -1);
      }
    });
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(Date.now() * 0.001) * 0.04;
    }
  });

  const rings = [3.2, 2.7, 2.2, 1.7];

  return (
    <group position={[0, -2.2, -2]}>
      {rings.map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => { ringRefs.current[i] = el; }}
          rotation={[0.25 + i * 0.08, 0, 0]}
        >
          <torusGeometry args={[radius, 0.025, 16, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"}
            transparent
            opacity={0.35 - i * 0.06}
          />
        </mesh>
      ))}
      <mesh ref={glowRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingGeometry() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[-4.5, 0.5, -3]} scale={0.3}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.2} wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[4, -0.2, -4]} scale={0.25}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.18} wireframe />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={1.8}>
        <mesh position={[-3, 2, -5]} scale={0.2}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.15} wireframe />
        </mesh>
      </Float>
    </>
  );
}

function SceneContent() {
  const { pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (pointer.y * 0.015 - groupRef.current.rotation.x) * 0.015;
      groupRef.current.rotation.y += (pointer.x * 0.015 - groupRef.current.rotation.y) * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#06B6D4" />
      <pointLight position={[-3, 5, -5]} intensity={0.3} color="#8B5CF6" />
      <pointLight position={[3, 5, -5]} intensity={0.2} color="#A855F7" />
      <fog attach="fog" args={["#020014", 8, 25]} />

      <CitySkyline />
      <ParticleField />
      <HolographicPlanet />
      <EnergyPlatform />
      <FloatingGeometry />

      <Stars radius={35} depth={40} count={600} factor={3} saturation={0} fade speed={0.3} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 6], fov: 65 }}
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
