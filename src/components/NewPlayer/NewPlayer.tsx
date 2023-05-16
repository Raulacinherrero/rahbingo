import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './new-player.scss';

interface NewPlayerProps {
    id: number;
    name: string;
    cards: number;
    onChange: (id: number, field: string, value: number) => void;
}

const NewPlayer = (props: NewPlayerProps) => {
    const [inputValue, setInputValue] = useState('');
    const [numericValue, setNumericValue] = useState(1);

    const handleInputChange = (event: { target: { value: string; }; }) => {
        setInputValue(event.target.value.slice(0, 20));
    };

    const handleIncrement = () => {
        setNumericValue(prevValue => prevValue < 3 ? prevValue + 1 : prevValue);
    };

    const handleDecrement = () => {
        setNumericValue(prevValue => prevValue > 1 ? prevValue - 1 : prevValue);
    };

    return (
        <div className="player-container">
            <input
                className="name"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                maxLength={20}
            />
            <div className="numeric-input">
                <button className="numeric-button" onClick={handleDecrement}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                    className="nCards"
                    type="number"
                    value={numericValue}
                    readOnly
                />
                <button className="numeric-button" onClick={handleIncrement}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default NewPlayer;
