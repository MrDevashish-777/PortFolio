export const prerender = false;

import type { APIRoute } from "astro";

import { OpenAI } from "openai";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });


export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const userMessages = body.messages;

  if (!userMessages || !Array.isArray(userMessages)) {
    return new Response(JSON.stringify({ reply: "Invalid message format." }), { status: 400 });
  }

  try {
    // Load portfolio data
    const skillsPath = path.resolve("src/data/skills.json");
    const projectsPath = path.resolve("src/data/projects.json");
    const aboutPath = path.resolve("src/components/AboutMe.tsx");
    const teamDir = path.resolve("src/content/team");

    const [skillsRaw, projectsRaw] = await Promise.all([
      fs.readFile(skillsPath, "utf-8"),
      fs.readFile(projectsPath, "utf-8"),
    ]);
    const skills = JSON.parse(skillsRaw);
    const projects = JSON.parse(projectsRaw);

    // About Me summary (hardcoded for now, could parse AboutMe.tsx)
    const about = "I'm T. Devashish Pillay, a final-year Computer Science student passionate about building impactful tech solutions. I specialize in AI-driven applications like facial and fingerprint recognition, and love working with modern tools like React, Firebase, Astro, and ResNet-50.";

    // Team projects (read all .md files in team/)
    let teamSummaries = [];
    try {
      const teamFiles = await fs.readdir(teamDir);
      for (const file of teamFiles) {
        if (file.endsWith(".md")) {
          const content = await fs.readFile(path.join(teamDir, file), "utf-8");
          const match = content.match(/name: "([^"]+)"[\s\S]*?title: "([^"]+)"/);
          if (match) {
            teamSummaries.push(`- ${match[1]}: ${match[2]}`);
          }
        }
      }
    } catch {}

    // Build system prompt
    const systemPrompt = `You are a professional AI assistant representing T. Devashish Pillay. Use only the following data to answer questions in a professional, concise, and friendly manner. If you don't know, say so honestly.\n\nAbout: ${about}\n\nSkills: ${Object.entries(skills).map(([cat, arr]) => `${cat}: ${arr.join(", ")}`).join("; ")}\n\nProjects: ${projects.map((p: any) => `${p.title} - ${p.description} (Tech: ${p.tech.join(", ")})`).join("; ")}\n\nTeam Projects: ${teamSummaries.join("; ")}\n\nIf someone asks about his resume, link to: https://your-resume-link.com\nIf someone wants GitHub: https://github.com/devashish-pillay`;

    const systemMessage = {
      role: "system",
      content: systemPrompt,
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
