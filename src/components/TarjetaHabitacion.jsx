import { Link } from "react-router-dom";
import { formatoPrecio } from "../data/habitaciones.js";

export default function TarjetaHabitacion({ habitacion, resumen }) {
  return (
    <Link className="tarjeta" to={"/habitacion/" + habitacion.id}>
      <figure>
        <img src={habitacion.imagenes[0].src} alt={habitacion.altTarjeta} />
      </figure>
      <div>
        <h2>{habitacion.nombre}</h2>
        <p>
          {habitacion.vista} · {habitacion.metros} m²
        </p>
        <strong>
          {formatoPrecio(habitacion.precio)} <span>/ noche</span>
        </strong>
        {resumen && <small>{resumen}</small>}
      </div>
    </Link>
  );
}
