import { useEffect, useState } from "react";

export default function GoUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go to top"
      style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 100,
        background: "linear-gradient(135deg, #a78bfa, #f472b6, #60a5fa)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        transition: "opacity 0.3s, transform 0.3s",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
      }}
    >
      ↑
    </button>
  );
}
