// src/pages/api/chat.ts
import type { APIRoute } from "astro";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return new Response(JSON.stringify({ reply: chatCompletion.choices[0].message.content }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ reply: "Something went wrong." }), {
      status: 500,
    });
  }
};
