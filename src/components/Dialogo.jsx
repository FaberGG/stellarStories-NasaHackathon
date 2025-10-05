import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Dialogo.css";

/**
 * Componente para mostrar diálogos de personajes
 * Con animación de escritura palabra por palabra
 */
const Dialogo = ({
  texto,
  personaje = "Narrador",
  posicion = "centro",
  posicionCustom = { x: 50, y: 50 },
  visible = true,
  duracion = 10000,
  onCerrar,
  tipo = "dialogo",
  color = "bg-white",
  animarTexto = false,
  velocidadEscritura = 50, // ms por palabra
}) => {
  const [mostrar, setMostrar] = useState(visible);
  const [textoMostrado, setTextoMostrado] = useState("");
  const [animacionCompleta, setAnimacionCompleta] = useState(!animarTexto);

  useEffect(() => {
    setMostrar(visible);
  }, [visible]);

  // Animación de escritura palabra por palabra
  useEffect(() => {
    if (!animarTexto || !mostrar) {
      setTextoMostrado(texto);
      setAnimacionCompleta(true);
      return;
    }

    setTextoMostrado("");
    setAnimacionCompleta(false);

    const palabras = texto.split(" ");
    let indice = 0;

    const intervalo = setInterval(() => {
      if (indice < palabras.length) {
        const palabraActual = palabras[indice];

        setTextoMostrado((prev) => prev + (prev ? " " : "") + palabraActual);
        indice++;

        // Verificar si terminamos después de incrementar
        if (indice >= palabras.length) {
          clearInterval(intervalo);
          // Usar setTimeout para evitar que el setState dispare el useEffect inmediatamente
          setTimeout(() => setAnimacionCompleta(true), 0);
        }
      }
    }, velocidadEscritura);

    return () => {
      clearInterval(intervalo);
    };
  }, [texto, animarTexto, velocidadEscritura, mostrar]);

  // Auto-cerrar después de completar animación
  useEffect(() => {
    if (duracion > 0 && mostrar && animacionCompleta) {
      const timer = setTimeout(() => {
        setMostrar(false);
        if (onCerrar) onCerrar();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [duracion, mostrar, onCerrar, animacionCompleta]);

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

  const obtenerClaseTipo = () => {
    switch (tipo) {
      case "pensamiento":
        return "dialogo-pensamiento";
      case "narrador":
        return "dialogo-narrador";
      default:
        return "";
    }
  };

  const Cola = () => {
    if (tipo === "pensamiento") {
      return (
        <div className="dialogo-cola-pensamiento">
          <div className="burbuja"></div>
          <div className="burbuja"></div>
          <div className="burbuja"></div>
        </div>
      );
    }

    return (
      <div className="dialogo-cola">
        <div></div>
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
          className="dialogo-container"
          style={obtenerPosicion()}
        >
          <div className={`dialogo-burbuja ${obtenerClaseTipo()}`}>
            {personaje !== "Narrador" && (
              <div className="dialogo-personaje">{personaje}</div>
            )}

            <p className="dialogo-texto">
              {textoMostrado}
              {animarTexto && !animacionCompleta && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="dialogo-cursor"
                >
                  |
                </motion.span>
              )}
            </p>

            {tipo !== "narrador" && <Cola />}

            {onCerrar && animacionCompleta && (
              <button
                onClick={() => {
                  setMostrar(false);
                  onCerrar();
                }}
                className="dialogo-cerrar"
              >
                ×
              </button>
            )}

            {/* Botón para saltar animación */}
            {animarTexto && !animacionCompleta && (
              <button
                onClick={() => {
                  setTextoMostrado(texto);
                  setAnimacionCompleta(true);
                }}
                className="dialogo-saltar"
              >
                ⏭
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
      }, 300);
    } else {
      if (onCompletar) onCompletar();
    }
  };

  if (!dialogoActual) return null;

  return (
    <>
      <Dialogo {...dialogoActual} visible={mostrarActual} onCerrar={avanzar} />

      {dialogos.length > 1 && (
        <div className="dialogo-indicadores">
          {dialogos.map((_, idx) => (
            <div
              key={idx}
              className={`dialogo-indicador-punto ${
                idx === indiceActual ? "activo" : ""
              }`}
            />
          ))}
        </div>
      )}

      <button onClick={avanzar} className="dialogo-boton-siguiente">
        {indiceActual < dialogos.length - 1 ? "Siguiente →" : "Continuar"}
      </button>
    </>
  );
};

export default Dialogo;
