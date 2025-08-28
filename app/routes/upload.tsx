/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-28 00:10
*****************************************************************************************/
import Navbar from '~/components/Navbar';
import React, { useState, type FormEvent } from 'react'

const upload = () => {

    // ===== USE EFFECTS =====
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');

    // ===== ON SUBMIT =====
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

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
                                <div>Uploader</div>
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