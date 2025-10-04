import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";

/**
 * ESCENA 7 - Las Auroras
 * El cielo se llena de auroras boreales por el clima espacial
 * Interacción: Click en el cielo para intensificar los colores
 */

const ContenidoEscena7 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [intensidadAuroras, setIntensidadAuroras] = useState(0.5);
  const [clicks, setClicks] = useState(0);

  const handleClickCielo = () => {
    if (clicks < 3) {
      const nuevoClicks = clicks + 1;
      setClicks(nuevoClicks);
      setIntensidadAuroras(0.5 + nuevoClicks * 0.17);

      if (!interaccionCompletada("intensificar-auroras")) {
        registrarInteraccion("intensificar-auroras");
      }
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Cielo nocturno */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 to-blue-900 cursor-pointer"
        onClick={handleClickCielo}
      >
        {/* <img src="/assets/img/escena7/cielo-nocturno.png" alt="Cielo" className="w-full h-full object-cover" /> */}

        {/* Estrellas parpadeantes */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* AURORAS BOREALES - Capa principal */}
        <motion.div
          className="absolute inset-0"
          style={{ zIndex: 5 }}
          animate={{
            opacity: intensidadAuroras,
          }}
        >
          {/* <img src="/assets/img/escena7/auroras.png" alt="Auroras" className="w-full h-full object-cover" /> */}

          {/* Aurora verde */}
          <motion.div
            className="absolute top-0 left-0 w-full h-2/3"
            style={{
              background: `linear-gradient(180deg, 
                rgba(0, 255, 150, ${intensidadAuroras * 0.6}) 0%,
                rgba(100, 255, 200, ${intensidadAuroras * 0.4}) 30%,
                rgba(0, 200, 150, ${intensidadAuroras * 0.2}) 60%,
                transparent 100%)`,
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Aurora rosa/violeta */}
          <motion.div
            className="absolute top-[10%] right-0 w-3/4 h-1/2"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 100, 200, ${intensidadAuroras * 0.5}) 0%,
                rgba(200, 100, 255, ${intensidadAuroras * 0.3}) 40%,
                transparent 100%)`,
            }}
            animate={{
              backgroundPosition: ["0% 0%", "-100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Aurora amarilla/dorada */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-2/3 h-1/2"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 100, ${intensidadAuroras * 0.4}) 0%,
                rgba(255, 200, 100, ${intensidadAuroras * 0.2}) 50%,
                transparent 100%)`,
            }}
            animate={{
              backgroundPosition: ["0% 0%", "50% 0%", "0% 0%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          {/* Ondulaciones dinámicas */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-24 blur-xl"
              style={{
                top: `${10 + i * 10}%`,
                background: `linear-gradient(90deg, 
                  transparent,
                  rgba(${100 + i * 30}, ${255 - i * 20}, ${150 + i * 20}, ${
                  intensidadAuroras * 0.3
                }),
                  transparent)`,
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, intensidadAuroras * 0.6, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* PERSONAJES: Javier y Mónica mirando el cielo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{ zIndex: 10 }}
      >
        {/* Suelo/horizonte */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent" />

        {/* Siluetas de árboles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-black opacity-80"
            style={{
              left: `${i * 18}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 40 + 80}px`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        ))}

        {/* Javier y Mónica observando */}
        <div className="absolute bottom-[10%] left-[35%] flex gap-8 items-end">
          {/* Javier */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          >
            {/* <img src="/assets/img/escena7/javier-silueta.png" alt="Javier" /> */}
            <div className="w-16 h-24 bg-orange-900 rounded-lg flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🦫</span>
            </div>
          </motion.div>

          {/* Mónica */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            {/* <img src="/assets/img/escena7/monica-silueta.png" alt="Mónica" /> */}
            <div
              className="w-16 h-24 rounded-lg flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: "#5C4033" }}
            >
              <span className="text-3xl">🐻</span>
            </div>
          </motion.div>
        </div>

        {/* Expresiones de asombro */}
        <motion.div
          className="absolute bottom-[40%] left-[38%]"
          animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">😮</span>
        </motion.div>
      </div>

      {/* Indicador de click */}
      {clicks < 3 && (
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white/90 px-6 py-3 rounded-full shadow-2xl pointer-events-none"
          style={{ zIndex: 50 }}
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm font-bold text-gray-800">
            👆 Haz click para intensificar las auroras
          </p>
          <p className="text-xs text-center text-gray-600 mt-1">
            {clicks} / 3 clicks
          </p>
        </motion.div>
      )}

      {/* Mensaje cuando están al máximo */}
      {clicks >= 3 && (
        <motion.div
          className="absolute top-[20%] left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          <p className="text-xl font-bold text-center">¡Espectacular!</p>
          <p className="text-sm text-center mt-1">
            Las auroras están en su máximo esplendor
          </p>
        </motion.div>
      )}

      {/* Partículas luminosas flotantes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 15 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, intensidadAuroras, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Las auroras boreales son causadas por partículas solares que chocan
          con la atmósfera terrestre. ¡Los colores dependen del tipo de gas
          atmosférico que excitan!
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena7LasAuroras = () => {
  const textoNarrador =
    "De repente, una luz gigante pintó el cielo de colores. ¡Eran auroras boreales! Brillaban como pinceladas mágicas verdes, rosas y violetas, un regalo sorprendente del clima espacial.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-black to-purple-900"
      >
        <ContenidoEscena7 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena7LasAuroras;
