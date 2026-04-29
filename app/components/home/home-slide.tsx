import figlet from "figlet";
import About from "./about";
import Me from "./me";
import Socials from "./socials";
import Propaganda from "./propaganda";

export default function HomeSlide() {
  const asciiText = figlet.textSync("tai-shis", { font: "Standard" });
  return (
    <div className="w-full flex flex-col gap-4">
      <Me asciiText={asciiText} />
      <Socials />
      <About />
      <Propaganda />
    </div>
  );
}
