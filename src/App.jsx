import { BrowserRouter, Route, Routes } from "react-router-dom";
import Habitacion from "./pages/Habitacion.jsx";
import Inicio from "./pages/Inicio.jsx";
import Lobby from "./pages/Lobby.jsx";
import Login from "./pages/Login.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Registro from "./pages/Registro.jsx";
import Reservas from "./pages/Reservas.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/habitacion/:id" element={<Habitacion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}
