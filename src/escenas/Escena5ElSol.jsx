import React, { useState, useEffect, useRef } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import "../styles/Escena5.css";

//importar imágenes
import solframe1 from "../assets/img/escena5/sol-frame1.png";
import solframe2 from "../assets/img/escena5/sol-frame2.png";
import solframe3 from "../assets/img/escena5/sol-frame3.png";
import solframe4 from "../assets/img/escena5/sol-frame4.png";
import solframe5 from "../assets/img/escena5/sol-frame5.png";
import imagenCME from "../assets/img/escena5/cme-sin-fondo.png";

/**
 * ESCENA 5 - En el Sol
 * El Sol hace un estornudo y dispara una CME (Eyección de Masa Coronal)
 * Interacción: Mantener presionado el sol para cargarlo hasta que estornude
 */

const ContenidoEscena5 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [frameActual, setFrameActual] = useState(0);
  const [presionando, setPresionando] = useState(false);
  const [estornudoCompletado, setEstornudoCompletado] = useState(false);
  const [cmeDisparada, setCmeDisparada] = useState(false);
  const [posicionCME, setPosicionCME] = useState(0);
  const [opacidadCME, setOpacidadCME] = useState(1);
  const [cargaDeshabilitada, setCargaDeshabilitada] = useState(false);
  const intervaloRef = useRef(null);
  const animacionCMERef = useRef(null);

  const totalFrames = 5;
  const completado = interaccionCompletada("cme-disparada");

  // Rutas de las imágenes
  const imagenesSol = [solframe1, solframe2, solframe3, solframe4, solframe5];

  // Manejar presión del sol
  const handlePresionar = () => {
    if (completado || cargaDeshabilitada) return;
    setPresionando(true);
  };

  const handleSoltar = () => {
    setPresionando(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  // Efecto para avanzar frames mientras se mantiene presionado
  useEffect(() => {
    if (presionando && frameActual < totalFrames - 1 && !cargaDeshabilitada) {
      intervaloRef.current = setInterval(() => {
        setFrameActual((prev) => {
          if (prev < totalFrames - 1) {
            return prev + 1;
          } else {
            clearInterval(intervaloRef.current);
            return prev;
          }
        });
      }, 400);
    }

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [presionando, frameActual, cargaDeshabilitada]);

  // Detectar cuando se completa la carga (frame 5)
  useEffect(() => {
    if (
      frameActual === totalFrames - 1 &&
      !estornudoCompletado &&
      !completado &&
      !cargaDeshabilitada
    ) {
      setEstornudoCompletado(true);
      setCargaDeshabilitada(true); // Deshabilitar la carga para siempre

      // Volver al estado de reposo después del estornudo
      setTimeout(() => {
        setFrameActual(0);

        // Disparar CME después de volver al reposo
        setTimeout(() => {
          setCmeDisparada(true);
          animarCME();
        }, 300);
      }, 800);
    }
  }, [frameActual, estornudoCompletado, completado, cargaDeshabilitada]);

  // Animar movimiento de la CME (solo horizontal, de izquierda a derecha)
  const animarCME = () => {
    let posicion = 0;
    let opacidad = 1;

    animacionCMERef.current = setInterval(() => {
      posicion += 1.2;

      // Comenzar a desvanecer cuando está en el 70% del recorrido
      if (posicion > 30) {
        // Calcular opacidad basada en la distancia restante
        opacidad = Math.max(0, 1 - (posicion - 10) / 30);
        console.log(opacidad);
      }

      setPosicionCME(posicion);
      setOpacidadCME(opacidad);

      if (posicion >= 100 || opacidad <= 0) {
        clearInterval(animacionCMERef.current);
        registrarInteraccion("cme-disparada");
      }
    }, 30);
  };

  // Limpiar intervalos al desmontar
  useEffect(() => {
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
      if (animacionCMERef.current) clearInterval(animacionCMERef.current);
    };
  }, []);

  return (
    <ContenedorCapas>
      {/* Imagen de fondo según el frame actual */}
      <div className="escena5-fondo">
        <img
          src={imagenesSol[frameActual]}
          alt={`Sol frame ${frameActual + 1}`}
          className="escena5-imagen-fondo"
        />
      </div>

      {/* Área clickeable sobre el sol */}
      {!completado && !cargaDeshabilitada && (
        <div
          className="escena5-area-sol"
          onMouseDown={handlePresionar}
          onMouseUp={handleSoltar}
          onMouseLeave={handleSoltar}
          onTouchStart={handlePresionar}
          onTouchEnd={handleSoltar}
        />
      )}

      {/* Barra de progreso */}
      {!completado && !cargaDeshabilitada && (
        <div className="escena5-progreso">
          <div className="escena5-progreso-instruccion">
            Mantén presionado el sol
          </div>
          <div className="escena5-progreso-texto">
            Carga solar: {Math.round((frameActual / (totalFrames - 1)) * 100)}%
          </div>
          <div className="escena5-progreso-barra">
            <div
              className="escena5-progreso-relleno"
              style={{ width: `${(frameActual / (totalFrames - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* CME volando hacia la Tierra (solo movimiento horizontal) */}
      {cmeDisparada && opacidadCME > 0 && (
        <div
          className="escena5-cme"
          style={{
            transform: `translateX(${posicionCME}%)`,
            opacity: opacidadCME,
          }}
        >
          <img
            src={imagenCME}
            alt="Eyección de Masa Coronal"
            className="escena5-cme-imagen"
          />
        </div>
      )}
    </ContenedorCapas>
  );
};

const Escena5ElSol = () => {
  const textoNarrador =
    "Muy lejos de allí, el Sol hizo un gran estornudo de fuego y luz, ¡Aaachís! Y esa chispa gigante salió disparada directo hacia la Tierra.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-purple-900 to-black"
        posicionTexto="arriba-centro"
        estiloTexto="centrado"
        conFondo={false}
      >
        <ContenidoEscena5 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena5ElSol;
