import { Navigate, useLocation } from "react-router-dom";
import { rutaLogin, useAuth } from "../context/AuthContext.jsx";

// Envuelve una página que necesita sesión: sin usuario manda al login
// y después vuelve a la ruta que se había pedido.
export default function RutaProtegida({ children }) {
  const { usuario } = useAuth();
  const { pathname, search } = useLocation();

  if (!usuario) {
    return <Navigate to={rutaLogin(pathname + search)} replace />;
  }

  return children;
}
