import React from 'react';
import './board-bingo.scss';
import logo from '../../images/logo.png';

const BoardBingo = ({ Carton }: any) => {
    const getBoardNumberContent = (num: number) => {
        return num !== 0 ? num : <img src={logo} className='logo' />;
    };

    const getBoardNumberClass = (num: number) => {
        return num === 0 ? 'board-number zero' : 'board-number';
    };

    return (
        <table className='table-board'>
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
    );
};

export default BoardBingo;
