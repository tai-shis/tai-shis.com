import type { Metadata } from "next";
import "../globals.css";
import Tree from "../components/hobbies/tree";
import { directory } from "@/config/directory";
import { TreeProvider } from "@/contexts/tree-context";

export const metadata: Metadata = {
  title: "Tai Shishiba - Hobbymaxxer",
  description: "",
};

function TreeLayout() {
  return (
    <Tree />
  );
}

export default function HobbiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-full mx-auto flex flex-col h-full px-4 py-8 gap-4">
      <TreeProvider>
        <TreeLayout />
      </TreeProvider>
      {children}
    </div>
  );
}