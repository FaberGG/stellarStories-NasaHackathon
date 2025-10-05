import React, { createContext, useContext, useState } from "react";

const HistoriaContext = createContext();

export const useHistoria = () => {
  const context = useContext(HistoriaContext);
  if (!context) {
    throw new Error("useHistoria debe usarse dentro de HistoriaProvider");
  }
  return context;
};

export const HistoriaProvider = ({ children }) => {
  const [escenaActual, setEscenaActual] = useState(0);
  const totalEscenas = 8; // Actualizar según el número total de escenas

  const siguiente = () => {
    if (escenaActual < totalEscenas - 1) {
      setEscenaActual((prev) => prev + 1);
    }
  };

  const anterior = () => {
    if (escenaActual > 0) {
      setEscenaActual((prev) => prev - 1);
    }
  };

  const irAEscena = (numero) => {
    if (numero >= 0 && numero < totalEscenas) {
      setEscenaActual(numero);
    }
  };

  return (
    <HistoriaContext.Provider
      value={{
        escenaActual,
        totalEscenas,
        siguiente,
        anterior,
        irAEscena,
        puedeAvanzar: escenaActual < totalEscenas - 1,
        puedeRetroceder: escenaActual > 0,
      }}
    >
      {children}
    </HistoriaContext.Provider>
  );
};
