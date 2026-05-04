"use client";

import { useContext, createContext, useState } from "react";
import { Directory, directory } from "@/config/directory";
import { useRouter } from "next/navigation";

export const TreeContext = createContext<{ 
  tree: Directory, 
  clickOnItem: (route: string) => void 
}>({ 
  tree: directory, 
  clickOnItem: () => {} 
});

function cleanTree(tree: Directory): Directory {
  for (const subfolder of tree.subfolders ?? []) {
    subfolder.isActive = false;
    for (const file of subfolder.files ?? []) {
      file.isActive = false;
    }
    cleanTree(subfolder);
  }
  return tree;
}

export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [tree, setTree] = useState<Directory>(directory);
  const clickOnItem = (path: string) => {
    const steps = path.split("/");
    
    const newTree = structuredClone(tree);
    let ctx = newTree;
    const parents: Directory[] = [];
    for (let i = 1; i < steps.length - 1; i++) {
      const nextCtx = ctx.subfolders?.find(s => s.name === steps[i]) as Directory;

      if (!nextCtx) throw new Error(`Could not find folder ${steps[i]} in path ${path}`);

      parents.push(nextCtx);
      ctx = nextCtx;
    }

    const lastPath = steps[steps.length - 1];
    const endsWithFile = ctx.files?.find(f => f.name === lastPath);
    if (endsWithFile) {
      cleanTree(newTree);
      parents.forEach(p => p.isActive = true);
      endsWithFile.isActive = true;
      
      router.replace(endsWithFile.route);
    } else {
      const endsWithFolder = ctx.subfolders?.find(s => s.name === lastPath) as Directory;

      if (!endsWithFolder) throw new Error(`Could not find file or folder in path ${path}`);
      
      endsWithFolder.isExpanded = !endsWithFolder.isExpanded;
    }

    setTree(newTree);
  };

  return (
    <TreeContext.Provider value={{ tree, clickOnItem }}>
      {children}
    </TreeContext.Provider>
  );
}

export const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};

