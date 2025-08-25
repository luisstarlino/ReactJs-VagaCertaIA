import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Vaga Certa" },
    { name: "description", content: "O jeito certo de se candidatar à vaga dos sonhos!" },
  ];
}

export default function Home() {
  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>

    {/* Navbar */}
    <Navbar />

    <section className={"main-section"}>
      <div className={"page-heading"}>
        <h1>Melhore suas aplicações e seu Currículo!</h1>
        <h2>Use a IA para melhorar sua apresentação e encontre o emprego dos sonhos.</h2>
      </div>
    </section>
  </main>;
}
