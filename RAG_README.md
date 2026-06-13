# Implementación de RAG en Chatbot con Gemini API

Este documento explica cómo se ha configurado el entorno y el código para implementar un sistema RAG (Retrieval-Augmented Generation) básico en el frontend utilizando React, Vite y la API de Gemini.

## 1. Configuración del Entorno (Vite)

Para poder utilizar la API key de Gemini directamente en el navegador sin exponer variables inseguras por defecto, modificamos el archivo \`vite.config.ts\`.

Se agregó la directiva \`define\` para inyectar la variable de entorno \`GEMINI_API_KEY\` (que típicamente vive en un archivo \`.env\` o en el servidor/AI Studio) dentro del código frontend bajo el nombre \`import.meta.env.VITE_GEMINI_API_KEY\`:

\`\`\`typescript
// vite.config.ts
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // ...
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
    },
  };
});
\`\`\`

## 2. Inyección de Contexto RAG (JSON)

El usuario proporcionó un archivo \`src/data.ts\` que exporta el objeto \`CERTIFICACIONES_DATA\`. Esta es nuestra **base de conocimientos** en formato estructurado (JSON).

En lugar de crear una base de datos vectorial compleja (lo cual es innecesario para un volumen de datos pequeño/mediano), implementamos un **RAG basado en contexto directo**. Esto significa que le pasamos todo el JSON a Gemini en sus "Instrucciones del Sistema" (System Instructions).

\`\`\`typescript
import { CERTIFICACIONES_DATA } from "../data";

const systemInstruction = \`
Eres el asistente virtual oficial de ApostillaFácil Perú.
Utiliza ÚNICAMENTE la siguiente base de conocimientos en formato JSON para responder a las preguntas...

BASE DE CONOCIMIENTOS OFICIAL (RAG):
\${JSON.stringify(CERTIFICACIONES_DATA, null, 2)}
\`;
\`\`\`

## 3. Integración de la API de Gemini en React

En el archivo \`src/pages/Chatbot.tsx\`, utilizamos el SDK oficial \`@google/genai\`:

1.  **Inicialización:** Instanciamos el cliente con la API key mapeada previamente.
    \`\`\`typescript
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    \`\`\`
2.  **Historial de Conversación:** Mantenemos un estado \`messages\` en React que guarda el rol (\`user\` o \`model\`) y el texto.
3.  **Llamada a la API:** Usamos \`ai.models.generateContent\` cada vez que el usuario envía un mensaje, pasándole:
    - El modelo: \`gemini-2.5-flash\` (muy rápido y con gran ventana de contexto ideal para RAG).
    - El historial de mensajes (\`contents\`).
    - Las configuraciones adicionales como el \`systemInstruction\` (que contiene nuestro JSON) y una temperatura baja (\`temperature: 0.3\`) para asegurar respuestas factuales y evitar alucinaciones.

\`\`\`typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: currentContents, // Historial + nuevo mensaje
  config: {
    systemInstruction: systemInstruction, // Aquí va el RAG
    temperature: 0.3,
  }
});
\`\`\`

## Resumen

Con esta arquitectura, el Chatbot ahora es "consciente" de todas las reglas, precios y requisitos definidos en \`data.ts\`. Cada vez que el usuario pregunta algo, Gemini lee las instrucciones del sistema (junto con el JSON embebido), busca la respuesta dentro de esos datos, y redacta una respuesta natural y amable.
