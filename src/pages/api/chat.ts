export const prerender = false;

import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {

  const body = await request.json();
  // Accepts either { message: string } or { messages: [{ content: string }] }
  let userInput = "";
  if (body.message) {
    userInput = body.message;
  } else if (body.messages && Array.isArray(body.messages)) {
    userInput = body.messages[body.messages.length - 1]?.content || "";
  } else {
    return new Response(JSON.stringify({ response: "Invalid message format." }), { status: 400 });
  }


  // Send the user input to Ollama
  try {
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2:7b',
        prompt: userInput,
        stream: false
      })
    });
    if (!ollamaResponse.ok) {
      throw new Error('Ollama API error');
    }
    const data = await ollamaResponse.json();
    return new Response(JSON.stringify({ response: data.response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Ollama Chatbot Error:', err);
    return new Response(JSON.stringify({ response: '⚠️ Something went wrong with the assistant.' }), {
      status: 500,
    });
  }
};
