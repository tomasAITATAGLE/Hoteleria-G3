// ===== Menú lateral =====
const botonMenu = document.querySelector(".boton-menu");

function abrirMenu() {
  document.body.classList.add("menu-abierto");
}

function cerrarMenu() {
  document.body.classList.remove("menu-abierto");
}

if (botonMenu) {
  botonMenu.addEventListener("click", abrirMenu);
  document.querySelector(".cerrar-menu").addEventListener("click", cerrarMenu);
  document.querySelector(".fondo-menu").addEventListener("click", cerrarMenu);
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") cerrarMenu();
  });
}

// ===== Portada: pasa sola al lobby después de unos segundos =====
const linkEntrar = document.getElementById("entrar");

if (linkEntrar) {
  const temporizador = setTimeout(function () {
    window.location.href = "lobby.html";
  }, 4200);
  linkEntrar.addEventListener("click", function () {
    clearTimeout(temporizador);
  });
}

// ===== Reloj del lobby (hora de Córdoba) =====
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");

function actualizarReloj() {
  const hora = new Date().toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Cordoba",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const partes = hora.split(":");
  horas.textContent = partes[0];
  minutos.textContent = partes[1];
}

if (horas) {
  actualizarReloj();
  setInterval(actualizarReloj, 1000);
}

// ===== Formulario de reserva =====
const formReserva = document.getElementById("form-reserva");

// Date -> "2026-10-16" (el formato que usan los input date)
function formatoInput(fecha) {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  return fecha.getFullYear() + "-" + mes + "-" + dia;
}

// "2026-10-16" -> "16/10/2026"
function formatoPantalla(texto) {
  return texto.split("-").reverse().join("/");
}

function sumarDias(fecha, dias) {
  const nueva = new Date(fecha);
  nueva.setDate(nueva.getDate() + dias);
  return nueva;
}

function actualizarReserva() {
  const llegada = formReserva.elements.llegada;
  const salida = formReserva.elements.salida;
  const huespedes = formReserva.elements.huespedes;

  // La salida tiene que ser al menos un día después de la llegada
  salida.min = formatoInput(sumarDias(new Date(llegada.value + "T12:00"), 1));
  if (salida.value < salida.min) salida.value = salida.min;

  document.getElementById("texto-llegada").textContent = formatoPantalla(llegada.value);
  document.getElementById("texto-salida").textContent = formatoPantalla(salida.value);

  // Cada tarjeta lleva los datos de la reserva a la página de la habitación
  const datos = new URLSearchParams({
    llegada: llegada.value,
    salida: salida.value,
    huespedes: huespedes.value,
  });
  document.querySelectorAll(".tarjeta").forEach(function (tarjeta) {
    tarjeta.search = datos.toString();
  });
}

if (formReserva) {
  const hoy = new Date();
  formReserva.elements.llegada.min = formatoInput(hoy);
  formReserva.elements.llegada.value = formatoInput(sumarDias(hoy, 7));
  actualizarReserva();

  formReserva.addEventListener("change", actualizarReserva);
  formReserva.addEventListener("submit", function (evento) {
    evento.preventDefault();
    document.getElementById("habitaciones").scrollIntoView({ behavior: "smooth" });
  });
}

// ===== Resumen de la reserva en la página de la habitación =====
const resumen = document.getElementById("resumen-reserva");

if (resumen) {
  const datos = new URLSearchParams(window.location.search);
  const llegada = datos.get("llegada");
  const salida = datos.get("salida");
  const huespedes = Number(datos.get("huespedes"));

  if (llegada && salida && huespedes) {
    const opciones = { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
    const desde = new Date(llegada).toLocaleDateString("es-AR", opciones);
    const hasta = new Date(salida).toLocaleDateString("es-AR", opciones);
    const textoHuespedes = huespedes === 1 ? "1 huésped" : huespedes + " huéspedes";
    resumen.textContent = desde + " – " + hasta + " · " + textoHuespedes;
  }
}

// ===== Carrusel de fotos =====
const carrusel = document.querySelector(".carrusel");

if (carrusel) {
  const fotos = carrusel.querySelectorAll(".carrusel-foto");
  const puntos = carrusel.querySelectorAll(".puntos button");
  let fotoActual = 0;

  function mostrarFoto(numero) {
    // Si se pasa del final vuelve a la primera, y al revés
    fotoActual = (numero + fotos.length) % fotos.length;
    for (let i = 0; i < fotos.length; i++) {
      fotos[i].classList.toggle("activa", i === fotoActual);
      puntos[i].classList.toggle("activa", i === fotoActual);
    }
  }

  carrusel.querySelector(".flecha-anterior").addEventListener("click", function () {
    mostrarFoto(fotoActual - 1);
  });
  carrusel.querySelector(".flecha-siguiente").addEventListener("click", function () {
    mostrarFoto(fotoActual + 1);
  });
  puntos.forEach(function (punto, i) {
    punto.addEventListener("click", function () {
      mostrarFoto(i);
    });
  });
  carrusel.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") mostrarFoto(fotoActual - 1);
    if (evento.key === "ArrowRight") mostrarFoto(fotoActual + 1);
  });
}

// ===== Usuarios y sesión (se guardan en el localStorage del navegador) =====
function leerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function leerSesion() {
  return JSON.parse(localStorage.getItem("sesion"));
}

function iniciarSesion(usuario) {
  localStorage.setItem("sesion", JSON.stringify({ nombre: usuario.nombre, email: usuario.email }));
}

// Después de loguearse vuelve a la página que pidió (ej: login.html?volver=reservas.html).
// Solo se aceptan nombres de archivo .html de este sitio.
function paginaSiguiente() {
  const volver = new URLSearchParams(window.location.search).get("volver");
  if (/^[\w-]+\.html$/.test(volver)) return volver;
  return "lobby.html";
}

const sesion = leerSesion();

// Link del menú: "Iniciar sesión" o "Cerrar sesión (Nombre)"
const linkSesion = document.getElementById("link-sesion");

if (linkSesion && sesion) {
  linkSesion.textContent = "Cerrar sesión (" + sesion.nombre.split(" ")[0] + ")";
  linkSesion.href = "#";
  linkSesion.addEventListener("click", function (evento) {
    evento.preventDefault();
    localStorage.removeItem("sesion");
    window.location.href = "lobby.html";
  });
}

// El botón "Reservar" pide estar logueado
const botonReservar = document.getElementById("boton-reservar");

if (botonReservar) {
  botonReservar.addEventListener("click", function (evento) {
    if (!sesion) {
      evento.preventDefault();
      window.location.href = "login.html?volver=reservas.html";
    }
  });
}

// El link entre login y registro conserva a dónde hay que volver
const linkCuenta = document.getElementById("link-cuenta");

if (linkCuenta) {
  linkCuenta.href += window.location.search;
}

// Pinta en rojo los campos con error y muestra el mensaje
function mostrarError(form, mensaje, campos) {
  form.querySelectorAll(".campo").forEach(function (campo) {
    campo.classList.remove("campo-error");
  });
  campos.forEach(function (nombre) {
    form.elements[nombre].parentElement.classList.add("campo-error");
  });
  const error = form.querySelector(".mensaje-error");
  error.textContent = mensaje;
  error.hidden = false;
}

// ===== Login =====
const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const email = formLogin.elements.email.value.trim().toLowerCase();
    const password = formLogin.elements.password.value;

    const usuario = leerUsuarios().find(function (u) {
      return u.email === email;
    });

    if (!usuario || usuario.password !== password) {
      mostrarError(formLogin, "Correo o contraseña incorrectos.", ["email", "password"]);
      return;
    }

    iniciarSesion(usuario);
    window.location.href = paginaSiguiente();
  });
}

// ===== Registro =====
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = formRegistro.elements.nombre.value.trim();
    const email = formRegistro.elements.email.value.trim().toLowerCase();
    const password = formRegistro.elements.password.value;
    const confirmar = formRegistro.elements.confirmar.value;
    const usuarios = leerUsuarios();

    if (!nombre || !email || !password || !confirmar) {
      mostrarError(formRegistro, "Completá todos los campos.", []);
      return;
    }
    if (password.length < 6) {
      mostrarError(formRegistro, "La contraseña debe tener al menos 6 caracteres.", ["password"]);
      return;
    }
    if (password !== confirmar) {
      mostrarError(formRegistro, "Las contraseñas no coinciden.", ["password", "confirmar"]);
      return;
    }
    if (usuarios.some(function (u) { return u.email === email; })) {
      mostrarError(formRegistro, "Ya existe una cuenta con ese correo.", ["email"]);
      return;
    }

    const usuario = { nombre: nombre, email: email, password: password };
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    iniciarSesion(usuario);
    window.location.href = paginaSiguiente();
  });
}
