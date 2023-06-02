import React from "react";

const ShowWinners = ({ DatosPartida }) => {

  const getJugadorNombre = (idJugador: string): string | undefined => {
    const jugador = DatosPartida.ListaJugadores.find(
      (jugador) => jugador.idJugador === idJugador
    );
    return jugador?.nombreJugador;
  };

  return (
    <div>
      <h2>Ganadores de Línea:</h2>
      <ul>
        {DatosPartida.GanadoresLinea.map((ganador, index) => (
          <li key={index}>{getJugadorNombre(ganador)}</li>
        ))}
      </ul>

      <h2>Ganadores de Bingo:</h2>
      <ul>
        {DatosPartida.GanadoresBingo.map((ganador, index) => (
          <li key={index}>{getJugadorNombre(ganador)}</li>
        ))}
      </ul>

      {DatosPartida.DespistadosLinea.length > 0 && (
        <div>
          <h2>Despistados de Línea:</h2>
          <ul>
            {DatosPartida.DespistadosLinea.map((despistado, index) => (
              <li key={index}>{getJugadorNombre(despistado)}</li>
            ))}
          </ul>
        </div>
      )}

      {DatosPartida.DespistadosBingo.length > 0 && (
        <div>
          <h2>Despistados de Bingo:</h2>
          <ul>
            {DatosPartida.DespistadosBingo.map((despistado, index) => (
              <li key={index}>{getJugadorNombre(despistado)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowWinners;
