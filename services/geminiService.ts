
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client using the environment variable API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLabScenario = async (path: string, skill: string) => {
  // Use gemini-3-pro-preview for complex coding tasks.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a hands-on interactive lab scenario for a student learning ${path} focusing on ${skill}.
    Return it as a JSON object with: 
    title, objective, tasks (array), hints (array).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          tasks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          hints: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
        },
        required: ["title", "objective", "tasks", "hints"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getDebugTrace = async (code: string, objective: string) => {
  // Use gemini-3-pro-preview for advanced reasoning and code simulation.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Simulate the step-by-step execution of the following code for a learning lab. 
    Objective: "${objective}"
    Code:
    \`\`\`javascript
    ${code}
    \`\`\`
    Return an array of "DebugState" objects. Each state should include:
    - line: the 1-based line number being executed.
    - variables: an object mapping variable names to their current string values.
    - callStack: an array of function names (e.g., ["anonymous", "solve"]).
    - reason: optional brief explanation of what is happening at this line.
    Limit the trace to the first 15 meaningful steps.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            line: { type: Type.INTEGER },
            variables: { 
              type: Type.OBJECT,
              additionalProperties: { type: Type.STRING }
            },
            callStack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            reason: { type: Type.STRING }
          },
          required: ["line", "variables", "callStack"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const analyzeCode = async (code: string, task: string) => {
  // Use gemini-3-pro-preview for expert technical analysis.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a technical mentor. Analyze the following code implementation for the task: "${task}".
    Code:
    \`\`\`
    ${code}
    \`\`\`
    Provide constructive feedback, identify potential bugs for debugging, and suggest improvements.
    Also provide a 'detailedReview' which is a long-form text analysis of the architecture and logic.
    Return as JSON with status (success/warning/error), message, suggestions (array), and detailedReview (string).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ["success", "warning", "error"] },
          message: { type: Type.STRING },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          detailedReview: { type: Type.STRING }
        },
        required: ["status", "message", "suggestions", "detailedReview"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const getMentorResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], currentMessage: string) => {
  // Use gemini-3-pro-preview for advanced reasoning in technical mentoring.
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are an expert technical mentor for modern high-paying tech stacks. You provide concise, actionable advice and encourage hands-on practice. If the user asks about Firebase, explain Hosting vs App Hosting based on their needs.',
    },
  });

  const response = await chat.sendMessage({ message: currentMessage });
  return response.text;
};
