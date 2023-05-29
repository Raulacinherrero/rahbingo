import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Bombo from '../components/Bombo/Bombo';
import NextNumber from '../components/NextNumber/NextNumber';

const Match = () => {
  const [datosPartida, setDatosPartida] = useState({ idNumerosBombo: '' });

  useEffect(() => {
    const fetchDatosPartida = () => {
      try {
        const datosPartidaString = localStorage.getItem('DatosPartida');
        const datosPartida = datosPartidaString ? JSON.parse(datosPartidaString) : { idNumerosBombo: '' };
        setDatosPartida(datosPartida);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDatosPartida();
  }, []);

  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={false} />
      <Bombo idNumerosBombo={datosPartida.idNumerosBombo} />
      <NextNumber DatosPartida={datosPartida} />
    </>
  );
};

export default Match;
