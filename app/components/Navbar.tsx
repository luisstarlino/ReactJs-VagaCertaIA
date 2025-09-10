/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-25 20:20
*****************************************************************************************/
import React from 'react';
import { Link } from 'react-router';

function Navbar({ name }: { name?: string }) {
    return (
        <nav className='navbar'>
            <div className='flex flex-col justify-center items-start gap-3.5'>
                <Link to="/" className='text-2xl font-bold text-gradient'>VAGA CERTA</Link>
                <span>Bem vindo {name ? `, ${name.split("_").join(" ")}` : ''}</span>
            </div>
            <Link to={"/upload"} className='primary-button w-fit'>Analisar currículo</Link>
        </nav>
    );
}

export default Navbar;