import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, MapPin, Phone, ExternalLink, CheckCircle, AlertCircle, Info, ArrowLeft,
  CheckSquare, Square, Building, Globe, Check, FileText, AlertTriangle,
  Award, Clock, Compass, HelpCircle, Map, DollarSign, Stamp, ArrowRight, ShieldCheck, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DataService } from "../data.service";

const CATEGORIAS_RAPIDAS = [
  { label: "Partidas / Actas", query: "actas de nacimiento" },
  { label: "Colegios / Estudios", query: "estudios" },
  { label: "Títulos Universitarios", query: "SUNEDU" },
  { label: "Antecedentes Penales", query: "antecedentes" },
  { label: "Traducciones Oficiales", query: "traducción" },
  { label: "Documentos Consulares", query: "consular" }
];

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checklistCompleted, setChecklistCompleted] = useState<{ [key: string]: boolean }>({});
  const [firmasCompletadas, setFirmasCompletadas] = useState<{ [key: string]: boolean }>({});
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  
  // Tab State
  const [activeTab, setActiveTab] = useState<"ruta" | "requisitos" | "directorio">("ruta");

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const documentos = useMemo(() => DataService.getAllDocumentos(), []);
  const indicacionesGenerales = useMemo(() => DataService.getIndicacionesGenerales(), []);

  const sugerencias = useMemo(() => {
    if (searchQuery.trim().length === 0) return [];
    return DataService.buscarDocumentos(searchQuery).slice(0, 8);
  }, [searchQuery]);

  const seleccionado = useMemo(() => {
    if (!selectedDocId) return null;
    return DataService.getDocumentoById(selectedDocId) || null;
  }, [selectedDocId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setChecklistCompleted({});
    setFirmasCompletadas({});
    setActiveTab("ruta"); // Reset tab on new document
  }, [selectedDocId]);

  const handleSelectDoc = (id: number) => {
    setSelectedDocId(id);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const toggleChecklist = (req: string) => {
    setChecklistCompleted(prev => ({ ...prev, [req]: !prev[req] }));
  };

  const toggleFirma = (firma: string) => {
    setFirmasCompletadas(prev => ({ ...prev, [firma]: !prev[firma] }));
  };

  const porcentajePreparacion = useMemo(() => {
    if (!seleccionado) return 0;
    const totalReqs = seleccionado.requisitos.length;
    const totalFirmas = seleccionado.firmas_previas.length;
    const totalSteps = totalReqs + totalFirmas;
    
    const reqsListos = seleccionado.requisitos.filter(r => checklistCompleted[r]).length;
    const firmasListas = seleccionado.firmas_previas.filter(f => firmasCompletadas[f]).length;
    
    if (totalSteps === 0) return 100;
    return Math.round(((reqsListos + firmasListas) / totalSteps) * 100);
  }, [seleccionado, checklistCompleted, firmasCompletadas]);

  /* ── Inline style helpers ── */
  const tabStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 8,
    padding: "14px 18px",
    fontSize: 13, fontWeight: 700,
    borderBottom: active ? "2px solid #e60024" : "2px solid transparent",
    color: active ? "#e60024" : "#6b7280",
    background: "transparent", border: "none", borderBottomStyle: "solid",
    cursor: "pointer", whiteSpace: "nowrap",
    transition: "color 0.15s, border-color 0.15s",
  });

  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* ══ HEADER ══ */}
      <header style={{ borderBottom: "1.5px solid #e5e7eb", background: "#fff", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link to="/" style={{ color: "#6b7280", padding: 6, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "color 0.15s" }}>
              <ArrowLeft size={20} />
            </Link>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e60024", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Stamp size={16} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>ApostillaFácil</span>
              <span style={{ color: "#e60024", fontWeight: 400, fontSize: 16 }}> Perú</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 999, padding: "6px 14px", fontSize: 12, color: "#6b7280" }}>
              <ShieldCheck size={13} color="#10b981" />
              Guía de Trámites
            </div>
          </div>
        </div>
      </header>

      {/* ══ SEARCH SECTION ══ */}
      <div style={{
        transition: "all 0.4s ease",
        ...(seleccionado
          ? { padding: "32px 24px", background: "#fff", borderBottom: "1.5px solid #e5e7eb" }
          : { flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "center", alignItems: "center", padding: "80px 24px 72px" }
        ),
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", textAlign: "center" as const }}>
          
          {!seleccionado && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 999, padding: "6px 14px", fontSize: 12, color: "#c2410c", fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}>
                <FileText size={13} />
                Guía Interactiva de Pasos
              </div>

              <h1 style={{ fontFamily: "'Georgia','Times New Roman',serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 16 }}>
                ¿Qué documento deseas{" "}
                <span style={{ color: "#e60024" }}>Apostillar?</span>
              </h1>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 520, lineHeight: 1.7, margin: "0 auto" }}>
                Busca tu documento para conocer la cadena exacta de firmas, requisitos y sedes autorizadas para evitar rechazos.
              </p>
            </div>
          )}

          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }} ref={autocompleteRef}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 16, display: "flex", alignItems: "center", pointerEvents: "none" }}>
                <Search size={18} color="#9ca3af" />
              </div>
              <input
                type="text"
                style={{
                  width: "100%", paddingLeft: 48, paddingRight: 40, paddingTop: 16, paddingBottom: 16,
                  borderRadius: 14,
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  fontSize: 14, fontWeight: 500,
                  color: "#111", outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                placeholder="Ej. Partida de nacimiento, Título universitario..."
                value={searchQuery}
                onFocus={(e) => { setShowSuggestions(true); e.currentTarget.style.borderColor = "#e60024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230,0,36,0.08)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", top: 0, bottom: 0, right: 14, display: "flex", alignItems: "center", background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 16, fontWeight: 700 }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{ position: "absolute", left: 0, right: 0, marginTop: 8, background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", overflow: "hidden", zIndex: 40, textAlign: "left" as const, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                >
                  {sugerencias.length > 0 ? (
                    <ul style={{ maxHeight: 320, overflowY: "auto", listStyle: "none", padding: 0, margin: 0 }}>
                      {sugerencias.map((doc) => (
                        <li key={doc.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <button
                            onClick={() => handleSelectDoc(doc.id)}
                            style={{ width: "100%", padding: "12px 16px", textAlign: "left" as const, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "background 0.1s", fontFamily: "inherit" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                          >
                            <div style={{ padding: 6, background: "#fff0f1", color: "#e60024", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <FileText size={14} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0, lineHeight: 1.4 }}>
                                {doc.documento}
                              </p>
                              <div style={{ marginTop: 4 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, padding: "2px 8px", background: "#f0fdf4", color: "#15803d", borderRadius: 6 }}>
                                  {doc.tramite}
                                </span>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : searchQuery.trim().length > 0 ? (
                    <div style={{ padding: 24, textAlign: "center" as const }}>
                      <AlertCircle size={28} color="#d1d5db" style={{ margin: "0 auto 8px" }} />
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>No encontramos resultados</p>
                    </div>
                  ) : (
                    <div style={{ padding: 16 }}>
                      <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10 }}>Accesos Rápidos</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {documentos.slice(0, 4).map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => handleSelectDoc(doc.id)}
                            style={{ padding: 10, textAlign: "left" as const, borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.15s", fontFamily: "inherit" }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "#e60024")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e60024", flexShrink: 0 }} />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{doc.documento}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!seleccionado && (
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: 8, maxWidth: 600, margin: "32px auto 0" }}>
              {CATEGORIAS_RAPIDAS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(item.query);
                    setShowSuggestions(true);
                  }}
                  style={{ fontSize: 12, fontWeight: 600, background: "#fff", color: "#374151", padding: "8px 16px", borderRadius: 999, border: "1.5px solid #e5e7eb", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e60024"; e.currentTarget.style.color = "#e60024"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ RESULTS AREA ══ */}
      {seleccionado && (
        <main style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "24px 24px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
            {/* Header Card */}
            <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
              <div style={{ padding: "24px 28px", display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, background: "#fff0f1", color: "#e60024", padding: "3px 10px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Award size={12} />
                      {seleccionado.tramite}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Georgia','Times New Roman',serif", fontSize: "clamp(1.3rem,3vw,1.6rem)", fontWeight: 900, color: "#111", lineHeight: 1.2 }}>
                    {seleccionado.documento}
                  </h3>
                </div>
                <div style={{ padding: 16, background: "#fafafa", borderRadius: 14, border: "1px solid #f3f4f6", textAlign: "center" as const, minWidth: 160 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#9ca3af", marginBottom: 8 }}>Preparación</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{ width: 80, background: "#e5e7eb", borderRadius: 999, height: 8, overflow: "hidden" }}>
                      <div style={{ background: "#10b981", height: "100%", transition: "width 0.5s ease", width: `${porcentajePreparacion}%`, borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#111" }}>{porcentajePreparacion}%</span>
                  </div>
                </div>
              </div>

              {/* TABS */}
              <div style={{ display: "flex", borderTop: "1px solid #f3f4f6", background: "#fafafa", paddingLeft: 12, paddingRight: 12, overflowX: "auto" }}>
                <button onClick={() => setActiveTab("ruta")} style={tabStyle(activeTab === "ruta")}>
                  <Map size={14} /> Ruta a Seguir
                </button>
                <button onClick={() => setActiveTab("requisitos")} style={tabStyle(activeTab === "requisitos")}>
                  <DollarSign size={14} /> Requisitos y Costos
                </button>
                <button onClick={() => setActiveTab("directorio")} style={tabStyle(activeTab === "directorio")}>
                  <Building size={14} /> Oficinas y FAQs
                </button>
              </div>
            </div>

            {/* ── TAB: RUTA A SEGUIR ── */}
            {activeTab === "ruta" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, background: "#fff", padding: "28px 32px" }}
              >
                <div style={{ position: "relative", borderLeft: "2px solid #e5e7eb", marginLeft: 16, paddingLeft: 32 }}>
                  
                  {/* PASO A */}
                  <div style={{ position: "relative", marginBottom: 40 }}>
                    <span style={{ position: "absolute", left: -49, top: 0, background: "#fff", border: "2px solid #6366f1", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#6366f1" }}>A</span>
                    <div style={{ background: "#eef2ff", padding: 20, borderRadius: 14, border: "1px solid #c7d2fe" }}>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#4338ca" }}>Punto de Emisión Original</span>
                        <span style={{ fontSize: 10, fontWeight: 700, background: "#c7d2fe", color: "#3730a3", padding: "2px 10px", borderRadius: 999 }}>Paso 1</span>
                      </div>
                      <h5 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, color: "#111", fontSize: 15, marginBottom: 6 }}>Adquisición del Documento</h5>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                        Debes contar con el documento físico o digital emitido por la entidad oficial encargada.
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", padding: "10px 14px", borderRadius: 10, border: "1px solid #c7d2fe", marginTop: 10 }}>
                        <Building size={14} color="#6366f1" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
                          {seleccionado.informacion && seleccionado.informacion.length > 0 ? seleccionado.informacion[0].entidad : "Entidad Emisora Competente"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PASO B */}
                  <div style={{ position: "relative", marginBottom: 40 }}>
                    <span style={{ position: "absolute", left: -49, top: 0, background: "#fff", border: "2px solid #f59e0b", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#f59e0b" }}>B</span>
                    <div style={{ background: "#fffbeb", padding: 20, borderRadius: 14, border: "1px solid #fde68a" }}>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#b45309", display: "flex", alignItems: "center", gap: 4 }}>
                          <AlertTriangle size={12} color="#d97706" /> Firma Previa Obligatoria
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 700, background: "#fde68a", color: "#78350f", padding: "2px 10px", borderRadius: 999 }}>Paso 2</span>
                      </div>
                      <h5 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, color: "#111", fontSize: 15, marginBottom: 6 }}>Certificación Intermedia</h5>
                      <p style={{ fontSize: 12, color: "#92400e", fontWeight: 500, background: "#fef3c7", padding: 12, borderRadius: 8, border: "1px solid #fde68a", marginBottom: 12 }}>
                        ⚠️ No vayas al Ministerio de Relaciones Exteriores sin tener las siguientes firmas:
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {seleccionado.firmas_previas.map((firma, i) => {
                          const estaCompleto = !!firmasCompletadas[firma];
                          return (
                            <button
                              key={i}
                              onClick={() => toggleFirma(firma)}
                              style={{
                                width: "100%", textAlign: "left" as const, padding: 12, borderRadius: 10,
                                border: estaCompleto ? "1.5px solid #fbbf24" : "1.5px solid #e5e7eb",
                                background: estaCompleto ? "#fef9c3" : "#fff",
                                display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
                                transition: "all 0.15s", fontFamily: "inherit",
                              }}
                            >
                              {estaCompleto
                                ? <CheckSquare size={16} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                                : <Square size={16} color="#9ca3af" style={{ flexShrink: 0, marginTop: 1 }} />
                              }
                              <span style={{ fontSize: 13, fontWeight: 600, color: estaCompleto ? "#92400e" : "#374151" }}>{firma}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* PASO C */}
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: -49, top: 0, background: "#e60024", color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>C</span>
                    <div style={{ background: "#fff0f1", padding: 20, borderRadius: 14, border: "1px solid #fca5a5" }}>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 4, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#e60024" }}>Ministerio de Relaciones Exteriores</span>
                        <span style={{ fontSize: 10, fontWeight: 700, background: "#e60024", color: "#fff", padding: "2px 10px", borderRadius: 999 }}>Paso 3</span>
                      </div>
                      <h5 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, color: "#e60024", fontSize: 15, marginBottom: 6 }}>Emisión de Apostilla Final</h5>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                        Con las firmas previas validadas, el MRE colocará la Apostilla para que tu documento sea válido internacionalmente.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB: REQUISITOS Y COSTOS ── */}
            {activeTab === "requisitos" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}
              >
                {/* Requisitos */}
                <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
                  <div style={{ padding: 20, borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
                    <h4 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 14, color: "#111", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                      <CheckSquare size={15} color="#10b981" /> Requisitos Físicos
                    </h4>
                  </div>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                    {seleccionado.requisitos.map((req, index) => {
                      const completed = !!checklistCompleted[req];
                      return (
                        <button
                          key={index}
                          onClick={() => toggleChecklist(req)}
                          style={{
                            width: "100%", textAlign: "left" as const, padding: 12, borderRadius: 12,
                            border: completed ? "1.5px solid #86efac" : "1.5px solid #e5e7eb",
                            background: completed ? "#f0fdf4" : "#fff",
                            display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
                            transition: "all 0.15s", fontFamily: "inherit",
                          }}
                        >
                          <div style={{ flexShrink: 0, marginTop: 1 }}>
                            {completed
                              ? <div style={{ width: 16, height: 16, background: "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Check size={10} /></div>
                              : <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid #d1d5db", background: "#fff" }} />
                            }
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: completed ? "#111" : "#374151", lineHeight: 1.5, margin: 0 }}>{req}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Costos */}
                <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
                  <div style={{ padding: 20, borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
                    <h4 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 14, color: "#111", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                      <DollarSign size={15} color="#f59e0b" /> Tarifas de Trámite
                    </h4>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
                      <span style={{ color: "#6b7280", fontSize: 14, fontWeight: 600 }}>{seleccionado.costo.moneda}</span>
                      <span style={{ fontFamily: "'Georgia',serif", fontSize: 36, fontWeight: 900, color: "#111" }}>{seleccionado.costo.monto.toFixed(2)}</span>
                      <span style={{ color: "#9ca3af", fontSize: 12, fontWeight: 500, marginLeft: 4 }}>por documento (MRE)</span>
                    </div>

                    {seleccionado.costo.exoneracion ? (
                      <div style={{ background: "#f0fdf4", color: "#15803d", borderRadius: 14, padding: 16, border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 10, textTransform: "uppercase" as const, fontWeight: 700, letterSpacing: 1.5, color: "#16a34a", marginBottom: 4 }}>TRÁMITE GRATUITO</div>
                        <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{seleccionado.costo.exoneracion}</p>
                      </div>
                    ) : (
                      <p style={{ fontSize: 13, color: "#6b7280", background: "#fafafa", padding: 14, borderRadius: 10, border: "1px solid #f3f4f6", margin: 0 }}>
                        El pago se efectúa en Págalo.pe o Banco de la Nación antes de registrar la solicitud.
                      </p>
                    )}

                    {seleccionado.costo.adicional && (
                      <div style={{ marginTop: 16, padding: 16, background: "#fffbeb", borderRadius: 14, border: "1px solid #fde68a" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#92400e", display: "flex", gap: 8, margin: 0, alignItems: "flex-start" }}>
                          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                          {seleccionado.costo.adicional}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB: DIRECTORIO Y FAQS ── */}
            {activeTab === "directorio" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, background: "#fff", padding: "24px 28px" }}>
                  <h4 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 14, color: "#111", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <MapPin size={15} color="#e60024" /> Directorio de Entidades
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {seleccionado.informacion && seleccionado.informacion.length > 0 ? (
                      seleccionado.informacion.map((info, idx) => (
                        <div key={idx} style={{ background: "#fafafa", padding: 16, borderRadius: 14, border: "1.5px solid #e5e7eb" }}>
                          <div style={{ marginBottom: 10 }}>
                            <span style={{ fontSize: 10, background: "#eef2ff", color: "#4338ca", fontWeight: 700, textTransform: "uppercase" as const, padding: "2px 8px", borderRadius: 4, display: "inline-block", marginBottom: 4 }}>
                              {info.area || "Entidad Certificadora"}
                            </span>
                            <h5 style={{ fontWeight: 700, color: "#111", fontSize: 13, margin: 0 }}>{info.entidad}</h5>
                          </div>
                          
                          {info.direccion && (
                            <p style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "flex-start", gap: 8, margin: "0 0 6px" }}>
                              <MapPin size={13} color="#e60024" style={{ flexShrink: 0, marginTop: 2 }} />
                              <span>{info.direccion}</span>
                            </p>
                          )}
                          
                          {info.telefono && (
                            <p style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 8, margin: "0 0 6px" }}>
                              <Phone size={13} color="#e60024" style={{ flexShrink: 0 }} />
                              <a href={`tel:${info.telefono.replace(/[^\d+]/g, '')}`} style={{ fontWeight: 700, color: "#e60024", textDecoration: "none" }}>
                                {info.telefono}
                              </a>
                            </p>
                          )}

                          {info.url && (
                            <a href={info.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "8px 14px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, color: "#374151", textDecoration: "none", marginTop: 8, transition: "border-color 0.15s" }}
                              onMouseEnter={e => (e.currentTarget.style.borderColor = "#e60024")}
                              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                            >
                              <Globe size={13} color="#9ca3af" /> Sitio Web Oficial
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: 13, color: "#9ca3af" }}>No hay información de oficinas específicas disponible para este documento.</p>
                    )}
                  </div>
                </div>

                <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, background: "#fff", padding: "24px 28px" }}>
                  <h4 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 14, color: "#111", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <HelpCircle size={15} color="#e60024" /> Preguntas Frecuentes
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { id: 1, q: "¿Puedo apostillar copias simples?", a: "No. Solo se apostillan documentos originales o copias legalizadas notarialmente certificadas." },
                      { id: 2, q: "¿Qué hago si mi documento tiene firma digital?", a: "Debes contar con el mecanismo de validación digital QR o número de verificación habilitado por la entidad emisora." }
                    ].map((faq) => {
                      const isOpen = !!faqOpen[faq.id];
                      return (
                        <div key={faq.id} style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
                          <button
                            onClick={() => setFaqOpen(p => ({ ...p, [faq.id]: !p[faq.id] }))}
                            style={{ width: "100%", textAlign: "left" as const, padding: 16, background: isOpen ? "#fafafa" : "#fff", border: "none", fontSize: 13, fontWeight: 700, color: "#111", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "background 0.15s", fontFamily: "inherit" }}
                          >
                            <span>{faq.q}</span>
                            <ChevronDown size={16} color="#9ca3af" style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
                          </button>
                          {isOpen && (
                            <div style={{ padding: 16, background: "#fff", fontSize: 13, color: "#6b7280", lineHeight: 1.7, borderTop: "1px solid #f3f4f6" }}>
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </main>
      )}

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1.5px solid #e5e7eb", padding: 24, textAlign: "center" as const, fontSize: 12, color: "#9ca3af", marginTop: "auto" }}>
        <p style={{ margin: 0 }}>© 2026 Ministerio de Relaciones Exteriores del Perú · Hackatón Transformagob 2026 · Desafío 12</p>
      </footer>
    </div>
  );
}
