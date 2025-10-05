import React, { useState, useEffect } from "react";
import EscenaWrapper from "../components/EscenaWrapper";
import EscenaBase, { useEscena } from "../components/EscenaBase";
import { ContenedorCapas } from "../components/CapaIlustracion";
import "../styles/Escena7.css";

// Importar imagen
import fondo7 from "../assets/img/escena7/fondo7.png";

/**
 * ESCENA 7 - Las Auroras
 * El cielo se llena de auroras boreales por el clima espacial
 * Animaciones de brillo y partículas flotantes
 */

const ContenidoEscena7 = () => {
  const { registrarInteraccion } = useEscena();
  const [animacionIniciada, setAnimacionIniciada] = useState(false);

  useEffect(() => {
    // Iniciar animaciones después de un breve delay
    const timer = setTimeout(() => {
      setAnimacionIniciada(true);
      registrarInteraccion("auroras-vistas");
    }, 500);

    return () => clearTimeout(timer);
  }, [registrarInteraccion]);

  return (
    <ContenedorCapas>
      {/* Imagen de fondo */}
      <div className="escena7-fondo">
        <img
          src={fondo7}
          alt="Auroras boreales"
          className="escena7-imagen-fondo"
        />
      </div>

      {/* Capa de overlay para las auroras (3/4 superiores) */}
      {animacionIniciada && (
        <>
          {/* Efecto de brillo pulsante sobre las auroras */}
          <div className="escena7-brillo-auroras">
            <div className="escena7-onda escena7-onda-1" />
            <div className="escena7-onda escena7-onda-2" />
            <div className="escena7-onda escena7-onda-3" />
          </div>

          {/* Efecto de resplandor general */}
          <div className="escena7-resplandor" />

          {/* Partículas ascendentes (tipo 1 - pequeñas y rápidas) */}
          <div className="escena7-particulas-container">
            {[...Array(30)].map((_, i) => (
              <div
                key={`particula-pequena-${i}`}
                className="escena7-particula escena7-particula-pequena"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Partículas flotantes (tipo 2 - medianas y ondulantes) */}
          <div className="escena7-particulas-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={`particula-mediana-${i}`}
                className="escena7-particula escena7-particula-mediana"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Partículas grandes brillantes (tipo 3 - lentas y brillantes) */}
          <div className="escena7-particulas-container">
            {[...Array(15)].map((_, i) => (
              <div
                key={`particula-grande-${i}`}
                className="escena7-particula escena7-particula-grande"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 7}s`,
                  animationDuration: `${8 + Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Destellos aleatorios */}
          <div className="escena7-destellos-container">
            {[...Array(12)].map((_, i) => (
              <div
                key={`destello-${i}`}
                className="escena7-destello"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 50}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Rayos de luz verticales */}
          <div className="escena7-rayos-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={`rayo-${i}`}
                className="escena7-rayo"
                style={{
                  left: `${10 + i * 11}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </ContenedorCapas>
  );
};

const Escena7LasAuroras = () => {
  const textoNarrador =
    "De repente, una luz gigante pintó el cielo de colores. ¡Eran auroras boreales! Brillaban como pinceladas mágicas verdes, rosas y violetas, un regalo sorprendente del clima espacial.";

  return (
    <EscenaBase>
      <EscenaWrapper
        textoNarrador={textoNarrador}
        fondoColor="from-black to-purple-900"
        posicionTexto="abajo-centro"
        estiloTexto="centrado"
        conFondo={"sutil"}
      >
        <ContenidoEscena7 />
      </EscenaWrapper>
    </EscenaBase>
  );
};

export default Escena7LasAuroras;
