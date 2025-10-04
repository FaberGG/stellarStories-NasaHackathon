import React, { useState, useEffect } from "react";

/**
 * Componente base para escenas interactivas
 * Maneja el estado común de interacciones, animaciones y progreso
 */
const EscenaBase = ({ children, onInteraccionCompletada }) => {
  const [interacciones, setInteracciones] = useState({});
  const [animacionesReproducidas, setAnimacionesReproducidas] = useState([]);
  const [escenaActiva, setEscenaActiva] = useState(false);

  // Activar escena al montarse (útil para animaciones de entrada)
  useEffect(() => {
    setEscenaActiva(true);
    return () => setEscenaActiva(false);
  }, []);

  // Registrar una interacción completada
  const registrarInteraccion = (id, datos = {}) => {
    setInteracciones((prev) => ({
      ...prev,
      [id]: { completada: true, timestamp: Date.now(), ...datos },
    }));

    if (onInteraccionCompletada) {
      onInteraccionCompletada(id, datos);
    }
  };

  // Marcar animación como reproducida
  const marcarAnimacion = (id) => {
    setAnimacionesReproducidas((prev) => [...new Set([...prev, id])]);
  };

  // Verificar si interacción está completada
  const interaccionCompletada = (id) => {
    return interacciones[id]?.completada || false;
  };

  // Verificar si animación ya se reprodujo
  const animacionReproducida = (id) => {
    return animacionesReproducidas.includes(id);
  };

  // Obtener progreso total (útil para desbloquear navegación)
  const calcularProgreso = (interaccionesRequeridas = []) => {
    if (interaccionesRequeridas.length === 0) return 100;

    const completadas = interaccionesRequeridas.filter((id) =>
      interaccionCompletada(id)
    ).length;

    return (completadas / interaccionesRequeridas.length) * 100;
  };

  const contextValue = {
    escenaActiva,
    interacciones,
    registrarInteraccion,
    interaccionCompletada,
    marcarAnimacion,
    animacionReproducida,
    calcularProgreso,
  };

  return (
    <EscenaContext.Provider value={contextValue}>
      {children}
    </EscenaContext.Provider>
  );
};

// Context para compartir estado dentro de cada escena
const EscenaContext = React.createContext(null);

export const useEscena = () => {
  const context = React.useContext(EscenaContext);
  if (!context) {
    throw new Error("useEscena debe usarse dentro de EscenaBase");
  }
  return context;
};

export default EscenaBase;
