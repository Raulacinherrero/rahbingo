import React, { useState } from 'react';
import BoardBingo from '../BoardBingo/BoardBingo';
import './validator-form.scss';

const ValidatorForm = ({ DatosPartida }) => {
  const [selectedJugador, setSelectedJugador] = useState('');
  const [selectedCarton, setSelectedCarton] = useState('');
  const [selectedLinea, setSelectedLinea] = useState('');

  const handleJugadorChange = (event) => {
    const jugadorId = event.target.value;
    setSelectedJugador(jugadorId);
    setSelectedCarton('');
    setSelectedLinea('');
  };

  const handleCartonChange = (event) => {
    const cartonId = event.target.value;
    setSelectedCarton(cartonId);
    setSelectedLinea('');
  };

  const handleLineaChange = (event) => {
    const linea = event.target.value;
    setSelectedLinea(linea);
  };

  const Caselinea = DatosPartida?.GanadoresLinea?.length === 0;

  return (
    <div>
      <div>
        <label>
          Jugador:
          <select value={selectedJugador} onChange={handleJugadorChange}>
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
              {DatosPartida.ListaJugadores.map((jugador) => {
                if (jugador.idJugador === selectedJugador) {
                  return jugador.CartonesJugador.map((carton, index) => (
                    <option key={carton.idCarton} value={carton.carton}>
                      Carton {index + 1}
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
                  <option value="Linea 1">Validar Línea 1</option>
                  <option value="Linea 2">Validar Línea 2</option>
                  <option value="Linea 3">Validar Línea 3</option>
                </select>
              </label>
            </div>
          )}
          <div>
            <BoardBingo key={selectedCarton} Carton={selectedCarton} estado={0} linea={null}/>
          </div>
        </>
      )}
    </div>
  );
};

export default ValidatorForm;
