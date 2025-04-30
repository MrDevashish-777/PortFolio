import { motion } from "framer-motion";

export default function AnimatedTagline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
    >
      <p className="text-2xl md:text-3xl font-bold text-center text-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI Enthusiast • Developer • Innovator
      </p>
    </motion.div>
  );
}
