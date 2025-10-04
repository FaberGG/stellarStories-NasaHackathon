import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";

/**
 * ESCENA 6 - El Apagón
 * La ciudad se queda sin luz por la tormenta solar
 * Interacción: Mover linterna con el mouse para iluminar partes de la casa de Javier
 * Click en Mónica para ver su expresión de susto
 */

const ContenidoEscena6 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [posicionLinterna, setPosicionLinterna] = useState({ x: 50, y: 50 });
  const [monicaClickeada, setMonicaClickeada] = useState(false);
  const [lucesApagadas, setLucesApagadas] = useState(false);

  React.useEffect(() => {
    // Simular el apagón después de 2 segundos
    const timer = setTimeout(() => {
      setLucesApagadas(true);
      registrarInteraccion("apagon-iniciado");
    }, 2000);

    return () => clearTimeout(timer);
  }, [registrarInteraccion]);

  const handleMouseMove = (e) => {
    if (lucesApagadas) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosicionLinterna({ x, y });

      if (!interaccionCompletada("usar-linterna")) {
        registrarInteraccion("usar-linterna");
      }
    }
  };

  const handleClickMonica = () => {
    if (!monicaClickeada) {
      setMonicaClickeada(true);
      registrarInteraccion("ver-monica-asustada");

      setTimeout(() => {
        setMonicaClickeada(false);
      }, 3000);
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Ciudad de noche */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black"
        onMouseMove={handleMouseMove}
      >
        {/* <img src="/assets/img/escena6/ciudad-noche.png" alt="Ciudad" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
          [Fondo: Ciudad en la noche]
        </div>
      </div>

      {/* Edificios de la ciudad */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{ zIndex: 2 }}
      >
        {/* <img src="/assets/img/escena6/silueta-ciudad.png" alt="Edificios" /> */}
        <div className="flex justify-around items-end h-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 rounded-t-lg"
              style={{
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 40 + 60}%`,
              }}
            >
              {/* Ventanas que se apagan */}
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  className="w-3 h-3 bg-yellow-300 rounded-sm m-2"
                  animate={
                    lucesApagadas ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }
                  }
                  transition={{
                    duration: 0.5,
                    delay: lucesApagadas ? i * 0.2 : 0,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CASA DE JAVIER - Split screen izquierda */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full border-r-2 border-gray-700"
        style={{ zIndex: 5 }}
      >
        <div
          className={`absolute inset-0 ${
            lucesApagadas ? "bg-black/90" : "bg-amber-200/20"
          } transition-all duration-1000`}
        >
          {/* <img src="/assets/img/escena6/interior-casa-javier.png" alt="Casa Javier" /> */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
            [Interior casa de Javier]
          </div>

          {/* Javier con linterna */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* <img src="/assets/img/escena6/javier-linterna.png" alt="Javier" /> */}
            <div className="w-24 h-32 bg-orange-300 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg">
              <div className="text-3xl mb-1">🦫</div>
              <div>Javier</div>
              <div className="text-2xl mt-2">🔦</div>
            </div>
          </div>

          {/* Padres de Javier */}
          <div className="absolute left-[20%] bottom-[20%]">
            <div className="flex gap-2">
              <div className="w-16 h-20 bg-orange-400 rounded-lg text-2xl flex items-center justify-center">
                🦫
              </div>
              <div className="w-16 h-20 bg-orange-400 rounded-lg text-2xl flex items-center justify-center">
                🦫
              </div>
            </div>
          </div>
        </div>

        {/* Haz de luz de la linterna */}
        {lucesApagadas && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: `${posicionLinterna.x}%`,
              top: `${posicionLinterna.y}%`,
              zIndex: 20,
            }}
            animate={{
              boxShadow: [
                "0 0 150px 80px rgba(255,255,200,0.4)",
                "0 0 180px 100px rgba(255,255,200,0.5)",
                "0 0 150px 80px rgba(255,255,200,0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl" />
          </motion.div>
        )}
      </div>

      {/* CASA DE MÓNICA - Split screen derecha */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        style={{ zIndex: 5 }}
      >
        <div
          className={`absolute inset-0 ${
            lucesApagadas ? "bg-black/95" : "bg-yellow-200/20"
          } transition-all duration-1000`}
        >
          {/* <img src="/assets/img/escena6/interior-casa-monica.png" alt="Casa Mónica" /> */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
            [Interior casa de Mónica]
          </div>

          {/* Mónica asustada - Clickeable */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleClickMonica}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <img src="/assets/img/escena6/monica-asustada.png" alt="Mónica" /> */}
            <div
              className="w-28 h-36 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg relative"
              style={{ backgroundColor: "#8B4513" }}
            >
              <div className="text-4xl mb-1">🐻</div>
              <div>Mónica</div>
              {lucesApagadas && (
                <div className="absolute -top-8 text-3xl">
                  {monicaClickeada ? "😰" : "😟"}
                </div>
              )}
            </div>

            {lucesApagadas && !interaccionCompletada("ver-monica-asustada") && (
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                👆 Click
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Efecto del apagón */}
      {!lucesApagadas && (
        <motion.div
          className="absolute inset-0 bg-yellow-100/50 pointer-events-none"
          style={{ zIndex: 30 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: 2 }}
        />
      )}

      {/* Mensaje del apagón */}
      {lucesApagadas && (
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
        >
          <p className="text-lg font-bold text-center">¡PUF! 💥</p>
          <p className="text-sm text-center mt-1">La ciudad quedó sin luz</p>
        </motion.div>
      )}

      {/* Instrucciones para mover linterna */}
      {lucesApagadas && !interaccionCompletada("usar-linterna") && (
        <motion.div
          className="absolute bottom-8 left-1/4 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-lg shadow-lg"
          style={{ zIndex: 50 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm font-bold text-gray-700">
            💡 Mueve el mouse para iluminar
          </p>
        </motion.div>
      )}

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Las tormentas solares pueden causar apagones al sobrecargar
          transformadores eléctricos. Por eso es importante tener una linterna
          lista.
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena6ElApagon = () => {
  const textoNarrador =
    "Esa noche, de repente, la ciudad entera quedó en silencio… ¡puf! Todas las luces se apagaron y los aparatos dejaron de funcionar, como si alguien hubiera desconectado el mundo entero.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-gray-900 to-black"
      >
        <ContenidoEscena6 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena6ElApagon;
