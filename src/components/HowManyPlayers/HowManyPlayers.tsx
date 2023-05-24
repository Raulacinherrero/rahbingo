import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import NewPlayer from '../NewPlayer/NewPlayer';
import Jugador from '../../classes/Jugador';
import './how-many-players.scss';

interface Player {
    id: number;
    name: string;
    cards: number;
}

const HowManyPlayers = () => {
    const [players, setPlayers] = useState<Player[]>([
        { id: 0, name: 'Jugador 1', cards: 1 },
        { id: 1, name: 'Jugador 2', cards: 1 }
    ]);

    const handleAddPlayer = () => {
        const existingIds = players.map(player => player.id);
        let newId = 0;
        while (existingIds.includes(newId)) {
            newId++;
        }
        const newPlayer = { id: newId, name: `Jugador ${newId + 1}`, cards: 1 };
        setPlayers([...players, newPlayer]);
    };

    const handleRemovePlayer = (id: number) => {
        const updatedPlayers = players.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
    };

    const handlePlayerChange = (id: number, field: string, value: number) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, [field]: value } : player
        );
        setPlayers(updatedPlayers);
    };

    const handleReady = () => {
        const jugadorObjects = players.map(player => new Jugador(player.name, player.cards));
        localStorage.setItem('jugadorObjects', JSON.stringify(jugadorObjects));
    }

    return (
        <form>
            <div className='HowManyPlayers-container'>
                <h1 className='title'>¿Quiénes van a Jugar?</h1>
                <div className='texts'>
                    <div className='text'>
                        <span className='name-span'>Nombre</span>
                        <div className='ncards-span'>
                            <span>Número de</span>
                            <span>Cartones</span>
                        </div>
                    </div>
                    <div className='text'>
                        <span className='name-span'>Nombre</span>
                        <div className='ncards-span'>
                            <span>Número de</span>
                            <span>Cartones</span>
                        </div>
                    </div>
                </div>
                <div className='nplayer-container'>
                    {players.map(player => (
                        <div key={player.id} className='player-container'>
                            <NewPlayer
                                id={player.id}
                                name={player.name}
                                cards={player.cards}
                                onChange={handlePlayerChange}
                            />
                            {players.length > 2 && (
                                <button
                                    type='button'
                                    onClick={() => handleRemovePlayer(player.id)}
                                    className='DeletePlayer-button'
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </div>
                    ))}
                    {players.length < 10 && (
                        <div className='NewPlayer-button-container' onClick={handleAddPlayer}>
                            <button className='NewPlayer-button' type='button'>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    )}
                </div>
                <div className='submit-button-container'>
                    <button type='button' className='submit-button' onClick={handleReady}>
                        Listo
                    </button>
                </div>
            </div>
        </form>
    );
};

export default HowManyPlayers;
