import React from "react";
import "../styles/CapaIlustracion.css";

/**
 * Componente para manejar capas de ilustraciones
 * Permite superponer fondos, personajes, objetos interactivos
 */
const CapaIlustracion = ({
  src,
  alt,
  zIndex = 0,
  className = "",
  animacion = "",
  onClick,
  style = {},
}) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`capa-ilustracion ${animacion} ${className} ${
        onClick ? "clickable" : ""
      }`}
      style={{
        zIndex,
        pointerEvents: onClick ? "auto" : "none",
        ...style,
      }}
      draggable={false}
    />
  );
};

/**
 * Contenedor de capas - Sistema de composición de imágenes
 */
export const ContenedorCapas = ({ children, className = "" }) => {
  return <div className={`contenedor-capas ${className}`}>{children}</div>;
};

/**
 * Componente para objetos arrastrables en la escena
 */
export const ObjetoArrastrable = ({
  id,
  src,
  alt,
  posicionInicial = { x: 0, y: 0 },
  onSoltar,
  children,
  className = "",
}) => {
  const [posicion, setPosicion] = React.useState(posicionInicial);
  const [arrastrando, setArrastrando] = React.useState(false);

  const handleDragStart = (e) => {
    setArrastrando(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("objetoId", id);
  };

  const handleDragEnd = (e) => {
    setArrastrando(false);
    if (onSoltar) {
      onSoltar(id, posicion);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`objeto-arrastrable ${
        arrastrando ? "arrastrando" : ""
      } ${className}`}
      style={{
        left: `${posicion.x}px`,
        top: `${posicion.y}px`,
      }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      ) : (
        children
      )}
    </div>
  );
};

/**
 * Zona de soltar objetos
 */
export const ZonaSoltar = ({
  id,
  onSoltar,
  aceptaObjetos = [],
  children,
  className = "",
  activa = false,
}) => {
  const [sobreZona, setSobreZona] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setSobreZona(true);
  };

  const handleDragLeave = () => {
    setSobreZona(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSobreZona(false);

    const objetoId = e.dataTransfer.getData("objetoId");

    if (aceptaObjetos.length === 0 || aceptaObjetos.includes(objetoId)) {
      if (onSoltar) {
        onSoltar(objetoId, id);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`zona-soltar ${sobreZona ? "sobre-zona" : ""} ${
        activa ? "activa" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default CapaIlustracion;
