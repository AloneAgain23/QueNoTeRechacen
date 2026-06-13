import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileSearch,
  Bot,
  Send,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Linkedin,
  ExternalLink,
  Stamp,
  MapPin,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

/* ─── Animated counter ─── */
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;

      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return value;
}

function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Data ─── */
const products = [
  {
    id: "guia",
    title: "Guía Interactiva de Pasos",
    description:
      "Conoce la cadena de certificación exacta para tu documento. Evita rechazos en ventanilla.",
    icon: <FileSearch className="w-6 h-6" />,
    link: "/guia",
    isExternal: false,
    badge: "Recomendado",
  },
  {
    id: "ia",
    title: "ChatBot",
    description:
      "Chatbot que responde tus dudas sobre legalizaciones con datos oficiales (opcional: se puede implementar una API de IA).",
    icon: <Sparkles className="w-6 h-6" />,
    link: "/chatbot",
    isExternal: false,
    badge: "En prueba",
  },
  {
    id: "gpt",
    title: "GPT Especializado",
    description:
      "Modelo entrenado con normativa peruana vigente para casos complejos (requiere tener una cuenta en ChatGPT).",
    icon: <Bot className="w-6 h-6" />,
    link: "https://chatgpt.com/g/g-6a2d940fc458819198582eada11bee96-apostilla-facil-peru",
    isExternal: true,
  },
  {
    id: "telegram",
    title: "Bot en Telegram",
    description:
      "Consultas rápidas desde tu celular, disponible 24/7 en nuestra cuenta oficial.",
    icon: <Send className="w-6 h-6" />,
    link: "https://t.me/ApostillaFacil_Bot",
    isExternal: true,
  },
];

const problems = [
  "El ciudadano no sabe cuántas instituciones debe visitar antes del MRE.",
  "Los requisitos cambian según el tipo de documento y país de destino.",
  "Se depende de intermediarios o 'alguien que ya lo hizo' para no equivocarse.",
  "Un error en la cadena de certificación significa empezar todo de cero.",
];

const solutions = [
  "Árbol de decisión que identifica la cadena exacta según tu documento y destino.",
  "Asistente IA entrenado con normativa oficial — respuestas precisas, sin ambigüedad.",
  "Disponible antes de ir a cualquier ventanilla, desde el celular, sin registro.",
  "Reduce rechazos, ahorra tiempo y elimina la dependencia de intermediarios.",
];

/* ─── Section label ─── */
function SectionLabel({
  number,
  label,
  align = "left",
}: {
  number: string;
  label: string;
  align?: "left" | "center";
}) {
  return (
    <div style={{ marginBottom: 40, textAlign: align }}>
      <p
        style={{
          color: "#e60024",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 1,
          marginBottom: 4,
        }}
      >
        {number}
      </p>

      <h2
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 900,
          color: "#111",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {label}
      </h2>
    </div>
  );
}

/* ─── Component ─── */
export default function Home() {
  const { ref: statRef, inView: statInView } = useInView(0.5);
  const counter = useCounter(30, 1600, statInView);

  return (
    <div
      style={{
        background: "#fff",
        color: "#111",
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ══ HEADER ══ */}
      <header
        style={{
          borderBottom: "1.5px solid #e5e7eb",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e60024",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Stamp size={16} color="#fff" />
            </div>

            <div>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>
                #QueNoTeRechacen
              </span>
              <span style={{ color: "#e60024", fontWeight: 400, fontSize: 16 }}>
                {" "}
                ApostillaFácil
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid #e5e7eb",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                color: "#6b7280",
                whiteSpace: "nowrap",
              }}
            >
              <ShieldCheck size={13} color="#10b981" />
              Hackatón Transformagob 2026
            </div>

            <div
              style={{
                background: "#fff0f1",
                border: "1px solid #fca5a5",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                color: "#e60024",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Desafío 12 · MRE
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          padding: "0 24px",
        }}
      >
        {/* ══ HERO ══ */}
        <section
          style={{
            paddingTop: 80,
            paddingBottom: 72,
            borderBottom: "1.5px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 12,
              color: "#c2410c",
              fontWeight: 600,
              marginBottom: 32,
              letterSpacing: 0.5,
            }}
          >
            <AlertTriangle size={13} />
            Antes de sacar turno en el MRE
          </div>

          <h1
            style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontSize: "clamp(2.6rem,6vw,4.5rem)",
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.1,
              maxWidth: 900,
              margin: "0 0 24px",
              textAlign: "center",
            }}
          >
            No vayas a apostillar
            <br />
            <span style={{ color: "#e60024" }}>sin antes ver estas herramientas.</span>
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#6b7280",
              maxWidth: 850,
              lineHeight: 1.7,
              margin: "0 0 32px",
              textAlign: "center",
            }}
          >
            La cadena de certificaciones para apostillar varía según tu documento
            y país de destino. Conocerla antes te ahorra semanas de trámite y que rechacen tu solicitud.
          </p>

          <a
            href="#herramientas"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("herramientas")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#e60024",
              color: "#fff",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(230,0,36,0.18)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 10px 26px rgba(230,0,36,0.24)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(230,0,36,0.18)";
            }}
          >
            Ver herramientas
            <ChevronDown size={16} />
          </a>
        </section>

        {/* ══ HERRAMIENTAS ══ */}
        <section
          id="herramientas"
          style={{
            paddingTop: 40,
            paddingBottom: 48,
            borderBottom: "1.5px solid #e5e7eb",
            scrollMarginTop: 90,
          }}
        >
          <SectionLabel number="01" label="Las herramientas" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((p) => {
              const card = (
                <div
                  style={{
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 16,
                    padding: "24px 22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    cursor: "pointer",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                    background: "#fff",
                    height: "100%",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#e60024";
                    e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(230,0,36,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "#fff0f1",
                        border: "1px solid #fca5a5",
                        color: "#e60024",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 999,
                      }}
                    >
                      {p.badge}
                    </span>
                  )}

                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#374151",
                    }}
                  >
                    {p.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#111",
                        marginBottom: 6,
                      }}
                    >
                      {p.title}
                    </p>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#e60024",
                    }}
                  >
                    {p.isExternal ? "Abrir enlace" : "Acceder"}
                    <ArrowRight size={14} />
                  </div>
                </div>
              );

              return p.isExternal ? (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {card}
                </a>
              ) : (
                <Link
                  key={p.id}
                  to={p.link}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ══ STAT + PROBLEMA / SOLUCIÓN ══ */}
        <section
          style={{
            paddingTop: 72,
            paddingBottom: 72,
            borderBottom: "1.5px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          <SectionLabel number="02" label="El problema" align="center" />

          <div
            ref={statRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 0,
              marginBottom: 56,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 0,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "'Georgia','Times New Roman',serif",
                  fontSize: "clamp(5rem,18vw,11rem)",
                  fontWeight: 900,
                  color: "#e60024",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {counter}%
              </span>
            </div>

            <p
              style={{
                fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
                fontWeight: 700,
                color: "#111",
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              de las solicitudes de apostilla son rechazadas.
            </p>

            <p
              style={{
                fontSize: 15,
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              Que no te pase a ti.
            </p>

            <div
              style={{
                width: 48,
                height: 4,
                background: "#e60024",
                borderRadius: 2,
                marginTop: 20,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  color: "#9ca3af",
                  marginBottom: 16,
                }}
              >
                ¿Por qué fallan los trámites?
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {problems.map((prob, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    <XCircle
                      size={16}
                      color="#e60024"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    {prob}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    border: "1.5px solid #fca5a5",
                    borderRadius: 12,
                    padding: "16px 14px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Georgia',serif",
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#e60024",
                      margin: 0,
                    }}
                  >
                    30%
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 4,
                    }}
                  >
                    solicitudes rechazadas
                  </p>
                </div>

                <div
                  style={{
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "16px 14px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Georgia',serif",
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#f59e0b",
                      margin: 0,
                    }}
                  >
                    4–6
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 4,
                    }}
                  >
                    instituciones promedio
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  color: "#9ca3af",
                  marginBottom: 16,
                }}
              >
                Nuestra propuesta
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {solutions.map((sol, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle
                      size={16}
                      color="#10b981"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    {sol}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 24,
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#15803d",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  "¿Cómo podríamos ayudar al ciudadano a conocer los pasos
                  exactos de la cadena de certificación, antes de acudir al MRE,
                  sin depender de intermediarios?"
                </p>

                <p
                  style={{
                    fontSize: 11,
                    color: "#86efac",
                    margin: "8px 0 0",
                  }}
                >
                  — Desafío 12, Transformagob 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ EQUIPO ══ */}
        <section
          style={{
            paddingTop: 72,
            paddingBottom: 80,
            textAlign: "center",
          }}
        >
          <SectionLabel number="03" label="El equipo" align="center" />

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: 32,
              marginBottom: 36,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: "#9ca3af",
                margin: 0,
                textAlign: "center",
              }}
            >
              Liderazgo y Desarrollo
            </p>
          </div>

          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              border: "1.5px solid #e5e7eb",
              borderRadius: 20,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div
              style={{
                padding: "32px 32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 0,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #f3f4f6",
                  marginBottom: 18,
                  background: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://i.imgur.com/E59fl5F.jpg"
                  alt="Angelo Palomino Soto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#d1d5db",
                    fontFamily: "Georgia, serif",
                  }}
                >
                </span>
              </div>

              <p
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#111",
                  margin: "0 0 4px",
                  letterSpacing: "-0.02em",
                }}
              >
                Angelo Palomino Soto
              </p>

              <p
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#e60024",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  margin: "0 0 16px",
                }}
              >
                Dirección & Desarrollo
              </p>

              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  lineHeight: 1.7,
                  margin: "0 0 20px",
                  maxWidth: 340,
                }}
              >
                Politólogo de la Pontificia Universidad Católica del Perú.
                Apasionado por la tecnología cívica y la simplificación de
                trámites del Estado mediante herramientas digitales accesibles
                para todos.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                {["Tecnología Cívica", "IA Aplicada", "Lima, Perú"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: 999,
                        padding: "4px 12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {tag === "Lima, Perú" && <MapPin size={11} />}
                      {tag}
                    </span>
                  )
                )}
              </div>

              <a
                href="https://www.linkedin.com/in/angelo-geraldo-palomino-soto-96b058269"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: 12,
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1d4ed8",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#dbeafe")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#eff6ff")
                }
              >
                <Linkedin size={15} />
                Ver perfil en LinkedIn
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>
            </div>

            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                background: "#fafafa",
                padding: "14px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Stamp size={13} color="#9ca3af" />

              <p
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                <strong style={{ color: "#6b7280" }}>
                  Hackatón Transformagob 2026
                </strong>{" "}
                · Desafío 12 — MRE
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══ */}
      <footer
        style={{
          borderTop: "1.5px solid #e5e7eb",
          padding: "24px",
          textAlign: "center",
          fontSize: 12,
          color: "#9ca3af",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Ministerio de Relaciones Exteriores del Perú · Hackatón
          Transformagob 2026 · Desafío 12
        </p>
      </footer>
    </div>
  );
}