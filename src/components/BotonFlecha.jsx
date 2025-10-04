import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BotonFlecha = ({ direccion, onClick, disabled }) => {
  const esIzquierda = direccion === "izquierda";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        fixed top-1/2 transform -translate-y-1/2 z-50
        ${esIzquierda ? "left-4" : "right-4"}
        bg-blue-500 hover:bg-blue-600 
        text-white rounded-full p-3 shadow-lg
        transition-all duration-300
        disabled:opacity-30 disabled:cursor-not-allowed
        hover:scale-110 active:scale-95
      `}
      aria-label={esIzquierda ? "Página anterior" : "Página siguiente"}
    >
      {esIzquierda ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
    </button>
  );
};

export default BotonFlecha;
