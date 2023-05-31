import React, { useEffect, useState } from 'react';
import { obtenerDatosDocumento } from "../../firebase";
import BoardBingo from '../../components/BoardBingo/BoardBingo';

const PlayerBoards = ({ params }) => {
  const idJugador = params.idJugador;
  const [cartonesJugador, setCartonesJugador] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosJugador = await obtenerDatosDocumento('ListaJugadores', idJugador);
        if (datosJugador && datosJugador.CartonesJugador) {
          const idCartones = datosJugador.CartonesJugador;
          const cartones = await Promise.all(
            idCartones.map(async (idCarton) => {
              return await obtenerDatosDocumento('CartonesJugador', idCarton);
            })
          );
          setCartonesJugador(cartones);
        }
      } catch (error) {
        console.error('Error al obtener los datos del jugador:', error);
      }
    };

    fetchData();
  }, [idJugador]);

  return (
    <>
      <title>Bingo Offline | RAH Final 2ºDAW</title>
      <div style={{ width: '100%' }}>
        {cartonesJugador.map((Carton) => (
          <BoardBingo key={Carton.idCarton} Carton={Carton} mobile={true}/>
        ))}
      </div>
    </>
  );
};

export default PlayerBoards;
