import { useEffect, useState } from "react";
import TarjetaHabitacion from "../components/TarjetaHabitacion.jsx";
import habitaciones from "../data/habitaciones.js";
import {
  diaSiguiente,
  formatoInput,
  formatoPantalla,
  guardarReserva,
  sumarDias,
  textoResumen,
} from "../data/reserva.js";

const hoy = formatoInput(new Date());

// Por defecto la llegada es dentro de una semana y la salida al día siguiente
function reservaInicial() {
  const llegada = formatoInput(sumarDias(new Date(), 7));
  return { llegada, salida: diaSiguiente(llegada), huespedes: "1" };
}

export default function Reservas() {
  const [reserva, setReserva] = useState(reservaInicial);
  const salidaMinima = diaSiguiente(reserva.llegada);

  useEffect(() => {
    document.title = "Habitaciones & Suites — Las Condes";
  }, []);

  // El detalle de la habitación lee estas fechas
  useEffect(() => {
    guardarReserva(reserva);
  }, [reserva]);

  function cambiarLlegada(evento) {
    const llegada = evento.target.value;
    if (!llegada) return;
    // La salida tiene que ser al menos un día después de la llegada
    const minima = diaSiguiente(llegada);
    setReserva((actual) => ({
      ...actual,
      llegada,
      salida: actual.salida < minima ? minima : actual.salida,
    }));
  }

  function cambiarSalida(evento) {
    const salida = evento.target.value;
    if (!salida) return;
    setReserva((actual) => ({ ...actual, salida: salida < salidaMinima ? salidaMinima : salida }));
  }

  function buscar(evento) {
    evento.preventDefault();
    document.getElementById("habitaciones").scrollIntoView({ behavior: "smooth" });
  }

  const resumen = textoResumen(reserva);

  return (
    <main>
      <section className="reserva-cabecera">
        <h1>Reserva tu estadía</h1>
        <form className="barra-reserva" onSubmit={buscar}>
          <label>
            <span>Llegada</span>
            <span className="campo-fecha">
              <input type="date" name="llegada" required min={hoy} value={reserva.llegada} onChange={cambiarLlegada} />
              <span className="fecha-texto">{formatoPantalla(reserva.llegada)}</span>
            </span>
          </label>
          <label>
            <span>Salida</span>
            <span className="campo-fecha">
              <input
                type="date"
                name="salida"
                required
                min={salidaMinima}
                value={reserva.salida}
                onChange={cambiarSalida}
              />
              <span className="fecha-texto">{formatoPantalla(reserva.salida)}</span>
            </span>
          </label>
          <label>
            <span>Huéspedes</span>
            <select
              name="huespedes"
              value={reserva.huespedes}
              onChange={(evento) => setReserva({ ...reserva, huespedes: evento.target.value })}
            >
              <option value="1">1 adulto</option>
              <option value="2">2 adultos</option>
              <option value="3">3 huéspedes</option>
              <option value="4">4 huéspedes</option>
            </select>
          </label>
          <button type="submit">Buscar</button>
        </form>
      </section>

      <section className="habitaciones contenedor" id="habitaciones">
        {habitaciones.map((habitacion) => (
          <TarjetaHabitacion key={habitacion.id} habitacion={habitacion} resumen={resumen} />
        ))}
      </section>
    </main>
  );
}
