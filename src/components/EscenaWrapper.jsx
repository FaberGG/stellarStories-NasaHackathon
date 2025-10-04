import React from "react";
import "../styles/EscenaWrapper.css";

const EscenaWrapper = ({
  textoNarrador,
  children,
  mostrarTexto = true,
  fondoColor = "from-blue-50 to-blue-100",
  posicionTexto = "arriba-derecha", // Opciones: arriba-derecha, arriba-izquierda, arriba-centro, abajo-derecha, abajo-izquierda, abajo-centro, centro
}) => {
  return (
    <div className="escena-container">
      {/* Fondo con gradiente */}
      <div className={`escena-fondo bg-gradient-to-b ${fondoColor}`} />

      {/* Área de contenido interactivo */}
      <div className="escena-contenido">{children}</div>

      {/* Texto del narrador superpuesto */}
      {mostrarTexto && textoNarrador && (
        // <div className={`texto-narrador posicion-${posicionTexto}`}>
        //   {textoNarrador}
        // </div>
        // O con fondo opcional

        <div
          className={
            "texto-narrador posicion-centro-izquierda estilo-izquierda"
          }
        >
          {textoNarrador}
        </div>
      )}
    </div>
  );
};

export default EscenaWrapper;
