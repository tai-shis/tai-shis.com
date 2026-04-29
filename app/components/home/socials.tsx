import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDiscord} from "react-icons/fa";
import Panel from "@/app/components/panel";
import CopyButton from "@/app/components/home/copy-button";

const links = [
  { href: "https://github.com/tai-shis", icon: <FaGithub size={14} />, label: "GitHub" },
  { href: "https://linkedin.com/in/tai-shishiba", icon: <FaLinkedin size={14} />, label: "LinkedIn" },
  { href: "https://instagram.com/bookyc_", icon: <FaInstagram size={14} />, label: "Instagram" },
];

export default function Socials() {
  return (
    <Panel name="socials" className="p-4">
      <div className="flex flex-row justify-evenly">
        <CopyButton label="Email" copyText="tshis070@mtroyal.ca" reactionText="Yoink" icon={<FaEnvelope size={14} />} />
        <CopyButton label="Discord" copyText="bookychan" reactionText="Yoinked" icon={<FaDiscord size={14} />} />
        {links.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            {icon} <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>
    </Panel>
  );
}
