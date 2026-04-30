import Panel from "@/app/components/panel";
import { Bullet, Divider } from "./shared";

const experience = [
  {
    title: "Undergraduate Research Assistant",
    org: "Mount Royal University",
    location: "Calgary, AB",
    date: "May 2025 – Aug. 2025",
    bullets: [
      "Built Python visualization pipelines using NumPy and Matplotlib to analyze simulation outputs for malware propagation research in wireless sensor networks",
      "Prototyped simulations using emerging research libraries to model malware spread patterns, enabling the team to evaluate new modeling approaches",
      "Authored LaTeX technical documentation of experimental methodology and results for research publication",
    ],
  },
];

export default function Experience() {
  return (
    <Panel name="experience" className="p-4 relative">
      <div className="px-2 flex flex-col text-sm">
        {experience.map((e, i) => (
          <div key={e.title}>
            {i > 0 && <Divider />}
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-bold text-muted group-hover:text-accent transition-colors">{e.title}</span>
              <span className="text-muted shrink-0">{e.date}</span>
            </div>
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-muted">{e.org}</span>
              <span className="text-muted">{e.location}</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1">
              {e.bullets.map((b) => <Bullet key={b} text={b} />)}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
