import React, { useEffect } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import "../styles/Escena9.css";
import fondo9 from "../assets/img/escena9/fondo9.png";

/**
 * ESCENA 9 - Casa de Mónica al día siguiente
 * Mónica descubre las consecuencias del apagón: agua fría y comida dañada
 */

const ContenidoEscena9 = () => {
  const { registrarInteraccion } = useEscena();

  useEffect(() => {
    // Registrar que la escena se visualizó
    const timer = setTimeout(() => {
      registrarInteraccion("escena9-visualizada");
    }, 1000);

    return () => clearTimeout(timer);
  }, [registrarInteraccion]);

  return (
    <ContenedorCapas>
      {/* Imagen de fondo - Casa de Mónica */}
      <div className="escena9-fondo">
        <img
          src={fondo9}
          alt="Casa de Mónica durante el día"
          className="escena9-imagen-fondo"
        />
      </div>
    </ContenedorCapas>
  );
};

const Escena9CasaMonicaDia = () => {
  const textoNarrador =
    "En cambio, Mónica tuvo un día muy distinto. Cuando abrió la ducha… ¡el agua salió helaaaada! Y al buscar su desayuno, descubrió que su nevera se había dañado y la comida estaba arruinada";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-blue-50 to-purple-50"
        posicionTexto="arriba-izquierda"
        estiloTexto="flotante"
        conFondo="sutil"
      >
        <ContenidoEscena9 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena9CasaMonicaDia;
