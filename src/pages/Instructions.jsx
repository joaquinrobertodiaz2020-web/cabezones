import "../styles/instructions.css";

export default function Instructions({ onBack }) {
  return (
    <div className="instructions-screen">
      <button className="back-button" onClick={onBack}>← Volver</button>

      <div className="instructions-box">
        <h1 className="instructions-title">Instrucciones</h1>

        <ul className="instructions-list">
          <li><strong>Player 1:</strong> Flechas ← ↑ →</li>
          <li><strong>Player 2:</strong> Teclas W • A • D</li>
          <li>El balón rebota dinámicamente</li>
          <li>Saltá para ganar ventaja</li>
          <li>Empujá la pelota para marcar gol</li>
        </ul>
      </div>
    </div>
  );
}
