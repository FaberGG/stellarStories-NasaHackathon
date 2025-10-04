import React from "react";
import "../styles/EscenaWrapper.css";

const EscenaWrapper = ({
  textoNarrador,
  children,
  mostrarTexto = true,
  fondoColor = "from-blue-50 to-blue-100",

  // Props de posicionamiento
  posicionTexto = "arriba-centro", // arriba-izquierda, arriba-centro, arriba-derecha, centro-izquierda, centro, centro-derecha, abajo-izquierda, abajo-centro, abajo-derecha

  // Props de estilo de texto
  estiloTexto = "centrado", // centrado, izquierda, derecha, justificado, curva-derecha, curva-izquierda, arco-ascendente, enfasis-central, compacto, expandido, flotante, suave, fuerte

  // Props de fondo (opcional)
  conFondo = false, // false (sin fondo), "oscuro", "sutil", "claro", "decorativo"

  // Props avanzadas
  claseAdicional = "", // Clases CSS adicionales personalizadas
}) => {
  // Construir las clases dinámicamente
  const obtenerClasesTexto = () => {
    let clases = `texto-narrador posicion-${posicionTexto} estilo-${estiloTexto}`;

    // Agregar clase de fondo si está especificado
    if (conFondo) {
      switch (conFondo) {
        case "oscuro":
          clases += " con-fondo";
          break;
        case "sutil":
          clases += " con-fondo-sutil";
          break;
        case "claro":
          clases += " con-fondo-claro";
          break;
        case "decorativo":
          clases += " con-borde-decorativo";
          break;
        default:
          if (typeof conFondo === "string") {
            clases += ` ${conFondo}`;
          }
      }
    }

    // Agregar clases adicionales si existen
    if (claseAdicional) {
      clases += ` ${claseAdicional}`;
    }

    return clases;
  };

  return (
    <div className="escena-container">
      {/* Fondo con gradiente */}
      <div className={`escena-fondo bg-gradient-to-b ${fondoColor}`} />

      {/* Área de contenido interactivo */}
      <div className="escena-contenido">{children}</div>

      {/* Texto del narrador superpuesto */}
      {mostrarTexto && textoNarrador && (
        <div className={obtenerClasesTexto()}>{textoNarrador}</div>
      )}
    </div>
  );
};

export default EscenaWrapper;

// ============================================
// DOCUMENTACIÓN DE USO
// ============================================

/**
 * EJEMPLOS DE USO DEL COMPONENTE EscenaWrapper
 *
 * 1. ESCENA BÁSICA (sin fondo, centrado arriba)
 * <EscenaWrapper
 *   textoNarrador="Había una vez en un reino lejano..."
 *   posicionTexto="arriba-centro"
 *   estiloTexto="centrado"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 2. ESCENA CON TEXTO A LA IZQUIERDA
 * <EscenaWrapper
 *   textoNarrador="Los amigos se reunieron en el bosque..."
 *   posicionTexto="centro-izquierda"
 *   estiloTexto="izquierda"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 3. ESCENA CON TEXTO CURVEADO (estilo cuento infantil)
 * <EscenaWrapper
 *   textoNarrador="Las nubes flotaban suavemente..."
 *   posicionTexto="arriba-derecha"
 *   estiloTexto="curva-izquierda"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 4. ESCENA ÉPICA (texto grande con fondo)
 * <EscenaWrapper
 *   textoNarrador="¡EL MOMENTO FINAL HABÍA LLEGADO!"
 *   posicionTexto="centro"
 *   estiloTexto="expandido"
 *   conFondo="decorativo"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 5. ESCENA MISTERIOSA (texto con fondo oscuro)
 * <EscenaWrapper
 *   textoNarrador="Un susurro emergió de las sombras..."
 *   posicionTexto="abajo-izquierda"
 *   estiloTexto="curva-derecha"
 *   conFondo="sutil"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 6. ESCENA CON TEXTO FLOTANTE ANIMADO
 * <EscenaWrapper
 *   textoNarrador="La magia llenaba el aire..."
 *   posicionTexto="centro"
 *   estiloTexto="flotante"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 7. ESCENA CON PÁRRAFO LARGO JUSTIFICADO
 * <EscenaWrapper
 *   textoNarrador="En lo profundo del bosque encantado, donde los árboles antiguos guardaban secretos milenarios y las criaturas mágicas danzaban bajo la luz de la luna, vivía una pequeña hada."
 *   posicionTexto="centro-izquierda"
 *   estiloTexto="justificado"
 *   conFondo="sutil"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 8. ESCENA PARA TÍTULO DE CAPÍTULO
 * <EscenaWrapper
 *   textoNarrador="Capítulo 3: El Bosque Encantado"
 *   posicionTexto="arriba-centro"
 *   estiloTexto="enfasis-central"
 *   conFondo="oscuro"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 9. ESCENA CON CONTRASTE FUERTE (para fondos complejos)
 * <EscenaWrapper
 *   textoNarrador="La batalla comenzó al amanecer."
 *   posicionTexto="centro"
 *   estiloTexto="fuerte"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 10. ESCENA CON TEXTO PEQUEÑO PARA TRANSICIÓN
 * <EscenaWrapper
 *   textoNarrador="Tres días después..."
 *   posicionTexto="arriba-centro"
 *   estiloTexto="compacto"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 11. ESCENA CON CLASES PERSONALIZADAS
 * <EscenaWrapper
 *   textoNarrador="Un momento especial..."
 *   posicionTexto="centro"
 *   estiloTexto="centrado"
 *   claseAdicional="mi-clase-personalizada"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * 12. ESCENA SIN TEXTO (solo ilustración)
 * <EscenaWrapper
 *   mostrarTexto={false}
 *   fondoColor="from-purple-100 to-pink-100"
 * >
 *   <ContenidoEscena />
 * </EscenaWrapper>
 *
 * PROPS DISPONIBLES:
 *
 * - textoNarrador: string - El texto que se mostrará
 * - mostrarTexto: boolean - Si se muestra o no el texto (default: true)
 * - fondoColor: string - Clases de Tailwind para el gradiente de fondo
 * - posicionTexto: string - Posición del texto (9 opciones)
 *   Opciones: "arriba-izquierda", "arriba-centro", "arriba-derecha",
 *            "centro-izquierda", "centro", "centro-derecha",
 *            "abajo-izquierda", "abajo-centro", "abajo-derecha"
 *
 * - estiloTexto: string - Estilo de alineación y formato (13 opciones)
 *   Opciones: "centrado", "izquierda", "derecha", "justificado",
 *            "curva-derecha", "curva-izquierda", "arco-ascendente",
 *            "enfasis-central", "compacto", "expandido",
 *            "flotante", "suave", "fuerte"
 *
 * - conFondo: false | string - Tipo de fondo para el texto (default: false)
 *   Opciones: false (sin fondo), "oscuro", "sutil", "claro", "decorativo"
 *
 * - claseAdicional: string - Clases CSS adicionales personalizadas
 */
