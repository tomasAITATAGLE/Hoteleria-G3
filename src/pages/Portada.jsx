import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Portada() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Las Condes Hotel & Golf Club";
  }, []);

  // La portada pasa sola al lobby; el timeout se cancela al salir de la página
  useEffect(() => {
    const temporizador = setTimeout(() => navigate("/lobby"), 4200);
    return () => clearTimeout(temporizador);
  }, [navigate]);

  return (
    <div className="pagina-intro">
      <main className="intro">
        <h1 className="oculto">Las Condes Hotel & Golf Club</h1>
        <div className="intro-logo">
          <span className="marca marca-dorada"></span>
        </div>
        <Link className="intro-entrar" to="/lobby">
          Ingresar al hotel
        </Link>
        <span className="intro-linea"></span>
      </main>
    </div>
  );
}
