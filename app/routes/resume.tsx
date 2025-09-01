/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 07:45
*****************************************************************************************/
import { usePuterStore } from 'lib/puter';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

// ===== METADATA =====
export const meta = () => ([
    { title: 'Vaga Certa | Analise de Curriculo' },
    { name: 'description', content: 'Detalhes e feedback do seu curriculo' }
])

const resume = () => {

    // ===== CONSTS =====
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [feedback, setFeedback] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const { auth, isLoading, fs, kv } = usePuterStore();


    // ===== IS USER AUTH?
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`auth?next=/resume/:${id}`);
    }, [isLoading]);

    // ===== USE EFFECT =====
    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if (!resume) return; //TODO: CREATE A MODAL

            // ==== 1.HANDLE W/RESUME DATA
            const data = JSON.parse(resume);

            // ==== 2.RESUME PDF - BLOB HANDLE 
            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return; //TODO: CREATE A MODAL

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            // ==== 3.RESUME IMAGE - BLOB HANDLE 
            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return; //TODO: CREATE A MODAL

            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            // ==== 4.FEEDBACK
            setFeedback(data.feedback);
            console.log({ imageUrl, resumeUrl, feedback: data?.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className='!pt-0'>
            <nav className='resume-nav'>
                <Link to={"/"} className='back-button'>
                    <img src="/icons/back.svg" alt="logo" className='w-2.5 h-2.5' />
                    <span className='text-gray-800 text-sm font-semibold'>Back to HomePage</span>
                </Link>
            </nav>
            <div className='flex flex-row w-full max-lg:flex-col-reverse'>
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-xl:h-fit w-fit'>
                            <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
                                <img src={imageUrl} className='w-full h-full object-contain rounded-2xl' title='Currículo' />
                            </a>
                        </div>
                    )}
                </section>
                <section className='feedback-section'>
                    <h2 className='text-4xl !text-black font-bold'>Análise do Currículo</h2>
                    {feedback ? (
                        <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                            Detalhes do ATS (Applicant Tracking Systems | Sistemas de acompanhamento de candidatos)
                        </div>
                    ) : (
                        <img src="/images/resume-scan2.git" alt="" className='w-full' />
                    )}
                </section>
            </div>
        </main>
    )
}

export default resume