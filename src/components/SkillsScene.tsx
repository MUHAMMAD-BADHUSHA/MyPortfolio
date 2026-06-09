"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SkillsScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const colors = [0x00f0ff, 0x0066ff, 0x7000ff, 0xff0080];
    const geometries = [
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(0.55),
      new THREE.TorusKnotGeometry(0.45, 0.15, 32, 8),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.DodecahedronGeometry(0.5),
      new THREE.TorusGeometry(0.6, 0.2, 12, 24),
    ];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 25; i++) {
      const geo = geometries[i % geometries.length];
      const col = colors[i % colors.length];
      const mat = new THREE.MeshPhysicalMaterial({
        color: col,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.15,
        wireframe: Math.random() > 0.5,
        emissive: col,
        emissiveIntensity: 0.08,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const radius = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      mesh.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        (Math.random() - 0.5) * 12,
        radius * Math.cos(theta) * Math.cos(phi) - 4
      );

      const s = 0.6 + Math.random() * 1.8;
      mesh.scale.set(s, s, s);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005,
        },
        floatSpeed: 0.002 + Math.random() * 0.004,
        floatAmp: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        initialY: mesh.position.y,
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    const particleCount = 500;
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
      const c = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animFrame: number;
    const animate = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.02;
      mouse.y += (mouse.ty - mouse.y) * 0.02;

      particles.rotation.y += 0.0004;

      const now = Date.now();
      shapes.forEach((mesh) => {
        const d = mesh.userData;
        mesh.rotation.x += d.rotSpeed.x;
        mesh.rotation.y += d.rotSpeed.y;
        mesh.rotation.z += d.rotSpeed.z;
        mesh.position.y = d.initialY + Math.sin(now * d.floatSpeed + d.phase) * d.floatAmp;
      });

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.012;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.012;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
