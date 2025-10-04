import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Dialogo.css";
/**
 * Componente para mostrar diálogos de personajes
 * Tipo burbuja de cómic con animación
 */
const Dialogo = ({
  texto,
  personaje = "Narrador",
  posicion = "centro", // 'izquierda', 'centro', 'derecha', 'custom'
  posicionCustom = { x: 50, y: 50 }, // % para posición absoluta
  visible = true,
  duracion = 10000, // ms antes de auto-ocultar (0 = no auto-ocultar)
  onCerrar,
  tipo = "dialogo", // 'dialogo', 'pensamiento', 'narrador'
  color = "bg-white",
}) => {
  const [mostrar, setMostrar] = useState(visible);

  useEffect(() => {
    setMostrar(visible);
  }, [visible]);

  useEffect(() => {
    if (duracion > 0 && mostrar) {
      const timer = setTimeout(() => {
        setMostrar(false);
        if (onCerrar) onCerrar();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [duracion, mostrar, onCerrar]);

  // Calcular posición según prop
  const obtenerPosicion = () => {
    switch (posicion) {
      case "izquierda":
        return { left: "10%", top: "20%" };
      case "derecha":
        return { right: "10%", top: "20%" };
      case "centro":
        return { left: "50%", top: "15%", transform: "translateX(-50%)" };
      case "custom":
        return { left: `${posicionCustom.x}%`, top: `${posicionCustom.y}%` };
      default:
        return { left: "50%", top: "15%", transform: "translateX(-50%)" };
    }
  };

  // Estilos según tipo de diálogo
  const obtenerEstiloTipo = () => {
    switch (tipo) {
      case "pensamiento":
        return "rounded-full border-4 border-dashed";
      case "narrador":
        return "rounded-lg border-2 border-blue-400";
      default:
        return "rounded-2xl";
    }
  };

  // Cola del diálogo (triangulito)
  const Cola = () => {
    if (tipo === "pensamiento") {
      return (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-300"></div>
          <div className="w-2 h-2 bg-white rounded-full border-2 border-gray-300"></div>
          <div className="w-1 h-1 bg-white rounded-full border border-gray-300"></div>
        </div>
      );
    }

    return (
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <div
          className={`w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] ${
            color === "bg-white" ? "border-t-white" : "border-t-yellow-100"
          }`}
        ></div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute z-50"
          style={obtenerPosicion()}
        >
          <div
            className={`${color} ${obtenerEstiloTipo()} shadow-2xl p-4 max-w-md relative`}
          >
            {/* Nombre del personaje */}
            {personaje !== "Narrador" && (
              <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">
                {personaje}
              </div>
            )}

            {/* Texto del diálogo */}
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              {texto}
            </p>

            {/* Cola del diálogo */}
            {tipo !== "narrador" && <Cola />}

            {/* Botón cerrar (opcional) */}
            {onCerrar && (
              <button
                onClick={() => {
                  setMostrar(false);
                  onCerrar();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Componente para secuencia de diálogos
 * Muestra múltiples diálogos uno tras otro
 */
export const SecuenciaDialogos = ({ dialogos = [], onCompletar }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [mostrarActual, setMostrarActual] = useState(true);

  const dialogoActual = dialogos[indiceActual];

  const avanzar = () => {
    if (indiceActual < dialogos.length - 1) {
      setMostrarActual(false);
      setTimeout(() => {
        setIndiceActual((prev) => prev + 1);
        setMostrarActual(true);
      }, 300); // Tiempo para animación de salida
    } else {
      if (onCompletar) onCompletar();
    }
  };

  if (!dialogoActual) return null;

  return (
    <>
      <Dialogo {...dialogoActual} visible={mostrarActual} onCerrar={avanzar} />

      {/* Indicador de progreso */}
      {dialogos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
          {dialogos.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === indiceActual ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Botón para avanzar */}
      <button
        onClick={avanzar}
        className="absolute bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        {indiceActual < dialogos.length - 1 ? "Siguiente →" : "Continuar"}
      </button>
    </>
  );
};

/**
 * Ejemplo de uso:
 *
 * <Dialogo
 *   texto="¡Debemos prepararnos para la tormenta solar!"
 *   personaje="Javier"
 *   posicion="izquierda"
 *   tipo="dialogo"
 * />
 *
 * O con secuencia:
 *
 * <SecuenciaDialogos
 *   dialogos={[
 *     { texto: "Hola clase...", personaje: "Profesora", posicion: "centro" },
 *     { texto: "¿Qué es eso?", personaje: "Mónica", posicion: "derecha" },
 *     { texto: "Una tormenta solar", personaje: "Profesora", posicion: "centro" }
 *   ]}
 *   onCompletar={() => console.log('Secuencia completada')}
 * />
 */

export default Dialogo;
