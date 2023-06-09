import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { actualizarCampoDocumento, obtenerCampoDocumento } from "../../firebase";
import { Link } from 'gatsby';
import CartonBingo from '../../classes/CartonBingo';
import Bombo from '../Bombo/Bombo';
import './next-number.scss';

interface NextNumberProps {
  DatosPartida: {
    idNumerosBombo: string;
    GanadoresLinea: any[];
    ListaJugadores: any[];
    idPartida: string;
  };
}

const NextNumber = ({ DatosPartida }: NextNumberProps) => {
  const [numerosBomboState, setNumerosBombo] = useState<string>(DatosPartida?.idNumerosBombo || '');
  const [sinNumeros, setSinNumeros] = useState(false);
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
    if (numerosBomboState === 't'.repeat(90)) {
      setSinNumeros(true);
    }
  }, [numerosBomboState]);

  useEffect(() => {
    if (numerosBomboState === 'f'.repeat(90)) {
      generarNumeroAleatorio();
    }
  }, []);

  const fetchData = async () => {
    if (numeroAleatorio !== null) {
      const jugadoresLinea = [];
      const jugadoresBingo = [];

      const DespistadosBingo = await obtenerCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosBingo");
      const DespistadosLinea = await obtenerCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosLinea");

      for (const jugador of DatosPartida.ListaJugadores || []) {
        for (const carton of jugador.CartonesJugador) {
          var Carton = await obtenerCampoDocumento("CartonesJugador", carton.idCarton, "carton");
          const cartonJson = CartonBingo.idToCarton(Carton);

          for (const linea of cartonJson) {
            for (const numero of linea) {
              if (numero[0] === numeroAleatorio) {
                numero[1] = true;
                console.error(jugador.nombreJugador + " tiene el número " + numeroAleatorio);
              }
            }

            if (
              CartonBingo.isLinea(linea) &&
              DespistadosLinea &&
              Array.isArray(DespistadosLinea) &&
              !DespistadosLinea.includes(jugador.idJugador) &&
              Caselinea
            ) {
              console.error(jugador.nombreJugador + " tiene línea");
              jugadoresLinea.push(jugador.idJugador);
            }
          }

          if (
            CartonBingo.isBingo(cartonJson) &&
            DespistadosBingo &&
            Array.isArray(DespistadosBingo) &&
            !DespistadosBingo.includes(jugador.idJugador)
          ) {
            console.error(jugador.nombreJugador + " tiene bingo");
            jugadoresBingo.push(jugador.idJugador);
          }

          Carton = CartonBingo.cartonToId(cartonJson);
          await actualizarCampoDocumento("CartonesJugador", carton.idCarton, "carton", Carton);
        }
      }

      if (jugadoresLinea.length > 0) {
        const updatedDespistadosLinea = [...DespistadosLinea, ...jugadoresLinea];
        await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosLinea", updatedDespistadosLinea);
      }

      if (jugadoresBingo.length > 0) {
        const updatedDespistadosBingo = [...DespistadosBingo, ...jugadoresBingo];
        await actualizarCampoDocumento("DatosPartida", DatosPartida.idPartida, "DespistadosBingo", updatedDespistadosBingo);
      }
    }
  };

  useEffect(() => {
    fetchData();
    if (numeroAleatorio !== null) {
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
            !sinNumeros &&
            <button className='button' disabled>
              Siguiente número
            </button>
          ) : (
            <>
              {!sinNumeros && (
                <button className='button' onClick={generarNumeroAleatorio}>
                  {numeroAleatorio === null && !sinNumeros ? 'Continuar Partida' : 'Siguiente número'}
                </button>
              )}
              {numeroAleatorio === null && (
                <Link to='/validator' className='button'>Ir al Validador</Link>
              )}
            </>
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
