"use client";

import { useEffect } from "react";
import Panel from "@/app/components/panel";

const labels = ["home", "projects", "resume", "hobbies"];

interface NavProps {
  index: number;
  onNavigate: (i: number) => void;
}

export default function Nav({ index, onNavigate }: NavProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const i = parseInt(e.key);
      if (!isNaN(i) && i >= 0 && i < labels.length) onNavigate(i);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNavigate]);

  return (
    <Panel name="nav" className="flex gap-0">
      {labels.map((label, i) => (
        <button
          key={label}
          onClick={() => onNavigate(i)}
          className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
            index === i ? "text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          <span className="sm:inline hidden">[{i}] </span>
          {label}
        </button>
      ))}
    </Panel>
  );
}
