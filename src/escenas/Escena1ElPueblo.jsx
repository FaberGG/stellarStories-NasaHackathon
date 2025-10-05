import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import BotonDialogo from "../components/BotonDialogo";
import Dialogo from "../components/Dialogo";
import { motion } from "framer-motion";
import fondoEscuela from "../assets/img/escena1/fondo_escena_1.png";
import "../styles/CapaIlustracion.css";
import "../styles/Escena1.css";

const ContenidoEscena1 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [personajeActivo, setPersonajeActivo] = useState(null);

  // Estados para diálogos
  const [mostrarDialogoJavier, setMostrarDialogoJavier] = useState(false);
  const [mostrarDialogoMonica, setMostrarDialogoMonica] = useState(false);
  const [mostrarBotonJavier, setMostrarBotonJavier] = useState(true);
  const [mostrarBotonMonica, setMostrarBotonMonica] = useState(true);

  const handleClickPersonaje = (personaje) => {
    if (!interaccionCompletada(`saludo-${personaje}`)) {
      registrarInteraccion(`saludo-${personaje}`);
      setPersonajeActivo(personaje);

      setTimeout(() => {
        setPersonajeActivo(null);
      }, 2000);
    }
  };

  // Handlers para Javier
  const handleClickBotonJavier = () => {
    setMostrarBotonJavier(false);
    setMostrarDialogoJavier(true);
    registrarInteraccion("dialogo-javier-visto");
  };

  const handleCerrarDialogoJavier = () => {
    setMostrarDialogoJavier(false);
    setMostrarBotonJavier(true);
  };

  // Handlers para Mónica
  const handleClickBotonMonica = () => {
    setMostrarBotonMonica(false);
    setMostrarDialogoMonica(true);
    registrarInteraccion("dialogo-monica-visto");
  };

  const handleCerrarDialogoMonica = () => {
    setMostrarDialogoMonica(false);
    setMostrarBotonMonica(true);
  };

  return (
    <>
      {/* FONDO: Patio de la escuela */}
      <div className="fondo" style={{ zIndex: 1 }}>
        <img
          src={fondoEscuela}
          alt="Patio de la escuela"
          className="fondo-img"
        />
      </div>

      {/* CONTENEDOR DE ELEMENTOS INTERACTIVOS */}
      <ContenedorCapas className="contenedor">
        {/* BOTÓN DE DIÁLOGO - Javier (izquierda) */}
        <BotonDialogo
          visible={mostrarBotonJavier}
          onClick={handleClickBotonJavier}
          posicion={{ left: "20%", bottom: "45%" }}
          icono="💬"
          color="azul"
          tamaño="mediano"
        />

        {/* BOTÓN DE DIÁLOGO - Mónica (centro) */}
        <BotonDialogo
          visible={mostrarBotonMonica}
          onClick={handleClickBotonMonica}
          posicion={{ left: "55%", bottom: "50%" }}
          icono="💬"
          color="morado"
          tamaño="mediano"
        />

        {/* DIÁLOGO de Javier */}
        {mostrarDialogoJavier && (
          <div className="escena1-dialogo-javier">
            <Dialogo
              texto="¡Hola! Me llamo Javier."
              personaje="Javier"
              posicion="custom"
              posicionCustom={{ x: 0, y: 0 }}
              tipo="dialogo"
              duracion={0}
              onCerrar={handleCerrarDialogoJavier}
              visible={true}
              animarTexto={true}
              velocidadEscritura={120}
            />
          </div>
        )}

        {/* DIÁLOGO de Mónica */}
        {mostrarDialogoMonica && (
          <div className="escena1-dialogo-monica">
            <Dialogo
              texto=" me llamo Monica."
              personaje="Mónica"
              posicion="custom"
              posicionCustom={{ x: 40, y: -900 }}
              tipo="dialogo"
              duracion={0}
              onCerrar={handleCerrarDialogoMonica}
              visible={true}
              animarTexto={true}
              velocidadEscritura={100}
            />
          </div>
        )}
      </ContenedorCapas>
    </>
  );
};

const Escena1ElPueblo = () => {
  const textoNarrador =
    "Había una vez, en un rinconcito del Cauca, dos amigos inseparables: Mónica, una tierna osita de anteojos muy curiosa, y Javier, un capibara juguetón al que le encantaba aprender cosas nuevas.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-green-100 to-blue-100"
        posicionTexto="arriba-centro"
        estiloTexto="centrado"
      >
        <ContenidoEscena1 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena1ElPueblo;
