import React, { useState, useEffect } from 'react';
import BoardBingo from '../BoardBingo/BoardBingo';
import { Link } from 'gatsby';
import './validator-form.scss';

const ValidatorForm = ({ DatosPartida }) => {
  const [selectedJugador, setSelectedJugador] = useState('');
  const [selectedCarton, setSelectedCarton] = useState('');
  const [selectedLinea, setSelectedLinea] = useState('');
  const [updateBoard, setUpdateBoard] = useState(false);
  const [hidden, setHidden] = useState(false);

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

  const handleButtonClick = () => {
    setUpdateBoard(true);
    setHidden(true);
  };

  const restart = () => {
    setUpdateBoard(true);
    setHidden(false);
    setSelectedJugador('');
    setSelectedCarton('');
    setSelectedLinea('');
  };


  const CaseLinea = DatosPartida?.GanadoresLinea?.length === 0;
  const CaseBingo = DatosPartida?.GanadoresBingo?.length === 0;

  return (
    <div className='validator-container'>
      {CaseLinea ? (
        <h1 className='validator-title'>¿La línea es correcta?</h1>
      ) : (
        <h1 className='validator-title'>¿El bingo es correcto?</h1>
      )}
      <div className='validator-form'>
        {!hidden && (
          <div className='selects-container'>
            <div>
              <label className='validator-label'>
                Jugador:
                <select className='validator-select' value={selectedJugador} onChange={handleJugadorChange}>
                  <option value="null">Selecciona un jugador</option>
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
                    <option value="null">Selecciona un cartón</option>
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
                    <option value="null">Selecciona una línea</option>
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
                linea={selectedLinea !== 'null' ? Number(selectedLinea) : null}
              />
            </div>
          )}
          {CaseLinea && selectedLinea !== '' && !hidden && (
            CaseLinea ? (
              <button className='validator-button' onClick={handleButtonClick}>Validar Línea</button>
            ) : (
              <button className='validator-button' onClick={handleButtonClick}>Validar Carton</button>
            )
          )}
        </div>
      </div>
      <div>
        {CaseBingo ? (
          <Link to='/match' className='validator-volver-button'>Volver</Link>
        ) : (
          <Link to='/winners' className='validator-volver-button'>Terminar</Link>
        )}
        {hidden && (
          <button className='validator-again-button' onClick={restart}>Validar de nuevo</button>
        )}
      </div>
    </div>
  );
};

export default ValidatorForm;