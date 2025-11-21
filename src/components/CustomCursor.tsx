import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailing = trailingRef.current;
    if (!cursor || !trailing) return;
    // Don't initialize on touch-only devices
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
      // show default cursor in this case
      cursor.style.display = 'none';
      trailing.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let trailingX = 0, trailingY = 0;

    const mainSize = 18; // matches CSS
    const trailingSize = 36;

    const moveCursor = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // center the cursor on pointer
      cursor.style.transform = `translate3d(${mouseX - mainSize / 2}px, ${mouseY - mainSize / 2}px, 0)`;
      // check hover target under pointer
      const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      const isInteractive = el && el.closest && el.closest('a, button, [role="button"], input, textarea, select, label');
      if (isInteractive) {
        cursor.classList.add('cursor-hover');
        trailing.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
        trailing.classList.remove('cursor-hover');
      }
    };

    const animateTrailing = () => {
      // trailing follows with easing
      trailingX += (mouseX - trailingX) * 0.15;
      trailingY += (mouseY - trailingY) * 0.15;
      trailing.style.transform = `translate3d(${trailingX - trailingSize / 2}px, ${trailingY - trailingSize / 2}px, 0)`;
      requestAnimationFrame(animateTrailing);
    };

    document.addEventListener('pointermove', moveCursor);
    animateTrailing();

    return () => {
      document.removeEventListener('pointermove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={trailingRef} className="custom-cursor trailing"></div>
      <div ref={cursorRef} className="custom-cursor main"></div>
    </>
  );
};

export default CustomCursor;
