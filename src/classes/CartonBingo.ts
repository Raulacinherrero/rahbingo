import NumBingo from './NumBingo';

class CartonBingo {
    private idCarton: number;
    private static idC: number = 0;
    private idJugador: number;
    private linea: boolean;
    private bingo: boolean;
    private carton: NumBingo[][];

    constructor(idJugador: number) {
        this.idJugador = idJugador;
        this.idCarton = CartonBingo.idC;
        this.linea = false;
        this.bingo = false;
        CartonBingo.sumarIdC();

        const linea1: NumBingo[] = [];
        const linea2: NumBingo[] = [];
        const linea3: NumBingo[] = [];

        this.carton = [linea1, linea2, linea3];

        const numeros: number[] = [];

        let random: number;

        for (let nColumna = 0; nColumna < 9; nColumna++) {
            numeros.length = 0;

            for (let n = 1; n < 11; n++) {
                numeros.push(n + nColumna * 10);
            }

            for (let i = 0; i < 7; i++) {
                const random = Math.floor(Math.random() * numeros.length);
                numeros.splice(random, 1);
            }

            this.carton.forEach((linea) => {
                linea.push(new NumBingo(numeros[0]));
                numeros.shift();
            });
        }

        numeros.splice(0, numeros.length);
        numeros.push(0, 1, 2, 3, 4, 5, 6, 7, 8);

        for (let nLinea = 0; nLinea < this.carton.length; nLinea++) {
            for (let n0 = 0; n0 < 4; n0++) {
                random = Math.floor(Math.random() * numeros.length);
                this.carton[nLinea][numeros[random]] = new NumBingo(0);
                this.carton[nLinea][numeros[random]].siEsta();
                numeros.splice(random, 1);
            }

            numeros.splice(0, numeros.length);
            numeros.push(0, 1, 2, 3, 4, 5, 6, 7, 8);
        }
    }

    static sumarIdC(): void {
        CartonBingo.idC++;
    }

    getidJugador(): number {
        return this.idJugador;
    }

    setidJugador(nombreJugador: number): void {
        this.idJugador = nombreJugador;
    }

    getBingo(): NumBingo[][] {
        return this.carton;
    }

    setCarton(carton: NumBingo[][]): void {
        this.carton = carton;
    }

    isLinea(nLinea: number): boolean {
        this.linea = true;
        for (let num = 0; num < this.carton[nLinea].length; num++) {
            if (!this.linea) {
                break;
            }
            this.linea = this.carton[nLinea][num].isInBingo();
        }
        return this.linea;
    }

    setLinea(isLinea: boolean): void {
        this.linea = isLinea;
    }

    isBingo(): boolean {
        this.bingo = true;
        for (let nLinea = 0; nLinea < this.carton.length; nLinea++) {
            for (let num = 0; num < this.carton[nLinea].length; num++) {
                if (!this.bingo) {
                    break;
                }
                this.bingo = this.carton[nLinea][num].isInBingo();
            }
        }
        return this.bingo;
    }

    setBingo(isBingo: boolean): void {
        this.bingo = isBingo;
    }

    getIdCarton(): number {
        return this.idCarton;
    }

    setIdCarton(idCarton: number): void {
        this.idCarton = idCarton;
    }

    getIdJugador(): number {
        return this.idJugador;
    }

    setIdJugador(idJugador: number): void {
        this.idJugador = idJugador;
    }

    toString(): string {
        return this.carton[0] + "\n" + this.carton[1] + "\n" + this.carton[2];
    }
}

export default CartonBingo;