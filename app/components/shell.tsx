"use client";

import { useState } from "react";
import Nav from "@/app/components/nav";
import PageCarousel from "@/app/components/page-carousel";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <Nav index={index} onNavigate={setIndex} />
      <PageCarousel index={index} onNavigate={setIndex}>
        {children}
      </PageCarousel>
    </div>
  );
}
