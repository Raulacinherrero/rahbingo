import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import './loader-form.scss';

const LoaderForm = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('partidaInacabada', inputValue);
        console.log('Formulario enviado');
    };

    return (
        <form>
            <h1 className='title'>Inserta el ID de tu partida inacabada</h1>
            <label className='ID-label' >
                ID:
                <input type="text" ref={inputRef} className='ID-imput' />
            </label>
            <Link to='/prematch' className='button' onClick='handleSubmit' >Enviar</Link>
        </form>
    );
};

export default LoaderForm;
