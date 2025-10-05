import React, { useState, useEffect } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import "../styles/Escena10.css";
import fondo10 from "../assets/img/escena10/fondo10.png";

/**
 * ESCENA 10 - Escuela - Mónica y Javier
 * Mónica cuenta sus travesuras en casa durante el apagón
 * Interacción: Diálogo de Mónica en el centro
 */

const ContenidoEscena10 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogoMonica, setMostrarDialogoMonica] = useState(false);

  useEffect(() => {
    // Mostrar el diálogo de Mónica después de 2.5 segundos
    const timer = setTimeout(() => {
      setMostrarDialogoMonica(true);
      registrarInteraccion("dialogo-monica-iniciado");
    }, 500);

    return () => clearTimeout(timer);
  }, [registrarInteraccion]);

  const handleCerrarDialogoMonica = () => {
    setMostrarDialogoMonica(false);
    if (!interaccionCompletada("dialogo-monica-completado")) {
      registrarInteraccion("dialogo-monica-completado");
    }
  };

  return (
    <ContenedorCapas>
      {/* Imagen de fondo - Escuela */}
      <div className="escena10-fondo">
        <img
          src={fondo10}
          alt="Escuela con Mónica y Javier"
          className="fondo-img"
        />
      </div>

      {/* Diálogo de Mónica - Centro sin fondo */}
      {mostrarDialogoMonica && (
        <div className="escena10-dialogo-monica">
          <p className="escena10-dialogo-texto">
            <span className="escena10-personaje">Mónica:</span> Aaaay para la
            próxima debo estar más preparada, pero al menos mi linterna
            sobrevivió
          </p>
        </div>
      )}
    </ContenedorCapas>
  );
};

const Escena10EscuelaMonicaJavier = () => {
  const textoNarrador =
    "Más tarde, en la escuela, Mónica corrió a contarle a Javier todas las travesuras que habían pasado en su casa: ¡agua fría, comida dañada y hasta el celular frito! Javier, muy tranquilo, le explicó que las tormentas solares son tan poderosas que a veces mandan tanta electricidad que los aparatos se confunden y se dañan.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-blue-50 to-green-50"
        posicionTexto="arriba-izquierda"
        estiloTexto="none"
        conFondo="sutil"
      >
        <ContenidoEscena10 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena10EscuelaMonicaJavier;
