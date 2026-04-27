"use client";

import { useEffect, useState } from "react";

type Phase = "typing" | "scanning" | "idle";

export default function AnimatedVerb({ verb }: { verb: string }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [charCount, setCharCount] = useState(0);
  const [scanPos, setScanPos] = useState(0);
  const [scanDir, setScanDir] = useState(1);

  useEffect(() => {
    setPhase("typing");
    setCharCount(0);
    setScanPos(0);
    setScanDir(1);
  }, [verb]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (charCount >= verb.length) {
      const t = setTimeout(() => { setPhase("scanning"); setScanPos(0); setScanDir(1); }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCharCount((c) => c + 1), 40);
    return () => clearTimeout(t);
  }, [phase, charCount, verb]);

  useEffect(() => {
    if (phase !== "scanning") return;
    if (scanPos >= verb.length && scanDir === 1) {
      setScanDir(-1);
      return;
    }
    if (scanPos <= -3 && scanDir === -1) {
      setPhase("idle");
      return;
    }
    const t = setTimeout(() => setScanPos((p) => p + scanDir), 50);
    return () => clearTimeout(t);
  }, [phase, scanPos, scanDir, verb]);

  if (phase === "typing") {
    return <span>{verb.slice(0, charCount)}</span>;
  }

  if (phase === "scanning") {
    return (
      <span>
        {verb.split("").map((char, i) => (
          <span key={i} className={i >= scanPos && i < scanPos + 3 ? "text-foreground/60" : ""}>
            {char}
          </span>
        ))}
      </span>
    );
  }

  return <span>{verb}</span>;
}
