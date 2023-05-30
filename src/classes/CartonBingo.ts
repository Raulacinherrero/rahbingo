import NumBingo from './NumBingo';

class CartonBingo {
    private carton: string;
    private idJugador: number;
    private linea: boolean;
    private bingo: boolean;
    this: any;

    constructor(idJugador: number) {
        this.idJugador = idJugador;
        this.linea = false;
        this.bingo = false;

        var carton_ = [
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)],
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)],
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)]
        ];

        const numeros: number[] = [];

        numeros.push(0, 1, 2, 3, 4, 5, 6, 7, 8);

        let random: number;

        for (let nLinea = 0; nLinea < carton_.length; nLinea++) {
            for (let n0 = 0; n0 < 4; n0++) {
                random = Math.floor(Math.random() * numeros.length);
                carton_[nLinea][numeros[random]] = new NumBingo(0);
                carton_[nLinea][numeros[random]].siEsta();
                numeros.splice(random, 1);
            }

            numeros.splice(0, numeros.length);
            numeros.push(0, 1, 2, 3, 4, 5, 6, 7, 8);
        }

        for (let nColumna = 0; nColumna < 9; nColumna++) {
            numeros.length = 0;

            for (let n = 1; n < 11; n++) {
                numeros.push(n + nColumna * 10);
            }

            for (let i = 0; i < 7; i++) {
                const random = Math.floor(Math.random() * numeros.length);
                numeros.splice(random, 1);
            }

            carton_.forEach((linea) => {
                if (linea[nColumna].getNumB() === 0) {
                    const random = Math.floor(Math.random() * numeros.length);
                    numeros.splice(random, 1);
                }
            });

            carton_.forEach((linea) => {
                if (linea[nColumna].getNumB() !== 0) {
                    linea[nColumna] = new NumBingo(numeros[0]);
                    numeros.shift();
                }
            });
        }

        let BDstring = "";
        carton_.forEach((linea) => {
            linea.forEach((number) => {
                let num = number.getNumB().toString();
                if (num.length === 1) {
                    num = "0" + num;
                }
                BDstring += num;
                if (number.getEsta()) {
                    BDstring += "t";
                } else {
                    BDstring += "f";
                }
            });
        });

        this.carton = BDstring;
    }

    getidJugador(): number {
        return this.idJugador;
    }

    setidJugador(idJugador: number): void {
        this.idJugador = idJugador;
    }

    static idToCarton(idCarton: string): [number, boolean][][] {
        const numeros: string[] = idCarton.split(/t|f/).filter(Boolean);
        const cartonJson: [number, boolean][][] = [];

        for (let i = 0; i < numeros.length; i += 9) {
            const bloqueResultado: [number, boolean][] = [];

            for (let j = i; j < i + 9; j++) {
                const numero = numeros[j] === "NaN" ? 0 : parseInt(numeros[j]);
                const isLogo = numero === 0;

                bloqueResultado.push([numero, isLogo]);
            }

            cartonJson.push(bloqueResultado);
        }
        return cartonJson;
    }

    static cartonToId(carton: [number, boolean][][]): string {
        let idCarton = "";
        for (const linea of carton) {
          for (const number of linea) {
            let num = number[0].toString();
            if (num.length === 1) {
              num = "0" + num;
            }
            idCarton += num;
            if (number[1]) {
              idCarton += "t";
            } else {
              idCarton += "f";
            }
          }
        }
        return idCarton;
      }
      

    static isLinea(nLinea: [number, boolean][]): boolean {
        let linea = true;
        for (const num of nLinea) {
          if (!linea) {
            return false;
          }
          linea = num[1];
        }
        return linea;
      }
      

    setLinea(linea: boolean): void {
        this.linea = linea;
    }

    static isBingo(carton: [number, boolean][][]): boolean {
        let bingo = true;
        for (const Linea of carton) {
          for (const num of Linea) {
            if (!bingo) {
              return false;
            }
            bingo = num[1];
          }
        }
        return bingo;
      }
      

    setBingo(bingo: boolean): void {
        this.bingo = bingo;
    }

    getCarton(): string {
        return this.carton;
    }

    setCarton(carton: string): void {
        this.carton = carton;
    }

    getIdJugador(): number {
        return this.idJugador;
    }

    setIdJugador(idJugador: number): void {
        this.idJugador = idJugador;
    }
}

export default CartonBingo;
