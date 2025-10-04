import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";
//importo la imagen de fondo
import fondoEscuela from "../assets/img/escena1/fondo.png";

/**
 * ESCENA 1 - El pueblo en el Cauca
 * Javier (capibara) y Mónica (osa de anteojos) juegan en el patio de la escuela
 * Interacción: Click en personajes para que saluden
 */

const ContenidoEscena1 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [personajeActivo, setPersonajeActivo] = useState(null);

  const handleClickPersonaje = (personaje) => {
    if (!interaccionCompletada(`saludo-${personaje}`)) {
      registrarInteraccion(`saludo-${personaje}`);
      setPersonajeActivo(personaje);

      // Resetear después de la animación
      setTimeout(() => {
        setPersonajeActivo(null);
      }, 2000);
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Patio de la escuela en el Cauca */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-green-200">
        {/* Placeholder para la imagen de fondo */}
        <img
          src={fondoEscuela}
          alt="Patio de la escuela"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Fondo: Patio de la escuela en el Cauca]
        </div>
      </div>

      {/* PERSONAJE: Javier (Capibara) - Izquierda */}
      <motion.div
        className="absolute left-[20%] bottom-[15%] cursor-pointer"
        style={{ zIndex: 10 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleClickPersonaje("javier")}
        animate={
          personajeActivo === "javier"
            ? { y: [0, -20, 0], rotate: [0, 5, -5, 0] }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        {/* <img src="/assets/img/escena1/javier-capibara.png" alt="Javier" className="w-32 h-40" /> */}
        <div className="w-32 h-40 bg-orange-300 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg">
          <div className="text-3xl mb-2">🦫</div>
          <div className="text-xs">Javier</div>
        </div>

        {/* Indicador de click */}
        {!interaccionCompletada("saludo-javier") && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👆 ¡Haz click!
          </motion.div>
        )}
      </motion.div>

      {/* PERSONAJE: Mónica (Osa de anteojos) - Derecha */}
      <motion.div
        className="absolute right-[20%] bottom-[15%] cursor-pointer"
        style={{ zIndex: 10 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleClickPersonaje("monica")}
        animate={
          personajeActivo === "monica"
            ? { y: [0, -20, 0], rotate: [0, -5, 5, 0] }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        {/* <img src="/assets/img/escena1/monica-osa.png" alt="Mónica" className="w-32 h-40" /> */}
        <div
          className="w-32 h-40 bg-brown-400 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg"
          style={{ backgroundColor: "#8B4513" }}
        >
          <div className="text-3xl mb-2">🐻</div>
          <div className="text-xs">Mónica</div>
        </div>

        {!interaccionCompletada("saludo-monica") && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👆 ¡Haz click!
          </motion.div>
        )}
      </motion.div>

      {/* Mensaje de bienvenida cuando interactúan */}
      {personajeActivo && (
        <motion.div
          className="absolute top-[20%] left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <p className="text-lg font-bold text-gray-800">
            {personajeActivo === "javier"
              ? "¡Hola! Soy Javier 👋"
              : "¡Hola! Soy Mónica 👋"}
          </p>
        </motion.div>
      )}

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">💡 ¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          El Cauca es una región hermosa de Colombia con mucha biodiversidad.
          ¡Aquí comienza nuestra aventura sobre el clima espacial!
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena1ElPueblo = () => {
  const textoNarrador =
    "Había una vez, en un rinconcito del Cauca, dos amigos inseparables: Mónica, una tierna osita de anteojos muy curiosa, y Javier, un capibara juguetón al que le encantaba aprender cosas nuevas.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-green-100 to-blue-100"
      >
        <ContenidoEscena1 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena1ElPueblo;
