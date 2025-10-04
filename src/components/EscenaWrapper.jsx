import React from "react";

const EscenaWrapper = ({
  textoNarrador,
  children,
  mostrarTexto = true,
  fondoColor = "from-blue-50 to-blue-100",
}) => {
  return (
    <div className={`flex flex-col h-screen bg-gradient-to-b ${fondoColor}`}>
      {/* Sección de texto del narrador */}
      {mostrarTexto && (
        <div className="w-full bg-white/90 backdrop-blur-sm shadow-md p-4 md:p-6 border-b-4 border-blue-300 z-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-xl text-gray-800 leading-relaxed text-center font-serif">
              {textoNarrador}
            </p>
          </div>
        </div>
      )}

      {/* Sección de ilustración/escenario - Área interactiva */}
      <div className="flex-1 relative overflow-hidden">
        {/* Contenedor con aspect ratio preservado */}
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
          <div className="relative w-full h-full max-w-6xl max-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscenaWrapper;
