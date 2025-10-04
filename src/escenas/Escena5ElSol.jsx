import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";

/**
 * ESCENA 5 - En el Sol
 * El Sol hace un estornudo y dispara una CME (Eyección de Masa Coronal)
 * Interacción: Mantener click en mancha solar para que el Sol estornude
 * hasta que finalmente dispara la CME hacia la Tierra
 */

const ContenidoEscena5 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [contadorEstornudos, setContadorEstornudos] = useState(0);
  const [estornudando, setEstornudando] = useState(false);
  const [cmeDisparada, setCmeDisparada] = useState(false);
  const [posicionCME, setPosicionCME] = useState({ x: 50, y: 50 });

  const estornudosNecesarios = 5;
  const completado = interaccionCompletada("cme-disparada");

  const handleClickMancha = () => {
    if (!completado && !estornudando) {
      setEstornudando(true);
      setContadorEstornudos((prev) => prev + 1);

      // Efecto de estornudo
      setTimeout(() => {
        setEstornudando(false);

        // Si llegó al número necesario, disparar CME
        if (contadorEstornudos + 1 >= estornudosNecesarios) {
          setTimeout(() => {
            setCmeDisparada(true);
            registrarInteraccion("cme-disparada");

            // Animar CME hacia la Tierra
            animarCME();
          }, 500);
        }
      }, 800);
    }
  };

  const animarCME = () => {
    // Simular movimiento de la CME
    let progreso = 0;
    const intervalo = setInterval(() => {
      progreso += 2;
      setPosicionCME({
        x: 50 + progreso * 0.5,
        y: 50 - progreso * 0.3,
      });

      if (progreso >= 100) {
        clearInterval(intervalo);
      }
    }, 50);
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Espacio profundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 to-blue-900">
        {/* <img src="/assets/img/escena5/espacio.png" alt="Espacio" className="w-full h-full object-cover" /> */}

        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* EL SOL - Protagonista de esta escena */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 10 }}
        animate={
          estornudando
            ? {
                scale: [1, 1.15, 0.95, 1.1, 1],
                rotate: [0, -5, 5, -3, 0],
              }
            : {}
        }
      >
        {/* <img src="/assets/img/escena5/sol.png" alt="Sol" /> */}
        <div className="relative">
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 bg-yellow-400 rounded-full shadow-2xl flex items-center justify-center relative"
            animate={{
              boxShadow: estornudando
                ? [
                    "0 0 60px rgba(255,200,0,0.8)",
                    "0 0 100px rgba(255,100,0,1)",
                    "0 0 60px rgba(255,200,0,0.8)",
                  ]
                : ["0 0 60px rgba(255,200,0,0.6)"],
            }}
          >
            <span className="text-8xl md:text-9xl">
              {estornudando ? "😤" : "😊"}
            </span>

            {/* Llamaradas solares */}
            {!completado && (
              <>
                <motion.div
                  className="absolute -top-8 left-1/4 w-12 h-16 bg-orange-500 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.3, 1],
                    y: [-5, -15, -5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -right-6 top-1/3 w-16 h-12 bg-red-500 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.div>

          {/* MANCHAS SOLARES - Área clickeable */}
          {!completado && (
            <>
              <motion.div
                className="absolute top-[35%] left-[25%] w-12 h-12 bg-orange-800 rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ zIndex: 15 }}
                onClick={handleClickMancha}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {/* Indicador de click */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  👆 ¡Haz click!
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-[55%] right-[30%] w-10 h-10 bg-red-800 rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ zIndex: 15 }}
                onClick={handleClickMancha}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </div>
      </motion.div>

      {/* Efecto de estornudo */}
      {estornudando && (
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-yellow-200"
          style={{ zIndex: 20 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8 }}
        >
          ¡Aaaachís!
        </motion.div>
      )}

      {/* CME (Eyección de Masa Coronal) */}
      {cmeDisparada && (
        <motion.div
          className="absolute"
          style={{
            left: `${posicionCME.x}%`,
            top: `${posicionCME.y}%`,
            zIndex: 25,
          }}
        >
          {/* <img src="/assets/img/escena5/cme.png" alt="CME" /> */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full blur-md" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-full opacity-70" />
          </motion.div>

          {/* Partículas de energía */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 30],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 30],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* La Tierra en la distancia */}
      <motion.div
        className="absolute right-[10%] top-[20%]"
        style={{ zIndex: 5 }}
        animate={cmeDisparada ? { scale: [1, 1.1, 1] } : {}}
      >
        {/* <img src="/assets/img/escena5/tierra-distancia.png" alt="Tierra" /> */}
        <div className="w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-2xl">🌍</span>
        </div>
      </motion.div>

      {/* Contador de estornudos */}
      {!completado && (
        <div
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl"
          style={{ zIndex: 100 }}
        >
          <p className="text-sm font-bold text-gray-700 mb-2">
            Progreso del estornudo solar
          </p>
          <div className="flex gap-1">
            {[...Array(estornudosNecesarios)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded flex items-center justify-center ${
                  i < contadorEstornudos ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                {i < contadorEstornudos ? "💥" : "○"}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {contadorEstornudos} / {estornudosNecesarios} estornudos
          </p>
        </div>
      )}

      {/* Mensaje final */}
      {cmeDisparada && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          <p className="text-xl font-bold text-center">¡Ohh Noo!</p>
          <p className="text-sm text-center mt-1">
            La CME se dirige a la Tierra
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
          Una Eyección de Masa Coronal (CME) es una enorme nube de plasma y
          partículas que el Sol expulsa al espacio. ¡Puede tardar de 1 a 3 días
          en llegar a la Tierra!
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena5ElSol = () => {
  const textoNarrador =
    "Muy lejos de allí, el Sol hizo un gran estornudo de fuego y luz, ¡Aaaachís! Y esa chispa gigante salió disparada directo hacia la Tierra.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-purple-900 to-black"
      >
        <ContenidoEscena5 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena5ElSol;
