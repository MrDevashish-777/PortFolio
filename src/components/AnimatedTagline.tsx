
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = [
  "AI Enthusiast",
  "Full-Stack Developer", 
  "Innovation Driver",
  "Problem Solver",
  "Tech Explorer"
];

export default function AnimatedTagline() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const roleVariants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      {/* Main Tagline */}
      <motion.div 
        variants={textVariants}
        className="text-2xl md:text-3xl font-bold text-center mb-4"
      >
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
          Passionate about Technology
        </span>
      </motion.div>

      {/* Animated Role Switcher */}
      <motion.div 
        variants={textVariants}
        className="text-lg md:text-xl font-semibold text-center h-8 relative"
      >
        <span className="text-gray-600">I'm a </span>
        <motion.span
          key={currentRole}
          variants={roleVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
        >
          {roles[currentRole]}
        </motion.span>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        variants={textVariants}
        className="flex justify-center items-center mt-4 space-x-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl blur-xl -z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
