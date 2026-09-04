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

if (body.classList.contains("intro-page")) {
  const destination = "lobby.html";
  const timer = window.setTimeout(
    () => (window.location.href = destination),
    4200,
  );
  document
    .querySelector(".intro__enter")
    ?.addEventListener("click", () => window.clearTimeout(timer));
}
