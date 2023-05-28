import NumBingo from './NumBingo';

class CartonBingo {
    private idCarton: string;
    private idJugador: number;
    private linea: boolean;
    private bingo: boolean;
    this: any;

    constructor(idJugador: number) {
        this.idJugador = idJugador;
        this.linea = false;
        this.bingo = false;

        var carton = [
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)],
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)],
            [new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1), new NumBingo(-1)]
        ];

        const numeros: number[] = [];

        numeros.push(0, 1, 2, 3, 4, 5, 6, 7, 8);

        let random: number;

        for (let nLinea = 0; nLinea < carton.length; nLinea++) {
            for (let n0 = 0; n0 < 4; n0++) {
                random = Math.floor(Math.random() * numeros.length);
                carton[nLinea][numeros[random]] = new NumBingo(0);
                carton[nLinea][numeros[random]].siEsta();
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

            carton.forEach((linea) => {
                if (linea[nColumna].getNumB() === 0) {
                    const random = Math.floor(Math.random() * numeros.length);
                    numeros.splice(random, 1);
                }
            });

            carton.forEach((linea) => {
                if (linea[nColumna].getNumB() !== 0) {
                    linea[nColumna] = new NumBingo(numeros[0]);
                    numeros.shift();
                }
            });
        }

        let BDstring = "";
        carton.forEach((linea) => {
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

        this.idCarton = BDstring;
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
        carton.forEach((linea) => {
            linea.forEach((number) => {
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
            });
        });
        return idCarton;
    }

    isLinea(nLinea: number): boolean {
        this.linea = true;
        for (let num = 0; num < this.this.idToCarton(this.idCarton)[nLinea].length; num++) {
            if (!this.linea) {
                break;
            }
            this.linea = this.this.idToCarton(this.idCarton)[nLinea][num].isInBingo();
        }
        return this.linea;
    }

    setLinea(linea: boolean): void {
        this.linea = linea;
    }

    isBingo(): boolean {
        this.bingo = true;
        for (let nLinea = 0; nLinea < this.this.idToCarton(this.idCarton).length; nLinea++) {
            for (let num = 0; num < this.this.idToCarton(this.idCarton)[nLinea].length; num++) {
                if (!this.bingo) {
                    break;
                }
                this.bingo = this.this.idToCarton(this.idCarton)[nLinea][num].isInBingo();
            }
        }
        return this.bingo;
    }

    setBingo(bingo: boolean): void {
        this.bingo = bingo;
    }

    getIdCarton(): string {
        return this.idCarton;
    }

    setIdCarton(idCarton: string): void {
        this.idCarton = idCarton;
    }

    getIdJugador(): number {
        return this.idJugador;
    }

    setIdJugador(idJugador: number): void {
        this.idJugador = idJugador;
    }
}

export default CartonBingo;
