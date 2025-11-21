import React, { useEffect, useState } from 'react';

export default function DarkModeToggle(): JSX.Element {
  const [mode, setMode] = useState<string>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme class and persist choice
  useEffect(() => {
    const root = document.documentElement;
    // Add a temporary transition helper so theme change is smooth
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 300);

    if (mode === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  return (
    <button
      aria-label="Toggle dark mode"
      aria-pressed={mode === 'dark'}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle ${mode === 'dark' ? 'dark' : ''}`}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      <span aria-hidden className="knob" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
