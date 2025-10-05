import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { useHistoria } from "../context/HistoriaContext";
import "../styles/MinijuegoMochila.css";

// Importar imágenes
import imagenAgua from "../assets/img/minijuego-mochila/agua.png";
import imagenGalletas from "../assets/img/minijuego-mochila/galletas.png";
import imagenLinterna from "../assets/img/minijuego-mochila/linterna.png";
import imagenBolsoVacio from "../assets/img/minijuego-mochila/bolso-vacio.png";
import imagenMochilaSoloAgua from "../assets/img/minijuego-mochila/mochila-solo-agua.png";
import imagenMochilaSoloGalletas from "../assets/img/minijuego-mochila/mochila-solo-galletas.png";
import imagenMochilaSoloLinterna from "../assets/img/minijuego-mochila/mochila-solo-linterna.png";
import imagenMochilaAguaGalletas from "../assets/img/minijuego-mochila/mochila-agua-galletas.png";
import imagenMochilaAguaLinterna from "../assets/img/minijuego-mochila/mochila-agua-linterna.png";
import imagenMochilaGalletasLinterna from "../assets/img/minijuego-mochila/mochila-galletas-linterna.png";
import imagenMochilaCompleta from "../assets/img/minijuego-mochila/mochila-completa.png";

/**
 * MINIJUEGO: PREPARAR LA MOCHILA
 * Versión SIN Tailwind CSS - Solo CSS puro
 */

const ContenidoMinijuegoMochila = () => {
  const { registrarInteraccion, interaccionCompletada, calcularProgreso } =
    useEscena();
  const { completarEscena, bloquearNavegacion } = useHistoria();

  const mochilaRef = useRef(null);

  const [elementosEnMochila, setElementosEnMochila] = useState([]);
  const [elementoArrastrando, setElementoArrastrando] = useState(null);
  const [sobreMochila, setSobreMochila] = useState(false);
  const [juegoCompletado, setJuegoCompletado] = useState(false);

  const elementos = [
    {
      id: "agua",
      nombre: "Agua",
      imagen: imagenAgua,
      posicion: { top: "20%", left: "10%" },
    },
    {
      id: "galletas",
      nombre: "Galletas",
      imagen: imagenGalletas,
      posicion: { top: "45%", left: "15%" },
    },
    {
      id: "linterna",
      nombre: "Linterna",
      imagen: imagenLinterna,
      posicion: { top: "70%", left: "12%" },
    },
  ];

  const obtenerImagenMochila = () => {
    if (elementosEnMochila.length === 0) {
      return imagenBolsoVacio;
    }

    const tiene = {
      agua: elementosEnMochila.includes("agua"),
      galletas: elementosEnMochila.includes("galletas"),
      linterna: elementosEnMochila.includes("linterna"),
    };

    if (tiene.agua && tiene.galletas && tiene.linterna) {
      return imagenMochilaCompleta;
    }

    if (tiene.agua && tiene.galletas) return imagenMochilaAguaGalletas;
    if (tiene.agua && tiene.linterna) return imagenMochilaAguaLinterna;
    if (tiene.galletas && tiene.linterna) return imagenMochilaGalletasLinterna;

    if (tiene.agua) return imagenMochilaSoloAgua;
    if (tiene.galletas) return imagenMochilaSoloGalletas;
    if (tiene.linterna) return imagenMochilaSoloLinterna;

    return imagenBolsoVacio;
  };

  const estaSobreAreaMochila = (e) => {
    if (!mochilaRef.current) return false;

    const rect = mochilaRef.current.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const mochilaLeft = imgWidth * 0.666;
    const mochilaRight = imgWidth * 0.95;

    const mochilaHeight = imgHeight * (3.5 / 5);
    const mochilaTop = (imgHeight - mochilaHeight) / 2;
    const mochilaBottom = mochilaTop + mochilaHeight;

    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return (
      x >= mochilaLeft &&
      x <= mochilaRight &&
      y >= mochilaTop &&
      y <= mochilaBottom
    );
  };

  const handleDragStart = (e, elemento) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("elementoId", elemento.id);
    setElementoArrastrando(elemento.id);
  };

  const handleDragEnd = () => {
    setElementoArrastrando(null);
    setSobreMochila(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const sobreArea = estaSobreAreaMochila(e);
    setSobreMochila(sobreArea);
  };

  const handleDragLeave = () => {
    setSobreMochila(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const sobreArea = estaSobreAreaMochila(e);
    setSobreMochila(false);

    if (!sobreArea) return;

    const elementoId = e.dataTransfer.getData("elementoId");

    if (elementoId && !elementosEnMochila.includes(elementoId)) {
      const nuevosElementos = [...elementosEnMochila, elementoId];
      setElementosEnMochila(nuevosElementos);

      registrarInteraccion(`agregar-${elementoId}`);

      if (nuevosElementos.length === elementos.length) {
        setTimeout(() => {
          setJuegoCompletado(true);
          bloquearNavegacion(false);
          completarEscena();
        }, 800);
      }
    }
  };

  const handleRemoverElemento = (elementoId) => {
    setElementosEnMochila(elementosEnMochila.filter((id) => id !== elementoId));
  };

  const progreso = (elementosEnMochila.length / elementos.length) * 100;

  return (
    <ContenedorCapas>
      {/* Imagen de fondo con la mochila */}
      <div
        ref={mochilaRef}
        className="mochila-fondo"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.img
          key={elementosEnMochila.join("-")}
          src={obtenerImagenMochila()}
          alt="Escena con mochila"
          className="mochila-imagen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          draggable={false}
        />

        {/* Indicador visual cuando arrastran sobre el área correcta */}
        {sobreMochila && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="zona-drop-activa"
          >
            <div className="zona-drop-contenido">
              <span className="zona-drop-texto">¡Suelta aquí! 👇</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Elementos arrastrables */}
      {elementos.map((elemento) => {
        const yaEnMochila = elementosEnMochila.includes(elemento.id);
        const estaArrastrando = elementoArrastrando === elemento.id;

        return (
          <motion.div
            key={elemento.id}
            draggable={!yaEnMochila}
            onDragStart={(e) => !yaEnMochila && handleDragStart(e, elemento)}
            onDragEnd={handleDragEnd}
            className={`elemento-arrastrable ${
              yaEnMochila ? "elemento-usado" : ""
            } ${estaArrastrando ? "elemento-arrastrando" : ""}`}
            style={{
              ...elemento.posicion,
            }}
            whileHover={!yaEnMochila ? { scale: 1.15, y: -5 } : {}}
            whileTap={!yaEnMochila ? { scale: 0.9 } : {}}
            animate={estaArrastrando ? { scale: 0.7, opacity: 0.5 } : {}}
          >
            <img
              src={elemento.imagen}
              alt={elemento.nombre}
              className="elemento-imagen"
              draggable={false}
            />

            <span className="elemento-nombre">{elemento.nombre}</span>

            {yaEnMochila && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="elemento-check"
              >
                ✓
              </motion.div>
            )}

            {!yaEnMochila && (
              <motion.div
                className="elemento-brillo"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 15px rgba(59, 130, 246, 0.6)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Mini iconos de elementos agregados */}
      {elementosEnMochila.length > 0 && !juegoCompletado && (
        <div className="elementos-agregados-container">
          <p className="elementos-agregados-titulo">En mochila:</p>
          {elementosEnMochila.map((elementoId, index) => {
            const elemento = elementos.find((e) => e.id === elementoId);
            return (
              <motion.div
                key={elementoId}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="mini-elemento"
                onClick={() => handleRemoverElemento(elementoId)}
                title={`Clic para quitar ${elemento.nombre}`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >
                <img
                  src={elemento.imagen}
                  alt={elemento.nombre}
                  className="mini-elemento-imagen"
                  draggable={false}
                />

                <div className="mini-elemento-x">×</div>
              </motion.div>
            );
          })}
        </div>
      )}
      {/* Mensaje de completado */}
      <AnimatePresence>
        {juegoCompletado && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mensaje-completado"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="mensaje-completado-emoji"
            >
              🎉
            </motion.div>
            <p className="mensaje-completado-titulo">¡Excelente!</p>
            <p className="mensaje-completado-subtitulo">Mochila preparada</p>
            <p className="mensaje-completado-texto">
              ¡Estás listo para la aventura!
            </p>

            <div className="mensaje-completado-checks">
              {elementos.map((elemento) => (
                <div key={elemento.id} className="mensaje-completado-check">
                  ✓
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partículas de celebración */}
      {juegoCompletado && (
        <div className="particulas-container">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2,
                delay: i * 0.03,
                ease: "easeOut",
              }}
              className="particula"
              style={{
                background: [
                  "#f59e0b",
                  "#10b981",
                  "#3b82f6",
                  "#ef4444",
                  "#8b5cf6",
                ][i % 5],
              }}
            />
          ))}
        </div>
      )}
    </ContenedorCapas>
  );
};

const MinijuegoMochila = () => {
  const textoNarrador =
    "Antes de salir a explorar, es importante preparar una mochila con elementos esenciales. " +
    "¿Puedes ayudar a empacar todo lo necesario?";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-transparent to-transparent"
        posicionTexto="arriba-centro"
        estiloTexto="centrado"
        conFondo="sutil"
        mostrarTexto={true}
      >
        <ContenidoMinijuegoMochila />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default MinijuegoMochila;
