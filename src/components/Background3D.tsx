'use client';

import React, { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track scroll with lerp for smooth physics
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;

    // Track mouse with lerp for interactive perspective
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    // ========================================================================
    // 3D Geometry: Icosahedron + Inner Core + Orbiting Constellation Nodes
    // ========================================================================
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const rawIcosahedronVertices = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];

    // Normalize vertices to unit sphere
    const icosahedronVertices = rawIcosahedronVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len];
    });

    // Edges of icosahedron (pairs of vertex indices)
    const icosahedronEdges: [number, number][] = [];
    for (let i = 0; i < icosahedronVertices.length; i++) {
      for (let j = i + 1; j < icosahedronVertices.length; j++) {
        const dx = icosahedronVertices[i][0] - icosahedronVertices[j][0];
        const dy = icosahedronVertices[i][1] - icosahedronVertices[j][1];
        const dz = icosahedronVertices[i][2] - icosahedronVertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Golden ratio distance threshold between adjacent vertices
        if (Math.abs(dist - 1.05146) < 0.1) {
          icosahedronEdges.push([i, j]);
        }
      }
    }

    // 3D Orbiting Particle Nodes
    const NUM_PARTICLES = 40;
    const particles: { x: number; y: number; z: number; speed: number; radius: number }[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiAngle = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.7; // Floating in outer shell
      const sinPhi = Math.sin(phiAngle);
      particles.push({
        x: r * sinPhi * Math.cos(theta),
        y: r * sinPhi * Math.sin(theta),
        z: r * Math.cos(phiAngle),
        speed: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 1.5 + 1,
      });
    }

    // Secondary Torus Rings
    const TORUS_SEGMENTS = 24;
    const torusRing1: [number, number, number][] = [];
    const torusRing2: [number, number, number][] = [];
    for (let i = 0; i < TORUS_SEGMENTS; i++) {
      const angle = (i / TORUS_SEGMENTS) * Math.PI * 2;
      torusRing1.push([Math.cos(angle) * 1.4, 0, Math.sin(angle) * 1.4]);
      torusRing2.push([0, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5]);
    }

    let time = 0;

    // ========================================================================
    // 3D Render Loop
    // ========================================================================
    const render = () => {
      // Check pause motion preference
      const isMotionPaused = document.documentElement.getAttribute('data-motion') === 'paused';
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const rgb = isLight ? '30, 41, 59' : '255, 255, 255';
      const alphaBoost = isLight ? 1.6 : 1.0;

      if (!isMotionPaused) {
        time += 0.008;
      }

      // Smooth lerp for scroll and mouse
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Base radius of the 3D structure
      const baseRadius = Math.min(width, height) * 0.26;

      // Dynamic position: anchor slightly right on desktop, center on mobile
      const isMobile = width < 900;
      const centerX = isMobile ? width * 0.5 : width * 0.72;
      // Vertical position shifts subtly with scroll
      const centerY = height * 0.48 + Math.sin(time * 0.5) * 8 - (currentScrollY % 600) * 0.05;

      // 3D Rotation Angles driven by both scroll and time
      const rotX = currentScrollY * 0.0016 + time * 0.15 + currentMouseY * 0.25;
      const rotY = currentScrollY * 0.0022 + time * 0.22 + currentMouseX * 0.35;
      const rotZ = currentScrollY * 0.0008 + time * 0.08;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // 3D Transform Projection Helper
      const project = (x: number, y: number, z: number, rMultiplier = 1) => {
        // Rotate X
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate Y
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Rotate Z
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        // Perspective Projection
        const fov = 4.2;
        const depth = fov + z2;
        const scale = fov / Math.max(depth, 0.1);

        const screenX = centerX + x3 * baseRadius * rMultiplier * scale;
        const screenY = centerY + y3 * baseRadius * rMultiplier * scale;

        // Depth alpha for atmospheric depth
        const depthAlpha = Math.max(0.1, Math.min(1, (z2 + 1.8) / 3.6));

        return { x: screenX, y: screenY, z: z2, depthAlpha };
      };

      // 1. Draw Outer Orbiting Particle Nodes & Interconnecting Lines
      const projectedParticles = particles.map((p, idx) => {
        // Slight self-rotation around Y axis
        const pAngle = time * p.speed + idx;
        const px = p.x * Math.cos(pAngle) - p.z * Math.sin(pAngle);
        const pz = p.x * Math.sin(pAngle) + p.z * Math.cos(pAngle);
        return {
          ...project(px, p.y, pz, 1),
          radius: p.radius,
        };
      });

      // Particle interconnections
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.08 * ((p1.depthAlpha + p2.depthAlpha) / 2) * alphaBoost;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle dots
      for (const p of projectedParticles) {
        ctx.fillStyle = `rgba(${rgb}, ${(p.depthAlpha * (isLight ? 0.6 : 0.45)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (p.z > 0 ? 1.2 : 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Torus Outer Rings
      const drawRing = (ring: [number, number, number][], alphaMult: number) => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        const projected = ring.map(([x, y, z]) => project(x, y, z, 1.05));
        for (let i = 0; i < projected.length; i++) {
          const next = projected[(i + 1) % projected.length];
          const edgeAlpha = ((projected[i].depthAlpha + next.depthAlpha) / 2) * alphaMult * alphaBoost;
          ctx.strokeStyle = `rgba(${rgb}, ${edgeAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }
      };

      drawRing(torusRing1, 0.09);
      drawRing(torusRing2, 0.07);

      // 3. Draw Core Icosahedron Wireframe
      const projectedIcosa = icosahedronVertices.map(([x, y, z]) => project(x, y, z, 0.95));

      // Edges
      ctx.lineWidth = 1.2;
      for (const [startIdx, endIdx] of icosahedronEdges) {
        const p1 = projectedIcosa[startIdx];
        const p2 = projectedIcosa[endIdx];
        const edgeAlpha = ((p1.depthAlpha + p2.depthAlpha) / 2) * (isLight ? 0.22 : 0.16);

        ctx.strokeStyle = `rgba(${rgb}, ${edgeAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Vertices Dots with Subtle Radial Glow
      for (const p of projectedIcosa) {
        const dotAlpha = p.depthAlpha * (isLight ? 0.85 : 0.7);
        ctx.fillStyle = `rgba(${rgb}, ${dotAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Vertex glow halo
        if (p.z > 0) {
          ctx.fillStyle = `rgba(${rgb}, ${(dotAlpha * (isLight ? 0.2 : 0.15)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Subtle Inner Core Polyhedron (Concentric Depth)
      const projectedInner = icosahedronVertices.map(([x, y, z]) => project(x, y, z, 0.45));
      ctx.lineWidth = 0.8;
      for (const [startIdx, endIdx] of icosahedronEdges) {
        const p1 = projectedInner[startIdx];
        const p2 = projectedInner[endIdx];
        const edgeAlpha = ((p1.depthAlpha + p2.depthAlpha) / 2) * (isLight ? 0.12 : 0.08);
        ctx.strokeStyle = `rgba(${rgb}, ${edgeAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when tab is hidden to save battery/resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
