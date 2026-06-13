export interface InformacionEntidad {
  entidad: string;
  area?: string;
  direccion?: string;
  telefono?: string;
  url?: string;
  oficinas?: string[];
  urls?: string[];
  tarifas?: Array<{
    codigo: string;
    monto_usd: number;
    descripcion: string;
  }>;
}

export interface CostoOption {
  monto: number;
  moneda: string;
  exoneracion?: string;
  adicional?: string;
}

export interface DocumentoApostilla {
  id: number;
  tramite: string;
  documento: string;
  vigencia_sugerida?: string;
  requisitos: string[];
  costo: CostoOption;
  firmas_previas: string[];
  informacion: InformacionEntidad[];
}

export interface CertificacionesData {
  titulo: string;
  indicaciones_generales: string[];
  moneda_base: string;
  documentos: DocumentoApostilla[];
}
