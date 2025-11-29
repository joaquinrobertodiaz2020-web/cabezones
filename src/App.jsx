import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Game from "./components/Game";
import Instructions from "./pages/Instructions";
import Credits from "./pages/Credits";
import Match from "./pages/Match";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Estáticas */}
        <Route path="/" element={<Menu />} />
        <Route path="/instrucciones" element={<Instructions />} />
        <Route path="/creditos" element={<Credits />} />

        {/* Dinámica */}
        <Route path="/match/:id" element={<Match />} />

        {/* Juego principal */}
        <Route path="/jugar" element={<Game />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
