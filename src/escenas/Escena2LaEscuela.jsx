import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import { motion } from "framer-motion";
import fondoEscuela from "../assets/img/escena2/fondo.png";
import personajes from "../assets/img/escena2/personajes.png";
/**
 * ESCENA 2 - En la escuela
 * La profesora cóndor explica sobre la tormenta solar
 * Interacción: Click en el proyector para ver animación del Sol
 * Hover en el tablero para info educativa
 */

const ContenidoEscena2 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  const [proyectorActivo, setProyectorActivo] = useState(false);
  const [mostrarInfoTablero, setMostrarInfoTablero] = useState(false);

  const handleClickProyector = () => {
    if (!interaccionCompletada("ver-proyector")) {
      registrarInteraccion("ver-proyector");
      setProyectorActivo(true);

      setTimeout(() => {
        setProyectorActivo(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img
          src={fondoEscuela}
          alt="Aula de madera con pupitres"
          className="w-full h-full object-cover"
        />
      </div>
      <ContenedorCapas>
        {/* PROFESORA: Cóndor frente al tablero */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-[25%]"
          style={{ zIndex: 10 }}
        >
          <img
            src={personajes}
            alt="Profesora Cóndor y estudiantes"
            className="h-8"
          />
        </div>

        {/* DIÁLOGO de la profesora */}
        {mostrarDialogo && (
          <Dialogo
            texto="—Esta noche pasará algo muy especial en el espacio… ¡y debemos estar preparados!"
            personaje="Profesora Cóndor"
            posicion="centro"
            tipo="dialogo"
            duracion={0}
            onCerrar={() => setMostrarDialogo(false)}
          />
        )}

        {/* Info educativa */}
        {/* <div
          className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs"
          style={{ zIndex: 100 }}
        >
          <h3 className="text-xs font-bold mb-1">💡 ¿Sabías qué?</h3>
          <p className="text-xs leading-relaxed">
            Las tormentas solares son explosiones en el Sol que envían energía y
            partículas al espacio. ¡Pueden afectar la tecnología en la Tierra!
          </p>
        </div> */}
      </ContenedorCapas>
    </>
  );
};

const Escena2LaEscuela = () => {
  const textoNarrador =
    "Un día, mientras estaban en clase, su profesora, la sabia cóndor de los Andes, abrió sus enormes alas y les dijo con voz seria pero cariñosa:";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-amber-50 to-orange-50"
      >
        <ContenidoEscena2 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena2LaEscuela;
