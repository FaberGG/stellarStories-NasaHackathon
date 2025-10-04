import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";
import fondoEscuela from "../assets/img/escena1/fondo.png";
import "../styles/CapaIlustracion.css";

const ContenidoEscena1 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [personajeActivo, setPersonajeActivo] = useState(null);

  const handleClickPersonaje = (personaje) => {
    if (!interaccionCompletada(`saludo-${personaje}`)) {
      registrarInteraccion(`saludo-${personaje}`);
      setPersonajeActivo(personaje);

      setTimeout(() => {
        setPersonajeActivo(null);
      }, 2000);
    }
  };

  return (
    <>
      {/* FONDO: Patio de la escuela */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img
          src={fondoEscuela}
          alt="Patio de la escuela"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENEDOR DE ELEMENTOS INTERACTIVOS */}
      <ContenedorCapas>
        {/* Info educativa */}
        <div className="info-educativa">
          <h3>💡 ¿Sabías qué?</h3>
          <p>
            El Cauca es una región hermosa de Colombia con mucha biodiversidad.
            ¡Aquí comienza nuestra aventura sobre el clima espacial!
          </p>
        </div>
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
      >
        <ContenidoEscena1 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena1ElPueblo;
