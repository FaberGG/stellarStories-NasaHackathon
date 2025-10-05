import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/BotonDialogo.css";

/**
 * Componente reutilizable: Botón flotante para activar diálogos
 *
 * @param {boolean} visible - Si el botón está visible
 * @param {function} onClick - Función a ejecutar al hacer clic
 * @param {object} posicion - Posición del botón { top, right, bottom, left }
 * @param {string} icono - Emoji o texto del botón (default: 💬)
 * @param {string} color - Color del gradiente: 'verde', 'azul', 'morado', 'naranja'
 * @param {string} tamaño - Tamaño: 'pequeño', 'mediano', 'grande'
 * @param {string} clase - Clase CSS adicional personalizada
 */
const BotonDialogo = ({
  visible = true,
  onClick,
  posicion = { right: "32%", top: "15%" },
  icono = "💬",
  color = "verde",
  tamaño = "azul",
  clase = "",
}) => {
  // Colores disponibles
  const colores = {
    verde: "boton-dialogo-verde",
    azul: "boton-dialogo-azul",
    morado: "boton-dialogo-morado",
    naranja: "boton-dialogo-naranja",
    amarillo: "boton-dialogo-amarillo",
  };

  // Tamaños disponibles
  const tamaños = {
    pequeño: "boton-dialogo-pequeño",
    mediano: "boton-dialogo-mediano",
    grande: "boton-dialogo-grande",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.15, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={`boton-dialogo ${colores[color] || colores.verde} ${
            tamaños[tamaño] || tamaños.mediano
          } ${clase}`}
          style={posicion}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {icono}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BotonDialogo;
