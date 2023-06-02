import React, { useState, useEffect } from 'react';
import { actualizarCampoDocumento, obtenerCampoDocumento } from '../../firebase';
import { Link } from 'gatsby';
import BoardBingo from '../BoardBingo/BoardBingo';
import './validator-form.scss';
import CartonBingo from '../../classes/CartonBingo';

const ValidatorForm = ({ DatosPartida }) => {
  const [selectedJugador, setSelectedJugador] = useState('');
  const [selectedCarton, setSelectedCarton] = useState('');
  const [selectedLinea, setSelectedLinea] = useState('');
  const [updateBoard, setUpdateBoard] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [despistadosLinea, setDespistadosLinea] = useState([]);
  const [despistadosBingo, setDespistadosBingo] = useState([]);
  const [ganadoresLinea, setGanadoresLinea] = useState([]);
  const [ganadoresBingo, setGanadoresBingo] = useState([]);

  const handleJugadorChange = (event) => {
    const jugadorId = event.target.value;
    setSelectedJugador(jugadorId);
    setSelectedCarton('');
    setUpdateBoard(false);
    setSelectedLinea('');
  };

  const handleCartonChange = (event) => {
    const cartonId = event.target.value;
    setSelectedCarton(cartonId);
    setUpdateBoard(false);
    setSelectedLinea('');
  };

  const handleLineaChange = (event) => {
    const linea = event.target.value;
    setSelectedLinea(linea);
    setUpdateBoard(false);
  };

  const restart = () => {
    setUpdateBoard(true);
    setHidden(false);
    setSelectedJugador('');
    setSelectedCarton('');
    setSelectedLinea('');
  };

  const CaseLinea = DatosPartida?.GanadoresLinea?.length === 0;
  const CaseBingo = ganadoresBingo?.length === 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const despistadosLinea = await obtenerCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "DespistadosLinea"
        );
        const despistadosBingo = await obtenerCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "DespistadosBingo"
        );
        const ganadoresLinea = await obtenerCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "GanadoresLinea"
        );
        const ganadoresBingo = await obtenerCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "GanadoresBingo"
        );

        setDespistadosLinea(despistadosLinea);
        setDespistadosBingo(despistadosBingo);
        setGanadoresLinea(ganadoresLinea);
        setGanadoresBingo(ganadoresBingo);
      } catch (error) {
        // Handle the error
      }
    };

    fetchData();
  }, [DatosPartida.idPartida]);

  const Validar = async () => {
    if (CaseLinea) {
      if (DatosPartida.DespistadosLinea.includes(selectedJugador) && CartonBingo.isLinea(CartonBingo.idToCarton(selectedCarton)[selectedLinea])) {
        const updatedDespistadosLinea = DatosPartida.DespistadosLinea.filter(
          (jugador) => jugador !== selectedJugador
        );
        const updatedGanadoresLinea = [...ganadoresLinea, selectedJugador];

        await actualizarCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "DespistadosLinea",
          updatedDespistadosLinea
        );
        await actualizarCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "GanadoresLinea",
          updatedGanadoresLinea
        );

        setGanadoresLinea(updatedGanadoresLinea);
      }
    } else {
      if (DatosPartida.DespistadosBingo.includes(selectedJugador) && CartonBingo.isBingo(CartonBingo.idToCarton(selectedCarton))) {
        const updatedDespistadosBingo = DatosPartida.DespistadosBingo.filter(
          (jugador) => jugador !== selectedJugador
        );
        const updatedGanadoresBingo = [...ganadoresBingo, selectedJugador];

        await actualizarCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "DespistadosBingo",
          updatedDespistadosBingo
        );
        await actualizarCampoDocumento(
          "DatosPartida",
          DatosPartida.idPartida,
          "GanadoresBingo",
          updatedGanadoresBingo
        );

        setGanadoresBingo(updatedGanadoresBingo);
      }
    }
    setUpdateBoard(true);
    setHidden(true);
  };

  return (
    <div className='validator-container'>
      {CaseLinea ? (
        <h1 className='validator-title'>¿La Línea es correcta?</h1>
      ) : (
        <h1 className='validator-title'>¿El Bingo es correcto?</h1>
      )}
      <div className='validator-form'>
        {!hidden && (
          <div className='selects-container'>
            <div>
              <label className='validator-label'>
                Jugador:
                <select className='validator-select' value={selectedJugador} onChange={handleJugadorChange}>
                  <option value="null">Selecciona un Jugador</option>
                  {DatosPartida.ListaJugadores.map((jugador) => (
                    <option key={jugador.idJugador} value={jugador.idJugador}>
                      {jugador.nombreJugador}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedJugador && (
              <div>
                <label className='validator-label'>
                  Cartón:
                  <select className='validator-select' value={selectedCarton} onChange={handleCartonChange}>
                    <option value="null">Selecciona un Cartón</option>
                    {DatosPartida.ListaJugadores.map((jugador) => {
                      if (jugador.idJugador === selectedJugador) {
                        return jugador.CartonesJugador.map((carton, index) => (
                          <option key={carton.idCarton} value={carton.carton}>
                            {index + 1}º Cartón
                          </option>
                        ));
                      }
                      return null;
                    })}
                  </select>
                </label>
              </div>
            )}

            {selectedCarton && CaseLinea && (
              <div>
                <label className='validator-label'>
                  Línea:
                  <select className='validator-select' value={selectedLinea} onChange={handleLineaChange}>
                    <option value="null">Selecciona una Línea</option>
                    <option value="0">1ª Línea</option>
                    <option value="1">2ª Línea</option>
                    <option value="2">3ª línea</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        )}
        <div className='button-board-container'>
          {selectedCarton && (
            <div className={`validator-boardbingo${hidden ? ' hidden' : ''}`}>
              <BoardBingo
                key={selectedCarton}
                Carton={selectedCarton}
                estado={updateBoard ? 2 : 0}
                linea={selectedLinea !== '' ? Number(selectedLinea) : null}
              />
            </div>
          )}
          {CaseLinea && selectedLinea !== '' && !hidden && (
            <button className='validator-button' onClick={Validar}>Validar Línea</button>
          )}
          {!CaseLinea && selectedCarton !== '' && !hidden && (
            <button className='validator-button' onClick={Validar}>Validar Bingo</button>
          )}
        </div>
      </div>
      <div>
        {CaseBingo ? (
          <Link to='/match' className='validator-volver-button'>Volver</Link>
        ) : (
          <Link to='/winners' className='validator-terminar-button'>Terminar</Link>
        )}
        {hidden && (
          CaseLinea ? (
            <button className='validator-again-button' onClick={restart}>Validar otra Línea</button>
          ) : (
            <button className='validator-again-button' onClick={restart}>Validar otro Bingo</button>
          )
        )}
      </div>
    </div>
  );
};

export default ValidatorForm;
