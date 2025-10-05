import React, { useEffect } from "react";
import { HistoriaProvider, useHistoria } from "./context/HistoriaContext";
import BotonFlecha from "./components/BotonFlecha";
import useSwipe from "./hooks/useSwipe";

// Importar todas las escenas
import Escena1ElPueblo from "./escenas/Escena1ElPueblo";
import Escena2LaEscuela from "./escenas/Escena2LaEscuela";
import Escena3CasaJavier from "./escenas/Escena3CasaJavier";
import MinijuegoMochila from "./escenas/MinijuegoMochila";
import Escena4CasaMonica from "./escenas/Escena4CasaMonica";
import Escena5ElSol from "./escenas/Escena5ElSol";
import Escena6ElApagon from "./escenas/Escena6ElApagon";
import Escena7LasAuroras from "./escenas/Escena7LasAuroras";
import Escena8CasaJavierDia from "./escenas/Escena8CasaJavierDia";
import EscenaTemplate from "./escenas/EscenaPlantillaBase";

const escenas = [
  Escena1ElPueblo,
  Escena2LaEscuela,
  Escena3CasaJavier,
  MinijuegoMochila,
  Escena4CasaMonica,
  Escena5ElSol,
  Escena6ElApagon,
  Escena7LasAuroras,
  Escena8CasaJavierDia,
];

const ContenidoApp = () => {
  const {
    escenaActual,
    siguiente,
    anterior,
    puedeAvanzar,
    puedeRetroceder,
    totalEscenas,
  } = useHistoria();

  // Hook para gestos táctiles
  useSwipe(siguiente, anterior);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && puedeAvanzar) {
        siguiente();
      } else if (e.key === "ArrowLeft" && puedeRetroceder) {
        anterior();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [siguiente, anterior, puedeAvanzar, puedeRetroceder]);

  const EscenaActual = escenas[escenaActual];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Indicador de página */}
      <div className="absolute top-4 right-4 z-50 bg-white px-4 py-2 rounded-full shadow-lg">
        <span className="text-sm font-semibold text-gray-700">
          {escenaActual + 1} / {totalEscenas}
        </span>
      </div>

      {/* Botones de navegación */}
      <BotonFlecha
        direccion="izquierda"
        onClick={anterior}
        disabled={!puedeRetroceder}
      />
      <BotonFlecha
        direccion="derecha"
        onClick={siguiente}
        disabled={!puedeAvanzar}
      />

      {/* Renderizar escena actual */}
      <div className="w-full h-full">
        <EscenaActual />
      </div>
    </div>
  );
};

function App() {
  return (
    <HistoriaProvider>
      <ContenidoApp />
    </HistoriaProvider>
  );
}

export default App;
