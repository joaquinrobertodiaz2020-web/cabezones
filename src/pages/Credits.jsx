import "../styles/credits.css";

export default function Credits({ onBack }) {
  return (
    <div className="credits-screen">
      <div className="credits-overlay" />

      <div className="credits-content">
        <h1 className="credits-title">CRÉDITOS</h1>

        <div className="credits-scroll">
          <p>Joaquin</p>
          <p>David</p>
          <p>Legio</p>
        </div>
      </div>

      <button className="back-button" onClick={onBack}>
        Volver al Menú
      </button>
    </div>
  );
}
