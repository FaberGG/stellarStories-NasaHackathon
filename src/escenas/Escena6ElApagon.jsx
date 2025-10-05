import React, { useState, useEffect } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import "../styles/Escena6.css";

// Importar imagen
import fondoApagon from "../assets/img/escena6/fondo.png";

/**
 * ESCENA 6 - El Apagón
 * La ciudad se queda sin luz por la tormenta solar
 * Interacción: Diálogos de Javier y Mónica reaccionando al apagón
 */

const ContenidoEscena6 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogoJavier, setMostrarDialogoJavier] = useState(false);
  const [mostrarDialogoMonica, setMostrarDialogoMonica] = useState(false);
  const [apagonIniciado, setApagonIniciado] = useState(false);

  useEffect(() => {
    // Iniciar el apagón después de 2 segundos
    const timerApagon = setTimeout(() => {
      setApagonIniciado(true);
      registrarInteraccion("apagon-iniciado");

      // Mostrar diálogo de Javier después de 1 segundo
      setTimeout(() => {
        setMostrarDialogoJavier(true);
      }, 1000);

      // Mostrar diálogo de Mónica después de 2.5 segundos
      setTimeout(() => {
        setMostrarDialogoMonica(true);
      }, 2500);
    }, 2000);

    return () => clearTimeout(timerApagon);
  }, [registrarInteraccion]);

  const handleCerrarDialogoJavier = () => {
    setMostrarDialogoJavier(false);
    if (!interaccionCompletada("dialogo-javier")) {
      registrarInteraccion("dialogo-javier");
    }
  };

  const handleCerrarDialogoMonica = () => {
    setMostrarDialogoMonica(false);
    if (!interaccionCompletada("dialogo-monica")) {
      registrarInteraccion("dialogo-monica");
    }
  };

  return (
    <ContenedorCapas>
      {/* Imagen de fondo */}
      <div className="escena6-fondo">
        <img
          src={fondoApagon}
          alt="Apagón en la ciudad"
          className="escena6-imagen-fondo"
        />
      </div>

      {/* Efecto de oscurecimiento progresivo al iniciarse el apagón */}
      {apagonIniciado && <div className="escena6-oscurecimiento" />}

      {/* Diálogo de Javier (pensamiento) - Posición izquierda */}
      {mostrarDialogoJavier && (
        <Dialogo
          texto="Es normal"
          personaje="Javier"
          tipo="pensamiento"
          posicion="custom"
          posicionCustom={{ x: 30, y: 5 }}
          visible={mostrarDialogoJavier}
          duracion={6000}
          onCerrar={handleCerrarDialogoJavier}
          animarTexto={true}
          velocidadEscritura={120}
        />
      )}

      {/* Diálogo de Mónica (diálogo normal) - Posición derecha */}
      {mostrarDialogoMonica && (
        <Dialogo
          texto="¿Qué está pasando?"
          personaje="Mónica"
          tipo="dialogo"
          posicion="custom"
          posicionCustom={{ x: 70, y: 1 }}
          visible={mostrarDialogoMonica}
          duracion={6000}
          onCerrar={handleCerrarDialogoMonica}
          animarTexto={true}
          velocidadEscritura={80}
        />
      )}

      {/* Efecto de parpadeo inicial (antes del apagón) */}
      {!apagonIniciado && <div className="escena6-parpadeo" />}
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
        posicionTexto="abajo-centro"
        estiloTexto="expandido"
        conFondo={false}
      >
        <ContenidoEscena6 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena6ElApagon;
