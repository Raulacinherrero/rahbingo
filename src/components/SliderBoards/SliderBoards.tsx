import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import './slider-boards.scss';


interface ShowBoardsProps {
  jugadorObjects: any[];
}

const ShowBoards: React.FC<ShowBoardsProps> = ({ jugadorObjects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getBoardNumberContent = (num: number) => {
    return num !== 0 ? num : <img src={logo} className='logo' />;
  };

  const getBoardNumberClass = (num: number) => {
    return num === 0 ? 'board-number zero' : 'board-number';
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? jugadorObjects.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === jugadorObjects.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div className='show-boards-container'>
        {jugadorObjects.map((Jugador: any, index: number) => (
          <div
            key={index}
            className={`player-container ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <div className='title-container'>
              <button onClick={handlePrevClick} className='next-button' ><FontAwesomeIcon icon={faAngleLeft} /></button>
              <h2 className='player-title'>Cartones de {Jugador.nombreJugador}</h2>
              <button onClick={handleNextClick} className='next-button' ><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
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
    </div>
  );
};

export default ShowBoards;
