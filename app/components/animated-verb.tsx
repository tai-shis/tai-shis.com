"use client";

import { useEffect, useState } from "react";

export default function AnimatedVerb({ verb }: { verb: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(verb.slice(0, ++i));
      if (i >= verb.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [verb]);

  return <span>{displayed}</span>;
}
