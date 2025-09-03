/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-28 00:10
*****************************************************************************************/
import Navbar from '~/components/Navbar';
import React, { useEffect, useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from 'lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from 'lib/pdfToImage';
import { generateUUID } from 'lib/utils';
import { prepareInstructions } from 'contants';
import { useModalStore } from 'stores/modalStore';

const upload = () => {

    // ===== CONSTS =====
    const { openModal } = useModalStore();
    const navigate = useNavigate();
    const [statusText, setStatusText] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const [hasAgreeWithTerms, setHasAgreeWithTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // ===== USE EFFECTS =====
    useEffect(() => {

        if (!auth.isAuthenticated) navigate('/auth?next=/upload');       

    }, [auth.isAuthenticated]);

    // ===== DEFAULT ALERT =====
    const formErrorModal = (message: string) => {
        let content = (
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Vaga Certa informa!</h2>
                <p>{message}</p>
            </div>);
        openModal(content);
    }

    // ===== SHOW TERMS AND PREFERENCES =====
    const showTermsAndConditions = () => {
        const contentHTML = (
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Termos e Condições</h2>

                <div className='pr-4 text-justify'>
                    <div className="space-y-4 text-sm text-gray-700">
                        <p>
                            Ao clicar em <strong>"Analisar Currículo"</strong>, você concorda que o site <strong>"Vaga Certa"</strong>
                            poderá armazenar seus dados pessoais, bem como informações relacionadas à vaga, em nosso banco de dados.
                        </p>
                        <p>
                            Todos os dados coletados serão tratados em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>,
                            garantindo privacidade, segurança e uso exclusivo para fins de análise de compatibilidade.
                        </p>
                        <p>
                            As análises geradas estarão disponíveis apenas para o usuário logado, sendo vedado o compartilhamento sem
                            o seu consentimento explícito.
                        </p>
                        <p>
                            Você terá total controle sobre suas informações e poderá solicitar a exclusão definitiva de seus dados ou análises
                            a qualquer momento.
                        </p>
                        <p>
                            O <strong>Vaga Certa</strong> compromete-se a não comercializar, alugar ou compartilhar seus dados com terceiros
                            sem autorização expressa, exceto quando exigido por lei ou ordem judicial.
                        </p>
                        <p>
                            Reservamo-nos o direito de atualizar estes Termos e Condições periodicamente. Quaisquer alterações relevantes serão
                            comunicadas de forma transparente dentro da plataforma.
                        </p>
                        <p>
                            Ao prosseguir, você declara estar ciente e de acordo com estas condições de uso.
                        </p>
                    </div>
                </div>

            </div>
        );


        openModal(contentHTML);
    }

    // ===== HANDLE FILE =====
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    // ===== HANDLE ANALYSE =====
    const handleAnalyse = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {

        setIsProcessing(true);
        setStatusText(`Carregando arquivo...`);
        try {

            // ===== 1. Check again if the user is connect, to user the identification
            if(auth.isAuthenticated === false) throw new Error("Você precisa estar logado para fazer a análise!");

            // ===== 1. Upload File into PuterJS
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) throw new Error('Error: Falha ao fazer upload de arquivo!');


            // ===== 2. Convert PDF to IMAGE
            setStatusText('Convertendo para imagem...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) throw new Error('Error: Falha ao converter PDF para imagem!');

            // ===== 3. Upload IMAGE
            setStatusText('Enviando imagem...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) throw new Error('Error: Falha ao fazer upload de imagem!');

            // ===== 4. Prepare data
            setStatusText('Salvando informações...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: ''
            };
            const keystoke = `resume:${auth.user?.uuid}:${uuid}`;

            // ===== 5. Send data
            await kv.set(keystoke, JSON.stringify(data));

            // ===== 6. AI Analysing
            setStatusText('Analisando Curriculo x Vaga...');
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );

            if (!feedback) throw new Error('Error: Failed to analyze resume');
            const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;
            data.feedback = JSON.parse(feedbackText);

            // ===== 7. Send data again (w/feedback AI)
            await kv.set(keystoke, JSON.stringify(data));
            setStatusText("Análise Completa, redirecionando...");
            navigate(`/resume/${uuid}`);

        } catch (erro: any) {
            formErrorModal(erro);
            setStatusText('');
        } finally {
            setIsProcessing(false);
        }
    }

    // ===== ON SUBMIT =====
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ===== HAS A FORM?
        const form = e.currentTarget.closest('form');
        if (!form) {
            formErrorModal("Erro ao localizar formulário. Recarregue a página.");
            return;
        };
        const formData = new FormData(form);

        // ===== GET PROPERTIES
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) {
            formErrorModal("Nenhum arquivo encontrado para análise, anexe seu currículo para análise!!!");
            return;
        }

        // ===== ANALYSE
        handleAnalyse({ companyName, jobTitle, jobDescription, file })

    }

    return (
        <main className={"bg-[url('/images/new-bg-main.svg')] bg-cover"}>

            {/* Navbar */}
            <Navbar />

            <section className={"main-section"}>
                <div className='page-heading py-16'>
                    <h1>Feedback instantâneo sobre a sua vaga dos sonhos</h1>

                    {/* LOADING EMOJI */}
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="resume-scan" className='w-full' />
                        </>
                    )
                        : (
                            <h2 className='font-normal'>Envie o seu Currículo para uma análise ATS e receba umas dicas de como melhorar ele.</h2>
                        )
                    }

                    {/* NEW COMPANY FORM */}
                    {!isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>

                            <div className='form-div'>
                                <label htmlFor="company-name">Empresa:</label>
                                <input type="text" name='company-name' placeholder='Nome da Empresa' id='company-name' />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="job-title">Nome Vaga:</label>
                                <input type="text" name='job-title' placeholder='Vaga' id='job-title' />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="job-description">Descrição (Copie e cole toda aqui):</label>
                                <textarea rows={5} name='job-description' placeholder='Descrição' id='job-description' />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="uploader">Enviar currículo para análise:</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>



                            <div className="flex items-center flex-row w-full justify-evenly">
                                <div className='w-1/12'>
                                    <input type="checkbox" className='!shadow-none !m-0 h-4 w-4' id='checked-agree' name='checked-agree' onChange={() => setHasAgreeWithTerms(prev => !prev)} />
                                </div>
                                <label htmlFor='checked-agree' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300' >Ao enviar meu curriculo para Análise, eu concordo com <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline" onClick={showTermsAndConditions}>os termos e condições</a> de armazenamento.</label>
                            </div>

                            <button className='primary-button disabled:opacity-50 disabled:cursor-not-allowed' type='submit' disabled={!hasAgreeWithTerms}>
                                Analisar Currículo
                            </button>

                        </form>
                    )}

                </div>
            </section>
        </main>
    )
}

export default upload;