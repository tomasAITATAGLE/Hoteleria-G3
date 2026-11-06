import { createContext, useContext, useState } from "react";

// Usuarios y sesión se guardan en el localStorage del navegador,
// con las mismas claves que usaba el sitio en HTML.
function leer(clave, valorPorDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer("sesion", null));

  function guardarSesion(datos) {
    const sesion = { nombre: datos.nombre, email: datos.email };
    localStorage.setItem("sesion", JSON.stringify(sesion));
    setUsuario(sesion);
  }

  function registrar(nombre, email, password) {
    const usuarios = leer("usuarios", []);
    email = email.trim().toLowerCase();

    if (usuarios.some((u) => u.email === email)) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }

    const nuevo = { nombre: nombre.trim(), email, password };
    localStorage.setItem("usuarios", JSON.stringify([...usuarios, nuevo]));
    guardarSesion(nuevo);
    return { ok: true };
  }

  function iniciarSesion(email, password) {
    email = email.trim().toLowerCase();
    const encontrado = leer("usuarios", []).find((u) => u.email === email);

    if (!encontrado || encontrado.password !== password) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }

    guardarSesion(encontrado);
    return { ok: true };
  }

  function cerrarSesion() {
    localStorage.removeItem("sesion");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, registrar, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
