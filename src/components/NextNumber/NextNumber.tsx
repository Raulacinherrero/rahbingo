import React, { useState, useEffect } from 'react';
import { actualizarCampoDocumento, obtenerCampoDocumento } from "../../firebase";
import { Link } from 'gatsby';
import CartonBingo from '../../classes/CartonBingo';
import Bombo from '../Bombo/Bombo';
import './next-number.scss';

const NextNumber = ({ DatosPartida }) => {
  const [numerosBomboState, setNumerosBombo] = useState<string>(DatosPartida?.idNumerosBombo || '');
  const numerosArray: number[] = [];

  for (let i = 0; i < numerosBomboState.length; i++) {
    if (numerosBomboState[i] === 'f') {
      numerosArray.push(i + 1);
    }
  }

  const [numeroAleatorio, setNumeroAleatorio] = useState<number | null>(null);
  const islinea = DatosPartida?.GanadoresLinea?.length === 0;
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    setNumerosBombo(DatosPartida?.idNumerosBombo || '');
  }, [DatosPartida?.idNumerosBombo]);

  useEffect(() => {
    setIsButtonClicked(false);
  }, [numerosBomboState]);

  const generarNumeroAleatorio = async () => {
    const numeroIndex = Math.floor(Math.random() * numerosArray.length);
    const numeroSeleccionado = numerosArray[numeroIndex];
    setNumeroAleatorio(numeroSeleccionado);

    const nuevosDatosPartida = [...numerosBomboState];
    nuevosDatosPartida[numeroSeleccionado - 1] = 't';
    const nuevosDatosPartidaString = nuevosDatosPartida.join('');

    setIsButtonClicked(true); // Button has been clicked

    await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "idNumerosBombo", nuevosDatosPartidaString);
    const updatedNumerosBombo = await obtenerCampoDocumento("DatosPartida", DatosPartida.idPartida, "idNumerosBombo");
    setNumerosBombo(updatedNumerosBombo);
  };

  return (
    <div className='next-number-container'>
      <div className='bombo-container'>
        <Bombo idNumerosBombo={numerosBomboState} />
      </div>
      <div className='content-container'>
        <div className='number-container'>
          <h1 className='number'>{numeroAleatorio}</h1>
        </div>
        <div className='button-container'>
          {isButtonClicked ? (
            <button className='button' disabled>
              Siguiente número
            </button>
          ) : (
            <button className='button' onClick={generarNumeroAleatorio}>
              Siguiente número
            </button>
          )}
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
