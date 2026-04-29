import Panel from "@/app/components/panel";

export default function Propaganda() {
  return (
    <Panel name="propaganda" className="p-4">
      <p className="text-sm text-muted px-2">
        You should use NixOS :D
        <br /><br />
        I daily drive NixOS on my Framework (which was my first linux distro), and the experience has been (mostly) smooth.
        The main appeal for me is the completely reproducible configuration and environment, making setting up a project suuuuper clean.
        <br /><br />
        By the way, you should also get a <a href="https://frame.work" target="_blank" rel="noopener noreferrer" className="hover:underline no-underline">Framework</a> laptop.
        The 13 Pro is soon to come...
        <br /><br />
        Also, NixOS on the desktop is on the way. I'm just <span className="line-through">lazy</span> :3c
      </p>
    </Panel>
  );
}
