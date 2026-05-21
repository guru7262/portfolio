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
    speed: 3,
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
    const GROUND = H - 60;
    const g = gameRef.current;
    g.groundY = GROUND;

    g.clouds = [
      { x: 200, y: 40, w: 70 },
      { x: 500, y: 25, w: 90 },
      { x: 750, y: 50, w: 60 },
    ];

    function drawGround() {
      // main ground line
      ctx!.strokeStyle = "#333";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(0, GROUND + 2);
      ctx!.lineTo(W, GROUND + 2);
      ctx!.stroke();
      // small pebble details
      ctx!.fillStyle = "#2a2a2a";
      for (let i = 0; i < W; i += 40) {
        ctx!.fillRect(i + (g.tick * (g.started ? g.speed : 0) * 0.5 % 40), GROUND + 6, 3, 2);
        ctx!.fillRect(i + 18 + (g.tick * (g.started ? g.speed : 0) * 0.5 % 40), GROUND + 10, 5, 1);
      }
    }

    function drawCloud(c: Cloud) {
      ctx!.fillStyle = "#1e1e1e";
      ctx!.beginPath();
      ctx!.ellipse(c.x, c.y, c.w / 2, 12, 0, 0, Math.PI * 2);
      ctx!.ellipse(c.x - 18, c.y + 5, c.w / 3, 9, 0, 0, Math.PI * 2);
      ctx!.ellipse(c.x + 18, c.y + 5, c.w / 3, 9, 0, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawDino(dino: Dino) {
      const x = dino.x;
      const baseY = GROUND - dino.y;
      const y = baseY - (dino.ducking ? 24 : 48);
      const blink = Math.floor(g.tick / 20) % 10 === 0;
      ctx!.fillStyle = "#d0d0d0";

      if (dino.ducking) {
        ctx!.fillRect(x - 10, y + 8, 40, 16);
        ctx!.fillRect(x + 10, y, 18, 12);
        ctx!.fillStyle = "#111";
        if (!blink) ctx!.fillRect(x + 22, y + 3, 4, 4);
        ctx!.fillStyle = "#d0d0d0";
        const lf = Math.floor(g.tick / 6) % 2;
        ctx!.fillRect(x - 2 + lf * 10, y + 22, 7, 12);
        ctx!.fillRect(x + 16 - lf * 10, y + 22, 7, 12);
      } else {
        ctx!.fillRect(x - 4, y + 12, 30, 24);
        ctx!.fillRect(x + 8, y, 22, 20);
        ctx!.fillStyle = "#111";
        if (!blink) ctx!.fillRect(x + 24, y + 4, 4, 4);
        ctx!.fillStyle = "#888";
        ctx!.fillRect(x + 28, y + 12, 4, 2);
        ctx!.fillStyle = "#d0d0d0";
        ctx!.fillRect(x - 14, y + 16, 12, 9);
        ctx!.fillRect(x - 18, y + 9, 7, 9);
        if (!dino.jumping) {
          const lf = Math.floor(g.tick / 6) % 2;
          ctx!.fillRect(x + 2 + lf * 12, y + 34, 7, 16);
          ctx!.fillRect(x + 16 - lf * 12, y + 34, 7, 16);
        } else {
          ctx!.fillRect(x + 2, y + 34, 7, 12);
          ctx!.fillRect(x + 16, y + 38, 7, 12);
        }
      }
    }

    function drawCactus(obs: Obstacle) {
      ctx!.fillStyle = "#4a7c2f";
      if (obs.type === "small") {
        ctx!.fillRect(obs.x + 8, GROUND - 42, 11, 42);
        ctx!.fillRect(obs.x, GROUND - 30, 28, 9);
        ctx!.fillRect(obs.x, GROUND - 42, 9, 22);
        ctx!.fillRect(obs.x + 19, GROUND - 37, 9, 18);
        // highlight
        ctx!.fillStyle = "#5a9c3a";
        ctx!.fillRect(obs.x + 10, GROUND - 40, 4, 38);
      } else if (obs.type === "tall") {
        ctx!.fillRect(obs.x + 8, GROUND - 62, 11, 62);
        ctx!.fillRect(obs.x, GROUND - 44, 28, 9);
        ctx!.fillRect(obs.x, GROUND - 58, 9, 26);
        ctx!.fillRect(obs.x + 19, GROUND - 52, 9, 22);
        ctx!.fillStyle = "#5a9c3a";
        ctx!.fillRect(obs.x + 10, GROUND - 60, 4, 56);
      } else {
        ctx!.fillRect(obs.x + 6, GROUND - 42, 10, 42);
        ctx!.fillRect(obs.x, GROUND - 30, 22, 8);
        ctx!.fillRect(obs.x, GROUND - 42, 9, 24);
        ctx!.fillRect(obs.x + 28, GROUND - 46, 10, 46);
        ctx!.fillRect(obs.x + 22, GROUND - 32, 22, 8);
        ctx!.fillRect(obs.x + 22, GROUND - 44, 9, 20);
        ctx!.fillStyle = "#5a9c3a";
        ctx!.fillRect(obs.x + 8, GROUND - 40, 4, 38);
        ctx!.fillRect(obs.x + 30, GROUND - 44, 4, 42);
      }
    }

    function drawBird(obs: Obstacle) {
      ctx!.fillStyle = "#c0c0c0";
      const flap = Math.floor(g.tick / 10) % 2;
      const bx = obs.x, by = obs.y;
      ctx!.fillRect(bx, by, 30, 9);
      ctx!.fillRect(bx + 4, by - 5, 9, 5);
      ctx!.fillStyle = "#888";
      ctx!.fillRect(bx + 26, by + 2, 6, 3);
      ctx!.fillStyle = "#111";
      ctx!.fillRect(bx + 20, by + 2, 3, 3);
      ctx!.fillStyle = "#c0c0c0";
      if (flap === 0) {
        ctx!.fillRect(bx - 10, by - 6, 12, 7);
        ctx!.fillRect(bx + 22, by - 6, 12, 7);
      } else {
        ctx!.fillRect(bx - 10, by + 5, 12, 7);
        ctx!.fillRect(bx + 22, by + 5, 12, 7);
      }
    }

    function checkCollision(dino: Dino, obs: Obstacle): boolean {
      const dh = dino.ducking ? 24 : 48;
      const dw = dino.ducking ? 40 : 30;
      const dx = dino.x - 4;
      const dy = GROUND - dino.y - dh;
      let ox: number, oy: number, ow: number, oh: number;
      if (obs.type === "bird") {
        ox = obs.x + 2; oy = obs.y - 4; ow = 26; oh = 14;
      } else if (obs.type === "tall") {
        ox = obs.x + 2; oy = GROUND - 60; ow = 24; oh = 60;
      } else if (obs.type === "double") {
        ox = obs.x; oy = GROUND - 44; ow = 48; oh = 44;
      } else {
        ox = obs.x + 2; oy = GROUND - 40; ow = 24; oh = 40;
      }
      return dx < ox + ow - 6 && dx + dw - 6 > ox && dy < oy + oh - 6 && dy + dh - 6 > oy;
    }

    function spawnObstacle() {
      const types: Obstacle["type"][] = ["small", "tall", "double", "bird", "bird"];
      const t = types[Math.floor(Math.random() * types.length)];
      const birdHeights = [GROUND - 62, GROUND - 40, GROUND - 24];
      const birdY = birdHeights[Math.floor(Math.random() * birdHeights.length)];
      g.obstacles.push({ type: t, x: W + 20, y: t === "bird" ? birdY : 0 });
    }

    function drawScore() {
      ctx!.fillStyle = "#444";
      ctx!.font = "600 13px 'Courier New', monospace";
      ctx!.textAlign = "right";
      if (g.highScore > 0) {
        ctx!.fillText(`HI ${String(Math.floor(g.highScore)).padStart(5, "0")}`, W - 12, 26);
      }
      ctx!.fillStyle = "#777";
      ctx!.fillText(String(Math.floor(g.score)).padStart(5, "0"), W - (g.highScore > 0 ? 100 : 12), 26);
      ctx!.textAlign = "left";
    }

    function drawGameOver() {
      ctx!.fillStyle = "rgba(0,0,0,0.5)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.fillStyle = "#e0e0e0";
      ctx!.font = "bold 18px 'Courier New', monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("GAME OVER", W / 2, H / 2 - 16);
      ctx!.font = "12px 'Courier New', monospace";
      ctx!.fillStyle = "#666";
      ctx!.fillText("SPACE / TAP TO RESTART", W / 2, H / 2 + 10);
      ctx!.textAlign = "left";
    }

    function drawIdle() {
      ctx!.fillStyle = "#444";
      ctx!.font = "12px 'Courier New', monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("PRESS SPACE OR TAP TO START", W / 2, H / 2 + 16);
      ctx!.textAlign = "left";
    }

    let nextObstacle = 100;

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      g.tick++;

      // Stars / background dots
      ctx!.fillStyle = "#1a1a1a";
      for (let i = 0; i < 8; i++) {
        const sx = ((i * 137 + (g.started ? g.tick * g.speed * 0.1 : 0)) % W);
        const sy = (i * 53) % (GROUND - 20);
        ctx!.fillRect(sx, sy, 1, 1);
      }

      // Clouds
      g.clouds.forEach(c => {
        if (g.started && !g.gameOver) c.x -= g.speed * 0.25;
        if (c.x < -120) c.x = W + 80;
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
        // Jump physics — stronger jump, softer gravity
        if (dino.jumping) {
          dino.vy += 0.45;
          dino.y -= dino.vy;
          if (dino.y <= 0) {
            dino.y = 0;
            dino.vy = 0;
            dino.jumping = false;
          }
          // clamp so dino never leaves the canvas
          const maxJump = GROUND - 60;
          if (dino.y > maxJump) dino.y = maxJump;
        }

        nextObstacle--;
        if (nextObstacle <= 0) {
          spawnObstacle();
          const gap = Math.floor(90 + Math.random() * 80 - g.speed * 3);
          nextObstacle = Math.max(45, gap);
        }

        g.obstacles = g.obstacles.filter(o => o.x > -80);
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

        g.score += 0.08;
        // slower speed ramp, lower max
        g.speed = 3 + Math.floor(g.score / 150) * 0.4;
        if (g.speed > 9) g.speed = 9;
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
        g.speed = 3;
        dino.y = 0; dino.vy = 0; dino.jumping = false; dino.ducking = false;
        nextObstacle = 100;
        setStatus("playing");
        return;
      }
      if (!dino.jumping && !dino.ducking) {
        dino.jumping = true;
        dino.vy = -15; // stronger jump
      }
    }

    function duck(on: boolean) {
      if (!g.started || g.gameOver) return;
      g.dino.ducking = on;
      if (on && g.dino.jumping) g.dino.vy = 6;
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
      
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 54px)",
          fontWeight: 700,
          color: "#e8e8e8",
          margin: "0 0 10px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}>
          Hi, I&apos;m Vivek
        </h1>
        <p style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "#555", margin: "0 0 6px", letterSpacing: "0.06em" }}>
          Portfolio will be uploaded soon 
        </p>
        <p style={{ fontSize: "12px", color: "#383838", margin: 0 }}>
          until then — you can play this
        </p>
      </div>

      {/* Game — no box, just the canvas sitting in the page */}
      <div style={{ position: "relative", width: "100%", maxWidth: "700px" }}>
        {/* subtle score display above canvas */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "6px",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.12em",
        }}>
          {status === "dead" && `HI ${String(displayHigh).padStart(5, "0")}  `}
          {(status === "playing" || status === "dead") && String(displayScore).padStart(5, "0")}
        </div>

        <canvas
          ref={canvasRef}
          width={700}
          height={180}
          style={{
            display: "block",
            width: "100%",
            cursor: "pointer",
            background: "transparent",
          }}
        />

        {/* Controls below canvas */}
        <div style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          fontSize: "10px",
          color: "#2e2e2e",
          letterSpacing: "0.1em",
        }}>
          
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "52px",
        fontSize: "10px",
        color: "#222",
        letterSpacing: "0.18em",
        textAlign: "center",
        lineHeight: 2,
      }}>
        
      </div>
    </main>
  );
}