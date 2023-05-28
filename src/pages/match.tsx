import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

const Match = () => {
  const [datosPartida, setDatosPartida] = useState({ listaJugadores: [] });

  useEffect(() => {
    const fetchDatosPartida = () => {
      try {
        const datosPartidaString = localStorage.getItem('DatosPartida');
        const datosPartida = datosPartidaString ? JSON.parse(datosPartidaString) : { listaJugadores: [] };
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
    </>
  );
};

export default Match;
