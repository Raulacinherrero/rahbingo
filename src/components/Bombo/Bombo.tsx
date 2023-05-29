import React from 'react';
import logo from '../../images/logo.png';
import './bombo.scss';

const Bombo = ({ idNumerosBombo }) => {

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

  const getBomboNumberContent = (isTrue: boolean, num: number) => {
    return isTrue ? num : <img src={logo} className='logo' alt='Logo' />;
  };

  const getBomboNumberClass = (isTrue: boolean) => {
    return isTrue ? 'bombo-number' : 'bombo-number zero';
  };

  return (
    <table className='table-bombo'>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={getBomboNumberClass(cell.isTrue)}>
                {getBomboNumberContent(cell.isTrue, cell.num)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Bombo;
