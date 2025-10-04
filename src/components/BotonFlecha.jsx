import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/BotonFlecha.css";

const BotonFlecha = ({ direccion, onClick, disabled }) => {
  const esIzquierda = direccion === "izquierda";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`boton-flecha ${esIzquierda ? "izquierda" : "derecha"}`}
      aria-label={esIzquierda ? "Página anterior" : "Página siguiente"}
    >
      {esIzquierda ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};

export default BotonFlecha;
