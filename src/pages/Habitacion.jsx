import { useParams } from "react-router-dom";

export default function Habitacion() {
  const { id } = useParams();

  return <h1>Habitación: {id}</h1>;
}
