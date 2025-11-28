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
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
