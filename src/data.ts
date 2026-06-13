import { CertificacionesData } from "./types";

export const CERTIFICACIONES_DATA: CertificacionesData = {
  "titulo": "Cadena de certificaciones",
  "indicaciones_generales": [
    "Es responsabilidad de la entidad emisora el registro y actualización de firma de sus funcionarios.",
    "Para documentos emitidos con firma digital, debe contarse con la metodología de verificación digital correspondiente."
  ],
  "moneda_base": "PEN",
  "documentos": [
    {
      "id": 1,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados de Estudios de Primaria, Secundaria u otros niveles de Educación Básica Regular (E.B.R.) expedidos por entidades académicas nacionales.",
      "requisitos": [
        "Certificados de estudios con código modular y código QR emitidos en línea.",
        "Si son expedidos por instituciones educativas: firmados por el director y legalizados por el Ministerio de Educación.",
        "Si son expedidos por el MINEDU: legalizados por el Ministerio de Educación.",
        "Certificado de estudios en formato tradicional amarillo, expedido solo hasta el año 2020: original firmado por la UGEL y el Ministerio de Educación.",
        "Certificado de estudios original expedido por la UGEL por proceso de cierre o cierre definitivo de la institución educativa: firmado por la UGEL y el Ministerio de Educación.",
        "Para documentos dirigidos a España, se recomienda contar previamente con firma de la UGEL y del Ministerio de Educación.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN",
        "exoneracion": "Gratis para ciudadanos peruanos que acrediten dicha condición; no existe restricción en la cantidad de documentos presentados."
      },
      "firmas_previas": [
        "Director de la institución educativa, cuando corresponda.",
        "UGEL, cuando corresponda.",
        "Ministerio de Educación."
      ],
      "informacion": [
        {
          "entidad": "Ministerio de Educación - MINEDU",
          "area": "Archivo de Actas y Certificados",
          "direccion": "Calle Del Comercio Nº 193, San Borja, espalda del edificio del Ministerio de Cultura",
          "telefono": "(01) 224-0131",
          "url": "http://www.gob.pe/minedu"
        },
        {
          "entidad": "Unidades de Gestión Educativa Local de Lima Metropolitana, Lima Provincias y Callao",
          "url": "http://www.gob.pe/minedu"
        }
      ]
    },
    {
      "id": 2,
      "tramite": "Legalización o Apostilla",
      "documento": "Títulos y Certificados de Estudios emitidos por instituciones de Educación Superior Tecnológica, Pedagógica y Artística no universitaria.",
      "requisitos": [
        "Título emitido antes de 2016: documento original firmado por la Dirección Regional competente y por el Ministerio de Educación.",
        "Certificado de estudio emitido antes de 2018: documento original firmado por la Dirección Regional competente y por el Ministerio de Educación.",
        "Título emitido desde 2016: documento original firmado por el Ministerio de Educación.",
        "Certificado de estudio emitido desde 2018: documento original firmado por el Ministerio de Educación, bajo evaluación del MINEDU.",
        "Certificados emitidos por CETPRO: documento original firmado por la UGEL competente y por el Ministerio de Educación.",
        "Comprobante de pago por derecho de tramitación.",
        "Para beneficio de gratuidad se debe acreditar la condición de ciudadano peruano; no existe restricción en la cantidad de documentos presentados."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN",
        "exoneracion": "Gratis para ciudadanos peruanos que acrediten dicha condición."
      },
      "firmas_previas": [
        "Dirección Regional competente, cuando corresponda.",
        "UGEL competente, cuando corresponda.",
        "Ministerio de Educación."
      ],
      "informacion": [
        {
          "entidad": "Ministerio de Educación - MINEDU",
          "url": "http://www.gob.pe/minedu"
        }
      ]
    },
    {
      "id": 3,
      "tramite": "Legalización o Apostilla",
      "documento": "Constancias y otras certificaciones emitidas por instituciones de Educación Superior Tecnológica, Pedagógica y Artística no universitaria a ciudadanos peruanos y extranjeros.",
      "requisitos": [
        "Documento original y copia certificada.",
        "Documento certificado por la autoridad regional competente y por el Ministerio de Educación.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Autoridad regional competente.",
        "Ministerio de Educación."
      ],
      "informacion": []
    },
    {
      "id": 4,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados de Estudios, Diplomas de Grados Académicos, Diplomas de Título Profesional y otras constancias expedidas por universidades nacionales.",
      "requisitos": [
        "El documento universitario debe contar con Constancia de Verificación de Datos de Autoridades y/o Constancia de Inscripción emitida por el funcionario a cargo de la Dirección de Documentación e Información Universitaria y Registro de Grados y Títulos de la SUNEDU.",
        "Comprobante de pago por derecho de tramitación.",
        "La Constancia de Verificación de Datos de Autoridades para certificado de estudio, diploma de grado académico y diploma de título profesional expedida a ciudadanos peruanos acreditados cuenta con exoneración de pago."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN",
        "exoneracion": "Gratis para la constancia indicada cuando el ciudadano peruano acredita dicha condición; no existe restricción en la cantidad de documentos presentados."
      },
      "firmas_previas": [
        "Jefe de la Unidad de Registros de Grados y Títulos de la SUNEDU, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Superintendencia Nacional de Educación Superior Universitaria - SUNEDU",
          "direccion": "Calle Aldabas Nº 317, Urb. Las Gardenias, Santiago de Surco",
          "telefono": "(01) 500-3930",
          "url": "http://enlinea.sunedu.gob.pe"
        }
      ]
    },
    {
      "id": 5,
      "tramite": "Legalización o Apostilla",
      "documento": "Copias certificadas de actas de nacimiento, matrimonio o defunción emitidas por oficinas de registros civiles de municipalidades en el Perú.",
      "vigencia_sugerida": "No mayor a 3 meses.",
      "requisitos": [
        "Acta certificada por el Registrador Civil de la Municipalidad.",
        "Acta legalizada por el Autenticador de firmas del RENIEC.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Certificador del Registro Nacional de Identificación y Estado Civil - RENIEC, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "RENIEC",
          "oficinas": [
            "Lima",
            "Piura",
            "Puno",
            "Iquitos",
            "Arequipa",
            "Tacna"
          ],
          "urls": [
            "http://www.reniec.gob.pe/portal/detalleNota.htm?nota=070",
            "http://www.reniec.gob.pe/portal/tramiteGeneral.htm"
          ]
        }
      ]
    },
    {
      "id": 6,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados o constancias de soltería expedidos por municipalidades en el Perú.",
      "vigencia_sugerida": "No mayor a 3 meses.",
      "requisitos": [
        "Certificado o constancia de soltería original.",
        "Documento certificado por el Registrador Civil de la Municipalidad.",
        "Documento legalizado por el Autenticador de firmas del RENIEC.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Certificador del RENIEC, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "RENIEC",
          "urls": [
            "http://www.reniec.gob.pe/portal/detalleNota.htm?nota=070",
            "http://www.reniec.gob.pe/portal/tramiteGeneral.htm"
          ]
        }
      ]
    },
    {
      "id": 7,
      "tramite": "Legalización o Apostilla",
      "documento": "Copias certificadas de actas de nacimiento, matrimonio o defunción emitidas por el RENIEC.",
      "vigencia_sugerida": "No mayor a 3 meses.",
      "requisitos": [
        "Acta debidamente certificada por el Certificador del RENIEC.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Certificador del RENIEC, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "RENIEC",
          "urls": [
            "http://www.reniec.gob.pe/portal/detalleNota.htm?nota=070",
            "http://www.reniec.gob.pe/portal/tramiteGeneral.htm"
          ]
        }
      ]
    },
    {
      "id": 8,
      "tramite": "Legalización o Apostilla",
      "documento": "Constancias de inscripción de matrimonio y otras certificaciones emitidas por el RENIEC.",
      "vigencia_sugerida": "No mayor a 3 meses.",
      "requisitos": [
        "Constancia debidamente certificada por el Certificador del RENIEC.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Certificador del RENIEC."
      ],
      "informacion": []
    },
    {
      "id": 9,
      "tramite": "Legalización o Apostilla",
      "documento": "Actas, constancias de bautismo, confirmación, matrimonio, defunción y otros sacramentos relacionados al estado canónico; constancias de no registro y cartas de invitación expedidas por congregaciones religiosas reconocidas por la Iglesia Católica en el Perú.",
      "requisitos": [
        "Documento eclesiástico original y copias certificadas.",
        "Documentos legalizados por el Arzobispado de la jurisdicción correspondiente.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Obispo.",
        "Vicario General.",
        "Canciller.",
        "Vicecanciller.",
        "Notario eclesiástico.",
        "Firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Arzobispado de Lima",
          "direccion": "Jr. Chancay Nº 282, Cercado de Lima",
          "telefono": "(01) 203-7700",
          "url": "http://www.arzobispadodelima.org/index.php"
        }
      ]
    },
    {
      "id": 10,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados médicos y otros documentos emitidos por profesionales en medicina humana.",
      "requisitos": [
        "Certificados, informes médicos, constancias u otros documentos originales.",
        "Documentos legalizados por el área o funcionario competente del Ministerio de Salud, EsSalud o Decano del Colegio Médico del Perú, según corresponda al documento de origen.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario del área competente de EsSalud.",
        "Firma del funcionario del área competente del Ministerio de Salud.",
        "Firma del médico que expide y del Decano del Colegio Médico del Perú."
      ],
      "informacion": [
        {
          "entidad": "Ministerio de Salud",
          "direccion": "Av. Salaverry Nº 801, Jesús María",
          "telefono": "(01) 315-6600",
          "url": "https://gob.pe/minsa"
        },
        {
          "entidad": "EsSalud",
          "direccion": "Av. Arenales Nº 1302, Jesús María, Lima, Perú",
          "telefono": "(511) 265 6000",
          "url": "http://www.essalud.gob.pe"
        },
        {
          "entidad": "Colegio Médico del Perú",
          "direccion": "Av. 28 de Julio 776, Miraflores, Lima 18, Lima, Perú",
          "telefono": "(01) 641 9847",
          "url": "https://www.cmp.org.pe"
        }
      ]
    },
    {
      "id": 11,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados o constancias emitidas por colegios profesionales.",
      "requisitos": [
        "Certificados o constancias originales, o copias certificadas.",
        "Documentos certificados por el Decano del Colegio Profesional correspondiente o funcionario competente.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del profesional colegiado.",
        "Firma del representante del colegio profesional competente, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": []
    },
    {
      "id": 12,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados de antecedentes penales.",
      "requisitos": [
        "Certificado digital emitido por el Registro Nacional de Condenas.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario del Registro Nacional de Condenas competente, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Registro Nacional de Condenas",
          "direccion": "Av. Abancay s/n, cuadra 5",
          "telefono": "(01) 410-1414 anexo 12145",
          "url": "http://www.pj.gob.pe"
        }
      ]
    },
    {
      "id": 13,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados de antecedentes judiciales.",
      "requisitos": [
        "Certificado original, físico o digital, emitido por el Instituto Nacional Penitenciario.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario del Instituto Nacional Penitenciario competente, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Instituto Nacional Penitenciario",
          "direccion": "Jr. Carabaya Nº 456, Lima",
          "telefono": "(01) 426-1578",
          "url": "http://www.gob.pe/inpe"
        }
      ]
    },
    {
      "id": 14,
      "tramite": "Legalización o Apostilla",
      "documento": "Certificados de antecedentes policiales.",
      "requisitos": [
        "Certificado original emitido por la División de Identificación Criminalística de la PNP.",
        "Documento emitido para viaje al extranjero o uso en el extranjero.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del jefe del departamento de antecedentes policiales de la División de Criminalística, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Dirección de Criminalística - PNP",
          "direccion": "Av. Aramburú Nº 550, Surquillo",
          "telefono": "(01) 222-7364",
          "url": "https://www.policia.gob.pe"
        }
      ]
    },
    {
      "id": 15,
      "tramite": "Legalización o Apostilla",
      "documento": "Documentos expedidos por la Dirección General de Migraciones y Naturalización del Ministerio del Interior.",
      "requisitos": [
        "Original o copia certificada por los funcionarios del área competente, según corresponda.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del certificador del área competente que emite el documento, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Dirección General de Migraciones y Naturalización - DIGEMIN",
          "direccion": "Av. España Nº 731, Breña",
          "telefono": "(01) 417-6900",
          "url": "http://www.gob.pe/migraciones"
        }
      ]
    },
    {
      "id": 16,
      "tramite": "Legalización o Apostilla",
      "documento": "Documentos notariales.",
      "requisitos": [
        "Documento protocolar o extra protocolar original expedido por notario público peruano.",
        "Para documentos privados: documento original con legalización de firma notarial como persona natural y/o jurídica, según corresponda.",
        "Para estados de cuenta, cartas de referencia bancaria y documentos similares: legalización de copia notarial.",
        "Los documentos protocolares, extra protocolares, legalizaciones de firmas y copias notariales deben contar con certificación del Colegio de Notarios de la jurisdicción notarial o de la Junta de Decanos de los Colegios de Notarios del Perú.",
        "Comprobante de pago por derecho de tramitación.",
        "Los documentos con más de una página deben contar con sello de unión y/o numeración correlativa."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del representante del Colegio de Notarios de la jurisdicción notarial.",
        "Firma del representante de la Junta de Decanos de los Colegios de Notarios del Perú.",
        "Los representantes deben tener firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Junta de Decanos de los Colegios de Notarios del Perú",
          "direccion": "Paseo de la República Nº 3565, San Isidro",
          "telefono": "(01) 422-8160",
          "url": "https://www.juntadedecanos.org.pe"
        }
      ]
    },
    {
      "id": 17,
      "tramite": "Legalización o Apostilla",
      "documento": "Constancia de trabajo, prácticas profesionales, prácticas preprofesionales y otros.",
      "requisitos": [
        "Para documentos emitidos por instituciones públicas: original o copia previamente certificado por el fedatario de la institución pública, según corresponda.",
        "Para documentos privados con fecha de emisión menor a 3 años: documento original emitido por la institución privada con legalización de firma notarial de persona jurídica de quien suscribe.",
        "Para documentos privados con fecha de emisión mayor a 3 años: documento original o copia certificada por el fedatario o certificador del Ministerio de Trabajo.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Fedatario de la institución pública, cuando corresponda.",
        "Notario, para legalización de firma de persona jurídica, cuando corresponda.",
        "Fedatario o certificador del Ministerio de Trabajo, cuando corresponda."
      ],
      "informacion": [
        {
          "entidad": "Ministerio de Trabajo y Promoción del Empleo",
          "direccion": "Av. Gral. Salaverry 655, Jesús María",
          "telefono": "(01) 630-6000",
          "url": "https://www.gob.pe/mtpe"
        }
      ]
    },
    {
      "id": 18,
      "tramite": "Legalización o Apostilla",
      "documento": "Documentos emitidos por funcionarios del Estado.",
      "requisitos": [
        "Documento original o copia certificada por el fedatario o certificador del área competente de la emisión o certificación del documento.",
        "Comprobante de pago por derecho de tramitación.",
        "La copia de expedientes de actos registrales municipales debe ser certificada únicamente por el registrador civil correspondiente."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario competente de la emisión o certificación de documentos de la entidad, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": []
    },
    {
      "id": 19,
      "tramite": "Legalización o Apostilla",
      "documento": "Documentos provenientes de actuados judiciales.",
      "requisitos": [
        "Documento original o copia certificada por el presidente de la Corte Superior de Justicia de la jurisdicción judicial que emite o certifica los documentos.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario competente en la emisión o certificación de documentos judiciales.",
        "Firma del presidente de la Corte Superior de Justicia de la jurisdicción, con firma registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Poder Judicial",
          "url": "https://www.gob.pe/pj"
        }
      ]
    },
    {
      "id": 20,
      "tramite": "Legalización o Apostilla",
      "documento": "Traducciones efectuadas por Traductores Públicos Juramentados.",
      "requisitos": [
        "Traducción oficial física o digital firmada por Traductor Público Juramentado conforme al Manual de Traductores Públicos Juramentados.",
        "El documento que origina la traducción y la traducción deben estar unidos formalmente por el traductor público juramentado.",
        "También se admite traducción oficial sin certificación oficial, física o digital, firmada por Traductor Público Juramentado, conforme al manual; solo para uso en territorio peruano.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "El documento de origen debe contar con la cadena de certificación correspondiente, apostilla del país de origen o legalización/certificación por oficina consular peruana en el exterior y por el MRE.",
        "Firma del Traductor Público Juramentado debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Directorio de Traductores Públicos Juramentados",
          "url": "http://www.consulado.pe/paginas/traductores.aspx"
        },
        {
          "entidad": "Manual de Traductores",
          "url": "http://www.consulado.pe/Documents/Traductores/ManualdeTraductoresPublicosJuramentados-anexo-RM-0545-2020-RE.pdf"
        }
      ]
    },
    {
      "id": 21,
      "tramite": "Legalización o Apostilla",
      "documento": "Traducciones efectuadas por traductor certificado por el Colegio de Traductores del Perú.",
      "requisitos": [
        "Traducción certificada física o digital debidamente firmada por un representante del Colegio de Traductores del Perú.",
        "El documento que origina la traducción y la traducción deben estar unidos formalmente por el traductor colegiado.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "El documento de origen debe contar con la cadena de certificación correspondiente.",
        "Firma del traductor colegiado.",
        "Firma del representante del Colegio de Traductores del Perú debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Colegio de Traductores del Perú",
          "url": "https://www.colegiodetraductores.org.pe"
        }
      ]
    },
    {
      "id": 22,
      "tramite": "Legalización",
      "documento": "Documentos expedidos y/o certificados por funcionarios de oficinas consulares en el exterior.",
      "requisitos": [
        "Documento original o copia certificada expedida por funcionario consular competente.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario consular del Perú en el exterior debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Directorio de Oficinas Consulares del Perú",
          "url": "http://www.consulado.pe/paginas/Inicio.aspx"
        }
      ]
    },
    {
      "id": 23,
      "tramite": "Legalización",
      "documento": "Documentos expedidos y/o copias certificadas por funcionario consular extranjero acreditado en el Perú.",
      "requisitos": [
        "Documento original o copia certificada expedida por funcionario consular competente.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN"
      },
      "firmas_previas": [
        "Firma del funcionario consular extranjero acreditado en el Perú debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": []
    },
    {
      "id": 24,
      "tramite": "Legalización",
      "documento": "Documentos extranjeros legalizados o certificados por funcionario de consulado extranjero acreditado en el Perú.",
      "requisitos": [
        "Documento original o copia certificada expedida por funcionario consular competente.",
        "Comprobante de pago por derecho de tramitación.",
        "Recibo y comprobante de pago por reintegro consular."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN",
        "adicional": "Pago de tarifa por reintegro consular, según corresponda."
      },
      "firmas_previas": [
        "Firma del funcionario consular extranjero acreditado en el Perú debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": [
        {
          "entidad": "Tarifas por reintegro consular aplicables",
          "tarifas": [
            {
              "codigo": "14",
              "monto_usd": 20,
              "descripcion": "Documento sin timbres consulares: autorización de viaje consular peruano."
            },
            {
              "codigo": "15B",
              "monto_usd": 10,
              "descripcion": "Documento sin timbres consulares: poder fuera de registro exclusivamente para cobro de pensiones."
            },
            {
              "codigo": "16B",
              "monto_usd": 10,
              "descripcion": "Documento sin timbres consulares: carta poder consular peruana exclusivamente para cobro de pensiones."
            },
            {
              "codigo": "20B",
              "monto_usd": 31.25,
              "descripcion": "Legalización de cualquier certificación notarial sin disposición especial."
            },
            {
              "codigo": "22A",
              "monto_usd": 37.5,
              "descripcion": "Legalización de firmas de autoridades extranjeras acreditadas en el Perú, incluida Nunciatura Apostólica."
            },
            {
              "codigo": "22A",
              "monto_usd": 30.0,
              "descripcion": "Legalización de firmas de autoridades extranjeras acreditadas en documentos expedidos por la Santa Sede a ciudadanos extranjeros."
            },
            {
              "codigo": "23",
              "monto_usd": 1.25,
              "descripcion": "Legalización de firmas de autoridades extranjeras acreditadas en títulos profesionales o certificados de estudios otorgados en el extranjero a favor de nacionales, incluida Nunciatura Apostólica."
            },
            {
              "codigo": "23",
              "monto_usd": 1.0,
              "descripcion": "Legalización de firmas de autoridades extranjeras acreditadas en títulos profesionales o certificados de estudios otorgados en el extranjero a favor de nacionales, expedidos por la Santa Sede."
            },
            {
              "codigo": "28A",
              "monto_usd": 1.0,
              "descripcion": "Documento sin timbres consulares: certificado de supervivencia consular peruano."
            }
          ]
        }
      ]
    },
    {
      "id": 25,
      "tramite": "Legalización",
      "documento": "Documentos extranjeros legalizados o certificados por funcionario de consulado peruano en el exterior.",
      "requisitos": [
        "Documento original o copia certificada expedida por funcionario consular competente.",
        "Cartas poder: vigencia de 3 meses desde su emisión.",
        "Poderes fuera de registro: vigencia de 1 año desde su emisión.",
        "Escrituras públicas: vigencia hasta su revocatoria.",
        "Comprobante de pago por derecho de tramitación."
      ],
      "costo": {
        "monto": 31.0,
        "moneda": "PEN",
        "exoneracion": "Gratis para la legalización de firma de funcionario consular peruano sobre documentos de estudio —títulos y certificados de estudio— expedidos por entidades extranjeras, acreditando la nacionalidad peruana del titular del documento."
      },
      "firmas_previas": [
        "Firma del funcionario consular del Perú en el exterior debidamente registrada y actualizada en Cancillería."
      ],
      "informacion": []
    }
  ]
};
