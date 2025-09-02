/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-25 20:39
*****************************************************************************************/
// import { resumes } from "contants";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "lib/puter";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Vaga Certa" },
    { name: "description", content: "O jeito certo de se candidatar à vaga dos sonhos!" },
  ];
}

export default function Home() {

  // ===== CONSTANTS =====
  const navigate = useNavigate();
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // ===== USE EFFECTS =====
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadMyResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (JSON.parse(resume.value) as Resume));

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadMyResumes();
  }, [])

  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>

    {/* Navbar */}
    <Navbar />

    <section className={"main-section"}>

      {/* TITLE */}
      <div className={"page-heading py-16"}>
        <h1>Melhore suas aplicações e seu Currículo!</h1>

        {!loadingResumes && resumes?.length === 0 ? (
          <h2>Nenhum arquivo enviado para nossa avaliação.</h2>
        ) :
          <h2>Use a IA para melhorar sua apresentação e encontre o emprego dos sonhos.</h2>
        }
      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" alt="" className="w-[200px]" />
        </div>
      )}

      {/* RESUMES ANIMATION BACKGROUND */}
      {resumes.length > 0 && (
        <div className="resumes-section">
          {!loadingResumes && resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {resumes.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link className="primary-button w-fit text-xl font-semibold" to={`/upload`}>Faça o upload do seu primeiro arquivo</Link>
        </div>
      )}
    </section>

  </main>;
}
