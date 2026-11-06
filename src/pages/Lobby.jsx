import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Hora actual de Córdoba: { horas: "14", minutos: "05" }
function leerHora() {
  const hora = new Date().toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Cordoba",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const [horas, minutos] = hora.split(":");
  return { horas, minutos };
}

export default function Lobby() {
  const [hora, setHora] = useState(leerHora);

  useEffect(() => {
    document.title = "Las Condes — Bienvenida";
  }, []);

  // El reloj se actualiza cada segundo; el intervalo se limpia al salir de la página
  useEffect(() => {
    const intervalo = setInterval(() => setHora(leerHora()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="lobby-contenido aparecer">
      <p className="subtitulo subtitulo-claro">Hora en Las Condes Hotel & Golf Club</p>
      <p className="reloj">
        <span>{hora.horas}</span>
        <span className="reloj-separador">:</span>
        <span>{hora.minutos}</span>
      </p>
      <Link className="lobby-boton" to="/reservas">
        Reservá tu estadía
      </Link>
    </main>
  );
}
