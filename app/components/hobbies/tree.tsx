"use client";

import { Directory } from "@/config/directory";
import Panel from "../panel";
import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { useTree } from "@/contexts/tree-context";
import { useEffect, useRef, useState } from "react";

function Folder({
  level,
  name,
  path,
  isExpanded,
  isActive,
  isFocused,
}: {
  level: number;
  name: string;
  path: string;
  isExpanded: boolean;
  isActive: boolean;
  isFocused: boolean;
}) {
  const { clickOnItem } = useTree();

  return (
    <div
      data-path={path}
      className={`
        flex items-center pr-2 gap-2 cursor-pointer rounded-sm! select-none
        hover:text-sunset
        ${isActive || isFocused ? "text-sunset" : "text-muted"}
        transition-colors duration-200
      `}
      style={{ paddingLeft: `${(2 + level * 2) * 0.25}rem` }}
      onClick={() => {
        try {
          clickOnItem(path);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {isExpanded ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}
      <span className="text-sm">{name}</span>
    </div>
  );
}

function File({
  level,
  name,
  path,
  isActive,
  isFocused,
}: {
  level: number;
  name: string;
  path: string;
  isActive: boolean;
  isFocused: boolean;
}) {
  const { clickOnItem } = useTree();
  return (
    <div
      data-path={path}
      className={`
        flex items-center pr-2 gap-2 cursor-pointer rounded-sm! select-none
        hover:text-sunset
        ${isActive || isFocused ? "text-sunset" : "text-muted"}
        ${isActive ? "bg-muted/20" : ""}
        transition-colors duration-200
      `}
      style={{ paddingLeft: `${(2 + level * 2) * 0.25}rem` }}
      onClick={() => {
        try {
          clickOnItem(path);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <span className="text-sm">{name}</span>
    </div>
  );
}

function flattenVisible(dir: Directory): string[] {
  const paths: string[] = [dir.path];
  if (dir.isExpanded) {
    dir.subfolders?.forEach(sf => paths.push(...flattenVisible(sf)));
    dir.files?.forEach(f => paths.push(f.path));
  }
  return paths;
}

function renderDirectory(
  level: number,
  { files, subfolders, ...props }: Directory,
  focusedPath: string | null,
) {
  return (
    <div className={`${props.isActive ? "text-sunset" : ""}`}>
      <Folder level={level} {...props} isFocused={focusedPath === props.path} />
      <div className={`grid transition-all duration-150 ease-in-out ${props.isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          {subfolders?.map(subfolder => (
            <div key={subfolder.name}>
              {renderDirectory(level + 1, subfolder, focusedPath)}
            </div>
          ))}
          {files?.map(file => (
            <File key={file.name} level={level + 1} {...file} isFocused={focusedPath === file.path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Tree() {
  const { tree: directory, clickOnItem } = useTree();
  const [isFocused, setIsFocused] = useState(false);
  const [focusedPath, setFocusedPath] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlayStyle, setOverlayStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    if (!isFocused || !focusedPath || !containerRef.current) {
      setOverlayStyle(null);
      return;
    }
    const el = containerRef.current.querySelector<HTMLElement>(`[data-path="${focusedPath}"]`);
    if (!el) { setOverlayStyle(null); return; }
    setOverlayStyle({ top: el.offsetTop, height: el.offsetHeight });
  }, [isFocused, focusedPath, directory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        setIsFocused(true);
        if (!focusedPath) {
          setFocusedPath(directory.subfolders![0].path);
        }
        return;
      }

      if (!isFocused) return;

      if (e.key === "Escape") {
        setIsFocused(false);
        return;
      }

      const items = flattenVisible(directory.subfolders![0]);
      const idx = focusedPath ? items.indexOf(focusedPath) : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedPath(items[Math.min(idx + 1, items.length - 1)]);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedPath(items[Math.max(idx - 1, 0)]);
      } else if (e.key === "Enter" && focusedPath) {
        try {
          clickOnItem(focusedPath);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, focusedPath, directory, clickOnItem]);

  return (
    <Panel name="directory" className="py-4 h-full min-w-72 w-fit">
      <div ref={containerRef} className="text-sm relative">
        {overlayStyle && (
          <div
            className="absolute left-0 right-0 bg-muted/30 pointer-events-none rounded-sm! transition-all duration-150 ease-in-out"
            style={{ top: overlayStyle.top, height: overlayStyle.height }}
          />
        )}
        {renderDirectory(0, directory.subfolders![0], isFocused ? focusedPath : null)}
      </div>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background px-1.5 text-muted text-xs font-mono transition-colors group-hover:text-accent hidden sm:block whitespace-nowrap">
        [ Ctrl+P: Focus | Esc: Unfocus ]
      </span>
    </Panel>
  );
}
