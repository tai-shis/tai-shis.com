"use client";

import { useState, useEffect } from "react";

interface ImagePreviewProps {
  images: string[];
}

export default function ImagePreview({ images }: ImagePreviewProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState("center");

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 240);
  };

  const handleOpen = (src: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (rect.left + rect.width / 2) - window.innerWidth / 2;
    const dy = (rect.top + rect.height / 2) - window.innerHeight / 2;
    setOrigin(`calc(50% + ${dx}px) calc(50% + ${dy}px)`);
    setSelected(src);
    setClosing(false);
  };

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  return (
    <>
      <div className="flex flex-row gap-2 overflow-x-auto no-scrollbar">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={(e) => handleOpen(src, e)}
            className="shrink-0 h-20 w-32 overflow-hidden border border-border hover:border-border-accent transition-colors cursor-pointer"
          >
            <img src={src} alt={`preview ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90"
          onClick={close}
        >
          <div
            style={{ transformOrigin: origin }}
            className={`tui-panel border-border-accent overflow-hidden ${closing ? "animate-zoom-out" : "animate-zoom-in"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected}
              alt="preview"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
