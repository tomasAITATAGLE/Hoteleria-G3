// Datos de las 3 habitaciones. Los usan Reservas (tarjetas) y el detalle /habitacion/:id.
// La primera imagen es la de la tarjeta; todas juntas son las del carrusel.
const habitaciones = [
  {
    id: "suite-fairway",
    nombre: "Suite Fairway",
    nombreCorto: "Suite Fairway",
    subtitulo: "Vista al green",
    vista: "Vista al green",
    metros: 45,
    cama: "Cama king",
    maxHuespedes: 2,
    precio: 185000,
    descripcion:
      "Diseñada para vivir el paisaje desde el interior, la Suite Fairway combina madera de nogal, piedra cordobesa y textiles en tonos marfil. Sus ventanales de piso a techo enmarcan el campo de golf y las sierras, mientras el estar privado crea un refugio sereno para descansar al final del día.",
    servicios: [
      "Vista directa al green",
      "Desayuno incluido",
      "Balcón privado",
      "Baño de piedra con ducha de lluvia",
    ],
    altTarjeta: "Suite Fairway con vista al campo de golf",
    imagenes: [
      { src: "/images/room-suite-fairway.png", alt: "Dormitorio de Suite Fairway con vista al campo de golf" },
      { src: "/images/room-suite-fairway-lounge.png", alt: "Estar privado y balcón de Suite Fairway" },
      { src: "/images/room-suite-fairway-bath.png", alt: "Baño de piedra de Suite Fairway" },
    ],
  },
  {
    id: "sierra-deluxe",
    nombre: "Habitación Sierra Deluxe",
    nombreCorto: "Sierra Deluxe",
    subtitulo: "Refugio serrano",
    vista: "Vista a las sierras",
    metros: 32,
    cama: "Cama king",
    maxHuespedes: 2,
    precio: 132000,
    descripcion:
      "Un refugio íntimo y luminoso que celebra la serenidad de las sierras. La madera oscura, la piedra local y los textiles naturales acompañan una vista privilegiada, con todo lo necesario para una estadía tranquila y sofisticada.",
    servicios: ["Vista a las Sierras de Córdoba", "Desayuno incluido", "Sillón de lectura", "Ducha de lluvia"],
    altTarjeta: "Habitación Sierra Deluxe con vista a las sierras",
    imagenes: [
      { src: "/images/room-sierra-deluxe.png", alt: "Dormitorio Sierra Deluxe con vista a las sierras" },
      { src: "/images/room-sierra-deluxe-nook.png", alt: "Rincón de lectura de Habitación Sierra Deluxe" },
      { src: "/images/room-sierra-deluxe-bath.png", alt: "Baño de Habitación Sierra Deluxe" },
    ],
  },
  {
    id: "presidencial",
    nombre: "Suite Presidencial LC",
    nombreCorto: "Suite Presidencial LC",
    subtitulo: "La máxima expresión de Las Condes",
    vista: "Vista panorámica",
    metros: 78,
    cama: "Cama king",
    maxHuespedes: 4,
    precio: 310000,
    descripcion:
      "La suite más distinguida del hotel reúne dormitorio, salón privado y hogar de piedra frente a una vista panorámica del golf y las sierras. Materiales nobles, amplitud y servicio personalizado definen una experiencia reservada para ocasiones excepcionales.",
    servicios: [
      "Salón privado con hogar a leña",
      "Desayuno y minibar incluidos",
      "Terraza panorámica",
      "Servicio de mayordomo",
    ],
    altTarjeta: "Suite Presidencial LC con salón y hogar a leña",
    imagenes: [
      { src: "/images/room-presidential-lc.png", alt: "Dormitorio de Suite Presidencial LC" },
      { src: "/images/room-presidential-lounge.png", alt: "Salón privado con hogar de Suite Presidencial LC" },
      { src: "/images/room-presidential-bath.png", alt: "Baño principal de Suite Presidencial LC" },
    ],
  },
];

export default habitaciones;

// 185000 -> "$185.000"
export function formatoPrecio(precio) {
  return "$" + precio.toLocaleString("es-AR");
}
