import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type PageTransitionProps = {
  children: any;
  className?: string;
};

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      // temporarily disable smooth scrolling to avoid jump on navigation
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      // Restore after a tick
      setTimeout(() => {
        html.style.scrollBehavior = prevScrollBehavior || "";
      }, 0);
    }
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const pageVariants = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.995 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 1.005 }
  };

  const pageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 30 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(mountedRef.current)}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading Spinner Component
export function LoadingSpinner({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
        <div className="absolute inset-2 w-8 h-8 border-2 border-pink-200 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-0 w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        </div>
        <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
      <div className="ml-4 text-gray-600 dark:text-gray-200 font-medium">Loading...</div>
    </div>
  );
}

// Scroll Progress Indicator
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;
    let rafId = 0;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(1, Math.max(0, scrollTop / (docHeight - winH || 1)));
      el.style.transform = `scaleX(${progress})`;
      rafId = requestAnimationFrame(update);
    };

    // initialize
    el.style.transformOrigin = 'left center';
    el.style.transform = 'scaleX(0)';
    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50" aria-hidden />
  );
}