import React, { useEffect, useState } from 'react';
import { obtenerDatosDocumento } from "../firebase";
import Navbar from '../components/Navbar/Navbar';
import ShowBoards from '../components/ShowBoards/ShowBoards';

const PreMatch = () => {
  const [idPartida, setIdPartida] = useState('');
  const [DatosPartida, setDatosPartida] = useState(null);
  const [idsJugadores, setIdsJugadores] = useState([]);
  const [ListaJugadores, setListaJugadores] = useState([]);

  useEffect(() => {
    const fetchIdPartida = () => {
      try {
        const idPartida = localStorage.getItem('idPartida') || '';
        setIdPartida(idPartida);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchIdPartida();
  }, []);

  useEffect(() => {
    const fetchDatosPartida = async () => {
      try {
        const datosPartida = await obtenerDatosDocumento("DatosPartida", idPartida);
        if (datosPartida) {
          const {
            idJugadoresString,
            idDespistadosLinea,
            idDespistadosBingo,
            idGanadoresLinea,
            idGanadoresBingo,
            ...rest
          } = datosPartida;

          const DespistadosLinea = idDespistadosLinea ? idDespistadosLinea.split('-') : [];
          const DespistadosBingo = idDespistadosBingo ? idDespistadosBingo.split('-') : [];
          const GanadoresLinea = idGanadoresLinea ? idGanadoresLinea.split('-') : [];
          const GanadoresBingo = idGanadoresBingo ? idGanadoresBingo.split('-') : [];

          setDatosPartida({
            ...rest,
            DespistadosLinea,
            DespistadosBingo,
            GanadoresLinea,
            GanadoresBingo
          });

          if (idJugadoresString) {
            const jugadores = idJugadoresString.split('-');
            setIdsJugadores(jugadores);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDatosPartida();
  }, [idPartida]);

  useEffect(() => {
    const fetchJugadoresAndCartones = async () => {
      const jugadoresData = [];
      for (const idJugador of idsJugadores) {
        const datosJugador = await obtenerDatosDocumento("ListaJugadores", idJugador);
        const idCartones = datosJugador.idCartonesString.split('-');
        const cartonesJugador = await Promise.all(idCartones.map(async (idCarton) => {
          return await obtenerDatosDocumento("CartonesJugador", idCarton);
        }));
        delete datosJugador.idCartonesString;
        jugadoresData.push({ ...datosJugador, CartonesJugador: cartonesJugador });
      }
      setListaJugadores(jugadoresData);
    };

    fetchJugadoresAndCartones();
  }, [idsJugadores]);

  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <Navbar initialVisible={false} />
      <ShowBoards listaJugadores={ListaJugadores} style={3} />
      {/* <pre>{JSON.stringify(DatosPartida, null, 2)}</pre>
      <pre>{JSON.stringify(ListaJugadores, null, 2)}</pre> */}
    </>
  );
};

export default PreMatch;
