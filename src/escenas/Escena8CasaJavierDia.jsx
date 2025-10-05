import React, { useState, useEffect } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import Dialogo from "../components/Dialogo";
import "../styles/Escena8.css";
import fondo8 from "../assets/img/escena8/fondo8.png";

/**
 * ESCENA 8 - Casa de Javier al día siguiente
 * Javier intenta conectarse a internet pero no hay señal
 * Interacción: Diálogo del padre explicando la situación
 */

const ContenidoEscena8 = () => {
  const { registrarInteraccion, interaccionCompletada } = useEscena();
  const [mostrarDialogoPapa, setMostrarDialogoPapa] = useState(false);

  useEffect(() => {
    // Mostrar el diálogo del papá después de 2 segundos
    const timer = setTimeout(() => {
      setMostrarDialogoPapa(true);
      registrarInteraccion("dialogo-papa-iniciado");
    }, 200);

    return () => clearTimeout(timer);
  }, [registrarInteraccion]);

  const handleCerrarDialogoPapa = () => {
    setMostrarDialogoPapa(false);
    if (!interaccionCompletada("dialogo-papa-completado")) {
      registrarInteraccion("dialogo-papa-completado");
    }
  };

  return (
    <ContenedorCapas>
      {/* Imagen de fondo - Casa de Javier de día */}
      <div className="escena8-fondo">
        <img
          src={fondo8}
          alt="Casa de Javier durante el día"
          className="escena8-imagen-fondo"
        />
      </div>

      {/* Diálogo del papá - Arriba derecha */}
      {mostrarDialogoPapa && (
        <Dialogo
          texto="No te preocupes hijo, algunas señales todavía están dormidas y tardarán un poco en volver. Lo importante es que en casa todo funciona bien."
          personaje="Papá Capibara"
          tipo="narrador"
          posicion="custom"
          posicionCustom={{ x: 50, y: 5 }}
          visible={mostrarDialogoPapa}
          duracion={8000}
          onCerrar={handleCerrarDialogoPapa}
          animarTexto={true}
          velocidadEscritura={80}
        />
      )}
    </ContenedorCapas>
  );
};

const Escena8CasaJavierDia = () => {
  const textoNarrador =
    "Al día siguiente, Javier encendió el celular de su papá, pero ¡nada de internet! Su papá le explicó que algunas señales todavía estaban dormidas y que tardarían un poco en volver. Aun así, Javier desayunó tranquilo, feliz de que en su casa todo funcionaba bien.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-yellow-50 to-orange-50"
        posicionTexto="arriba-izquierda"
        estiloTexto="compacto"
        conFondo="sutil"
      >
        <ContenidoEscena8 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena8CasaJavierDia;
