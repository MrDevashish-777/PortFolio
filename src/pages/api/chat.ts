export const prerender = false;

import type { APIRoute } from 'astro';

// Get environment variables with fallbacks
const OLLAMA_API_URL = import.meta.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = import.meta.env.OLLAMA_MODEL || 'llama2:7b';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Accepts either { message: string } or { messages: [{ content: string }] }
    let userInput = '';
    if (body.message) {
      userInput = body.message;
    } else if (body.messages && Array.isArray(body.messages)) {
      userInput = body.messages[body.messages.length - 1]?.content || '';
    } else {
      return new Response(
        JSON.stringify({ response: 'Invalid message format.' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send the user input to Ollama
    const ollamaResponse = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: userInput,
        stream: false
      })
    });
    
    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`);
    }
    
    const data = await ollamaResponse.json();
    
    return new Response(
      JSON.stringify({ response: data.response }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Ollama Chatbot Error:', err);
    
    return new Response(
      JSON.stringify({ 
        response: '⚠️ Something went wrong with the assistant. Please try again later.',
        error: err.message 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
