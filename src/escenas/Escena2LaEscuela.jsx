import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import { motion } from "framer-motion";

/**
 * ESCENA 2 - En la escuela
 * La profesora cóndor explica sobre la tormenta solar
 * Interacción: Click en el proyector para ver animación del Sol
 * Hover en el tablero para info educativa
 */

const ContenidoEscena2 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  const [proyectorActivo, setProyectorActivo] = useState(false);
  const [mostrarInfoTablero, setMostrarInfoTablero] = useState(false);

  const handleClickProyector = () => {
    if (!interaccionCompletada("ver-proyector")) {
      registrarInteraccion("ver-proyector");
      setProyectorActivo(true);

      setTimeout(() => {
        setProyectorActivo(false);
      }, 4000);
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Aula de la escuela */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-orange-100">
        {/* <img src="/assets/img/escena2/aula-escuela.png" alt="Aula" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Fondo: Aula de madera con pupitres]
        </div>
      </div>

      {/* PERSONAJES: Javier y Mónica en sus pupitres */}
      <div className="absolute left-[15%] bottom-[20%]" style={{ zIndex: 5 }}>
        {/* <img src="/assets/img/escena2/javier-sentado.png" alt="Javier" /> */}
        <div className="w-24 h-32 bg-orange-300 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg">
          <div className="text-2xl mb-1">🦫</div>
          <div>Javier</div>
        </div>
      </div>

      <div className="absolute right-[15%] bottom-[20%]" style={{ zIndex: 5 }}>
        {/* <img src="/assets/img/escena2/monica-sentada.png" alt="Mónica" /> */}
        <div
          className="w-24 h-32 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg"
          style={{ backgroundColor: "#8B4513" }}
        >
          <div className="text-2xl mb-1">🐻</div>
          <div>Mónica</div>
        </div>
      </div>

      {/* PROFESORA: Cóndor frente al tablero */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-[25%]"
        style={{ zIndex: 10 }}
      >
        {/* <img src="/assets/img/escena2/profesora-condor.png" alt="Profesora" /> */}
        <div className="w-40 h-48 bg-gray-700 rounded-lg flex flex-col items-center justify-center text-white shadow-2xl">
          <div className="text-5xl mb-2">🦅</div>
          <div className="text-sm font-bold">Profesora</div>
        </div>
      </div>

      {/* TABLERO con proyección */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 top-[10%] cursor-pointer"
        style={{ zIndex: 8 }}
        onMouseEnter={() => setMostrarInfoTablero(true)}
        onMouseLeave={() => setMostrarInfoTablero(false)}
      >
        {/* <img src="/assets/img/escena2/tablero.png" alt="Tablero" /> */}
        <div className="w-64 h-40 bg-green-800 rounded-lg border-4 border-brown-600 shadow-xl flex items-center justify-center relative">
          <div className="text-white text-xs text-center px-4">
            [Tablero con proyección del Sol]
          </div>

          {/* Tooltip informativo */}
          {mostrarInfoTablero && (
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ zIndex: 100 }}
            >
              Tormenta solar: energía que viaja desde el Sol a la Tierra
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* PROYECTOR - Interactivo */}
      <motion.div
        className="absolute top-[5%] right-[10%] cursor-pointer"
        style={{ zIndex: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClickProyector}
      >
        {/* <img src="/assets/img/escena2/proyector.png" alt="Proyector" /> */}
        <div className="w-16 h-12 bg-gray-400 rounded shadow-lg flex items-center justify-center relative">
          <div className="text-2xl">📽️</div>

          {/* Rayo de luz del proyector */}
          {proyectorActivo && (
            <motion.div
              className="absolute top-full left-1/2 w-1 bg-yellow-200/50"
              initial={{ height: 0 }}
              animate={{ height: "200px" }}
              style={{ transformOrigin: "top" }}
            />
          )}
        </div>

        {!interaccionCompletada("ver-proyector") && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👆 Click aquí
          </motion.div>
        )}
      </motion.div>

      {/* ANIMACIÓN: Sol con manchas solares */}
      {proyectorActivo && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-[15%]"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {/* <img src="/assets/img/escena2/sol-manchas.png" alt="Sol con manchas" /> */}
          <div className="relative">
            <div className="w-48 h-48 bg-yellow-400 rounded-full shadow-2xl flex items-center justify-center">
              <span className="text-6xl">☀️</span>
            </div>

            {/* Manchas solares */}
            <motion.div
              className="absolute top-[30%] left-[20%] w-8 h-8 bg-orange-700 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[50%] right-[25%] w-6 h-6 bg-red-700 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      {/* DIÁLOGO de la profesora */}
      {mostrarDialogo && (
        <Dialogo
          texto="—Esta noche pasará algo muy especial en el espacio… ¡y debemos estar preparados!"
          personaje="Profesora Cóndor"
          posicion="centro"
          tipo="dialogo"
          duracion={0}
          onCerrar={() => setMostrarDialogo(false)}
        />
      )}

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">💡 ¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Las tormentas solares son explosiones en el Sol que envían energía y
          partículas al espacio. ¡Pueden afectar la tecnología en la Tierra!
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena2LaEscuela = () => {
  const textoNarrador =
    "Un día, mientras estaban en clase, su profesora, la sabia cóndor de los Andes, abrió sus enormes alas y les dijo con voz seria pero cariñosa:";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-amber-50 to-orange-50"
      >
        <ContenidoEscena2 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena2LaEscuela;
