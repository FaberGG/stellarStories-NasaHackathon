import React, { useState } from "react";
import { motion } from "framer-motion";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import CapaIlustracion, {
  ContenedorCapas,
  ObjetoArrastrable,
  ZonaSoltar,
} from "../components/CapaIlustracion";
import Dialogo, { SecuenciaDialogos } from "../components/Dialogo";
import { useHistoria } from "../context/HistoriaContext";
// import { useSonidos } from '../hooks/useSound';

/**
 * PLANTILLA BASE PARA CREAR NUEVAS ESCENAS
 *
 * Copia este archivo y renómbralo según tu escena (ej: Escena3CasaMonica.jsx)
 * Luego personaliza cada sección según tus necesidades
 */

const ContenidoEscena = () => {
  // ============================================
  // 1. HOOKS Y ESTADO
  // ============================================

  // Hook de la escena para gestionar interacciones
  const {
    registrarInteraccion, // Registra cuando el usuario completa algo
    interaccionCompletada, // Verifica si una interacción ya se hizo
    calcularProgreso, // Calcula % de progreso
  } = useEscena();

  // Hook de historia global (navegación y progreso general)
  const {
    completarEscena, // Marca esta escena como completada
    bloquearNavegacion, // Bloquea/desbloquea botones de navegación
  } = useHistoria();

  // Estados locales de la escena
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  const [animacionActiva, setAnimacionActiva] = useState(false);

  // ============================================
  // OPCIONAL: Para escenas con DRAG & DROP
  // ============================================
  const [objetosColocados, setObjetosColocados] = useState([]);

  // Lista de objetos que deben ser arrastrados
  const objetosRequeridos = ["objeto1", "objeto2", "objeto3"];

  // Handler cuando sueltan un objeto
  const handleSoltarObjeto = (objetoId, zonaId) => {
    if (zonaId === "zona-correcta" && !objetosColocados.includes(objetoId)) {
      // Agregar objeto a la lista de colocados
      setObjetosColocados((prev) => [...prev, objetoId]);

      // Registrar la interacción
      registrarInteraccion(`colocar-${objetoId}`, { objeto: objetoId });
    }
  };

  // Calcular progreso del mini-juego
  const interaccionesRequeridas = objetosRequeridos.map(
    (obj) => `colocar-${obj}`
  );
  const progreso = calcularProgreso(interaccionesRequeridas);
  const juegoCompletado = progreso === 100;

  // ============================================
  // OPCIONAL: Para escenas con CLICK/ANIMACIÓN
  // ============================================
  const handleClickElemento = () => {
    if (!interaccionCompletada("click-elemento")) {
      // Bloquear navegación durante animación
      bloquearNavegacion(true);

      // Activar animación
      setAnimacionActiva(true);

      // Registrar interacción
      registrarInteraccion("click-elemento");

      // Después de X segundos, desbloquear y completar
      setTimeout(() => {
        setAnimacionActiva(false);
        bloquearNavegacion(false);
        completarEscena();
      }, 3000);
    }
  };

  // ============================================
  // OPCIONAL: Sistema de audio
  // ============================================
  /*
  const sonidos = useSonidos({
    efecto1: { src: '/assets/audio/efecto1.mp3', volumen: 0.7 },
    musica: { src: '/assets/audio/musica-fondo.mp3', volumen: 0.3, loop: true }
  });
  */

  // ============================================
  // 2. RENDER DE LA ESCENA
  // ============================================

  return (
    <ContenedorCapas>
      {/* ============================================
          CAPA 0: FONDO ESTÁTICO
          ============================================ */}
      <CapaIlustracion
        src="" // "/assets/img/escenaX/fondo.png"
        alt="Fondo de la escena"
        zIndex={0}
      />

      {/* Alternativa: Fondo con gradiente */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-300"
        style={{ zIndex: 0 }}
      >
        {/* Contenido del fondo personalizado */}
      </div>

      {/* ============================================
          CAPA 1-4: ELEMENTOS DECORATIVOS
          ============================================ */}
      <CapaIlustracion
        src="" // "/assets/img/escenaX/decoracion1.png"
        alt="Decoración 1"
        zIndex={1}
      />

      {/* ============================================
          CAPA 5: PERSONAJES
          ============================================ */}
      <CapaIlustracion
        src="" // "/assets/img/escenaX/personaje-principal.png"
        alt="Personaje principal"
        zIndex={5}
      />

      {/* Personaje con animación */}
      <motion.div
        className="absolute left-[20%] bottom-[10%]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ zIndex: 5 }}
      >
        {/* <CapaIlustracion src="/assets/img/personaje.png" /> */}
        <div className="w-32 h-48 bg-gray-300 rounded-lg flex items-center justify-center text-xs">
          Personaje
        </div>
      </motion.div>

      {/* ============================================
          CAPA 10+: OBJETOS INTERACTIVOS
          ============================================ */}

      {/* OPCIÓN A: Objetos arrastrables (Drag & Drop) */}
      {objetosRequeridos.map(
        (objetoId, index) =>
          !interaccionCompletada(`colocar-${objetoId}`) && (
            <ObjetoArrastrable
              key={objetoId}
              id={objetoId}
              posicionInicial={{ x: 100 + index * 150, y: 100 }}
              onSoltar={handleSoltarObjeto}
              className="w-20 h-20"
            >
              {/* Placeholder mientras no hay imagen */}
              <div className="w-full h-full bg-blue-400 rounded-lg flex items-center justify-center text-xs text-white font-bold">
                {objetoId}
              </div>
            </ObjetoArrastrable>
          )
      )}

      {/* OPCIÓN B: Elemento clickeable */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClickElemento}
        style={{ zIndex: 15 }}
      >
        <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
          <span className="text-2xl">👆</span>
        </div>

        {!interaccionCompletada("click-elemento") && (
          <motion.p
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-bold whitespace-nowrap"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ¡Haz clic aquí!
          </motion.p>
        )}
      </motion.div>

      {/* ============================================
          ZONA DE SOLTAR (para Drag & Drop)
          ============================================ */}
      <ZonaSoltar
        id="zona-correcta"
        onSoltar={handleSoltarObjeto}
        aceptaObjetos={objetosRequeridos}
        activa={!juegoCompletado}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-40 border-4 border-dashed border-green-500 rounded-xl flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">
            {juegoCompletado ? "✓ ¡Completado!" : "Arrastra aquí"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {objetosColocados.length} / {objetosRequeridos.length}
          </p>
        </div>
      </ZonaSoltar>

      {/* ============================================
          ANIMACIONES TEMPORALES
          ============================================ */}
      {animacionActiva && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 50 }}
        >
          {/* Efecto visual de la animación */}
          <div className="absolute inset-0 bg-yellow-300/30"></div>

          {/* Partículas, destellos, etc */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </motion.div>
      )}

      {/* ============================================
          DIÁLOGOS DE PERSONAJES
          ============================================ */}
      {mostrarDialogo && (
        <Dialogo
          texto="Este es un diálogo de ejemplo. ¡Completa la actividad para continuar!"
          personaje="Javier"
          posicion="izquierda"
          tipo="dialogo"
          duracion={0} // 0 = no se cierra automáticamente
          onCerrar={() => setMostrarDialogo(false)}
        />
      )}

      {/* Secuencia de diálogos (múltiples) */}

      <SecuenciaDialogos
        dialogos={[
          {
            texto: "Primer diálogo...",
            personaje: "Javier",
            posicion: "izquierda",
          },
          {
            texto: "Segundo diálogo...",
            personaje: "Mónica",
            posicion: "derecha",
          },
          {
            texto: "Tercer diálogo...",
            personaje: "Profesora",
            posicion: "centro",
          },
        ]}
        onCompletar={() => console.log("Secuencia completada")}
      />

      {/* ============================================
          UI: INDICADORES Y FEEDBACK
          ============================================ */}

      {/* Barra de progreso */}
      {!juegoCompletado && objetosRequeridos.length > 0 && (
        <div
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl"
          style={{ zIndex: 100 }}
        >
          <p className="text-sm font-bold text-gray-700 mb-2">
            Progreso de la actividad
          </p>
          <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {Math.round(progreso)}% completado
          </p>
        </div>
      )}

      {/* Mensaje de completado */}
      {juegoCompletado && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-6 rounded-2xl shadow-2xl z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <p className="text-2xl font-bold mb-2">🎉 ¡Excelente!</p>
          <p className="text-sm">Has completado la actividad</p>
        </motion.div>
      )}

      {/* Información educativa */}
      <div
        className="absolute bottom-8 left-8 bg-black/70 text-white p-4 rounded-lg max-w-xs"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
          💡 ¿Sabías qué?
        </h3>
        <p className="text-xs leading-relaxed">
          Aquí va información educativa relevante a esta escena. Explica
          conceptos de clima espacial de forma simple y entretenida.
        </p>
      </div>
    </ContenedorCapas>
  );
};

// ============================================
// COMPONENTE PRINCIPAL DE LA ESCENA
// ============================================
const EscenaTemplate = () => {
  // Texto que aparece en la parte superior
  const textoNarrador =
    "Este es el texto del narrador que aparece en la parte superior de la pantalla. " +
    "Describe lo que está sucediendo en esta parte de la historia.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-blue-50 to-blue-100" // Opcional: personalizar color de fondo
      >
        <ContenidoEscena />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default EscenaTemplate;

/**
 * ============================================
 * GUÍA DE USO - CÓMO PERSONALIZAR ESTA PLANTILLA
 * ============================================
 *
 * 1. RENOMBRAR EL ARCHIVO
 *    - Copia este archivo y renómbralo (ej: Escena3CasaMonica.jsx)
 *    - Cambia el nombre del componente al final (EscenaTemplate → Escena3CasaMonica)
 *
 * 2. CAMBIAR EL TEXTO DEL NARRADOR
 *    - Modifica la constante "textoNarrador" con la historia de tu escena
 *
 * 3. ELEGIR TIPO DE ESCENA
 *    - Escena simple (solo visualización): Usa solo CapaIlustracion
 *    - Escena con drag & drop: Mantén ObjetoArrastrable y ZonaSoltar
 *    - Escena con click/animación: Usa motion.div con onClick
 *    - Escena híbrida: Combina varias interacciones
 *
 * 4. AGREGAR IMÁGENES
 *    - Reemplaza los src="" con las rutas de tus imágenes
 *    - Ejemplo: src="/assets/img/escena3/fondo-casa.png"
 *
 * 5. PERSONALIZAR INTERACCIONES
 *    - Cambia los nombres de los objetos en "objetosRequeridos"
 *    - Ajusta las posiciones iniciales de objetos arrastrables
 *    - Modifica los textos de diálogos
 *
 * 6. AJUSTAR LAYOUT
 *    - Modifica las posiciones (left, top, bottom, right)
 *    - Cambia los z-index para controlar qué aparece delante
 *    - Ajusta tamaños (w-32, h-48, etc.)
 *
 * 7. AGREGAR ANIMACIONES PERSONALIZADAS
 *    - Usa motion.div con propiedades inicial, animate, transition
 *    - Consulta documentación de Framer Motion para más opciones
 *
 * 8. ELIMINAR SECCIONES NO USADAS
 *    - Si no usas drag & drop, elimina esa sección
 *    - Si no necesitas diálogos, elimina esos componentes
 *    - Mantén el código limpio
 *
 * ============================================
 * TIPS PRO
 * ============================================
 *
 * - Siempre registra interacciones con registrarInteraccion()
 * - Bloquea navegación durante animaciones importantes
 * - Usa completarEscena() cuando la escena esté lista
 * - Agrega feedback visual inmediato a todas las acciones
 * - Testea en móvil para verificar que todo funcione con touch
 * - Mantén las animaciones suaves (no más de 3s)
 * - Usa sonidos sutiles para reforzar acciones
 */
