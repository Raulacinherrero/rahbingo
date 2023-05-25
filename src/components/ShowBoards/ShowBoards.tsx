import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import BoardBingo from '../BoardBingo/BoardBingo';
import './show-boards.scss';

const ShowBoards = ({ jugadorObjects, style }) => {
  const showBoardsContainerClass = style === 2 ? 'show-boards-container scroll' : 'show-boards-container';
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? jugadorObjects.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === jugadorObjects.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={showBoardsContainerClass}>
      {jugadorObjects.map((Jugador: any, index: number) => (
        <div key={index}>
          {style === 3 ? (
            <div
              key={index}
              className={`player-container ${index === currentIndex ? 'active' : ''}`}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <div className='title-container'>
                <button onClick={handlePrevClick} className='next-button'>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <h2 className='player-title'>Cartones de {Jugador.nombreJugador}</h2>
                <button onClick={handleNextClick} className='next-button'>
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
              <div className='boards-container slider'>
                {Jugador.cartonesJugador.map((Carton: any, index: number) => (
                  <BoardBingo key={index} Carton={Carton} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className='player-title'>Cartones de {Jugador.nombreJugador}:</h2>
              <div className='boards-container'>
                {Jugador.cartonesJugador.map((Carton: any, index: number) => (
                  <BoardBingo key={index} Carton={Carton} />
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowBoards;
