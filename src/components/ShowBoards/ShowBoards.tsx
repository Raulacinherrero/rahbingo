import React from 'react';
import './show-boards.scss';
import logo from '../../images/logo.png';

const ShowBoards = ({ jugadorObjects }: any) => {
  const getBoardNumberContent = (num: number) => {
    return num !== 0 ? num : <img src={logo} className='logo'/>;
  };

  const getBoardNumberClass = (num: number) => {
    return num === 0 ? 'board-number zero' : 'board-number';
  };

  return (
    <div className='show-boards-container'>
      {jugadorObjects.map((Jugador: any, index: number) => (
        <div key={index}>
          <h2 className='player-title'>Cartones de {Jugador.nombreJugador}:</h2>
          <div className='boards-container'>
            {Jugador.cartonesJugador.map((Carton: any, index: number) => (
              <table key={index} className='table-board'>
                {Carton.carton.map((Linea: any, index: number) => (
                  <tr key={index}>
                    {Linea.map((Numero: any, index: number) => (
                      <td key={index} className={getBoardNumberClass(Numero.num)}>
                        {getBoardNumberContent(Numero.num)}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowBoards;
