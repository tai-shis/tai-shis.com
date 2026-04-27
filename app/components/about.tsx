import Panel from "@/app/components/panel";
import CopyButton from "./copy-button";

export default function About() {
  return (
    <Panel name="about" className="p-4">
      <p className="text-sm text-muted px-2">
        I do computer things at Mount Royal University, previously working as a Research Assistant.
        I typically build stuff in typescript, focusing on web development with react. 
        Soon™ to be diving into native developent as well as data science.
        <br /><br />
        Aside from school, we do a little hobbymaxxing. Currently dabbling in mechanical keyboards, playing music, fashion, photography, and cooking.
        I'd love to get into making my own clothes and homelabbing as well, but thats a future endeavor.
        <br /><br />
        Im always up to chat about any of these things, so do reach out by socials or preferably through discord!
      </p>
    </Panel>
  );
}
