// src/pages/api/chat.ts
import type { APIRoute } from "astro";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const userMessages = body.messages;

  if (!userMessages || !Array.isArray(userMessages)) {
    return new Response(JSON.stringify({ reply: "Invalid message format." }), { status: 400 });
  }

  try {
    // Construct system prompt for smart HR assistant
    const systemMessage = {
      role: "system",
      content: `
You are a helpful AI chatbot representing T. Devashish Pillay, a final-year Computer Science student at S.B. Jain College.
Your job is to answer HR or recruiters' questions about his:
- Skills (Python, React Native, Firebase, Google Colab, Astro, ResNet-50, face/fingerprint recognition)
- Projects (Biometric Verification App, Forensics Portal for Government)
- Achievements or experience
Be professional, warm, concise, and showcase Devashish's best qualities.
Respond in well-structured short paragraphs.

If someone asks about his resume, link to: https://your-resume-link.com
If someone wants GitHub: https://github.com/devashish-pillay
`,
    };

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...userMessages],
    });

    const reply = chatCompletion.choices[0].message.content || "No reply from AI.";

    // Simple HR interaction log (replace with Firestore later if needed)
    console.log({
      asked: userMessages[userMessages.length - 1]?.content,
      reply,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("AI Chat Error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Something went wrong with the assistant." }), {
      status: 500,
    });
  }
};
