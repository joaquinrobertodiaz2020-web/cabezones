import { useParams } from "react-router-dom";

export default function Match() {
  const { id } = useParams(); // ← acá te llega el ID dinámico

  return (
    <div style={{ padding: 40 }}>
      <h1>Partido ID: {id}</h1>
      <p>Acá podrías mostrar estadisticas, repetición o empezar un partido con ese ID.</p>
    </div>
  );
}
