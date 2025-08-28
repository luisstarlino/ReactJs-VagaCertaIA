/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-26 07:40
*****************************************************************************************/
import { usePuterStore } from 'lib/puter'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';

// ===== METADATA =====
export const meta = () => ([
  { title: 'Vaga Certa | Login' },
  { name: 'description', content: 'Entre com sua conta' }
])

const auth = () => {

  // ===== CONSTANTS =====
  const navigate = useNavigate();
  const { isLoading, auth } = usePuterStore();

  // ===== "NEXT TO" FUNC =====
  const location = useLocation();
  const next = location.search.split('next=')[1];


  // ===== USE EFFECTS =====
  useEffect(() => {

    if (auth.isAuthenticated) navigate(next);

  }, [auth.isAuthenticated, next]);

  return (
    <main className={"bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center"}>
      <div className='gradient-border shadow-lg'>
        <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1>Bem vindo</h1>
            <h2>Entre pra continuar sua análise</h2>
          </div>
          <div>
            {isLoading ?
              (
                <button className='auth-button animate-pulse'>
                  <p>Fazendo o login...</p>
                </button>
              )
              : (
                <>
                  {auth.isAuthenticated ?
                    (
                      <button className='auth-button' onClick={auth.signOut}>
                        <p>Sair</p>
                      </button>
                    ) : (
                      <button className='auth-button' onClick={auth.signIn}>
                        <p>Entrar</p>
                      </button>
                    )}
                </>
              )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default auth