import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Send,
  User,
  Home,
  ChevronRight,
  FileText,
  DollarSign,
  PenLine,
  Phone,
  Info,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Stamp,
} from "lucide-react";
import treeData from "../data/tree_cadena_certificaciones_completo.json";

type Message = {
  role: "user" | "model";
  content: string;
  nodeId?: string;
};

type BotOption = {
  label: string;
  next: string;
};

type MenuNode = {
  type: "menu";
  text: string;
  options: BotOption[];
  parent?: string;
};

type ResultNode = {
  type: "result";
  parent?: string;
  document_number?: number;
  title: string;
  requirements?: string[];
  cost?: string;
  free_condition?: string;
  previous_signatures?: string[];
  contact_info?: Record<string, string>;
  source_pdf_pages?: number[];
  tags?: string[];
};

type BotNode = MenuNode | ResultNode;

type BotTree = {
  title: string;
  nodes: Record<string, BotNode>;
  metadata?: {
    general_notice?: string[];
  };
};

const botTree = treeData as BotTree;

const PROTOTYPE_MESSAGE = `Esta versión es un prototipo demostrativo. Por favor selecciona una de las opciones del menú para continuar con la orientación del trámite.\n\nLa atención con IA generativa estará disponible en la siguiente etapa del proyecto.`;

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const formatKey = (key: string) =>
  key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const isMenuNode = (node: BotNode): node is MenuNode => node.type === "menu";
const isResultNode = (node: BotNode): node is ResultNode => node.type === "result";

const getNode = (nodeId: string): BotNode =>
  botTree.nodes[nodeId] || botTree.nodes["inicio"];

const findMatchingOption = (node: MenuNode, userInput: string): BotOption | null => {
  const cleanInput = normalizeText(userInput);
  const prefixMatch = node.options.find((option) => {
    const match = option.label.match(/^(\d+)/);
    return match?.[1] === cleanInput;
  });
  if (prefixMatch) return prefixMatch;
  const exactMatch = node.options.find(
    (option) => normalizeText(option.label) === cleanInput
  );
  if (exactMatch) return exactMatch;
  const partialMatch = node.options.find((option) =>
    normalizeText(option.label).includes(cleanInput)
  );
  if (partialMatch) return partialMatch;
  const optionIndex = Number(cleanInput);
  if (
    Number.isInteger(optionIndex) &&
    optionIndex >= 1 &&
    optionIndex <= node.options.length
  ) {
    return node.options[optionIndex - 1];
  }
  return null;
};

/* ─── Breadcrumb trail ─────────────────────────────────────────── */
function buildBreadcrumb(nodeId: string): string[] {
  const trail: string[] = [];
  let current = nodeId;
  const visited = new Set<string>();
  while (current && current !== "inicio" && !visited.has(current)) {
    visited.add(current);
    const node = botTree.nodes[current];
    if (!node) break;
    trail.unshift(isResultNode(node) ? node.title : (node as MenuNode).text.split("\n")[0].slice(0, 36));
    current = node.parent || "";
  }
  trail.unshift("Inicio");
  return trail;
}

/* ─── Result card renderer ─────────────────────────────────────── */
function ResultCard({ node }: { node: ResultNode }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <Stamp className="result-icon" />
        <span className="result-found-label">Trámite identificado</span>
      </div>
      <h3 className="result-title">{node.title}</h3>

      {node.requirements && node.requirements.length > 0 && (
        <section className="result-section">
          <div className="result-section-header">
            <FileText size={15} />
            <span>Requisitos</span>
          </div>
          <ul className="result-list">
            {node.requirements.map((req, i) => (
              <li key={i}>
                <CheckCircle2 size={13} className="check-icon" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {node.previous_signatures && node.previous_signatures.length > 0 && (
        <section className="result-section">
          <div className="result-section-header">
            <PenLine size={15} />
            <span>Firmas o certificaciones previas</span>
          </div>
          <ul className="result-list">
            {node.previous_signatures.map((sig, i) => (
              <li key={i}>
                <ChevronRight size={13} className="chevron-icon" />
                <span>{sig}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(node.cost || node.free_condition) && (
        <section className="result-section">
          <div className="result-section-header">
            <DollarSign size={15} />
            <span>Costo</span>
          </div>
          {node.cost && <p className="result-cost">{node.cost}</p>}
          {node.free_condition && (
            <p className="result-free-condition">
              <Info size={13} />
              {node.free_condition}
            </p>
          )}
        </section>
      )}

      {node.contact_info && Object.keys(node.contact_info).length > 0 && (
        <section className="result-section">
          <div className="result-section-header">
            <Phone size={15} />
            <span>Contacto referencial</span>
          </div>
          <ul className="result-list contact-list">
            {Object.entries(node.contact_info).map(([key, value]) => (
              <li key={key}>
                <span className="contact-key">{formatKey(key)}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="result-notice">
        <AlertCircle size={13} />
        <span>
          La apostilla o legalización certifica la firma del funcionario competente; no valida el contenido del documento.
        </span>
      </div>
    </div>
  );
}

/* ─── Message bubble ───────────────────────────────────────────── */
function MessageBubble({
  msg,
  allNodes,
}: {
  msg: Message;
  allNodes: Record<string, BotNode>;
}) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="msg-row msg-user">
        <div className="bubble bubble-user">
          <p>{msg.content}</p>
        </div>
        <div className="avatar avatar-user">
          <User size={16} />
        </div>
      </div>
    );
  }

  // Bot message: check if nodeId points to a result node
  const linkedNode = msg.nodeId ? allNodes[msg.nodeId] : undefined;
  const isResult = linkedNode && isResultNode(linkedNode);

  return (
    <div className="msg-row msg-bot">
      <div className="avatar avatar-bot">
        <Bot size={16} />
      </div>
      {isResult ? (
        <div className="bubble bubble-bot bubble-result">
          <ResultCard node={linkedNode as ResultNode} />
        </div>
      ) : (
        <div className="bubble bubble-bot">
          <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: `¡Hola! Soy el asistente de orientación del MRE.\n\nTe guío paso a paso por la cadena de certificaciones para apostillar o legalizar tus documentos — sin intermediarios, sin adivinar.\n\n${(getNode("inicio") as MenuNode).text}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [currentNodeId, setCurrentNodeId] = useState("inicio");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentNode = getNode(currentNodeId);
  const breadcrumb = buildBreadcrumb(currentNodeId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const pushBotMessage = (content: string, nodeId?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "model", content, nodeId },
      ]);
      setIsTyping(false);
    }, 350);
  };

  const goToNode = (nodeId: string, userLabel?: string) => {
    const node = getNode(nodeId);
    if (userLabel) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userLabel },
      ]);
    }
    if (isResultNode(node)) {
      pushBotMessage("", nodeId);
    } else {
      const menuNode = node as MenuNode;
      pushBotMessage(menuNode.text, nodeId);
    }
    setCurrentNodeId(nodeId);
  };

  const goBack = () => {
    const node = getNode(currentNodeId);
    const parentId = node.parent || "inicio";
    goToNode(parentId, "← Volver");
  };

  const goHome = () => {
    goToNode("inicio", "🏠 Ir al inicio");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    const cleanInput = normalizeText(userMessage);
    setInput("");

    let nextNodeId = currentNodeId;

    if (["inicio", "menu", "menú", "empezar", "reiniciar"].includes(cleanInput)) {
      nextNodeId = "inicio";
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      pushBotMessage((getNode("inicio") as MenuNode).text, "inicio");
    } else if (["volver", "atras", "atrás", "regresar"].includes(cleanInput)) {
      const parentId = currentNode.parent || "inicio";
      nextNodeId = parentId;
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      const parent = getNode(parentId);
      if (isResultNode(parent)) {
        pushBotMessage("", parentId);
      } else {
        pushBotMessage((parent as MenuNode).text, parentId);
      }
    } else if (isMenuNode(currentNode)) {
      const selectedOption = findMatchingOption(currentNode, userMessage);
      if (selectedOption) {
        nextNodeId = selectedOption.next;
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        const nextNode = getNode(selectedOption.next);
        if (isResultNode(nextNode)) {
          pushBotMessage("", selectedOption.next);
        } else {
          pushBotMessage((nextNode as MenuNode).text, selectedOption.next);
        }
      } else {
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        pushBotMessage(
          `${PROTOTYPE_MESSAGE}\n\n${(currentNode as MenuNode).text}`
        );
        return;
      }
    } else {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      pushBotMessage(PROTOTYPE_MESSAGE);
      return;
    }

    setCurrentNodeId(nextNodeId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #fff;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          font-size: 14px;
          color: #111;
        }

        /* ── Header ── */
        .chat-header {
          background: #fff;
          border-bottom: 1.5px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 50;
          flex-shrink: 0;
        }
        .chat-header-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .back-btn {
          background: transparent;
          border: none;
          border-radius: 50%;
          color: #6b7280;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.15s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .back-btn:hover { color: #111; }

        .header-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e60024;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }
        .header-text { flex: 1; min-width: 0; display: flex; flex-direction: row; align-items: center; gap: 4px; }
        .header-title {
          font-size: 16px;
          font-weight: 800;
          color: #111;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .header-sub {
          font-size: 16px;
          color: #e60024;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hackathon-badge {
          background: #fff0f1;
          color: #e60024;
          border: 1px solid #fca5a5;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Breadcrumb ── */
        .breadcrumb-bar {
          background: #fafafa;
          border-bottom: 1px solid #e5e7eb;
          padding: 6px 24px;
          flex-shrink: 0;
        }
        .breadcrumb-inner {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .breadcrumb-inner::-webkit-scrollbar { display: none; }
        .bc-item {
          font-size: 11px;
          color: #9ca3af;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bc-item.bc-active { color: #e60024; font-weight: 600; }
        .bc-sep { color: #d1d5db; font-size: 10px; }

        /* ── Main scroll area ── */
        .chat-main {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .chat-main-inner {
          max-width: 760px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Prototype notice ── */
        .prototype-notice {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 12px;
          color: #c2410c;
          line-height: 1.6;
        }
        .prototype-notice svg { flex-shrink: 0; margin-top: 1px; color: #f59e0b; }

        /* ── Messages ── */
        .msg-row {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .msg-bot { align-items: flex-start; }
        .msg-user { flex-direction: row-reverse; }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .avatar-bot {
          background: #e60024;
          color: #fff;
        }
        .avatar-user {
          background: #111;
          color: #fff;
        }

        .bubble {
          max-width: calc(100% - 48px);
          border-radius: 16px;
          padding: 12px 16px;
          line-height: 1.6;
          font-size: 14px;
        }
        .bubble-bot {
          background: #fafafa;
          border: 1.5px solid #e5e7eb;
          border-bottom-left-radius: 4px;
          color: #111;
        }
        .bubble-user {
          background: #e60024;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bubble-result {
          padding: 0;
          overflow: hidden;
          max-width: min(560px, calc(100% - 48px));
        }

        /* ── Typing indicator ── */
        .typing-row { display: flex; gap: 10px; align-items: flex-start; }
        .typing-bubble {
          background: #fafafa;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 14px 18px;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d1d5db;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        /* ── Result card ── */
        .result-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .result-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .result-icon { color: #e60024; }
        .result-found-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #e60024;
        }
        .result-title {
          font-size: 15px;
          font-weight: 700;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #111;
          line-height: 1.4;
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
          margin-top: -2px;
        }
        .result-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid #f3f4f6;
          padding-top: 12px;
        }
        .result-section-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #9ca3af;
        }
        .result-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .result-list li {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          font-size: 13px;
          line-height: 1.5;
          color: #374151;
        }
        .check-icon { color: #10b981; flex-shrink: 0; margin-top: 2px; }
        .chevron-icon { color: #e60024; flex-shrink: 0; margin-top: 2px; }
        .result-cost {
          font-size: 14px;
          font-weight: 600;
          color: #111;
        }
        .result-free-condition {
          display: flex;
          gap: 6px;
          align-items: flex-start;
          font-size: 12px;
          color: #15803d;
          background: #f0fdf4;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid #bbf7d0;
          line-height: 1.5;
        }
        .result-free-condition svg { flex-shrink: 0; margin-top: 1px; }
        .contact-list li { flex-direction: column; gap: 2px; }
        .contact-key {
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: #9ca3af;
        }
        .result-notice {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          background: #fafafa;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
        }
        .result-notice svg { flex-shrink: 0; margin-top: 1px; color: #9ca3af; }

        /* ── Option buttons ── */
        .options-container {
          padding-left: 42px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .options-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          margin-bottom: 2px;
        }
        .options-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .option-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 10px 16px;
          font-size: 13px;
          color: #111;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          line-height: 1.4;
          font-family: inherit;
        }
        .option-btn:hover {
          border-color: #e60024;
          background: #fff0f1;
          color: #e60024;
        }
        .option-btn .opt-num {
          background: #e60024;
          color: #fff;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nav-btns {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 8px 16px;
          font-size: 12px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .nav-btn:hover {
          border-color: #e60024;
          background: #fff0f1;
          color: #e60024;
        }

        /* ── Input area ── */
        .chat-footer {
          background: #fff;
          border-top: 1.5px solid #e5e7eb;
          padding: 14px 24px;
          flex-shrink: 0;
        }
        .chat-footer-inner {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 8px 8px 8px 16px;
          transition: border-color 0.15s;
        }
        .input-row:focus-within {
          border-color: #e60024;
          box-shadow: 0 0 0 3px rgba(230,0,36,0.06);
        }
        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          min-height: 40px;
          max-height: 120px;
          font-size: 14px;
          color: #111;
          line-height: 1.5;
          font-family: inherit;
        }
        .chat-textarea::placeholder { color: #9ca3af; }
        .send-btn {
          background: #e60024;
          border: none;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .send-btn:hover { background: #c0001e; }
        .send-btn:disabled { background: #d1d5db; cursor: not-allowed; }
        .footer-hint {
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
        }
      `}</style>

      <div className="chat-root">
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header-inner">
            <Link to="/" className="back-btn" aria-label="Volver">
              <ArrowLeft size={20} />
            </Link>
            <div className="header-logo">
              <Stamp size={16} color="#fff" />
            </div>
            <div className="header-text">
              <div className="header-title">ApostillaFácil</div>
              <div className="header-sub"> Perú</div>
            </div>
            <span className="hackathon-badge">Asistente Virtual</span>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="breadcrumb-bar" aria-label="Ruta de navegación">
          <div className="breadcrumb-inner">
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={11} className="bc-sep" />}
                <span className={`bc-item ${i === breadcrumb.length - 1 ? "bc-active" : ""}`}>
                  {i === 0 && <Home size={11} />}
                  {crumb.length > 32 ? crumb.slice(0, 32) + "…" : crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Messages */}
        <main className="chat-main">
          <div className="chat-main-inner">
            {/* Prototype notice */}
            <div className="prototype-notice">
              <AlertCircle size={15} />
              <span>
                <strong>Versión demostrativa</strong> — Navega con los botones o escribe el número de opción. La integración con IA generativa es opcional y se puede habilitar en la siguiente etapa del proyecto. Funciona 100 % sin pago de licencia de IA.
              </span>
            </div>

            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} allNodes={botTree.nodes} />
            ))}

            {isTyping && (
              <div className="typing-row">
                <div className="avatar avatar-bot">
                  <Bot size={16} />
                </div>
                <div className="typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            {/* Option buttons for current menu node */}
            {!isTyping && isMenuNode(currentNode) && (
              <div className="options-container">
                <p className="options-label">Selecciona una opción</p>
                <div className="options-grid">
                  {currentNode.options.map((option, i) => (
                    <button
                      key={option.next}
                      onClick={() => goToNode(option.next, option.label)}
                      className="option-btn"
                    >
                      <span className="opt-num">{i + 1}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
                {currentNode.parent && (
                  <div className="nav-btns">
                    <button onClick={goBack} className="nav-btn">
                      <ArrowLeft size={13} /> Volver
                    </button>
                    <button onClick={goHome} className="nav-btn">
                      <Home size={13} /> Inicio
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Nav buttons for result node */}
            {!isTyping && isResultNode(currentNode) && (
              <div className="options-container">
                <div className="nav-btns">
                  <button onClick={goBack} className="nav-btn">
                    <ArrowLeft size={13} /> Volver al menú
                  </button>
                  <button onClick={goHome} className="nav-btn">
                    <RotateCcw size={13} /> Consultar otro trámite
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="chat-footer">
          <div className="chat-footer-inner">
            <div className="input-row">
              <textarea
                ref={inputRef}
                className="chat-textarea"
                placeholder="Escribe el número de opción o palabras como 'volver' o 'inicio'…"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="send-btn"
                aria-label="Enviar"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="footer-hint">
              Prototipo funcional · Hackatón Transformagob 2026 · Desafío 12 — MRE
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}