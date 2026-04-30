import Panel from "@/app/components/panel";
import { Chip } from "./shared";

type Item = [label: string, accent: boolean];

const skills: { label: string; items: Item[] }[] = [
  { label: "languages",  items: [["JavaScript/TypeScript", true], ["Python", true], ["Java", false], ["C/C++", false], ["HTML/CSS", false], ["SQL", false], ["Nix", false]] },
  { label: "frameworks", items: [["React", true], ["Next.js", true], ["Express", false], ["Convex", false], ["NeonDB", false]]},
  { label: "tools",      items: [["Git", true], ["VSCode", false], ["Postman", false], ["Emacs", false], ["Claude", false]] },
  { label: "libraries",  items: [["NumPy", false], ["Matplotlib", false], ["Mongoose", false], ["Shadcn", false], ["BetterAuth", false], ["Prisma", false]] },
];

export default function Skills() {
  return (
    <Panel name="technical-skills" className="p-4 relative">
      <div className="px-2 flex flex-col gap-2 text-sm">
        {skills.map(({ label, items }) => (
          <div key={label} className="flex gap-3 items-start">
            <span className="text-muted group-hover:text-accent transition-colors font-bold w-24 shrink-0 pt-0.5">{label}</span>
            <div className="flex flex-wrap gap-1.5">
              {items.map(([label, accent]) => <Chip key={label} label={label} accent={accent} />)}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
