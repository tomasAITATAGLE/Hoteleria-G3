// Fechas de la reserva elegidas en /reservas. Se guardan en localStorage ("reserva")
// para que el detalle de la habitación las lea: { llegada: "2026-10-16", salida: "2026-10-18", huespedes: "2" }

// Date -> "2026-10-16" (el formato que usan los input date)
export function formatoInput(fecha) {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  return fecha.getFullYear() + "-" + mes + "-" + dia;
}

// "2026-10-16" -> "16/10/2026"
export function formatoPantalla(texto) {
  return texto.split("-").reverse().join("/");
}

export function sumarDias(fecha, dias) {
  const nueva = new Date(fecha);
  nueva.setDate(nueva.getDate() + dias);
  return nueva;
}

// "2026-10-16" -> "2026-10-17"
export function diaSiguiente(texto) {
  return formatoInput(sumarDias(new Date(texto + "T12:00"), 1));
}

// "16/10/2026 – 18/10/2026 · 2 huéspedes"
export function textoResumen({ llegada, salida, huespedes }) {
  const textoHuespedes = huespedes === "1" ? "1 huésped" : huespedes + " huéspedes";
  return formatoPantalla(llegada) + " – " + formatoPantalla(salida) + " · " + textoHuespedes;
}

export function guardarReserva(reserva) {
  localStorage.setItem("reserva", JSON.stringify(reserva));
}

export function leerReserva() {
  try {
    return JSON.parse(localStorage.getItem("reserva"));
  } catch {
    return null;
  }
}
