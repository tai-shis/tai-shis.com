import { Download } from "lucide-react";
import Panel from "../panel";
import { Chip } from "../shared";

export default function Resume() {
  return (
    <Panel name="resume" className="p-4">
      <p className="pl-2 text-sm">
        <a
          href="/Tai_Shishiba_Resume.pdf"
          download
          className="tui-panel p-2 float-right text-muted hover:text-sunset transition-colors hover:border-sunset"
          aria-label="Download resume"
        >
          <Download size={16} />    
        </a>
        <span className="pr-2">
        I enjoy making things, leaning more toward software development in typescript and react.
        I started programming in University and have been falling deeper into it ever since.
        The main reason I enjoy programming so much, is because of the possibilities it opens up to create things that help people.
        Building and creating things that can be used by others - that can make their experience just a little better - is what
        drives me to keep learning and improving my skills.
        </span>
      </p>
    </Panel>
  );
}
