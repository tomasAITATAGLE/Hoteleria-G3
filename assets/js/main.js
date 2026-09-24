const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const closeButtons = document.querySelectorAll("[data-menu-close]");

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
}

menuButton?.addEventListener("click", () =>
  setMenu(!body.classList.contains("menu-open")),
);
closeButtons.forEach((button) =>
  button.addEventListener("click", () => setMenu(false)),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.hidden = true;
    image.parentElement?.classList.add("is-missing-image");
  });
});

const liveClock = document.querySelector("[data-live-clock]");

if (liveClock) {
  const clockHours = liveClock.querySelector("[data-clock-hours]");
  const clockMinutes = liveClock.querySelector("[data-clock-minutes]");
  const clockFormatter = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Cordoba",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const updateClock = () => {
    const now = new Date();
    const parts = clockFormatter.formatToParts(now);
    const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
    const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
    if (clockHours) clockHours.textContent = hour;
    if (clockMinutes) clockMinutes.textContent = minute;
    liveClock.setAttribute("datetime", now.toISOString());
    liveClock.setAttribute(
      "aria-label",
      `Hora actual en Córdoba: ${hour}:${minute}`,
    );
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

const bookingForm = document.querySelector("[data-booking-form]");

if (bookingForm) {
  const arrival = bookingForm.elements.llegada;
  const departure = bookingForm.elements.salida;
  const guests = bookingForm.elements.huespedes;
  const roomLinks = document.querySelectorAll("[data-room-link]");
  const toISODate = (date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
  };
  const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };
  const today = new Date();
  arrival.min = toISODate(today);
  arrival.value ||= toISODate(addDays(today, 7));

  const syncDeparture = () => {
    const minimumDeparture = addDays(new Date(`${arrival.value}T12:00:00`), 1);
    departure.min = toISODate(minimumDeparture);
    if (!departure.value || departure.value < departure.min) {
      departure.value = departure.min;
    }
  };

  const syncRoomLinks = () => {
    const query = new URLSearchParams({
      llegada: arrival.value,
      salida: departure.value,
      huespedes: guests.value,
    });
    roomLinks.forEach((link) => {
      const destination = new URL(
        link.getAttribute("href"),
        window.location.href,
      );
      destination.search = query.toString();
      link.href = destination.href;
    });
  };

  syncDeparture();
  syncRoomLinks();
  arrival.addEventListener("change", () => {
    syncDeparture();
    syncRoomLinks();
  });
  departure.addEventListener("change", syncRoomLinks);
  guests.addEventListener("change", syncRoomLinks);
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    syncRoomLinks();
    document.querySelector(".rooms")?.scrollIntoView({ behavior: "smooth" });
  });
}

const bookingSummary = document.querySelector("[data-booking-summary]");

if (bookingSummary) {
  const query = new URLSearchParams(window.location.search);
  const arrival = query.get("llegada");
  const departure = query.get("salida");
  const guests = Number(query.get("huespedes"));
  const dateFormatter = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  if (arrival && departure && guests) {
    const guestLabel = guests === 1 ? "1 huésped" : `${guests} huéspedes`;
    bookingSummary.textContent = `${dateFormatter.format(new Date(arrival))} – ${dateFormatter.format(new Date(departure))} · ${guestLabel}`;
  }
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".detail-carousel__slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  let currentSlide = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  carousel
    .querySelector("[data-carousel-prev]")
    ?.addEventListener("click", () => showSlide(currentSlide - 1));
  carousel
    .querySelector("[data-carousel-next]")
    ?.addEventListener("click", () => showSlide(currentSlide + 1));
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => showSlide(index)),
  );
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
    if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  });
  showSlide(0);
});

const AUTH_USERS_KEY = "lc_users";
const AUTH_SESSION_KEY = "lc_session";

function getUsers() {
  try {
    return JSON.parse(window.localStorage.getItem(AUTH_USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(window.localStorage.getItem(AUTH_SESSION_KEY));
  } catch {
    return null;
  }
}

function setSession(user) {
  window.localStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({ nombre: user.nombre, email: user.email }),
  );
}

function clearSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

function setFieldError(form, fieldName, hasError) {
  form
    .querySelector(`[data-login-field="${fieldName}"], [data-register-field="${fieldName}"]`)
    ?.classList.toggle("login-field--error", hasError);
}

function showFormError(errorElement, message) {
  if (!errorElement) return;
  errorElement.textContent = message;
  errorElement.hidden = !message;
}

function getRedirectDestination() {
  const target = new URLSearchParams(window.location.search).get("redirect");
  return target && /^[a-zA-Z0-9_-]+\.html$/.test(target) ? target : "lobby.html";
}

const authCrossLink = document.querySelector("[data-auth-cross-link]");

if (authCrossLink) {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  if (redirect) {
    const url = new URL(authCrossLink.getAttribute("href"), window.location.href);
    url.searchParams.set("redirect", redirect);
    authCrossLink.setAttribute("href", `${url.pathname}${url.search}`);
  }
}

document.querySelectorAll("[data-auth-link]").forEach((link) => {
  const session = getSession();
  if (session) {
    link.textContent = `Cerrar sesión (${session.nombre.split(" ")[0]})`;
    link.setAttribute("href", "#");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      clearSession();
      window.location.href = "lobby.html";
    });
  } else {
    link.textContent = "Iniciar sesión";
    link.setAttribute("href", "login.html");
  }
});

const loginForm = document.querySelector("[data-login-form]");

if (loginForm) {
  const errorElement = loginForm.querySelector("[data-login-error]");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.elements.email.value.trim().toLowerCase();
    const password = loginForm.elements.password.value;
    setFieldError(loginForm, "email", false);
    setFieldError(loginForm, "password", false);
    showFormError(errorElement, "");

    const user = getUsers().find((candidate) => candidate.email === email);
    if (!user || user.password !== password) {
      setFieldError(loginForm, "email", true);
      setFieldError(loginForm, "password", true);
      showFormError(errorElement, "Correo o contraseña incorrectos.");
      return;
    }

    setSession(user);
    window.location.href = getRedirectDestination();
  });
}

const registerForm = document.querySelector("[data-register-form]");

if (registerForm) {
  const errorElement = registerForm.querySelector("[data-register-error]");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = registerForm.elements.nombre.value.trim();
    const email = registerForm.elements.email.value.trim().toLowerCase();
    const password = registerForm.elements.password.value;
    const confirm = registerForm.elements.confirm.value;
    ["nombre", "email", "password", "confirm"].forEach((field) =>
      setFieldError(registerForm, field, false),
    );
    showFormError(errorElement, "");

    if (!nombre || !email || !password || !confirm) {
      showFormError(errorElement, "Completá todos los campos.");
      return;
    }
    if (password.length < 6) {
      setFieldError(registerForm, "password", true);
      showFormError(errorElement, "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setFieldError(registerForm, "password", true);
      setFieldError(registerForm, "confirm", true);
      showFormError(errorElement, "Las contraseñas no coinciden.");
      return;
    }
    if (getUsers().some((candidate) => candidate.email === email)) {
      setFieldError(registerForm, "email", true);
      showFormError(errorElement, "Ya existe una cuenta con ese correo.");
      return;
    }

    const user = { nombre, email, password };
    saveUsers([...getUsers(), user]);
    setSession(user);
    window.location.href = getRedirectDestination();
  });
}

if (body.classList.contains("intro-page")) {
  const destination = getSession() ? "lobby.html" : "login.html";
  const enterLink = document.querySelector(".intro__enter");
  enterLink?.setAttribute("href", destination);
  const timer = window.setTimeout(
    () => (window.location.href = destination),
    4200,
  );
  enterLink?.addEventListener("click", () => window.clearTimeout(timer));
}
