class NumBingo {
    private num: number;
    private esta: boolean;

    constructor(numB: number) {
        this.num = numB;
        this.esta = false;
    }

    getNumB(): number {
        return this.num;
    }

    getEsta(): boolean {
        return this.esta;
    }

    setNumB(numB: number): void {
        this.num = numB;
    }

    isInBingo(): boolean {
        return this.esta;
    }

    siEsta(): void {
        this.esta = true;
    }

    toString(): string {
        return this.num.toString();
    }
}

export default NumBingo;