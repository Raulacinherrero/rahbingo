import React, { useState } from 'react';
import BoardBingo from '../BoardBingo/BoardBingo';
import './validator-form.scss';

const ValidatorForm = ({ DatosPartida }) => {
  const [selectedJugador, setSelectedJugador] = useState('');
  const [selectedCarton, setSelectedCarton] = useState('');
  const [selectedLinea, setSelectedLinea] = useState('');
  const [updateBoard, setUpdateBoard] = useState(false);

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
  };

  const handleBoardUpdate = () => {
    setUpdateBoard(false);
    setSelectedLinea('');
  };

  const Caselinea = DatosPartida?.GanadoresLinea?.length === 0;

  return (
    <div>
      <div>
        <label>
          Jugador:
          <select value={selectedJugador} onChange={handleJugadorChange}>
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
          <label>
            Cartón:
            <select value={selectedCarton} onChange={handleCartonChange}>
              <option value="null">Selecciona un cartón</option>
              {DatosPartida.ListaJugadores.map((jugador) => {
                if (jugador.idJugador === selectedJugador) {
                  return jugador.CartonesJugador.map((carton, index) => (
                    <option key={carton.idCarton} value={carton.carton}>
                      {index + 1}
                    </option>
                  ));
                }
                return null;
              })}
            </select>
          </label>
        </div>
      )}

      {selectedCarton && (
        <>
          {Caselinea && (
            <div>
              <label>
                Línea:
                <select value={selectedLinea} onChange={handleLineaChange}>
                  <option value="null">Selecciona una linea</option>
                  <option value="0">1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                </select>
              </label>
            </div>
          )}
          <div>
            <BoardBingo
              key={selectedCarton}
              Carton={selectedCarton}
              estado={updateBoard ? 2 : 0}
              linea={selectedLinea !== 'null' ? Number(selectedLinea) : null}
              onBoardUpdate={handleBoardUpdate}
            />
          </div>
          {Caselinea && selectedLinea !== "" ? (
            <button onClick={handleButtonClick}>Update Board</button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ValidatorForm;
