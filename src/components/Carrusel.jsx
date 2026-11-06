import { useState } from "react";

// fotos: [{ src, alt }]
export default function Carrusel({ fotos }) {
  const [fotoActual, setFotoActual] = useState(0);

  // Avanza o retrocede; si se pasa del final vuelve a la primera, y al revés
  function mover(paso) {
    setFotoActual((actual) => (actual + paso + fotos.length) % fotos.length);
  }

  function alTeclear(evento) {
    if (evento.key === "ArrowLeft") mover(-1);
    if (evento.key === "ArrowRight") mover(1);
  }

  return (
    <section className="carrusel" onKeyDown={alTeclear}>
      {fotos.map((foto, i) => (
        <figure key={foto.src} className={i === fotoActual ? "carrusel-foto activa" : "carrusel-foto"}>
          <img src={foto.src} alt={foto.alt} />
        </figure>
      ))}
      <button
        className="flecha flecha-anterior"
        type="button"
        aria-label="Imagen anterior"
        onClick={() => mover(-1)}
      >
        ‹
      </button>
      <button
        className="flecha flecha-siguiente"
        type="button"
        aria-label="Imagen siguiente"
        onClick={() => mover(1)}
      >
        ›
      </button>
      <div className="puntos">
        {fotos.map((foto, i) => (
          <button
            key={foto.src}
            className={i === fotoActual ? "activa" : undefined}
            type="button"
            aria-label={"Ver imagen " + (i + 1)}
            onClick={() => setFotoActual(i)}
          ></button>
        ))}
      </div>
    </section>
  );
}
