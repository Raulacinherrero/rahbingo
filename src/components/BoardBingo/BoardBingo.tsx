import React, { useState } from 'react';
import CartonBingo from '../../classes/CartonBingo';
import logo from '../../images/icono-negro.svg';
import './board-bingo.scss';

interface BoardBingoProps {
  Carton: any;
  mobile: boolean;
}

const BoardBingo = ({ Carton, mobile }: BoardBingoProps) => {
  const cartonJson = CartonBingo.idToCarton(Carton.carton);
  const [tdClassNames, setTdClassNames] = useState(
    Array(cartonJson.length)
      .fill(null)
      .map(() => Array(cartonJson[0].length).fill('board-number'))
  );

  const getBoardNumberContent = (num: number) => {
    return num !== 0 ? num : <img src={logo} className='logo' alt='Logo' />;
  };

  const handleNumberClick = (rowIndex: number, columnIndex: number) => {
    if (mobile && cartonJson[rowIndex][columnIndex][0] !== 0) {
      const updatedTdClassNames = tdClassNames.map((row, i) =>
        row.map((className, j) =>
          i === rowIndex && j === columnIndex
            ? className === 'board-number' ? 'board-number mobile' : 'board-number'
            : className
        )
      );
      setTdClassNames(updatedTdClassNames);
    }
  };

  return (
    <table className='table-board'>
      <tbody>
        {cartonJson.map((Linea: [number, boolean][], rowIndex: number) => (
          <tr key={rowIndex}>
            {Linea.map((Numero: [number, boolean], columnIndex: number) => (
              <td
                key={columnIndex}
                className={cartonJson[rowIndex][columnIndex][0] === 0 ? 'board-number zero' : tdClassNames[rowIndex][columnIndex]}
                onClick={() => handleNumberClick(rowIndex, columnIndex)}
              >
                {getBoardNumberContent(Numero[0])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BoardBingo;
