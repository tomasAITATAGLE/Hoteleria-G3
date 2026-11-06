import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { rutaLogin, useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();

  // El CSS del menú usa la clase "menu-abierto" en el body (también bloquea el scroll)
  useEffect(() => {
    document.body.classList.toggle("menu-abierto", abierto);
    return () => document.body.classList.remove("menu-abierto");
  }, [abierto]);

  // Escape cierra el menú
  useEffect(() => {
    if (!abierto) return;
    function alTeclear(evento) {
      if (evento.key === "Escape") setAbierto(false);
    }
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  // Al navegar a otra página el menú se cierra
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  function salir(evento) {
    evento.preventDefault();
    cerrarSesion();
    navigate("/lobby");
  }

  const transparente = pathname.startsWith("/habitacion");

  return (
    <>
      <header className={transparente ? "encabezado encabezado-transparente" : "encabezado"}>
        <button
          className="boton-menu"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link className="logo" to="/lobby">
          <span className="marca marca-blanca"></span>
        </Link>
        {/* Reservar pide estar logueado: sin sesión pasa por el login y después vuelve a /reservas */}
        <Link
          className="boton boton-dorado"
          id="boton-reservar"
          to={usuario ? "/reservas" : rutaLogin("/reservas")}
        >
          Reservar
        </Link>
      </header>

      <div className="fondo-menu" onClick={() => setAbierto(false)}></div>
      <nav className="menu">
        <button
          className="cerrar-menu"
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setAbierto(false)}
        >
          ×
        </button>
        <p className="menu-titulo">Las Condes</p>
        <NavLink to="/lobby">Inicio</NavLink>
        <NavLink to="/nosotros">Sobre nosotros</NavLink>
        <NavLink to="/reservas">Habitaciones</NavLink>
        <a href="#" aria-disabled="true">
          Contacto
        </a>
        {usuario ? (
          <a href="#" id="link-sesion" onClick={salir}>
            Cerrar sesión ({usuario.nombre.split(" ")[0]})
          </a>
        ) : (
          <NavLink to="/login" id="link-sesion">
            Iniciar sesión
          </NavLink>
        )}
      </nav>
    </>
  );
}
