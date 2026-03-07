"use client";

import { useEffect, useState } from "react";

export function MouseCursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window) return;
    document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  const size = 32;
  return (
    <div
      className="pointer-events-none fixed z-[9999] flex cursor-glow-breathe items-center justify-center"
      style={{
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        className="text-gold drop-shadow-[0_0_8px_oklch(0.75_0.14_75/50%)] leading-none"
        style={{
          fontSize: 26,
          lineHeight: 1,
          textShadow:
            "0 0 6px oklch(0.75 0.14 75 / 40%), 0 0 12px oklch(0.75 0.14 75 / 25%)",
        }}
      >
        ✦
      </span>
    </div>
  );
}
