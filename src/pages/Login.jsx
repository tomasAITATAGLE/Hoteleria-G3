import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { rutaVolver, useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [parametros] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Iniciar sesión — Las Condes";
  }, []);

  function enviar(evento) {
    evento.preventDefault();
    const resultado = iniciarSesion(email, password);

    if (!resultado.ok) {
      setError({ mensaje: resultado.error, campos: ["email", "password"] });
      return;
    }

    navigate(rutaVolver(parametros.get("volver")), { replace: true });
  }

  function claseCampo(nombre) {
    return error?.campos.includes(nombre) ? "campo campo-error" : "campo";
  }

  return (
    <main className="login-contenido">
      <section className="login-tarjeta aparecer">
        <p className="subtitulo subtitulo-dorado">Las Condes</p>
        <h1>Iniciar sesión</h1>
        <p className="login-texto">Accedé a tu cuenta para gestionar tus reservas.</p>

        <form onSubmit={enviar} autoComplete="off" noValidate>
          {error && <p className="mensaje-error">{error.mensaje}</p>}
          <label className={claseCampo("email")}>
            <span>Correo electrónico</span>
            <input
              type="email"
              name="email"
              placeholder="nombre@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={claseCampo("password")}>
            <span>Contraseña</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="login-opciones">
            <label>
              <input type="checkbox" name="recordarme" /> Recordarme
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <button className="boton-enviar" type="submit">
            Ingresar
          </button>
        </form>

        <p className="login-pie">
          ¿No tenés cuenta? <Link to={{ pathname: "/registro", search: parametros.toString() }}>Creá una aquí</Link>
        </p>
      </section>
    </main>
  );
}
