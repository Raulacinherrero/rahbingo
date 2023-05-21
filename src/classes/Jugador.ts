import CartonBingo from './CartonBingo';

class Jugador {
    private idJugador: number;
    private static idJ: number = 0;
    private nombreJugador: string;
    private cartonesJugador: CartonBingo[] = [];

    constructor(nombreJugador: string, Ncartones: number) {
        this.idJugador = Jugador.idJ;
        this.nombreJugador = nombreJugador;
        Jugador.sumarIdJ();

        for (let nCarton = 0; nCarton < Ncartones; nCarton++) {
            const carton: CartonBingo = new CartonBingo(this.idJugador);
            this.cartonesJugador.push(carton);
        }
    }

    private static sumarIdJ(): void {
        Jugador.idJ++;
    }

    getIdJugador(): number {
        return this.idJugador;
    }

    getNombreJugador(): string {
        return this.nombreJugador;
    }

    setNombreJugador(nombreJugador: string): void {
        this.nombreJugador = nombreJugador;
    }

    getCartonesJugador(): CartonBingo[] {
        return this.cartonesJugador;
    }

    setCartonesJugador(cartonesJugador: CartonBingo[]): void {
        this.cartonesJugador = cartonesJugador;
    }
}
 export default Jugador;