"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const shapesRef = useRef<THREE.Mesh[]>([]);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050008, 0.0008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    rendererRef.current = renderer;

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x00f0ff),
      new THREE.Color(0x0066ff),
      new THREE.Color(0x7000ff),
      new THREE.Color(0xff0080),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 50 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.4;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = 0.5 + Math.random() * 2;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particlesGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleTexture = new THREE.CanvasTexture(generateParticleTexture());
    const particlesMat = new THREE.PointsMaterial({
      size: 0.3,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    particlesRef.current = particles;

    const shapes: THREE.Mesh[] = [];
    const geoTypes = [
      new THREE.TorusGeometry(1.2, 0.4, 16, 32),
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(0.9),
      new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8),
      new THREE.DodecahedronGeometry(0.8),
    ];

    const shapeColors = [0x00f0ff, 0x0066ff, 0x7000ff, 0xff0080, 0x00ff41];

    for (let i = 0; i < 12; i++) {
      const geo = geoTypes[i % geoTypes.length];
      const mat = new THREE.MeshBasicMaterial({
        color: shapeColors[i % shapeColors.length],
        transparent: true,
        opacity: 0.15 + Math.random() * 0.2,
        wireframe: Math.random() > 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const radius = 12 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      mesh.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        (Math.random() - 0.5) * 15,
        radius * Math.cos(theta) * Math.cos(phi) - 10
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01, z: (Math.random() - 0.5) * 0.005 },
        floatSpeed: 0.002 + Math.random() * 0.003,
        floatAmp: 0.5 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
      };

      scene.add(mesh);
      shapes.push(mesh);
    }
    shapesRef.current = shapes;

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const mouseTarget = { x: 0, y: 0 };

    const handleMouse = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);

    let animFrame: number;
    const animate = () => {
      if (!particles || !camera || !renderer) return;

      mouseRef.current.x += (mouseTarget.x - mouseRef.current.x) * 0.02;
      mouseRef.current.y += (mouseTarget.y - mouseRef.current.y) * 0.02;

      camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      particles.rotation.y += 0.0003;
      particles.rotation.x = Math.sin(Date.now() * 0.0001) * 0.02;

      shapes.forEach((mesh) => {
        const data = mesh.userData;
        mesh.rotation.x += data.rotSpeed.x;
        mesh.rotation.y += data.rotSpeed.y;
        mesh.rotation.z += data.rotSpeed.z;
        const floatOffset = Math.sin(Date.now() * data.floatSpeed + data.phase) * data.floatAmp;
        mesh.position.y += (mesh.position.y - (mesh.userData._baseY || mesh.position.y) + floatOffset) * 0.05;
        if (!mesh.userData._baseY) mesh.userData._baseY = mesh.position.y;
      });

      renderer.render(scene, camera);
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return () => { cleanup?.(); };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

function generateParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return canvas;
}
