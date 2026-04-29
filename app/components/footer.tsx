import { GitPullRequest } from 'lucide-react';
import { execSync } from "child_process";
import Panel from "@/app/components/panel";

function getLastCommit(): string | null {
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
  }
  try {
    return execSync("git rev-parse HEAD", { cwd: process.cwd() })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

export default function Footer() {
  const commit = getLastCommit();
  const shortCommit = commit ? commit.slice(0, 7) : null;
  const commitURL = commit ? `https://github.com/tai-shis/tai-shis.com/commit/${commit}` : '';

  return (
    <Panel name="footer" className="flex items-center px-4 py-2 text-sm text-muted relative">
      <span className="p-2">© 2026 - tai-shis</span>
      <a href={commitURL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 flex flex-row items-center justify-center gap-1 ml-auto">
        <GitPullRequest size={16}/> {shortCommit ?? "—"}
      </a>
      <span className="absolute bottom-0 left-3 translate-y-1/2 bg-background px-1.5 text-muted text-xs font-mono transition-colors group-hover:text-border-accent hidden sm:block">
        [0: Home | 1: Projects | 2: Resume | 3: Hobbies]
      </span>
      <span className="absolute bottom-0 right-3 translate-y-1/2 bg-background px-1.5 text-muted text-xs font-mono transition-colors group-hover:text-border-accent hidden sm:block">
        [←/→ Scroll]
      </span>
    </Panel>
  );
}
