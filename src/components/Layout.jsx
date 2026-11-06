import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

// Clase de página que usa el CSS (deja el footer abajo de todo y da el fondo de cada una)
function clasePagina(pathname) {
  if (pathname.startsWith("/nosotros")) return "pagina-oscura";
  if (pathname.startsWith("/reservas")) return "pagina-reservas";
  if (pathname.startsWith("/habitacion")) return "pagina-habitacion";
  if (pathname.startsWith("/login") || pathname.startsWith("/registro")) return "pagina-login";
  return "";
}

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className={clasePagina(pathname)}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
