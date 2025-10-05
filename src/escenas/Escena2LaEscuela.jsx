import React, { useState } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import BotonDialogo from "../components/BotonDialogo";
import fondoEscuela from "../assets/img/escena2/fondo.jpg";
import "../styles/Escena2.css";

/**
 * ESCENA 2 - En la escuela
 * Usa el componente reutilizable BotonDialogo
 */

const ContenidoEscena2 = () => {
  const { registrarInteraccion } = useEscena();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);

  const handleClickBoton = () => {
    setMostrarBoton(false);
    setMostrarDialogo(true);
    registrarInteraccion("dialogo-profesora-visto");
  };

  const handleCerrarDialogo = () => {
    setMostrarDialogo(false);
    setMostrarBoton(true);
  };

  return (
    <ContenedorCapas>
      <div className="escena2-fondo-color" />

      <div className="escena2-contenedor-imagen">
        <img
          src={fondoEscuela}
          alt="Escuela"
          className="escena2-imagen-fondo"
        />
      </div>

      {/* BOTÓN DE DIÁLOGO - Componente reutilizable */}
      <BotonDialogo
        visible={mostrarBoton}
        onClick={handleClickBoton}
        posicion={{ right: "29%", top: "12%" }}
        icono="💬"
        color="azul"
        tamaño="mediano"
      />

      {/* DIÁLOGO de la profesora */}
      {mostrarDialogo && (
        <div className="escena2-dialogo-wrapper">
          <Dialogo
            texto="—Esta noche pasará algo muy especial en el espacio… ¡y debemos estar preparados!"
            personaje="Profesora Cóndor"
            posicion="centro"
            tipo="narrador"
            duracion={0}
            onCerrar={handleCerrarDialogo}
            visible={true}
            animarTexto={true}
            velocidadEscritura={50}
          />
        </div>
      )}
    </ContenedorCapas>
  );
};

const Escena2LaEscuela = () => {
  const textoNarrador =
    "Un día, mientras estaban en clase, su profesora, la sabia cóndor de los Andes, abrió sus enormes alas y les dijo con voz seria pero cariñosa:";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-transparent to-transparent"
        posicionTexto="centro-izquierda"
        estiloTexto="justificado"
        conFondo={false}
        mostrarTexto={true}
      >
        <ContenidoEscena2 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena2LaEscuela;
