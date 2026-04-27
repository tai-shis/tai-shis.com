"use client";

import figlet from "figlet";
import { GraduationCap, MapPin, CodeXml } from "lucide-react";
import Panel from "@/app/components/panel";
import { randomVerb } from "@/app/lib/verbs";
import AnimatedVerb from "@/app/components/animated-verb";
import { useEffect, useState } from "react";

export default function TaiShis() {
  const [text, setText] = useState("");
  const [verb, setVerb] = useState(randomVerb());

  useEffect(() => {
    figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts" });
    figlet.text("tai-shis", { font: "Standard" }, (err, result) => {
      if (!err && result) setText(result);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerb(randomVerb());
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Panel name="tai-shis" className="flex flex-col sm:flex-row items-center sm:items-start gap-1">
      <pre className="text-foreground leading-tight text-xs font-mono shrink-0 p-2">
        {text}
      </pre>
      <div className="flex-1 min-w-0 p-2 text-sm text-muted flex flex-col gap-1 items-center sm:items-start self-center">
        <p className="flex items-center gap-2">
          <CodeXml size={14} />Currently <AnimatedVerb verb={verb} /> @ <a href="https://stoa.gg" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline">stoa.gg</a>
        </p>
        <p className="flex items-center gap-2">
          <GraduationCap size={14} />Computer Science @ <a href="https://mtroyal.ca" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline">MRU</a>
        </p>
        <p className="flex items-center gap-2"><MapPin size={14} />Bragg Creek, Alberta</p>
      </div>
    </Panel>
  );
}
