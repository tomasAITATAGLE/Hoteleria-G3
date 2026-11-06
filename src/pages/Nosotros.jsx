import { useEffect } from "react";

const servicios = [
  "Campo de golf de 18 hoyos",
  "Spa y circuito de aguas",
  "Pileta climatizada",
  "Restaurant gourmet",
  "Salón de eventos",
];

function Titulo({ children }) {
  return (
    <div className="titulo-seccion">
      <span></span>
      <p>{children}</p>
      <span></span>
    </div>
  );
}

function Adorno() {
  return (
    <div className="adorno">
      <span></span>
      <i></i>
      <span></span>
    </div>
  );
}

export default function Nosotros() {
  useEffect(() => {
    document.title = "Sobre nosotros — Las Condes";
  }, []);

  return (
    <main className="nosotros contenedor aparecer">
      <Titulo>Sobre nosotros</Titulo>
      <figure className="nosotros-imagen">
        <img
          src="/images/hotel-aerial.png"
          alt="Vista aérea de Las Condes Hotel & Golf Club"
        />
      </figure>
      <p className="nosotros-intro">
        Ubicado en el corazón del valle de Ascochinga, Las Condes Hotel & Golf
        Club es un refugio donde la sofisticación se encuentra con la
        naturaleza.
      </p>

      <Adorno />
      <p className="nosotros-texto">
        Nos enamoramos del silencio y la energía de Ascochinga, y decidimos
        forjar un refugio para compartir esa paz.
      </p>

      <Adorno />
      <Titulo>Nuestra historia</Titulo>
      <p className="nosotros-texto">
        Todo comenzó en 1998, cuando una familia cordobesa decidió transformar
        un antiguo casco de estancia en el valle de Ascochinga en un refugio
        para compartir su amor por las sierras. Con los años, aquella posada de
        campo fue creciendo hasta convertirse en el hotel y club de golf que es
        hoy, sin perder nunca el espíritu hospitalario que le dio origen.
      </p>

      <Adorno />
      <Titulo>Instalaciones y servicios</Titulo>
      <ul className="nosotros-servicios">
        {servicios.map((servicio) => (
          <li key={servicio}>{servicio}</li>
        ))}
      </ul>

      <Adorno />
      <Titulo>Cómo llegar</Titulo>
      <p className="nosotros-texto">
        Nos encontramos en el valle de Ascochinga, a 50 km de la ciudad de
        Córdoba capital, con fácil acceso por la Ruta Provincial E-66. A solo
        una hora de viaje, el paisaje serrano reemplaza al asfalto y da la
        bienvenida a Las Condes.
      </p>
    </main>
  );
}
