import React, { useState } from 'react';
import { uploadCollection } from "../../firebase";
import { Link } from 'gatsby';
import CartonBingo from '../../classes/CartonBingo';
import Bombo from '../Bombo/Bombo';
import './next-number.scss';

const NextNumber = ({ DatosPartida, setDatosPartida }) => {
  const numerosBombo = DatosPartida?.idNumerosBombo || '';
  const numerosArray: number[] = [];

  for (let i = 0; i < numerosBombo.length; i++) {
    if (numerosBombo[i] === 'f') {
      numerosArray.push(i + 1);
    }
  }

  const [numeroAleatorio, setNumeroAleatorio] = useState<number | null>(null);

  const islinea = DatosPartida?.GanadoresLinea?.length === 0;

  const generarNumeroAleatorio = () => {
    const numeroIndex = Math.floor(Math.random() * numerosArray.length);
    const numeroSeleccionado = numerosArray[numeroIndex];
    setNumeroAleatorio(numeroSeleccionado);

    const nuevosDatosPartida = [...numerosBombo];
    nuevosDatosPartida[numeroSeleccionado - 1] = 't';
    const nuevosDatosPartidaString = nuevosDatosPartida.join('');
    
    const updatedDatosPartida = {
      ...DatosPartida,
      idNumerosBombo: nuevosDatosPartidaString
    };

    setDatosPartida(updatedDatosPartida);
    uploadCollection("DatosPartida", DatosPartida.idPartida, updatedDatosPartida);
  };

  return (
    <div className='next-number-container'>
      <div className='bombo-container'>
        <Bombo idNumerosBombo={numerosBombo} />
      </div>
      <div className='content-container'>
        <div className='number-container'>
          <h1 className='number'>{numeroAleatorio}</h1>
        </div>
        <div className='button-container'>
          <button className='button' onClick={generarNumeroAleatorio}>Siguiente número</button>
          {islinea ? (
            <Link to='/validator' className='button'>Cantar Línea</Link>
          ) : (
            <Link to='/validator' className='button'>Cantar Bingo</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextNumber;
