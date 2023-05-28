import React from 'react';
import logo from '../../images/logo.png';

interface BomboProps {
  idNumerosBombo: string;
}

const Bombo: React.FC<BomboProps> = ({ idNumerosBombo }) => {
  const characters = idNumerosBombo.split('');

  const tableData: { num: number; isTrue: boolean }[][] = [];
  let row: { num: number; isTrue: boolean }[] = [];
  for (let i = 0; i < characters.length; i++) {
    const num = i + 1;
    const isTrue = characters[i] === 't';
    row.push({ num, isTrue });
    if (row.length === 10) {
      tableData.push(row);
      row = [];
    }
  }

  const getBoardNumberContent = (isTrue: boolean, num: number) => {
    return isTrue ? num : <img src={logo} className='logo' alt='Logo' />;
  };

  const getBoardNumberClass = (isTrue: boolean) => {
    return isTrue ? 'board-number' : 'board-number zero';
  };

  return (
    <table className='table-board'>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={getBoardNumberClass(cell.isTrue)}>
                {getBoardNumberContent(cell.isTrue, cell.num)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Bombo;
