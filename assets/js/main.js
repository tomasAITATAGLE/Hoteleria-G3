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
