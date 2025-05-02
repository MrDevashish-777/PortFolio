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
import { SiFirebase, SiTailwindcss, SiOpencv } from "react-icons/si";

const skillIcons: Record<string, JSX.Element> = {
  React: <FaReact className="text-sky-500" />,
  Python: <FaPython className="text-yellow-500" />,
  Firebase: <SiFirebase className="text-orange-400" />,
  GitHub: <FaGithub className="text-black dark:text-white" />,
  Node: <FaNodeJs className="text-green-600" />,
  TailwindCSS: <SiTailwindcss className="text-cyan-400" />,
  Express: <FaNodeJs className="text-gray-600" />,
  "Google Colab": <FaBrain className="text-yellow-400" />,
  "ResNet-50": <FaBrain className="text-purple-500" />,
  OpenCV: <SiOpencv className="text-indigo-400" />,
  HTML: <FaHtml5 className="text-orange-600" />,
  CSS: <FaCss3Alt className="text-blue-600" />,
  MongoDB: <FaDatabase className="text-green-700" />,
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
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        I'm T. Devashish Pillay, a final-year Computer Science student passionate about
        building impactful tech solutions. I specialize in AI-driven applications like
        facial and fingerprint recognition, and love working with modern tools like React,
        Firebase, Astro, and ResNet-50. Tech for good excites me!
      </p>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-4">My Tech Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {category}
              </h4>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 dark:text-white text-sm rounded-full shadow-md"
                  >
                    {skillIcons[skill] || null}
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutMe;
