import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Number from '../components/NextNumber/NextNumber';

const Match = () => {
  const [datosPartida, setDatosPartida] = useState({ idNumerosBombo: '', GanadoresLinea: [], GanadoresBingo: [], listaJugadores: [], DespistadosLinea: [], DespistadosBingo: [] });

  useEffect(() => {
    const fetchDatosPartida = () => {
      try {
        const datosPartidaString = localStorage.getItem('DatosPartida');
        const datosPartida = datosPartidaString ? JSON.parse(datosPartidaString) : { idNumerosBombo: '', GanadoresLinea: [], GanadoresBingo: [], listaJugadores: [], DespistadosLinea: [], DespistadosBingo: [] };
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
      <Number DatosPartida={datosPartida} />
    </>
  );
};

export default Match;
