import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const numberOfPoints = 50;
    const connectionRadius = 150;
    const pointRadius = 2;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    // Initialize points
    const initPoints = () => {
      points = [];
      for (let i = 0; i < numberOfPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off walls
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(var(--primary), 0.5)";
        ctx.fill();
      });

      // Draw connections
      points.forEach((point, i) => {
        points.slice(i + 1).forEach((otherPoint) => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = `rgba(var(--primary), ${1 - distance / connectionRadius})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up
    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-background"
      style={{ filter: "blur(1px)" }}
    />
  );
}
