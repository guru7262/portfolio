"use client";
import { useEffect, useRef, useState } from "react";

interface Dino {
  x: number;
  y: number;
  vy: number;
  jumping: boolean;
  ducking: boolean;
  frame: number;
}

interface Obstacle {
  type: "small" | "tall" | "double" | "bird";
  x: number;
  y: number;
}

interface Cloud {
  x: number;
  y: number;
  w: number;
}

interface GameState {
  dino: Dino;
  obstacles: Obstacle[];
  clouds: Cloud[];
  score: number;
  highScore: number;
  speed: number;
  gameOver: boolean;
  started: boolean;
  animFrame: number | null;
  tick: number;
  groundY: number;
}

type Status = "idle" | "playing" | "dead";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState>({
    dino: { x: 80, y: 0, vy: 0, jumping: false, ducking: false, frame: 0 },
    obstacles: [],
    clouds: [],
    score: 0,
    highScore: 0,
    speed: 5,
    gameOver: false,
    started: false,
    animFrame: null,
    tick: 0,
    groundY: 0,
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const GROUND = H - 48;
    const g = gameRef.current;
    g.groundY = GROUND;

    g.clouds = [
      { x: 200, y: 30, w: 60 },
      { x: 500, y: 20, w: 80 },
      { x: 750, y: 35, w: 50 },
    ];

    function drawGround() {
      ctx!.strokeStyle = "#555";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(0, GROUND + 2);
      ctx!.lineTo(W, GROUND + 2);
      ctx!.stroke();
    }

    function drawCloud(c: Cloud) {
      ctx!.fillStyle = "#333";
      ctx!.beginPath();
      ctx!.ellipse(c.x, c.y, c.w / 2, 10, 0, 0, Math.PI * 2);
      ctx!.ellipse(c.x - 15, c.y + 4, c.w / 3, 8, 0, 0, Math.PI * 2);
      ctx!.ellipse(c.x + 15, c.y + 4, c.w / 3, 8, 0, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawDino(dino: Dino) {
      const x = dino.x;
      const y = GROUND - (dino.ducking ? 24 : 44);
      const blink = Math.floor(g.tick / 20) % 8 === 0;
      ctx!.fillStyle = "#e0e0e0";

      if (dino.ducking) {
        ctx!.fillRect(x - 10, y + 8, 36, 16);
        ctx!.fillRect(x + 10, y, 16, 12);
        ctx!.fillStyle = "#000";
        if (!blink) ctx!.fillRect(x + 20, y + 3, 4, 4);
        ctx!.fillStyle = "#e0e0e0";
        const lf = Math.floor(g.tick / 6) % 2;
        ctx!.fillRect(x - 2 + lf * 8, y + 22, 6, 10);
        ctx!.fillRect(x + 14 - lf * 8, y + 22, 6, 10);
      } else {
        ctx!.fillRect(x - 4, y + 10, 28, 22);
        ctx!.fillRect(x + 8, y, 20, 18);
        ctx!.fillStyle = "#000";
        if (!blink) ctx!.fillRect(x + 22, y + 4, 4, 4);
        ctx!.fillStyle = "#aaa";
        ctx!.fillRect(x + 26, y + 10, 4, 2);
        ctx!.fillStyle = "#e0e0e0";
        ctx!.fillRect(x - 12, y + 14, 10, 8);
        ctx!.fillRect(x - 16, y + 8, 6, 8);
        if (!dino.jumping) {
          const lf = Math.floor(g.tick / 6) % 2;
          ctx!.fillRect(x + 2 + lf * 10, y + 30, 6, 14);
          ctx!.fillRect(x + 14 - lf * 10, y + 30, 6, 14);
        } else {
          ctx!.fillRect(x + 2, y + 30, 6, 10);
          ctx!.fillRect(x + 14, y + 34, 6, 10);
        }
      }
    }

    function drawCactus(obs: Obstacle) {
      ctx!.fillStyle = "#8BC34A";
      if (obs.type === "small") {
        ctx!.fillRect(obs.x + 8, GROUND - 38, 10, 38);
        ctx!.fillRect(obs.x, GROUND - 28, 26, 8);
        ctx!.fillRect(obs.x, GROUND - 38, 8, 20);
        ctx!.fillRect(obs.x + 18, GROUND - 34, 8, 16);
      } else if (obs.type === "tall") {
        ctx!.fillRect(obs.x + 8, GROUND - 56, 10, 56);
        ctx!.fillRect(obs.x, GROUND - 40, 26, 8);
        ctx!.fillRect(obs.x, GROUND - 52, 8, 24);
        ctx!.fillRect(obs.x + 18, GROUND - 48, 8, 20);
      } else {
        ctx!.fillRect(obs.x + 6, GROUND - 38, 9, 38);
        ctx!.fillRect(obs.x, GROUND - 28, 21, 7);
        ctx!.fillRect(obs.x + 26, GROUND - 42, 9, 42);
        ctx!.fillRect(obs.x + 20, GROUND - 30, 21, 7);
      }
    }

    function drawBird(obs: Obstacle) {
      ctx!.fillStyle = "#e0e0e0";
      const flap = Math.floor(g.tick / 8) % 2;
      const bx = obs.x, by = obs.y;
      ctx!.fillRect(bx, by, 28, 8);
      ctx!.fillRect(bx + 4, by - 4, 8, 4);
      if (flap === 0) {
        ctx!.fillRect(bx - 8, by - 4, 10, 6);
        ctx!.fillRect(bx + 20, by - 4, 10, 6);
      } else {
        ctx!.fillRect(bx - 8, by + 4, 10, 6);
        ctx!.fillRect(bx + 20, by + 4, 10, 6);
      }
    }

    function checkCollision(dino: Dino, obs: Obstacle): boolean {
      const dh = dino.ducking ? 24 : 44;
      const dw = dino.ducking ? 36 : 28;
      const dx = dino.x - 4;
      const dy = GROUND - dh;
      let ox: number, oy: number, ow: number, oh: number;
      if (obs.type === "bird") {
        ox = obs.x + 2; oy = obs.y - 2; ow = 24; oh = 12;
      } else if (obs.type === "tall") {
        ox = obs.x + 2; oy = GROUND - 54; ow = 22; oh = 54;
      } else if (obs.type === "double") {
        ox = obs.x; oy = GROUND - 40; ow = 44; oh = 40;
      } else {
        ox = obs.x + 2; oy = GROUND - 36; ow = 22; oh = 36;
      }
      return dx < ox + ow - 4 && dx + dw - 4 > ox && dy < oy + oh - 4 && dy + dh - 4 > oy;
    }

    function spawnObstacle() {
      const types: Obstacle["type"][] = ["small", "tall", "double", "bird", "bird"];
      const t = types[Math.floor(Math.random() * types.length)];
      const birdY = [GROUND - 55, GROUND - 35, GROUND - 20][Math.floor(Math.random() * 3)];
      g.obstacles.push({ type: t, x: W + 20, y: t === "bird" ? birdY : 0 });
    }

    function drawScore() {
      ctx!.fillStyle = "#888";
      ctx!.font = "600 14px 'Courier New', monospace";
      ctx!.textAlign = "right";
      if (g.highScore > 0) {
        ctx!.fillText(`HI ${String(Math.floor(g.highScore)).padStart(5, "0")}`, W - 10, 28);
      }
      ctx!.fillStyle = "#ccc";
      ctx!.fillText(String(Math.floor(g.score)).padStart(5, "0"), W - (g.highScore > 0 ? 95 : 10), 28);
      ctx!.textAlign = "left";
    }

    function drawGameOver() {
      ctx!.fillStyle = "#fff";
      ctx!.font = "bold 20px 'Courier New', monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("GAME OVER", W / 2, H / 2 - 20);
      ctx!.font = "13px 'Courier New', monospace";
      ctx!.fillStyle = "#aaa";
      ctx!.fillText("PRESS SPACE / TAP TO RESTART", W / 2, H / 2 + 10);
      ctx!.textAlign = "left";
    }

    function drawIdle() {
      ctx!.fillStyle = "#aaa";
      ctx!.font = "13px 'Courier New', monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("PRESS SPACE / TAP TO START", W / 2, H / 2 - 10);
      ctx!.textAlign = "left";
    }

    let nextObstacle = 80;

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      g.tick++;

      g.clouds.forEach(c => {
        if (g.started && !g.gameOver) c.x -= g.speed * 0.3;
        if (c.x < -100) c.x = W + 60;
        drawCloud(c);
      });

      drawGround();

      if (!g.started) {
        drawDino(g.dino);
        drawIdle();
        drawScore();
        g.animFrame = requestAnimationFrame(loop);
        return;
      }

      if (!g.gameOver) {
        const dino = g.dino;
        if (dino.jumping) {
          dino.vy += 0.7;
          dino.y += dino.vy;
          if (dino.y >= 0) { dino.y = 0; dino.vy = 0; dino.jumping = false; }
        }

        nextObstacle--;
        if (nextObstacle <= 0) {
          spawnObstacle();
          nextObstacle = Math.floor(60 + Math.random() * 60 - g.speed * 2);
          if (nextObstacle < 30) nextObstacle = 30;
        }

        g.obstacles = g.obstacles.filter(o => o.x > -60);
        g.obstacles.forEach(o => {
          o.x -= g.speed;
          if (o.type === "bird") drawBird(o);
          else drawCactus(o);
          if (checkCollision(dino, o)) {
            g.gameOver = true;
            if (g.score > g.highScore) g.highScore = g.score;
            setDisplayHigh(Math.floor(g.highScore));
            setStatus("dead");
          }
        });

        g.score += 0.1;
        g.speed = 5 + Math.floor(g.score / 100) * 0.5;
        if (g.speed > 14) g.speed = 14;
        setDisplayScore(Math.floor(g.score));
      }

      drawDino(g.dino);
      if (g.gameOver) drawGameOver();
      drawScore();

      g.animFrame = requestAnimationFrame(loop);
    }

    g.animFrame = requestAnimationFrame(loop);

    function jump() {
      const dino = g.dino;
      if (!g.started) { g.started = true; setStatus("playing"); return; }
      if (g.gameOver) {
        g.gameOver = false;
        g.obstacles = [];
        g.score = 0;
        g.speed = 5;
        dino.y = 0; dino.vy = 0; dino.jumping = false; dino.ducking = false;
        nextObstacle = 80;
        setStatus("playing");
        return;
      }
      if (!dino.jumping && !dino.ducking) {
        dino.jumping = true;
        dino.vy = -14;
      }
    }

    function duck(on: boolean) {
      if (!g.started || g.gameOver) return;
      g.dino.ducking = on;
      if (on && g.dino.jumping) g.dino.vy = 4;
    }

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); jump(); }
      if (e.code === "ArrowDown") { e.preventDefault(); duck(true); }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === "ArrowDown") duck(false);
    }
    function onTouch(e: TouchEvent) {
      e.preventDefault();
      jump();
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("touchstart", onTouch, { passive: false });

    return () => {
      if (g.animFrame) cancelAnimationFrame(g.animFrame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      padding: "20px",
    }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#555", marginBottom: "12px", textTransform: "uppercase" }}>
          vivekmohod.fun
        </div>
        <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Hi, I&apos;m Vivek
        </h1>
        <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "#666", margin: "0 0 6px", letterSpacing: "0.05em" }}>
          Python · Backend · ML —{" "}
          <span style={{ color: "#8BC34A" }}>coming soon</span>
        </p>
        <p style={{ fontSize: "12px", color: "#444", margin: 0 }}>
          until then — you can play this
        </p>
      </div>

      <div style={{ position: "relative", border: "1px solid #222", borderRadius: "4px", overflow: "hidden", background: "#111" }}>
        <div style={{ position: "absolute", top: "10px", left: "12px", fontSize: "11px", color: "#555", letterSpacing: "0.1em", zIndex: 2, pointerEvents: "none" }}>
          {status === "playing" && `SCORE ${String(displayScore).padStart(5, "0")}`}
          {status === "idle" && "DINO RUNNER"}
          {status === "dead" && `SCORE ${String(displayScore).padStart(5, "0")} · HI ${String(displayHigh).padStart(5, "0")}`}
        </div>
        <canvas
          ref={canvasRef}
          width={700}
          height={160}
          style={{ display: "block", maxWidth: "100%", cursor: "pointer" }}
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "24px", fontSize: "11px", color: "#3a3a3a", letterSpacing: "0.08em" }}>
        <span>↑ / SPACE — jump</span>
        <span>↓ — duck</span>
        <span>tap — mobile</span>
      </div>

      <div style={{ marginTop: "40px", fontSize: "11px", color: "#2a2a2a", letterSpacing: "0.15em", textAlign: "center" }}>
        PORTFOLIO LOADING . . .
        <br />
        <span style={{ color: "#1a1a1a", fontSize: "10px" }}>built with Next.js · deployed on Vercel</span>
      </div>
    </main>
  );
}