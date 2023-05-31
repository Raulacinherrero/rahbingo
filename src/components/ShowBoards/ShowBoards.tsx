import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCopy } from '@fortawesome/free-solid-svg-icons';
import BoardBingo from '../BoardBingo/BoardBingo';
import { Link } from 'gatsby';
import QRCode from 'qrcode'
import './show-boards.scss';

const ShowBoards = ({ DatosPartida, style }) => {
  const [qr, setQr] = useState<string | null>(null);

  const IdPartida = DatosPartida.idPartida;
  const rooturl = process.env.GATSBY_ROOT_URL
  const QRurl = rooturl + 'match-players/' + IdPartida;
  const LinkUrl = '/match-players/' + IdPartida;

  useEffect(() => {
    QRCode.toDataURL(QRurl)
      .then(url => {
        setQr(url)
        console.error(url);
      })
      .catch(err => {
        console.error(err)
      })
  }, []);
  const showBoardsContainerClass = style === 2 ? 'show-boards-container scroll' : 'show-boards-container';

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? DatosPartida.ListaJugadores.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === DatosPartida.ListaJugadores.length - 1 ? 0 : prevIndex + 1));
  };

  const handleClick = () => {
    window.open(LinkUrl, '_blank', 'width=800,height=600');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(QRurl);
  };

  return (
    <div className={showBoardsContainerClass}>
      {DatosPartida.ListaJugadores.map((Jugador: any, index: number) => (
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
                {Jugador.CartonesJugador.map((Carton: any, index: number) => (
                  <BoardBingo key={index} Carton={Carton} mobile={false}/>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className='player-title'>Cartones de {Jugador.nombreJugador}:</h2>
              <div className='boards-container'>
                {Jugador.CartonesJugador.map((Carton: any, index: number) => (
                  <BoardBingo key={index} Carton={Carton} mobile={false}/>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
      <div className='submit-button-container'>
        <div className='QR-container'>
          <h3 className='QR-h3'>Juega con tus cartones desde el móvil</h3>
          <p className='QR-p'>O haz click en el QR para verlos en otra pestaña</p>
          <div className='QR-block'>
            {qr ? <button onClick={handleClick} className='QR-button' title='Click para abrir enlace' ><img src={qr} className='QR-img' /></button> : <span>Cargando QR</span>}
            <div className='copy-block'>
              <p className='copy-title'>Tambien puedes copiar el link aquí:</p>
              <FontAwesomeIcon icon={faCopy} className='copy-button' onClick={handleCopyToClipboard} />
            </div>
          </div>
        </div>
        <Link to="/match" className='submit-button' >Jugar</Link>
      </div>
    </div>
  );
};

export default ShowBoards;
