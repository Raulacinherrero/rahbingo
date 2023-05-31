import React, { useState, useEffect } from 'react';
import { actualizarCampoDocumento, obtenerCampoDocumento, obtenerDatosDocumento } from "../../firebase";
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

  useEffect(() => {
    if (numerosBomboState === 'f'.repeat(90)) {
      generarNumeroAleatorio();
    }
  }, []);

  useEffect(() => {
    if (numeroAleatorio !== null) {
      DatosPartida.ListaJugadores?.forEach((jugador) => {
        jugador.CartonesJugador.forEach(async (carton) => {
          var Carton = await obtenerCampoDocumento("CartonesJugador", carton.idCarton, "carton");
          const cartonJson = CartonBingo.idToCarton(Carton);

          cartonJson?.forEach(async (linea) => {
            linea?.forEach((numero) => {
              if (numero[0] === numeroAleatorio) {
                numero[1] = true;
                console.log(jugador.nombreJugador + " tiene el numero " + numeroAleatorio);
                console.log(numero[1]);
                console.log(cartonJson);
              }
            });

            if (
              CartonBingo.isLinea(linea) &&
              !DatosPartida.DespistadosLinea.includes(jugador.idJugador) &&
              !islinea
            ) {
              DatosPartida.DespistadosLinea.push(jugador.idJugador);
              await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosLinea", DatosPartida.DespistadosLinea);
            }
          });

          if (CartonBingo.isBingo(Carton) && !DatosPartida.DespistadosBingo.includes(jugador.idJugador)) {
            DatosPartida.DespistadosBingo.push(jugador.idJugador);
            await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosBingo", DatosPartida.DespistadosBingo);
          }

          Carton = CartonBingo.cartonToId(cartonJson);
          console.log(Carton);
          await actualizarCampoDocumento("CartonesJugador", carton.idCarton, "carton", Carton);
        });
      });
      setIsButtonClicked(true);
    }
  }, [numeroAleatorio]);

  const generarNumeroAleatorio = async () => {
    const numeroIndex = Math.floor(Math.random() * numerosArray.length);
    const numeroSeleccionado = numerosArray[numeroIndex];
    setNumeroAleatorio(numeroSeleccionado);

    const nuevosDatosPartida = [...numerosBomboState];
    nuevosDatosPartida[numeroSeleccionado - 1] = 't';
    const nuevosDatosPartidaString = nuevosDatosPartida.join('');

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
              {numeroAleatorio === null ? 'Continuar Partida' : 'Siguiente número'}
            </button>
          )}
          {numeroAleatorio !== null && (
            islinea ? (
              <Link to='/validator' className='button'>Cantar Línea</Link>
            ) : (
              <Link to='/validator' className='button'>Cantar Bingo</Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NextNumber;
