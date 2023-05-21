class NumBingo {
    private numB: number;
    private esta: boolean;

    constructor(numB: number) {
        this.numB = numB;
        this.esta = false;
    }

    getNumB(): number {
        return this.numB;
    }

    setNumB(numB: number): void {
        this.numB = numB;
    }

    isInBingo(): boolean {
        return this.esta;
    }

    siEsta(): void {
        this.esta = true;
    }

    toString(): string {
        return this.numB.toString();
    }
}

export default NumBingo;