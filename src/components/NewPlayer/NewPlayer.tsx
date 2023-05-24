import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './new-player.scss';

interface NewPlayerProps {
  id: number;
  name: string;
  cards: number;
  onChange: (id: number, field: string, value: number | string) => void;
}

const NewPlayer: React.FC<NewPlayerProps> = ({ id, name, cards, onChange }) => {
  const [inputValue, setInputValue] = useState(name);
  const [numericValue, setNumericValue] = useState(cards);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(id, 'name', value);
  };

  const handleIncrement = () => {
    const newValue = numericValue < 3 ? numericValue + 1 : 3;
    setNumericValue(newValue);
    onChange(id, 'cards', newValue);
  };
  
  const handleDecrement = () => {
    const newValue = numericValue > 1 ? numericValue - 1 : 1;
    setNumericValue(newValue);
    onChange(id, 'cards', newValue);
  };  

  return (
    <div className="player-container">
      <input
        className="name"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={20}
        required
      />
      <div className="numeric-input">
        <button className="numeric-button" onClick={handleDecrement} type='button'>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input className="nCards" type="number" value={numericValue} readOnly />
        <button className="numeric-button" onClick={handleIncrement} type='button'>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default NewPlayer;
