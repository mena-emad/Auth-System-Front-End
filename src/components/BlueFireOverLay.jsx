import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FireOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const rand = (a, b) => a + Math.random() * (b - a);

    class FireParticle {
      constructor(side) {
        this.side = side;
        this.reset();
      }
      reset() {
        const s = this.side;
        this.x = s === "left" ? rand(-60, 100) : rand(W() - 100, W() + 60);
        this.y = H() + rand(0, 80);
        this.size = rand(80, 200);
        this.vx = s === "left" ? rand(0.5, 2) : rand(-2, -0.5);
        this.vy = rand(-2.5, -1.2);
        this.life = 1;
        this.decay = rand(0.003, 0.008);
        this.type = Math.random() > 0.5 ? "fire" : "smoke";
        this.waveFq = rand(0.02, 0.05);
        this.waveAmp = rand(5, 20);
        this.phase = rand(0, Math.PI * 2);
      }
      update(t) {
        this.x += this.vx + Math.sin(t * this.waveFq + this.phase) * 0.6;
        this.y += this.vy;
        this.life -= this.decay;
        this.size += 0.8;
      }
      draw() {
        if (this.life <= 0) return;
        const alpha = this.life * (this.type === "fire" ? 0.55 : 0.3);
        let r, g, b;
        if (this.type === "fire") {
          r = 255;
          g = Math.floor(this.life * this.life * 120);
          b = 0;
        } else {
          r = Math.floor(80 + this.life * 60);
          g = 0; b = 0;
        }
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(1, `rgba(${r},0,0,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    class Ember {
      constructor() { this.reset(); }
      reset() {
        const s = Math.random() > 0.5 ? "left" : "right";
        this.x = s === "left" ? rand(0, 140) : rand(W() - 140, W());
        this.y = H() - rand(0, 100);
        this.vx = rand(-1.5, 1.5);
        this.vy = rand(-3, -1.2);
        this.life = 1;
        this.decay = rand(0.008, 0.02);
        this.size = rand(1.5, 4);
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;
        this.life -= this.decay;
      }
      draw() {
        if (this.life <= 0) return;
        const a = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${Math.floor(a * 180)},0,${a})`;
        ctx.fill();
        const glow = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 5
        );
        glow.addColorStop(0, `rgba(255,100,0,${a * 0.4})`);
        glow.addColorStop(1, "rgba(255,0,0,0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }

    const particles = [
      ...Array.from({ length: 35 }, () => new FireParticle("left")),
      ...Array.from({ length: 35 }, () => new FireParticle("right")),
    ];
    const embers = Array.from({ length: 30 }, () => new Ember());

    let lightningTimer = 80;
    let lightningOpacity = 0;

    const drawLightning = () => {
      ctx.save();
      ctx.globalAlpha = lightningOpacity;
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 30;
      let cx = W() * 0.52, cy = 0;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      while (cy < H()) {
        cx += rand(-20, 20);
        cy += H() / 14;
        ctx.lineTo(cx, cy);
        if (Math.random() > 0.65) {
          ctx.lineTo(cx + rand(-50, 50), cy + rand(20, 70));
          ctx.moveTo(cx, cy);
        }
      }
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 60;
      ctx.shadowColor = "red";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    let t = 0;
    let raf;

    const frame = () => {
      ctx.clearRect(0, 0, W(), H());

      ctx.fillStyle = "rgba(8,0,0,0.3)";
      ctx.fillRect(0, 0, W(), H());

      const bgGlow = ctx.createRadialGradient(
        W() / 2, H() / 2, 0,
        W() / 2, H() / 2, W() * 0.7
      );
      bgGlow.addColorStop(0, "rgba(120,0,0,0.2)");
      bgGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W(), H());

      ctx.globalCompositeOperation = "screen";
      for (const p of particles) {
        p.update(t);
        p.draw();
        if (p.life <= 0) p.reset();
      }
      ctx.globalCompositeOperation = "source-over";

      for (const e of embers) {
        e.update();
        e.draw();
        if (e.life <= 0) e.reset();
      }

      lightningTimer--;
      if (lightningTimer <= 0) {
        lightningOpacity = rand(0.7, 1);
        lightningTimer = rand(80, 180);
        setTimeout(() => { lightningOpacity = 0; }, 150 + Math.random() * 100);
      }
      if (lightningOpacity > 0) drawLightning();

      const vignette = ctx.createRadialGradient(
        W() / 2, H() / 2, W() * 0.25,
        W() / 2, H() / 2, W() * 0.9
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W(), H());

      t++;
      raf = requestAnimationFrame(frame);
    };

    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 999999,
        background: "radial-gradient(circle at center, rgba(80,0,0,0.4), rgba(0,0,0,0.98))",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </motion.div>
  );
}