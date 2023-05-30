import React from 'react';
import CartonBingo from '../../classes/CartonBingo';
import logo from '../../images/logo.png';
import './board-bingo.scss';

const BoardBingo = ({ Carton }: any) => {
    const cartonJson = CartonBingo.idToCarton(Carton.carton);

    const getBoardNumberContent = (num: number) => {
        return num !== 0 ? num : <img src={logo} className='logo' />;
    };

    const getBoardNumberClass = (num: number) => {
        return num === 0 ? 'board-number zero' : 'board-number';
    };

    return (
        <table className='table-board'>
            <tbody>
                {cartonJson.map((Linea: [number, boolean][], index: number) => (
                    <tr key={index}>
                        {Linea.map((Numero: any, index: number) => (
                            <td key={index} className={getBoardNumberClass(Numero[0])}>
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
