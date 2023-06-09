import React, { useEffect, useRef, useState } from 'react';
import { Link, navigate } from 'gatsby';
import './loader-form.scss';

const LoaderForm = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [hasLastMatch, setHasLastMatch] = useState(false);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
        const lastMatchId = localStorage.getItem('idPartida');
        setHasLastMatch(!!lastMatchId);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputRef.current?.value;
        if (inputValue) {
            localStorage.setItem('idPartida', inputValue);
            console.log('Formulario enviado');
            navigate('/prematch');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='loader-form-title'>Inserta el ID de tu partida inacabada</h1>
            <label className='loader-form-ID-label'>
                ID:
                <input type="text" ref={inputRef} className='loader-form-ID-imput' onChange={handleInputChange} />
            </label>
            <button type="submit" className='loader-form-button'>Enviar</button>
            {hasLastMatch && (
                <Link to='/prematch' className='last-match-button'>Cargar Última Partida</Link>
            )}
        </form>
    );
};

export default LoaderForm;
