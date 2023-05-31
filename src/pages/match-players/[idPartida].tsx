import React, { useEffect, useState } from 'react';
import { obtenerDatosDocumento } from "../../firebase";
import { Link } from 'gatsby';

const MatchPlayers = ({ params }) => {
  const idPartida = params.idPartida;

  const [DatosPartida, setDatosPartida] = useState(null);
  const [ListaJugadores, setListaJugadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosPartida = await obtenerDatosDocumento('DatosPartida', idPartida);
        if (datosPartida !== null) {
          const { ListaJugadores, ...rest } = datosPartida;

          if (ListaJugadores) {
            const jugadoresData = [];
            for (const idJugador of ListaJugadores) {
              const datosJugador = await obtenerDatosDocumento('ListaJugadores', idJugador);
              jugadoresData.push(datosJugador);
            }
            setListaJugadores(jugadoresData);
            setDatosPartida({ ...rest, ListaJugadores: jugadoresData });
          } else {
            setDatosPartida({ ...rest });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [idPartida]);

  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      {ListaJugadores && ListaJugadores.map((Jugador) => (
        <Link to={`/player-boards/${Jugador.idJugador}`} key={Jugador.idJugador}>
          {Jugador.nombreJugador}
        </Link>
      ))}
    </>
  );
};

export default MatchPlayers;
