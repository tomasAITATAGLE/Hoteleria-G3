import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Carrusel from "../components/Carrusel.jsx";
import habitaciones, { formatoPrecio } from "../data/habitaciones.js";
import { leerReserva, textoResumen } from "../data/reserva.js";

export default function HabitacionDetalle() {
  const { id } = useParams();
  const habitacion = habitaciones.find((h) => h.id === id);

  useEffect(() => {
    document.title = (habitacion ? habitacion.nombre : "Habitación no encontrada") + " — Las Condes";
  }, [habitacion]);

  if (!habitacion) {
    return (
      <main>
        <article className="detalle contenedor aparecer">
          <h1>Habitación no encontrada</h1>
          <p className="detalle-texto">La habitación que buscás no existe.</p>
          <Link className="boton boton-oscuro" to="/reservas">
            Ver habitaciones
          </Link>
        </article>
      </main>
    );
  }

  // Fechas elegidas en /reservas (si todavía no eligió, se muestra el texto por defecto)
  const reserva = leerReserva();
  const resumen = reserva ? textoResumen(reserva) : "Seleccioná las fechas de tu estadía";

  return (
    <main>
      <Carrusel key={habitacion.id} fotos={habitacion.imagenes} />

      <article className="detalle contenedor aparecer">
        <nav className="ruta">
          <Link to="/lobby">Inicio</Link>
          <span>›</span>
          <Link to="/reservas">Habitaciones y Suites</Link>
          <span>›</span>
          <strong>{habitacion.nombreCorto}</strong>
        </nav>
        <div className="detalle-cabecera">
          <div>
            <p className="subtitulo subtitulo-dorado">{habitacion.subtitulo}</p>
            <h1>{habitacion.nombre}</h1>
            <p>
              {habitacion.metros} m² · {habitacion.cama} · Hasta {habitacion.maxHuespedes} huéspedes
            </p>
          </div>
          <div className="precio">
            <strong>{formatoPrecio(habitacion.precio)}</strong>
            <small>por noche</small>
            <small id="resumen-reserva">{resumen}</small>
            <Link className="boton boton-oscuro" to="/reservas">
              Seleccionar
            </Link>
          </div>
        </div>
        <p className="detalle-texto">{habitacion.descripcion}</p>
        <ul className="detalle-servicios">
          {habitacion.servicios.map((servicio) => (
            <li key={servicio}>{servicio}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
