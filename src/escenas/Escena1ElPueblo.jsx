import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import { motion } from "framer-motion";
import fondoEscuela from "../assets/img/escena1/fondo_escena_1.png";
import img_javier from "../assets/img/escena1/javier.png";
import img_monica from "../assets/img/escena1/monica.png";
import "../styles/CapaIlustracion.css";
import "../styles/Escena1.css";

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
      <div className="fondo" style={{ zIndex: 1 }}>
        <img
          src={fondoEscuela}
          alt="Patio de la escuela"
          className="fondo-img"
        />
      </div>

      {/* CONTENEDOR DE ELEMENTOS INTERACTIVOS */}
      <ContenedorCapas className="contenedor">
        
        {/* PERSONAJE: Javier (Capibara) - Izquierda */}
        <motion.div
          className="personaje-interactivo-j"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClickPersonaje("javier")}
          animate={
            personajeActivo === "javier"
              ? { y: [0, -20, 0], rotate: [0, 5, -5, 0] }
              : {}
          }
          transition={{ duration: 0.6 }}
        >
          <div className="caja">

            <div className="name">Javier</div>
          </div>

          {/* Indicador de click */}
          {!interaccionCompletada("saludo-javier") && (
            <div className="indicador-click">
              👆 ¡Haz click!
            </div>
          )}
        </motion.div>

        {/* PERSONAJE: Mónica (Osa de anteojos) - Derecha */}
        <motion.div
          className="personaje-interactivo-m"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClickPersonaje("monica")}
          animate={
            personajeActivo === "monica"
              ? { y: [0, -20, 0], rotate: [0, -5, 5, 0] }
              : {}
          }
          transition={{ duration: 0.6 }}
        >
          <div className="caja">
            
            <div className="name">Mónica</div>
          </div>

          {!interaccionCompletada("saludo-monica") && (
            <div className="indicador-click">
              👆 ¡Haz click!
            </div>
          )}
        </motion.div>

        {/* Mensaje de bienvenida cuando interactúan */}
        {personajeActivo && (
          <motion.div
            className={`div-texto-click ${
                personajeActivo === "javier"
                  ? "texto-javier"
                  : personajeActivo === "monica"
                  ? "texto-monica"
                  : ""
              }`}
            style={{ zIndex: 50 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <p
              className="texto-click"
            >
              {personajeActivo === "javier"
                ? "¡Hola! Soy Javier 👋"
                : "¡Hola! Soy Mónica 👋"}
            </p>
          </motion.div>
        )}

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
