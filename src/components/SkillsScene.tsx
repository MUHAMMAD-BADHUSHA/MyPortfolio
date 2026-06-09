"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SkillsScene({ active = true }: { active?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    container.appendChild(renderer.domElement);

    const colors = [0x00f0ff, 0x0066ff, 0x7000ff, 0xff0080];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 15; i++) {
      const type = i % 6;
      let geo: THREE.BufferGeometry;
      if (type === 0) geo = new THREE.IcosahedronGeometry(0.6, 0);
      else if (type === 1) geo = new THREE.OctahedronGeometry(0.55);
      else if (type === 2) geo = new THREE.TorusKnotGeometry(0.45, 0.15, 16, 6);
      else if (type === 3) geo = new THREE.TetrahedronGeometry(0.5);
      else if (type === 4) geo = new THREE.DodecahedronGeometry(0.5);
      else geo = new THREE.TorusGeometry(0.6, 0.2, 8, 16);

      const col = colors[i % colors.length];
      const mat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.15,
        wireframe: Math.random() > 0.5,
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

    const particleCount = 250;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: "#00f0ff",
      transparent: true,
      opacity: 0.3,
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
      animFrame = requestAnimationFrame(animate);
      if (!activeRef.current) return;

      mouse.x += (mouse.tx - mouse.x) * 0.02;
      mouse.y += (mouse.ty - mouse.y) * 0.02;

      particles.rotation.y += 0.0004;

      const now = Date.now();
      for (let i = 0; i < shapes.length; i++) {
        const d = shapes[i].userData;
        shapes[i].rotation.x += d.rotSpeed.x;
        shapes[i].rotation.y += d.rotSpeed.y;
        shapes[i].rotation.z += d.rotSpeed.z;
        shapes[i].position.y = d.initialY + Math.sin(now * d.floatSpeed + d.phase) * d.floatAmp;
      }

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.012;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.012;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
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
