import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailing = trailingRef.current;
    if (!cursor || !trailing) return;

    let mouseX = 0, mouseY = 0;
    let trailingX = 0, trailingY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateTrailing = () => {
      trailingX += (mouseX - trailingX) * 0.15;
      trailingY += (mouseY - trailingY) * 0.15;
      trailing.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
      requestAnimationFrame(animateTrailing);
    };

    document.addEventListener('mousemove', moveCursor);
    animateTrailing();

    // Handle clickable hover
    const handlePointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        cursor.classList.add('cursor-hover');
        trailing.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
        trailing.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mouseover', handlePointer);
    document.addEventListener('mouseout', handlePointer);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handlePointer);
      document.removeEventListener('mouseout', handlePointer);
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
