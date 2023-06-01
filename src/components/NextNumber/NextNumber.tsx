import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
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
  const Caselinea = DatosPartida?.GanadoresLinea?.length === 0;
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
      DatosPartida.ListaJugadores?.forEach(async (jugador) => {
        jugador.CartonesJugador.forEach(async (carton) => {
          var Carton = await obtenerCampoDocumento("CartonesJugador", carton.idCarton, "carton");
          const cartonJson = CartonBingo.idToCarton(Carton);

          const DespistadosBingo = await obtenerCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosBingo");

          cartonJson?.forEach(async (linea) => {
            const DespistadosLinea = await obtenerCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosLinea");
            linea?.forEach((numero) => {
              if (numero[0] === numeroAleatorio) {
                numero[1] = true;
                console.error(jugador.nombreJugador + " tiene el número " + numeroAleatorio);
              }
            });

            if (CartonBingo.isLinea(linea)) {
              console.error(jugador.nombreJugador + " tiene línea");
            }

            if (
              CartonBingo.isLinea(linea) &&
              DespistadosLinea &&
              Array.isArray(DespistadosLinea) &&
              !DespistadosLinea.includes(jugador.idJugador) &&
              Caselinea
            ) {
              const updatedDespistadosLinea = [...DespistadosLinea, jugador.idJugador];
              await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosLinea", updatedDespistadosLinea);
            }
          });

          if (CartonBingo.isBingo(cartonJson) && !DespistadosBingo.includes(jugador.idJugador)) {
            console.error(jugador.nombreJugador + " tiene bingo");
            DespistadosBingo.push(jugador.idJugador);
            await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosBingo", DespistadosBingo);
          }

          const updatedCartonJson: [number, boolean][][] = cartonJson.map((linea) =>
            linea.map((numero) => {
              if (numero[0] === numeroAleatorio) {
                return [numero[0], true];
              }
              return [numero[0], numero[1]];
            })
          );

          Carton = CartonBingo.cartonToId(updatedCartonJson);
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(DatosPartida.idPartida);
  };

  return (
    <div className='next-number-container'>
      <div className='bombo-container'>
        <div className='id-partida-container'>
          <p className='id-partida-title'>
            ID: {DatosPartida.idPartida}
            <FontAwesomeIcon icon={faCopy} className='copy-button' onClick={handleCopyToClipboard} />
          </p>
          <p className='id-partida-p'>Guárdalo en caso de que quieras continuar la partida en otro momento</p>
        </div>
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
            Caselinea ? (
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
