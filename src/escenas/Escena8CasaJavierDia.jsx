import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";

/**
 * ESCENA 8 - Casa de Javier al día siguiente
 * Javier intenta conectarse a internet pero no hay señal
 * Interacción: Click en el celular para ver el mensaje "Sin conexión"
 * Arrastrar ícono de wifi (no se enciende)
 */

const ContenidoEscena8 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [celularClickeado, setCelularClickeado] = useState(false);
  const [wifiArrastrado, setWifiArrastrado] = useState(false);

  const handleClickCelular = () => {
    if (!interaccionCompletada("ver-sin-conexion")) {
      registrarInteraccion("ver-sin-conexion");
      setCelularClickeado(true);
    }
  };

  const handleArrastrarWifi = () => {
    if (!wifiArrastrado) {
      setWifiArrastrado(true);
      registrarInteraccion("intentar-wifi");

      // Resetear después de la animación
      setTimeout(() => {
        setWifiArrastrado(false);
      }, 2000);
    }
  };

  return (
    <ContenedorCapas>
      {/* FONDO: Interior casa de Javier, día */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-orange-100">
        {/* <img src="/assets/img/escena8/sala-javier-dia.png" alt="Sala día" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Fondo: Sala de Javier durante el día]
        </div>
      </div>

      {/* Luz del sol entrando por ventana */}
      <motion.div
        className="absolute right-[10%] top-[10%] w-48 h-64 bg-yellow-200/30 blur-3xl"
        style={{ zIndex: 2 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* MESA DEL DESAYUNO */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-[25%]"
        style={{ zIndex: 5 }}
      >
        {/* <img src="/assets/img/escena8/mesa-desayuno.png" alt="Mesa" /> */}
        <div className="relative">
          {/* Mesa */}
          <div className="w-64 h-32 bg-amber-700 rounded-lg shadow-xl" />

          {/* Platos y comida */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
            <div className="text-4xl">🥞</div>
            <div className="text-4xl">☕</div>
            <div className="text-4xl">🍊</div>
          </div>
        </div>
      </div>

      {/* JAVIER sentado desayunando */}
      <div className="absolute left-[35%] bottom-[28%]" style={{ zIndex: 8 }}>
        {/* <img src="/assets/img/escena8/javier-sentado.png" alt="Javier" /> */}
        <motion.div
          className="w-28 h-36 bg-orange-300 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-4xl mb-1">🦫</div>
          <div>Javier</div>
          <div className="text-xl mt-2">😊</div>
        </motion.div>
      </div>

      {/* PAPÁ de Javier */}
      <div className="absolute right-[35%] bottom-[28%]" style={{ zIndex: 8 }}>
        {/* <img src="/assets/img/escena8/papa-javier.png" alt="Papá" /> */}
        <div className="w-32 h-40 bg-orange-400 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg">
          <div className="text-5xl mb-1">🦫</div>
          <div>Papá</div>
        </div>
      </div>

      {/* CELULAR en la mesa - Interactivo */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-[30%] cursor-pointer"
        style={{ zIndex: 10 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClickCelular}
      >
        {/* <img src="/assets/img/escena8/celular.png" alt="Celular" /> */}
        <div className="relative">
          <div className="w-20 h-32 bg-gray-800 rounded-xl shadow-2xl flex items-center justify-center">
            <span className="text-3xl">📱</span>
          </div>

          {!interaccionCompletada("ver-sin-conexion") && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              👆 Click
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Pantalla del celular con mensaje "Sin conexión" */}
      {celularClickeado && (
        <motion.div
          className="absolute left-1/2 top-[30%] transform -translate-x-1/2"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl w-64">
            {/* Pantalla del celular */}
            <div className="bg-white rounded-lg p-4">
              <div className="text-center">
                {/* Ícono de wifi tachado */}
                <motion.div
                  className="text-6xl mb-3 relative inline-block"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  📶
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-red-500 rotate-45 transform scale-150" />
                  </div>
                </motion.div>
                <p className="text-lg font-bold text-red-600 mb-2">
                  Sin conexión
                </p>
                <p className="text-sm text-gray-600">
                  No hay señal de internet
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ÍCONO DE WIFI flotante - Arrastrable */}
      {celularClickeado && !interaccionCompletada("intentar-wifi") && (
        <motion.div
          draggable
          onDragEnd={handleArrastrarWifi}
          className="absolute right-[20%] top-[35%] cursor-move"
          style={{ zIndex: 15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-6xl opacity-50">📶</div>
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-yellow-400 px-2 py-1 rounded shadow-lg whitespace-nowrap"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Arrastra el wifi
          </motion.div>
        </motion.div>
      )}

      {/* Mensaje cuando intentan arrastrar wifi */}
      {wifiArrastrado && (
        <motion.div
          className="absolute left-1/2 top-[45%] transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          <p className="text-lg font-bold text-center">❌ No funciona</p>
          <p className="text-sm text-center mt-1">El wifi sigue sin señal</p>
        </motion.div>
      )}

      {/* Humo del chocolate caliente */}
      <motion.div
        className="absolute left-[52%] bottom-[42%]"
        style={{ zIndex: 6 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-300 rounded-full blur-sm"
            animate={{
              y: [0, -20],
              x: [0, Math.random() * 10 - 5],
              opacity: [0.6, 0],
              scale: [0.5, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Diálogo del papá explicando */}
      {celularClickeado && (
        <motion.div
          className="absolute right-[10%] top-[20%] bg-white rounded-2xl p-4 shadow-2xl max-w-xs"
          style={{ zIndex: 40 }}
          initial={{ scale: 0, x: 50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-xs font-bold text-blue-600 mb-1">
            PAPÁ CAPIBARA
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            No te preocupes hijo, algunas señales todavía están dormidas y
            tardarán un poco en volver. Lo importante es que en casa todo
            funciona bien.
          </p>
          {/* Cola del diálogo */}
          <div className="absolute top-1/2 -left-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
        </motion.div>
      )}

      {/* Expresión tranquila de Javier */}
      {celularClickeado && (
        <motion.div
          className="absolute left-[38%] bottom-[48%]"
          style={{ zIndex: 9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-3xl">😌</span>
        </motion.div>
      )}

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">💡 ¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Las tormentas solares pueden afectar las señales de GPS, internet y
          comunicaciones satelitales. ¡Pueden tardar horas o días en
          recuperarse!
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena8CasaJavierDia = () => {
  const textoNarrador =
    "Al día siguiente, Javier encendió el celular de su papá, pero ¡nada de internet! Su papá le explicó que algunas señales todavía estaban dormidas y que tardarían un poco en volver. Aun así, Javier desayunó tranquilo, feliz de que en su casa todo funcionaba bien.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-yellow-50 to-orange-50"
      >
        <Escena8CasaJavierDia />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena8CasaJavierDia;
