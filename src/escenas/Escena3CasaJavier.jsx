import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { SecuenciaDialogos } from "../components/Dialogo";
import { motion } from "framer-motion";

/**
 * ESCENA 3 - Casa de Javier con su familia
 * Dos mini-juegos:
 * 1. Click en mesa -> Zoom para arrastrar objetos a la mochila
 * 2. Después -> Desconectar electrodomésticos
 */

// SUB-ESCENA: Mini-juego de la mochila
const MiniJuegoMochila = ({ onCompletar }) => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [objetosEnMochila, setObjetosEnMochila] = useState([]);
  const [objetoArrastrado, setObjetoArrastrado] = useState(null);

  const objetosRequeridos = [
    { id: "linterna", emoji: "🔦", nombre: "Linterna" },
    { id: "radio", emoji: "📻", nombre: "Radio" },
    { id: "agua", emoji: "💧", nombre: "Agua" },
    { id: "comida", emoji: "🍎", nombre: "Comida" },
  ];

  const handleDragStart = (objeto) => {
    setObjetoArrastrado(objeto);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (objetoArrastrado && !objetosEnMochila.includes(objetoArrastrado.id)) {
      setObjetosEnMochila((prev) => [...prev, objetoArrastrado.id]);
      registrarInteraccion(`guardar-${objetoArrastrado.id}`);
      setObjetoArrastrado(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const juegoCompletado = objetosEnMochila.length === objetosRequeridos.length;

  React.useEffect(() => {
    if (juegoCompletado) {
      setTimeout(() => {
        onCompletar();
      }, 2000);
    }
  }, [juegoCompletado, onCompletar]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/90 flex items-center justify-center"
      style={{ zIndex: 100 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📦 Prepara el Kit de Emergencia
        </h2>

        {/* Objetos disponibles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {objetosRequeridos.map(
            (objeto) =>
              !objetosEnMochila.includes(objeto.id) && (
                <motion.div
                  key={objeto.id}
                  draggable
                  onDragStart={() => handleDragStart(objeto)}
                  className="bg-blue-100 rounded-lg p-4 cursor-move hover:bg-blue-200 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-5xl text-center mb-2">
                    {objeto.emoji}
                  </div>
                  <div className="text-sm text-center font-semibold text-gray-700">
                    {objeto.nombre}
                  </div>
                </motion.div>
              )
          )}
        </div>

        {/* Zona de la mochila */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-4 border-dashed rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center transition-all ${
            juegoCompletado
              ? "border-green-500 bg-green-50"
              : "border-blue-400 bg-blue-50"
          }`}
        >
          <div className="text-6xl mb-4">🎒</div>
          <p className="text-lg font-bold text-gray-700 mb-2">
            {juegoCompletado ? "¡Kit completo! ✓" : "Arrastra los objetos aquí"}
          </p>
          <p className="text-sm text-gray-600">
            {objetosEnMochila.length} / {objetosRequeridos.length} objetos
          </p>

          {/* Objetos en la mochila */}
          <div className="flex gap-2 mt-4">
            {objetosEnMochila.map((id) => {
              const objeto = objetosRequeridos.find((o) => o.id === id);
              return (
                <span key={id} className="text-2xl">
                  {objeto.emoji}
                </span>
              );
            })}
          </div>
        </div>

        {juegoCompletado && (
          <motion.div
            className="mt-6 text-center text-green-600 font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🎉 ¡Excelente! El kit está listo
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// CONTENIDO PRINCIPAL DE LA ESCENA
const ContenidoEscena3 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarMiniJuegoMochila, setMostrarMiniJuegoMochila] = useState(false);
  const [mostrarDialogos, setMostrarDialogos] = useState(true);
  const [electrodesconectados, setElectrodesconectados] = useState([]);

  const electrodomesticos = [
    {
      id: "tv",
      nombre: "TV",
      emoji: "📺",
      posicion: { left: "20%", top: "30%" },
    },
    {
      id: "computadora",
      nombre: "PC",
      emoji: "💻",
      posicion: { left: "60%", top: "35%" },
    },
    {
      id: "microondas",
      nombre: "Microondas",
      emoji: "🔌",
      posicion: { left: "40%", top: "55%" },
    },
  ];

  const mochilaCompletada = interaccionCompletada("mochila-completada");
  const todosDesconectados =
    electrodesconectados.length === electrodomesticos.length;

  const handleClickMesa = () => {
    if (!mochilaCompletada) {
      setMostrarMiniJuegoMochila(true);
    }
  };

  const handleCompletarMochila = () => {
    registrarInteraccion("mochila-completada");
    setMostrarMiniJuegoMochila(false);
  };

  const handleDesconectar = (id) => {
    if (!electrodesconectados.includes(id)) {
      setElectrodesconectados((prev) => [...prev, id]);
      registrarInteraccion(`desconectar-${id}`);
    }
  };

  const dialogos = [
    {
      texto:
        "Papá, en la escuela dijeron que viene una tormenta solar. ¿Qué es eso?",
      personaje: "Javier",
      posicion: "izquierda",
    },
    {
      texto:
        "Mira hijo, el Sol a veces se emociona tanto que manda un estornudo gigante de luz y energía hasta la Tierra.",
      personaje: "Papá Capibara",
      posicion: "derecha",
    },
    {
      texto:
        "Eso se llama clima espacial. Cuando eso pasa, lo mejor es desconectar las cosas eléctricas para que no se dañen.",
      personaje: "Papá Capibara",
      posicion: "derecha",
    },
    {
      texto:
        "¡Y tener listo un kit con linterna, comida y radio! ¡Así estaremos preparados como verdaderos exploradores del espacio!",
      personaje: "Papá Capibara",
      posicion: "derecha",
    },
  ];

  return (
    <ContenedorCapas>
      {/* FONDO: Sala de la casa */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-yellow-100">
        {/* <img src="/assets/img/escena3/sala-casa-javier.png" alt="Sala" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Fondo: Sala de la casa de Javier]
        </div>
      </div>

      {/* PERSONAJES: Familia capibara */}
      <div className="absolute left-[15%] bottom-[15%]" style={{ zIndex: 5 }}>
        {/* <img src="/assets/img/escena3/javier-familia.png" alt="Familia" /> */}
        <div className="flex gap-4">
          <div className="w-24 h-32 bg-orange-300 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg">
            <div className="text-3xl mb-1">🦫</div>
            <div>Javier</div>
          </div>
          <div className="w-28 h-36 bg-orange-400 rounded-lg flex flex-col items-center justify-center text-white text-xs shadow-lg">
            <div className="text-4xl mb-1">🦫</div>
            <div>Papá</div>
          </div>
        </div>
      </div>

      {/* MESA CON MOCHILA - Interactiva */}
      {!mochilaCompletada && (
        <motion.div
          className="absolute right-[20%] bottom-[25%] cursor-pointer"
          style={{ zIndex: 10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClickMesa}
        >
          {/* <img src="/assets/img/escena3/mesa-mochila.png" alt="Mesa" /> */}
          <div className="relative">
            <div className="w-32 h-24 bg-amber-700 rounded-lg shadow-lg" />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-5xl">
              🎒
            </div>
          </div>

          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👆 Preparar kit
          </motion.div>
        </motion.div>
      )}

      {/* ELECTRODOMÉSTICOS - Desconectar */}
      {mochilaCompletada &&
        electrodomesticos.map(
          (electro) =>
            !electrodesconectados.includes(electro.id) && (
              <motion.div
                key={electro.id}
                className="absolute cursor-pointer"
                style={{ ...electro.posicion, zIndex: 15 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDesconectar(electro.id)}
              >
                {/* <img src={`/assets/img/escena3/${electro.id}.png`} alt={electro.nombre} /> */}
                <div className="relative">
                  <div className="text-6xl">{electro.emoji}</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    🔌
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-red-500 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Desconectar
                </motion.div>
              </motion.div>
            )
        )}

      {/* Indicadores de progreso */}
      {mochilaCompletada && !todosDesconectados && (
        <div
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl"
          style={{ zIndex: 100 }}
        >
          <p className="text-sm font-bold text-gray-700 mb-2">
            Desconecta los electrodomésticos
          </p>
          <div className="flex gap-2">
            {electrodomesticos.map((e) => (
              <div
                key={e.id}
                className={`w-8 h-8 rounded flex items-center justify-center ${
                  electrodesconectados.includes(e.id)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {electrodesconectados.includes(e.id) ? "✓" : e.emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de completado */}
      {todosDesconectados && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-6 rounded-2xl shadow-2xl"
          style={{ zIndex: 50 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          <p className="text-2xl font-bold mb-2">¡Excelente trabajo!</p>
          <p className="text-sm">La casa está preparada para la tormenta</p>
        </motion.div>
      )}

      {/* Mini-juego de la mochila */}
      {mostrarMiniJuegoMochila && (
        <MiniJuegoMochila onCompletar={handleCompletarMochila} />
      )}

      {/* Diálogos */}
      {mostrarDialogos && (
        <SecuenciaDialogos
          dialogos={dialogos}
          onCompletar={() => setMostrarDialogos(false)}
        />
      )}

      {/* Info educativa */}
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xs font-bold mb-1">¿Sabías qué?</h3>
        <p className="text-xs leading-relaxed">
          Desconectar electrodomésticos durante una tormenta solar puede
          protegerlos de sobrecargas eléctricas.
        </p>
      </div>
    </ContenedorCapas>
  );
};

const Escena3CasaJavier = () => {
  const textoNarrador =
    "Cuando Javier llegó a casa estaba muy preocupado y corrió a contarle todo a su papá. Su padre le explicó qué era ese extraño evento del espacio y, juntos con la familia, empezaron a prepararse.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-orange-50 to-yellow-50"
      >
        <ContenidoEscena3 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena3CasaJavier;
