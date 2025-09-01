/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-28 00:10
*****************************************************************************************/
import Navbar from '~/components/Navbar';
import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from 'lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from 'lib/pdfToImage';
import { generateUUID } from 'lib/utils';
import { prepareInstructions } from 'contants';

const upload = () => {

    // ===== CONSTS =====
    const navigate = useNavigate();
    const [statusText, setStatusText] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const [isProcessing, setIsProcessing] = useState(false);

    // ===== HANDLE FILE =====
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    // ===== HANDLE ANALYSE =====
    const handleAnalyse = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {

        debugger;
        setIsProcessing(true);
        setStatusText(`Uploading the file...`);
        try {
            // ===== 1. Upload File into PuterJS
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) throw new Error('Error: Failed to upload file');


            // ===== 2. Convert PDF to IMAGE
            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) throw new Error('Error: Failed to convet PDF to image;');

            // ===== 3. Upload IMAGE
            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) throw new Error('Error: Failed to upload image');

            // ===== 4. Prepare data
            setStatusText('Preparing data...');
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

            // ===== 5. Send data
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            // ===== 6. AI Analysing
            setStatusText('Analyzing...');
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );

            if (!feedback) throw new Error('Error: Failed to analyze resume');
            const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;
            data.feedback = JSON.parse(feedbackText);

            // ===== 7. Send data again (w/feedback AI)
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText("Alaysis Complete, redirecting...");
            console.log(data);

        } catch (erro: any) {
            alert(erro);
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
        if (!form) return; // TODO: CREATE A MODAL HERE!
        const formData = new FormData(form);

        // ===== GET PROPERTIES
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return; // TODO: CREATE A MODAL HERE!

        // ===== ANALYSE
        handleAnalyse({ companyName, jobTitle, jobDescription, file })

    }

    return (
        <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>

            {/* Navbar */}
            <Navbar />

            <section className={"main-section"}>
                <div className='page-heading py-16'>
                    <h1>Feedback sincero sobre a sua vaga dos sonhos</h1>

                    {/* LOADING EMOJI */}
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="resume-scan" className='w-full' />
                        </>
                    )
                        : (
                            <h2>Envie o seu Currículo para uma análise ATS e receba umas dicas de como melhorar ele.</h2>
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

                            <button className='primary-button' type='submit'>
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