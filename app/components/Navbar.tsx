/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-25 20:20
*****************************************************************************************/
import React from 'react';
import { Link } from 'react-router';

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to="/" className='text-2xl font-bold text-gradient'>VAGA CERTA</Link>
            <Link to={"/upload"} className='primary-button w-fit'>Analisar meu currículo</Link>
        </nav>
    );
}

export default Navbar;