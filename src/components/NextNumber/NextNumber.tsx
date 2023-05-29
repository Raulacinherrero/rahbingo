import React, { useState } from 'react';
import { Link } from 'gatsby';
import './next-number.scss';

const NextNumber = ({ DatosPartida }) => {
  const numerosBombo = DatosPartida.idNumerosBombo;
  const numerosArray: number[] = [];

  for (let i = 0; i < numerosBombo.length; i++) {
    if (numerosBombo[i] === 'f') {
      numerosArray.push(i + 1);
    }
  }

  const [numeroAleatorio, setNumeroAleatorio] = useState<number | null>(null);

  const generarNumeroAleatorio = () => {
    const numeroIndex = Math.floor(Math.random() * numerosArray.length);
    const numeroSeleccionado: number = numerosArray[numeroIndex];
    setNumeroAleatorio(numeroSeleccionado);

    const nuevosDatosPartida = [...numerosBombo];
    nuevosDatosPartida[numeroSeleccionado - 1] = 't';
    const nuevosDatosPartidaString = nuevosDatosPartida.join('');
    DatosPartida.idNumerosBombo = nuevosDatosPartidaString;

    localStorage.setItem('DatosPartida', JSON.stringify(DatosPartida));
  };

  return (
    <div>
      <h1>{numeroAleatorio}</h1>
      <h1>{DatosPartida.idNumerosBombo}</h1>
      <Link to="/match" onClick={generarNumeroAleatorio} >Generar número</Link>
    </div>
  );
};

export default NextNumber;
