import NumBingo from './NumBingo';

class CartonBingo {
    private idCarton: number;
    private static idC: number = 0;
    private carton: string;
    private idJugador: number;
    private linea: boolean;
    private bingo: boolean;
    this: any;

    constructor(idJugador: number) {
        this.idCarton = CartonBingo.idC;
        this.idJugador = idJugador;
        this.linea = false;
        this.bingo = false;
        CartonBingo.sumarIdC();

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

    private static sumarIdC(): void {
        CartonBingo.idC++;
    }

    getIdCarton(): number {
        return this.idCarton;
    }

    getidJugador(): number {
        return this.idJugador;
    }

    setidJugador(idJugador: number): void {
        this.idJugador = idJugador;
    }

    static idToCarton(idCarton: string): [number, boolean][][] {
        const cartonJson: [number, boolean][][] = [];
        
        let subarray: [number, boolean][] = [];
        for (let i = 0; i < idCarton.length; i += 3) {
          const substring = idCarton.substr(i, 3);
          const intValue = Number(substring.substr(0, 2));
          const boolValue = substring[2] === "t" ? true : false;
          
          subarray.push([intValue, boolValue]);
          
          if (subarray.length === 9 || i === idCarton.length - 3) {
            cartonJson.push(subarray);
            subarray = [];
          }
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
