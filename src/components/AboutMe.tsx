// src/components/AboutMe.tsx
import { motion } from "framer-motion";
import skills from "../data/skills.json";
import {
  FaReact,
  FaPython,
  FaGithub,
  FaNodeJs,
  FaCss3Alt,
  FaHtml5,
  FaDatabase,
  FaBrain,
} from "react-icons/fa";
import { SiFirebase, SiTailwindcss } from "react-icons/si";

const skillIcons: Record<string, JSX.Element> = {
  Reactjs: <FaReact className="text-sky-500" />,
  React: <FaReact className="text-sky-500" />,
  JavaScript: <FaReact className="text-yellow-400" />,
  HTML5: <FaHtml5 className="text-orange-600" />,
  CSS3: <FaCss3Alt className="text-blue-600" />,
  TailwindCSS: <SiTailwindcss className="text-cyan-400" />,
  Nodejs: <FaNodeJs className="text-green-600" />,
  Node: <FaNodeJs className="text-green-600" />,
  Expressjs: <FaNodeJs className="text-gray-600" />,
  Express: <FaNodeJs className="text-gray-600" />,
  Firebase: <SiFirebase className="text-orange-400" />,
  MongoDB: <FaDatabase className="text-green-700" />,
  Supabase: <FaDatabase className="text-green-400" />,
  Python: <FaPython className="text-yellow-500" />,
  Git: <FaGithub className="text-black dark:text-white" />,
  GitHub: <FaGithub className="text-black dark:text-white" />,
  Collaboration: <FaBrain className="text-blue-400" />,
  ProblemSolving: <FaBrain className="text-purple-500" />,
  Teamwork: <FaBrain className="text-green-400" />,
  Communication: <FaBrain className="text-pink-400" />,
  Leadership: <FaBrain className="text-indigo-400" />,
  Authentication: <FaBrain className="text-yellow-400" />,
  APIIntegration: <FaBrain className="text-cyan-400" />,
  ReactNative: <FaReact className="text-sky-500" />,
};

const AboutMe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">About Me</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Dedicated B.Tech CSE student with strong JavaScript and React fundamentals, passionate about open-source development and learning frameworks like Next.js. Experienced in building responsive web applications and contributing to real-world projects. Strong problem-solving, adaptability, and communication skills.
      </p>

      {/* Skills Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Frontend</h4>
            <div className="flex flex-wrap gap-3">
              {["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"].map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full shadow-md">
                  {skillIcons[skill.replace(/\s/g, "")] || null}
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Backend</h4>
            <div className="flex flex-wrap gap-3">
              {["Node.js", "Express.js", "Firebase", "MongoDB", "Supabase"].map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full shadow-md">
                  {skillIcons[skill.replace(/\s/g, "")] || null}
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">App Development</h4>
            <div className="flex flex-wrap gap-3">
              {["React Native", "API Integration", "Authentication"].map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full shadow-md">
                  {skillIcons[skill.replace(/\s/g, "")] || null}
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Open Source & Soft Skills</h4>
            <div className="flex flex-wrap gap-3">
              {["Git", "GitHub", "Collaboration", "Problem-Solving", "Teamwork", "Communication", "Leadership"].map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full shadow-md">
                  {skillIcons[skill.replace(/\s/g, "")] || null}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Experience</h3>
        <ul className="space-y-4">
          <li>
            <span className="font-bold">Live Project Member – Crypto Forensic Technology (Present):</span> Developing biometric security systems in a team environment.
          </li>
          <li>
            <span className="font-bold">Web Development Intern – HOTIT Institute Pvt. Ltd (2024):</span> Built and maintained responsive React applications.
          </li>
          <li>
            <span className="font-bold">Website Manager – Jain International School (Aug 2023 – Apr 2024):</span> Managed site via CPanel, improved UI/UX and features.
          </li>
        </ul>
      </div>

      {/* Education Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Education</h3>
        <ul className="space-y-4">
          <li>
            <span className="font-bold">B.Tech CSE – S. B. Jain Institute of Technology, Management & Research, Nagpur (2022–2026):</span> GPA: 8.58/10
          </li>
          <li>
            <span className="font-bold">Higher Secondary – Nirala Junior College:</span> 77.5%
          </li>
          <li>
            <span className="font-bold">Secondary – Sri Chaitanya International Olympiad School:</span> 86.6%
          </li>
        </ul>
      </div>

      {/* Projects Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Projects</h3>
        <ul className="space-y-4">
          <li><span className="font-bold">BioSecure:</span> Biometric security system with CFT</li>
          <li><span className="font-bold">Down The Hell:</span> Pygame obstacle adventure game</li>
          <li><span className="font-bold">CodeFlex:</span> Event management website for IEEE</li>
          <li><span className="font-bold">GitHub Contributions:</span> Active repositories and pull requests</li>
        </ul>
      </div>

      {/* Achievements / Positions Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Achievements / Positions</h3>
        <ul className="space-y-4">
          <li>Technical Head – IEEE SBJITMR (2023–24)</li>
          <li>Vice President – Neev Forum (2022–23)</li>
          <li>Managed Jain International School website for 6 months</li>
          <li>Hackathon participation (IEEE, Code Tantra, etc.)</li>
        </ul>
      </div>

      {/* Certifications Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Certifications</h3>
        <ul className="space-y-4">
          <li>NPTEL – Design and Analysis of Algorithms (2024)</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Contact</h3>
        <ul className="space-y-2 text-lg">
          <li><span className="font-bold">Email:</span> <a href="mailto:devashishpillay777@gmail.com" className="text-indigo-600 hover:underline">devashishpillay777@gmail.com</a></li>
          <li><span className="font-bold">Phone:</span> <a href="tel:+917499223329" className="text-indigo-600 hover:underline">+91 7499223329</a></li>
          <li><span className="font-bold">Location:</span> Nagpur, Maharashtra, India</li>
          <li><span className="font-bold">GitHub:</span> <a href="https://github.com/MrDevashish-777" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">github.com/MrDevashish-777</a></li>
          <li><span className="font-bold">LinkedIn:</span> <a href="https://linkedin.com/in/devashish-pillay" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">linkedin.com/in/devashish-pillay</a></li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AboutMe;
