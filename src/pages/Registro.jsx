import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { rutaVolver, useAuth } from "../context/AuthContext.jsx";

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [parametros] = useSearchParams();
  const [datos, setDatos] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [error, setError] = useState(null);

  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const { nombre, email, password, confirmar } = datos;

    if (!nombre.trim() || !email.trim() || !password || !confirmar) {
      setError({ mensaje: "Completá todos los campos.", campos: [] });
      return;
    }
    if (password.length < 6) {
      setError({ mensaje: "La contraseña debe tener al menos 6 caracteres.", campos: ["password"] });
      return;
    }
    if (password !== confirmar) {
      setError({ mensaje: "Las contraseñas no coinciden.", campos: ["password", "confirmar"] });
      return;
    }

    const resultado = registrar(nombre, email, password);
    if (!resultado.ok) {
      setError({ mensaje: resultado.error, campos: ["email"] });
      return;
    }

    navigate(rutaVolver(parametros.get("volver")), { replace: true });
  }

  function claseCampo(nombre) {
    return error?.campos.includes(nombre) ? "campo campo-error" : "campo";
  }

  return (
    <div className="pagina-login">
      <main className="login-contenido">
        <section className="login-tarjeta aparecer">
          <p className="subtitulo subtitulo-dorado">Las Condes</p>
          <h1>Crear cuenta</h1>
          <p className="login-texto">Registrate para reservar y gestionar tu estadía.</p>

          <form onSubmit={enviar} autoComplete="off" noValidate>
            {error && <p className="mensaje-error">{error.mensaje}</p>}
            <label className={claseCampo("nombre")}>
              <span>Nombre completo</span>
              <input type="text" name="nombre" placeholder="Tu nombre" value={datos.nombre} onChange={cambiar} />
            </label>
            <label className={claseCampo("email")}>
              <span>Correo electrónico</span>
              <input
                type="email"
                name="email"
                placeholder="nombre@correo.com"
                value={datos.email}
                onChange={cambiar}
              />
            </label>
            <label className={claseCampo("password")}>
              <span>Contraseña</span>
              <input
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={datos.password}
                onChange={cambiar}
              />
            </label>
            <label className={claseCampo("confirmar")}>
              <span>Confirmar contraseña</span>
              <input
                type="password"
                name="confirmar"
                placeholder="••••••••"
                value={datos.confirmar}
                onChange={cambiar}
              />
            </label>
            <button className="boton-enviar" type="submit">
              Crear cuenta
            </button>
          </form>

          <p className="login-pie">
            ¿Ya tenés cuenta? <Link to={{ pathname: "/login", search: parametros.toString() }}>Iniciar sesión</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
