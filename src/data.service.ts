import { CERTIFICACIONES_DATA } from "./data";
import { DocumentoApostilla } from "./certification.model";

/**
 * Normaliza una cadena de texto eliminando tildes y convirtiéndola a minúsculas
 */
export function removeAccentsAndNormalize(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Servicio simulado para consultar y filtrar los datos de la cadena de certificación
 */
export const DataService = {
  /**
   * Obtiene todos los documentos disponibles
   */
  getAllDocumentos(): DocumentoApostilla[] {
    return CERTIFICACIONES_DATA.documentos;
  },

  /**
   * Obtiene las indicaciones generales para mostrar en el home
   */
  getIndicacionesGenerales(): string[] {
    return CERTIFICACIONES_DATA.indicaciones_generales;
  },

  /**
   * Filtra las sugerencias por coincidencia de texto (ignorando tildes y mayúsculas)
   */
  buscarDocumentos(query: string): DocumentoApostilla[] {
    const normalizedQuery = removeAccentsAndNormalize(query);
    if (!normalizedQuery) {
      return [];
    }

    // Buscamos coincidencia en el nombre del documento, trámites o requisitos
    return CERTIFICACIONES_DATA.documentos.filter((doc) => {
      const normalizedDocName = removeAccentsAndNormalize(doc.documento);
      const normalizedTramite = removeAccentsAndNormalize(doc.tramite);
      
      // Coincidencia rápida en el título o trámite
      if (normalizedDocName.includes(normalizedQuery) || normalizedTramite.includes(normalizedQuery)) {
        return true;
      }

      // Opcional: Buscar en requisitos para máxima asertividad
      const matchRequisitos = doc.requisitos.some(req => 
        removeAccentsAndNormalize(req).includes(normalizedQuery)
      );

      return matchRequisitos;
    });
  },

  /**
   * Obtiene un documento por su ID
   */
  getDocumentoById(id: number): DocumentoApostilla | undefined {
    return CERTIFICACIONES_DATA.documentos.find((doc) => doc.id === id);
  }
};
