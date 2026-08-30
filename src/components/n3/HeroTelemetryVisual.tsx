import { useEffect, useRef } from "react";

export function HeroTelemetryVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Smooth mouse position tracking
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect?.width || 600;
      height = rect?.height || 540;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Grid nodes for subtle network connections
    const NUM_NODES = 24;
    const nodes: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < NUM_NODES; i++) {
      const x = Math.random() * 600;
      const y = Math.random() * 540;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse
      if (targetMouseX > -500) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      } else {
        currentMouseX += (width / 2 - currentMouseX) * 0.02;
        currentMouseY += (height / 2 - currentMouseY) * 0.02;
      }

      // 1. Draw subtle topographical flow waves (harmonic sine curves)
      const numWaves = 7;
      for (let i = 0; i < numWaves; i++) {
        const progress = i / (numWaves - 1);
        const yBase = height * 0.2 + progress * (height * 0.65);

        ctx.beginPath();
        const numPoints = 60;

        for (let p = 0; p <= numPoints; p++) {
          const x = (p / numPoints) * width;

          // Harmonic wave equation
          const f1 = Math.sin(x * 0.007 + time * 0.8 + i * 0.9);
          const f2 = Math.cos(x * 0.012 - time * 0.5 + i * 0.6);
          const f3 = Math.sin(x * 0.003 + time * 0.3);

          // Subtle mouse ripple
          const dx = x - currentMouseX;
          const dy = yBase - currentMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInfluence =
            Math.max(0, 1 - dist / 180) * 18 * Math.cos(dist * 0.05 - time * 2);

          const yOffset = (f1 * 14 + f2 * 10 + f3 * 6) * (0.6 + progress * 0.4) + mouseInfluence;
          const y = yBase + yOffset;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color blending: Teal to Navy with delicate opacity
        const strokeGradient = ctx.createLinearGradient(0, 0, width, 0);
        strokeGradient.addColorStop(0, "rgba(15, 110, 86, 0.03)");
        strokeGradient.addColorStop(0.3, `rgba(15, 110, 86, ${0.12 + (1 - progress) * 0.18})`);
        strokeGradient.addColorStop(0.7, `rgba(29, 158, 117, ${0.18 + progress * 0.12})`);
        strokeGradient.addColorStop(1, "rgba(15, 31, 61, 0.02)");

        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = i === 2 || i === 4 ? 1.25 : 0.85;
        ctx.stroke();
      }

      // 2. Update and draw drifting network telemetry nodes and connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Gentle wandering
        node.x = node.baseX + Math.sin(time * 0.5 + i) * 18;
        node.y = node.baseY + Math.cos(time * 0.4 + i * 1.5) * 14;

        // Subtle mouse push
        const dx = node.x - currentMouseX;
        const dy = node.y - currentMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 12;
          node.x += (dx / (dist || 1)) * force;
          node.y += (dy / (dist || 1)) * force;
        }

        // Connect nearby nodes with ultra-subtle lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = node.x - other.x;
          const ndy = node.y - other.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nDist < 120) {
            const lineAlpha = (1 - nDist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(15, 110, 86, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 110, 86, ${node.alpha * 0.8})`;
        ctx.fill();

        // Key beacon nodes with soft pulse halo
        if (i % 6 === 0) {
          const haloRadius = node.radius + 3 + Math.sin(time * 1.5 + i) * 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, Math.max(1, haloRadius), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(29, 158, 117, ${0.15 + Math.sin(time * 1.5 + i) * 0.1})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-auto relative hidden h-[520px] w-full items-center justify-center overflow-visible lg:flex"
      aria-hidden="true"
    >
      {/* Soft radial ambient glow in the center */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent-teal)_10%,transparent)_0%,transparent_70%)] blur-2xl" />

      {/* Canvas with smooth radial edge mask so it fades seamlessly into the page */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_85%_75%_at_60%_50%,black_35%,transparent_95%)]"
      />
    </div>
  );
}
