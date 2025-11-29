import { useEffect, useRef, useState } from "react";
import "./Game.css";
import { getWeather } from "../logic/weather";

export default function Game() {
    const canvasRef = useRef(null);
    const [weather, setWeather] = useState("Clear");

    const keys = useRef({});

    const player1 = useRef({ x: 120, y: 250, w: 60, h: 80, velY: 0, speed: 5, jumping: false });
    const player2 = useRef({ x: 620, y: 250, w: 60, h: 80, velY: 0, speed: 5, jumping: false });
    const ball = useRef({ x: 370, y: 260, r: 25, velX: 0, velY: 0 });

    let scoreP1 = useRef(0);
    let scoreP2 = useRef(0);

    const gravity = 0.6;
    const ground = 330;

    // -------- CLIMA REAL --------
    useEffect(() => {
        getWeather().then(setWeather);
    }, []);

    // -------- CONTROLES ----------
    useEffect(() => {
        const keydown = (e) => { keys.current[e.key.toLowerCase()] = true; };
        const keyup = (e) => { keys.current[e.key.toLowerCase()] = false; };

        window.addEventListener("keydown", keydown);
        window.addEventListener("keyup", keyup);

        return () => {
            window.removeEventListener("keydown", keydown);
            window.removeEventListener("keyup", keyup);
        };
    }, []);

    // -------- UPDATE LOOP --------
    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        // Variables para animación de fondo
        const clouds = Array.from({ length: 5 }, () => ({ x: Math.random() * width, y: Math.random() * 100, speed: 0.3 + Math.random() * 0.5 }));
        const rainDrops = Array.from({ length: 200 }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: 4 + Math.random() * 4 }));

        function loop() {
            update();
            draw(ctx);
            requestAnimationFrame(loop);
        }

        function drawBackground() {
            // Fondo base
            if (weather === "Clear") {
                ctx.fillStyle = "#87CEEB"; // cielo azul
                ctx.fillRect(0, 0, width, height);
            } else if (weather === "Clouds") {
                ctx.fillStyle = "#A0B0C0"; // gris suave
                ctx.fillRect(0, 0, width, height);
                // dibujar nubes
                ctx.fillStyle = "#FFFFFF";
                clouds.forEach(c => {
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, 30, 0, Math.PI * 2);
                    ctx.arc(c.x + 20, c.y + 10, 25, 0, Math.PI * 2);
                    ctx.arc(c.x - 20, c.y + 10, 25, 0, Math.PI * 2);
                    ctx.fill();
                    c.x += c.speed;
                    if (c.x > width + 50) c.x = -50;
                });
            } else if (weather === "Rain") {
                ctx.fillStyle = "#3A6EA5"; // azul lluvia
                ctx.fillRect(0, 0, width, height);
                // dibujar lluvia
                ctx.strokeStyle = "#B0E0E6";
                ctx.lineWidth = 2;
                rainDrops.forEach(r => {
                    ctx.beginPath();
                    ctx.moveTo(r.x, r.y);
                    ctx.lineTo(r.x, r.y + 10);
                    ctx.stroke();
                    r.y += r.speed;
                    if (r.y > height) r.y = 0;
                });
            } else if (weather === "Thunderstorm") {
                ctx.fillStyle = "#5C3A80"; // cielo tormenta
                ctx.fillRect(0, 0, width, height);
                // nubes rápidas
                ctx.fillStyle = "#AAAAAA";
                clouds.forEach(c => {
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, 30, 0, Math.PI * 2);
                    ctx.arc(c.x + 20, c.y + 10, 25, 0, Math.PI * 2);
                    ctx.arc(c.x - 20, c.y + 10, 25, 0, Math.PI * 2);
                    ctx.fill();
                    c.x += c.speed * 2;
                    if (c.x > width + 50) c.x = -50;
                });
                // rayos aleatorios
                if (Math.random() < 0.02) {
                    ctx.strokeStyle = "#FFFF00";
                    ctx.lineWidth = 3;
                    const lx = Math.random() * width;
                    ctx.beginPath();
                    ctx.moveTo(lx, 0);
                    ctx.lineTo(lx + 10, 50);
                    ctx.lineTo(lx - 5, 100);
                    ctx.lineTo(lx + 10, 150);
                    ctx.stroke();
                }
            }
        }

        loop();

        // -------- LOGICA DEL JUEGO --------
        function update() {
            movePlayer(player1, "a", "d", "w");
            movePlayer(player2, "arrowleft", "arrowright", "arrowup");

            physicsPlayer(player1);
            physicsPlayer(player2);

            playersCollision(player1.current, player2.current);

            physicsBall();
            detectCollision(player1);
            detectCollision(player2);

            checkGoal();
        }

        function draw(ctx) {
            ctx.clearRect(0, 0, width, height);

            drawBackground();

            // Suelo
            ctx.fillStyle = "#66cc33";
            ctx.fillRect(0, ground, width, 70);

            // Jugadores
            ctx.fillStyle = "red";
            ctx.fillRect(player1.current.x, player1.current.y, player1.current.w, player1.current.h);
            ctx.fillStyle = "blue";
            ctx.fillRect(player2.current.x, player2.current.y, player2.current.w, player2.current.h);

            // Pelota
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(ball.current.x, ball.current.y, ball.current.r, 0, Math.PI * 2);
            ctx.fill();

            // Puntaje
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            ctx.fillText("P1: " + scoreP1.current, 20, 30);
            ctx.fillText("P2: " + scoreP2.current, 700, 30);
        }

        function movePlayer(p, leftKey, rightKey, jumpKey) {
            if (keys.current[leftKey]) p.current.x -= p.current.speed;
            if (keys.current[rightKey]) p.current.x += p.current.speed;
            if (keys.current[jumpKey] && !p.current.jumping) {
                p.current.jumping = true;
                p.current.velY = -12;
            }
        }

        function physicsPlayer(p) {
            p.current.velY += gravity;
            p.current.y += p.current.velY;
            if (p.current.y + p.current.h >= ground) {
                p.current.y = ground - p.current.h;
                p.current.jumping = false;
            }
        }

        function playersCollision(p1, p2) {
            if (p1.x < p2.x + p2.w && p1.x + p1.w > p2.x && p1.y < p2.y + p2.h && p1.h + p1.y > p2.y) {
                const overlap = p1.x + p1.w / 2 < p2.x + p2.w / 2 ? (p1.x + p1.w - p2.x) : -(p2.x + p2.w - p1.x);
                p1.x -= overlap / 2;
                p2.x += overlap / 2;
            }
        }

        function physicsBall() {
            ball.current.velY += gravity;
            ball.current.x += ball.current.velX;
            ball.current.y += ball.current.velY;
            if (ball.current.y + ball.current.r >= ground) {
                ball.current.y = ground - ball.current.r;
                ball.current.velY *= -0.55;
            }
        }

        function detectCollision(p) {
            const px = p.current.x + p.current.w / 2;
            const py = p.current.y + p.current.h / 2;
            const dx = ball.current.x - px;
            const dy = ball.current.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p.current.w * 0.45 + ball.current.r;

            if (dist < minDist) {
                const nx = dx / dist;
                const ny = dy / dist;
                ball.current.velX = nx * 5;
                ball.current.velY = ny * 5;
            }
        }

        function checkGoal() {
            if (ball.current.x + ball.current.r >= 800) { scoreP1.current++; resetBall(-5); }
            if (ball.current.x - ball.current.r <= 0) { scoreP2.current++; resetBall(5); }
        }

        function resetBall(direction) {
            ball.current.x = 400;
            ball.current.y = 200;
            ball.current.velX = direction;
            ball.current.velY = 0;
        }
    }, [weather]);

    return (
        <div className="game-wrapper">
            <canvas ref={canvasRef} width={800} height={400} className="game-canvas" />
        </div>
    );
}
