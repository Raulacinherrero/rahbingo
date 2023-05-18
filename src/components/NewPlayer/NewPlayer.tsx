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
  const { id, name, cards, onChange } = props;
  const [inputValue, setInputValue] = useState(name);
  const [numericValue, setNumericValue] = useState(1); // Establecer 1 como valor inicial

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 20);
    setInputValue(value);

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      onChange(id, 'name', numericValue);
    }
  };

  const handleIncrement = () => {
    const newValue = numericValue < 3 ? numericValue + 1 : numericValue;
    setNumericValue(newValue);
    onChange(id, 'cards', newValue);
  };

  const handleDecrement = () => {
    const newValue = numericValue > 1 ? numericValue - 1 : numericValue;
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
        <button className="numeric-button" onClick={handleDecrement}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input className="nCards" type="number" value={numericValue} readOnly />
        <button className="numeric-button" onClick={handleIncrement}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default NewPlayer;
