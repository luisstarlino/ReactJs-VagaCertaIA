/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 07:45
*****************************************************************************************/
import { usePuterStore } from 'lib/puter';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useModalStore } from 'stores/modalStore';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Summary from '~/components/Summary';

// ===== METADATA =====
export const meta = () => ([
    { title: 'Vaga Certa | Analise de Curriculo' },
    { name: 'description', content: 'Detalhes e feedback do seu curriculo' }
])

interface btnOptionsProps {
    showBtn: boolean;
    navigateTo: string;
    txt: string;
}

const resume = () => {

    // ===== CONSTS =====
    const { id } = useParams();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const { auth, isLoading, fs, kv } = usePuterStore();
    const [feedback, setFeedback] = useState<Feedback | null>(null);


    // ===== AUTH CHECK =====
    useEffect(() => {
        if (!isLoading && (!auth.isAuthenticated || !auth.user?.uuid)) {
            resumeModalErrorMessage('Faça o login para continuar', { showBtn: true, navigateTo: `/auth?next=/resume/${id}`, txt: 'Entrar no sistema' });
            navigate(`/auth?next=/resume/${id}`, { replace: true });
        }
    }, [isLoading, auth.isAuthenticated, auth.user, navigate, id]);


    // ===== LOAD RESUME =====
    useEffect(() => {
        const loadResume = async () => {

            const resume = await kv.get(`resume:${auth.user?.uuid}:${id}`);

            if (!resume) {
                resumeModalErrorMessage("Nenhuma análise encontrada com esse ID",
                    { showBtn: true, navigateTo: `/auth`, txt: 'Página inicial' }
                );
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            setResumeUrl(URL.createObjectURL(pdfBlob));

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            setImageUrl(URL.createObjectURL(imageBlob));

            setFeedback(data.feedback);
        };

        if (!isLoading && auth.user?.uuid) {
            loadResume();
        }
    }, [isLoading, auth.user, id]);


    // ===== SHOW MODAL ERROR =====
    const resumeModalErrorMessage = (message: string, btnOpts?: btnOptionsProps) => {
        let content = (
            <>

                <div className="p-6 bg-red-50 rounded-lg border border-red-300 shadow-lg">
                    <div className="flex items-center mb-4">
                        <svg
                            className="w-8 h-8 text-red-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 5c-7 0-7 14 0 14s7-14 0-14z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-red-700">Erro!</h2>
                    </div>
                    <p className="text-red-600">{message}</p>
                </div>

                {btnOpts?.showBtn &&
                    <button className='primary-button focus:border-none my-5 rounded' onClick={() => { closeModal(); navigate(btnOpts?.navigateTo) }}>
                        {btnOpts?.txt}
                    </button>
                }
            </>
        );
        openModal(content, false);
    };


    return (
        <main className='!pt-0'>
            <nav className='resume-nav'>
                <Link to={"/"} className='back-button'>
                    <img src="/icons/new-back.svg" alt="logo" className='w-2.5 h-2.5' />
                    <span className='text-blue-800 text-sm font-semibold'>Voltar para o início</span>
                </Link>
            </nav>
            <div className='flex flex-row w-full max-lg:flex-col-reverse'>
                <section className="feedback-section bg-[url('/images/new-bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
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
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" alt="" className='w-full' />
                    )}
                </section>
            </div>
        </main>
    )
}

export default resume