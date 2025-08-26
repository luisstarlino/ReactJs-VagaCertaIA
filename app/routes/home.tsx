/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-25 20:39
*****************************************************************************************/
import { resumes } from "contants";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";

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

      {/* TITLE */}
      <div className={"page-heading py-16"}>
        <h1>Melhore suas aplicações e seu Currículo!</h1>
        <h2>Use a IA para melhorar sua apresentação e encontre o emprego dos sonhos.</h2>
      </div>

      {/* RESUMES ANIMATION BACKGROUND */}
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>

  </main>;
}
