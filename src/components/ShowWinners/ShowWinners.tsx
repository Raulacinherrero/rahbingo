import React from "react";
import "./show-winners.scss";

const ShowWinners = ({ DatosPartida }) => {

    const getJugadorNombre = (idJugador: string): string | undefined => {
        const jugador = DatosPartida.ListaJugadores.find(
            (jugador) => jugador.idJugador === idJugador
        );
        return jugador?.nombreJugador;
    };

    return (
        <div className="winners-container">
            <h1 className="winners-title">¡¡¡ENHORABUENA GANADORES!!!</h1>
            <h2 className="winners-subtitle">Ganadores de Línea:</h2>
            <ul className="winners-list">
                {DatosPartida.GanadoresLinea.map((ganador, index) => (
                    <>
                        <p key={index} className="winners-player">{getJugadorNombre(ganador)}</p>
                        <p className="winners-player">Hola</p>
                    </>
                ))}
            </ul>

            <h2 className="winners-subtitle">Ganadores de Bingo:</h2>
            <ul className="winners-list">
                {DatosPartida.GanadoresBingo.map((ganador, index) => (
                    <p key={index} className="winners-player">{getJugadorNombre(ganador)}</p>
                ))}
            </ul>

            {DatosPartida.DespistadosLinea.length > 0 || DatosPartida.DespistadosBingo.length > 0 ? (
                <h1 className="winners-title">¡¡¡TENEMOS DESPISTADOS!!!</h1>
            ) : null}


            {DatosPartida.DespistadosLinea.length > 0 && (
                <>
                    <h2 className="winners-subtitle">Despistados de Línea:</h2>
                    <ul className="winners-list">
                        {DatosPartida.DespistadosLinea.map((despistado, index) => (
                            <p key={index} className="winners-player">{getJugadorNombre(despistado)}</p>
                        ))}
                    </ul>
                </>
            )}

            {DatosPartida.DespistadosBingo.length > 0 && (
                <>
                    <h2 className="winners-subtitle">Despistados de Bingo:</h2>
                    <ul className="winners-list">
                        {DatosPartida.DespistadosBingo.map((despistado, index) => (
                            <p key={index} className="winners-player">{getJugadorNombre(despistado)}</p>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ShowWinners;
