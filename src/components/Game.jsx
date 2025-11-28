import { useEffect } from "react";
import { setupControls } from "../logic/controls";

function Game() {

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Player 1
            if (e.key === "ArrowRight") setPlayer1((p) => ({ ...p, velX: p.speed }));
            if (e.key === "ArrowLeft") setPlayer1((p) => ({ ...p, velX: -p.speed }));
            if (e.key === "ArrowUp" && !player1.jumping)
                setPlayer1((p) => ({ ...p, velY: -12, jumping: true }));

            // Player 2
            if (e.key === "d") setPlayer2((p) => ({ ...p, velX: p.speed }));
            if (e.key === "a") setPlayer2((p) => ({ ...p, velX: -p.speed }));
            if (e.key === "w" && !player2.jumping)
                setPlayer2((p) => ({ ...p, velY: -12, jumping: true }));
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft")
                setPlayer1((p) => ({ ...p, velX: 0 }));

            if (e.key === "d" || e.key === "a")
                setPlayer2((p) => ({ ...p, velX: 0 }));
        };

        const cleanup = setupControls(handleKeyDown, handleKeyUp);
        return cleanup;
    }, [player1.jumping, player2.jumping]);

    return (
        <div className="game">
            <canvas id="gameCanvas"></canvas>
        </div>
    );
}

export default Game;
