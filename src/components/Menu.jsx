import { Link } from "react-router-dom";
import "../styles/menu.css";

export default function Menu() {
  return (
    <div className="menu">
      <h1 className="title">Cuadradones</h1>

      <div className="cloud c1"></div>
      <div className="cloud c2"></div>
      <div className="cloud c3"></div>
      <div className="cloud c4"></div>

      <Link to="/jugar">
        <button className="play-btn">Jugar</button>
      </Link>

      <Link to="/instrucciones">
        <button className="instru-btn">Instrucciones</button>
      </Link>

      <Link to="/creditos">
        <button className="cred-btn">Creditos</button>
      </Link>
    </div>
  );
}
