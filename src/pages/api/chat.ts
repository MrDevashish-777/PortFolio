export const prerender = false;

import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";

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
    let teamSummaries: string[] = [];
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

    // Get the latest user message
    const userInput = userMessages[userMessages.length - 1]?.content?.toLowerCase() || "";

    // Simple keyword-based matching
    let reply = "Sorry, I couldn't find an answer to your question.";

    if (userInput.includes("skill") || userInput.includes("tech stack") || userInput.includes("technology")) {
      reply = `Here are my skills:\n` + Object.entries(skills).map(([cat, arr]) => `${cat}: ${(arr as string[]).join(", ")}`).join("; ");
    } else if (userInput.includes("project")) {
      reply = `Here are some of my projects:\n` + projects.map((p: any) => `${p.title} - ${p.description} (Tech: ${p.tech.join(", ")})`).join("; ");
    } else if (userInput.includes("about") || userInput.includes("yourself") || userInput.includes("who are you") || userInput.includes("bio")) {
      reply = about;
    } else if (userInput.includes("team")) {
      reply = `Team Projects:\n` + teamSummaries.join("; ");
    } else if (userInput.includes("resume")) {
      reply = `You can view my resume here: https://your-resume-link.com`;
    } else if (userInput.includes("github")) {
      reply = `Here is my GitHub: https://github.com/devashish-pillay`;
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Local Chatbot Error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Something went wrong with the assistant." }), {
      status: 500,
    });
  }
};
