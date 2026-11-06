import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import Habitacion from "./pages/Habitacion.jsx";
import Inicio from "./pages/Inicio.jsx";
import Lobby from "./pages/Lobby.jsx";
import Login from "./pages/Login.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Registro from "./pages/Registro.jsx";
import Reservas from "./pages/Reservas.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route element={<Layout />}>
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/habitacion/:id" element={<Habitacion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
