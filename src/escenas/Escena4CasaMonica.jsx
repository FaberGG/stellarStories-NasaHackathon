import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import { motion } from "framer-motion";

/**
 * ESCENA 4 - Casa de Mónica
 * Mónica llega a contarles a sus padres pero ellos no le hacen caso
 * Mónica guarda su linterna por precaución
 * Interacción: Click en la linterna para que Mónica la guarde
 */

const ContenidoEscena4 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  const [linternaGuardada, setLinternaGuardada] = useState(false);

  const handleClickLinterna = () => {
    if (!interaccionCompletada("guardar-linterna")) {
      registrarInteraccion("guardar-linterna");
      setLinternaGuardada(true);
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Sala de la casa de Mónica (más desordenada) */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-amber-100">
        {/* <img src="/assets/img/escena4/sala-casa-monica.png" alt="Sala" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Fondo: Sala de la casa de Mónica, más desordenada]
        </div>
      </div>

      {/* PERSONAJES: Padres de Mónica viendo TV */}
      <div className="absolute left-[10%] bottom-[20%]" style={{ zIndex: 5 }}>
        {/* <img src="/assets/img/escena4/padres-monica-tv.png" alt="Padres" /> */}
        <div className="flex gap-2">
          <div
            className="w-28 h-36 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg"
            style={{ backgroundColor: "#8B4513" }}
          >
            <div className="text-4xl mb-1">🐻</div>
            <div>Mamá</div>
          </div>
          <div
            className="w-28 h-36 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg"
            style={{ backgroundColor: "#654321" }}
          >
            <div className="text-4xl mb-1">🐻</div>
            <div>Papá</div>
          </div>
        </div>
      </div>

      {/* TV encendida */}
      <div className="absolute left-[25%] top-[35%]" style={{ zIndex: 3 }}>
        {/* <img src="/assets/img/escena4/tv-encendida.png" alt="TV" /> */}
        <div className="w-32 h-24 bg-gray-800 rounded-lg shadow-xl flex items-center justify-center relative">
          <div className="text-4xl">📺</div>
          <motion.div
            className="absolute inset-2 bg-blue-400/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* MÓNICA preocupada */}
      <div className="absolute right-[20%] bottom-[20%]" style={{ zIndex: 10 }}>
        {/* <img src="/assets/img/escena4/monica-preocupada.png" alt="Mónica" /> */}
        <div
          className="w-28 h-36 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg relative"
          style={{ backgroundColor: "#8B4513" }}
        >
          <div className="text-4xl mb-1">🐻</div>
          <div>Mónica</div>
          {/* Expresión preocupada */}
          <div className="absolute -top-6 text-2xl">😟</div>
        </div>
      </div>

      {/* LINTERNA - Objeto interactivo */}
      {!linternaGuardada ? (
        <motion.div
          className="absolute right-[15%] top-[40%] cursor-pointer"
          style={{ zIndex: 15 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClickLinterna}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* <img src="/assets/img/escena4/linterna.png" alt="Linterna" /> */}
          <div className="relative">
            <div className="text-6xl">🔦</div>
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-yellow-400 px-2 py-1 rounded shadow-lg whitespace-nowrap"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              👆 Guardar linterna
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* Linterna guardada en el escritorio */
        <motion.div
          className="absolute right-[18%] top-[45%]"
          style={{ zIndex: 8 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 0.8, rotate: 0 }}
        >
          {/* <img src="/assets/img/escena4/escritorio-con-linterna.png" alt="Escritorio" /> */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-16 bg-amber-600 rounded-lg shadow-lg mb-2" />
            <div className="text-3xl">🔦</div>
          </div>
        </motion.div>
      )}

      {/* Mensaje cuando guarda la linterna */}
      {linternaGuardada && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg font-bold">¡Por si acaso!</p>
          <p className="text-sm mt-1">Mónica guarda la linterna</p>
        </motion.div>
      )}

      {/* DIÁLOGOS */}
      {mostrarDialogo && (
        <Dialogo
          texto="Mamá, papá... en la escuela dijeron que viene una tormenta solar. ¿No deberíamos prepararnos?"
          personaje="Mónica"
          posicion="derecha"
          tipo="dialogo"
          duracion={5000}
          onCerrar={() => {
            // Después del primer diálogo, mostrar respuesta de los padres
            setTimeout(() => {
              setMostrarDialogo(false);
            }, 1000);
          }}
        />
      )}

      {/* Cortina de ventana moviéndose */}
      <motion.div
        className="absolute right-[5%] top-[20%] w-16 h-40 bg-blue-200/50 rounded"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ zIndex: 2 }}
      >
        {/* Placeholder cortina */}
      </motion.div>

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">💡 ¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Estar preparados es importante incluso si pensamos que nada va a
          pasar. Una linterna siempre es útil en emergencias.
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena4CasaMonica = () => {
  const textoNarrador =
    "Mónica también fue corriendo a contarle a sus papás, pero ellos se rieron y dijeron que no era necesario hacer nada. Mónica, un poco asustada, decidió guardar en su cuarto la linterna que le había regalado su amigo Javier… ¡por si acaso!";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-yellow-50 to-amber-50"
      >
        <ContenidoEscena4 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena4CasaMonica;
