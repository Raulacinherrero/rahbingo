import React, { useState, useEffect } from 'react';
import CartonBingo from '../../classes/CartonBingo';
import logo from '../../images/icono-negro.svg';
import './board-bingo.scss';

interface BoardBingoProps {
  Carton: any;
  estado: number;
  linea: number | null;
}

const BoardBingo = ({ Carton, estado, linea }: BoardBingoProps) => {
  const cartonJson = CartonBingo.idToCarton(Carton);
  const [tdClassNames, setTdClassNames] = useState(
    Array(cartonJson.length)
      .fill(null)
      .map(() => Array(cartonJson[0].length).fill('board-number'))
  );
  const [animationFinished, setAnimationFinished] = useState(false);
  const [premio, setPremio] = useState(true);

  const getBoardNumberContent = (num: number) => {
    return num !== 0 ? num : <img src={logo} className='logo' alt='Logo' />;
  };

  const handleNumberClick = (rowIndex: number, columnIndex: number) => {
    if (estado === 1 && cartonJson[rowIndex][columnIndex][0] !== 0) {
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

  useEffect(() => {
    if (estado === 0) {
      const updatedTdClassNames = tdClassNames.map((row, i) =>
        row.map((className, j) =>
          cartonJson[i][j][0] !== 0 ? 'board-number' : className
        )
      );
      setTdClassNames(updatedTdClassNames);
    } else if (estado === 2) {
      const animateStyles = () => {
        const tdIndicesToAnimate: [number, number][] = [];

        if (linea !== null) {
          // Calcular los TD relevantes para animar y excluir los TD con número 0
          let foundFalse = false;
          for (let columnIndex = 0; columnIndex < cartonJson[linea].length; columnIndex++) {
            if (cartonJson[linea][columnIndex][0] !== 0) {
              if (!foundFalse || cartonJson[linea][columnIndex][1] !== false) {
                if (foundFalse && cartonJson[linea][columnIndex][1] === true) {
                  break; // Detener el bucle si se encuentra un true después del primer false
                }
                tdIndicesToAnimate.push([linea, columnIndex]);
                if (cartonJson[linea][columnIndex][1] === false) {
                  foundFalse = true;
                  setPremio(false);
                }
              }
            }
          }
        } else {
          // Calcular todos los TD del cartón y excluir los TD con número 0 y con el valor booleano false
          let foundFalse = false;
          for (let rowIndex = 0; rowIndex < cartonJson.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < cartonJson[rowIndex].length; columnIndex++) {
              if (cartonJson[rowIndex][columnIndex][0] !== 0) {
                if (!foundFalse || cartonJson[rowIndex][columnIndex][1] !== false) {
                  if (foundFalse && cartonJson[rowIndex][columnIndex][1] === true) {
                    break; // Detener el bucle si se encuentra un true después del primer false
                  }
                  tdIndicesToAnimate.push([rowIndex, columnIndex]);
                  if (cartonJson[rowIndex][columnIndex][1] === false) {
                    foundFalse = true;
                    setPremio(false);
                  }
                }
              }
            }
          }
        }

        const animationInterval = setInterval(() => {
          if (tdIndicesToAnimate.length === 0) {
            clearInterval(animationInterval);
            setAnimationFinished(true); // Actualizar el estado cuando la animación termine
            return;
          }

          const [rowIndex, columnIndex] = tdIndicesToAnimate.shift()!;
          setTdClassNames(prevClassNames => {
            const updatedClassNames = [...prevClassNames];
            updatedClassNames[rowIndex][columnIndex] = 'board-number ' + cartonJson[rowIndex][columnIndex][1].toString();
            return updatedClassNames;
          });
        }, 1000); // Medio segundo de intervalo entre cambios de estilo

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(animationInterval);
      };

      animateStyles();
    }
  }, [estado, linea, tdClassNames, cartonJson]);

  const CaseLinea = linea !== null;

  return (
    <>
      {estado === 2 && (<>
        {animationFinished ? (
          <>
            {CaseLinea ? (
              <>
                {premio ? (
                  <p className='resultado-title'>La línea es correcta</p>
                ) : (
                  <p className='resultado-title'>La línea NO es correcta</p>
                )}
              </>
            ) : (
              <>
                {premio ? (
                  <p className='resultado-title'>El Bingo es correcto</p>
                ) : (
                  <p className='resultado-title'>El Bingo NO es correcto</p>
                )}
              </>
            )}
          </>
        ) : (
          <p className='resultado-title'>Validando...</p>
        )}
      </>
      )}
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
      {animationFinished && (
        <>
          {CaseLinea && (
            <>
              {premio ? (
                <p className='resultado-subtitle'>Continuamos para Bingo</p>
              ) : null}
            </>
          )}
          {!CaseLinea && (
            <>
              {premio ? (
                <p className='resultado-subtitle'>La Partida ha terminado</p>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

export default BoardBingo;
