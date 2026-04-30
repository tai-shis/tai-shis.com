import Panel from "@/app/components/panel";
import { Bullet, Chip, Divider } from "./shared";

const projects = [
  {
    title: "Vendor Report Webapp",
    stack: ["Next.js", "TypeScript", "Bun", "PostgreSQL", "Square SDK", "Git"],
    date: "Jan. 2026 – Present",
    bullets: [
      "Independently designing and building a full-stack web app for a pre-launch retail business, giving 20+ consignment vendors self-serve access to sales data previously only visible to store administrators",
      "Integrated the Square API to ingest live transaction data, parsing and attributing ~2,000 orders into 3,500 vendor-specific entries for per-vendor reporting",
      "Designed a PostgreSQL schema to model the store's unique consignment workflow, enabling accurate vendor-level attribution of shared-storefront sales",
      "Implemented role-based authentication distinguishing vendor and admin accounts, ensuring vendors can only access their own private sales data",
      "Built interactive dashboards surfacing sales history and orders-over-time charts, replacing a month-end manual reporting process with real-time visibility",
      "Conducted user interviews with real vendors to validate UI decisions and iterate on pain points before launch",
    ],
  },
  {
    title: "Stoa",
    stack: ["React", "TypeScript", "Git", "Convex"],
    date: "Mar. 2026 – Present",
    bullets: [
      "Shipped features incrementally alongside a team using Git branching workflows to keep parallel work conflict-free",
      "Translated feature requirements into tracked tasks via Agile sprints, managing scope across the team",
      "Prototyped UI flows and iterated with teammates through design reviews to refine the end-user experience",
      "Strengthened code quality through regular code reviews and pair programming sessions",
      "Diagnosed and resolved cross-platform compatibility bugs spanning Windows, macOS, and Linux",
    ],
  },
  {
    title: "Register Allocator for a Simple Compiler",
    stack: ["Python", "Git"],
    date: "Jan. 2026 – Present",
    bullets: [
      "Designed graph-coloring algorithms and data structures to map program variables onto a fixed set of CPU registers",
      "Maintained clean CI/CD practices through GitHub pull requests, branch management, and peer code reviews",
      "Established documented coding standards and project conventions to coordinate contributions across the team",
    ],
  },
  {
    title: "Space Invaders",
    stack: ["C", "Assembly", "Git"],
    date: "Jan. 2025 – Apr. 2025",
    bullets: [
      "Recreated the classic arcade game in C and Assembly, writing custom hardware drivers from scratch",
      "Coordinated version control with teammates using Git, resolving merge conflicts through structured branching",
      "Delivered on schedule using Agile sprints to track integration milestones across a multi-week build",
    ],
  },
];

export default function Projects() {
  return (
    <Panel name="projects" className="p-4 relative">
      <div className="px-2 flex flex-col text-sm">
        {projects.map((p, i) => (
          <div key={p.title}>
            {i > 0 && <Divider />}
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-bold text-muted group-hover:text-accent transition-colors">{p.title}</span>
              <span className="text-muted shrink-0">{p.date}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {p.stack.map((s) => <Chip key={s} label={s} />)}
            </div>
            <ul className="mt-2 flex flex-col gap-1">
              {p.bullets.map((b) => <Bullet key={b} text={b} />)}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
