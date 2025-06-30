import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      icon: "📧",
      label: "Contact",
      href: "/contact",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "💼",
      label: "Projects",
      href: "/project",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "👨‍💻",
      label: "About",
      href: "/about",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🏠",
      label: "Home",
      href: "/",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  y: 20, 
                  scale: 0.8,
                  transition: { delay: (menuItems.length - index - 1) * 0.05 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center gap-3 bg-gradient-to-r ${item.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium whitespace-nowrap">{item.label}</span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-full"></div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          +
        </motion.div>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-full"></div>
      </motion.button>
    </div>
  );
}