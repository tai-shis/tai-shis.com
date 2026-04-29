import figlet from "figlet";
import About from "./components/home/about";
import Me from "./components/home/me";
import Socials from "./components/home/socials";
import Propaganda from "./components/home/propaganda";

export default function Home() {
  const asciiText = figlet.textSync("tai-shis", { font: "Standard" });

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <Me asciiText={asciiText}/>
        <Socials/>
        <About/>
        <Propaganda/>
      </div>
    </main>
  );
}
