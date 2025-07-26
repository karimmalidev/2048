import Vector from "./Vector.mjs";

export default class Matrix {
    constructor(size) {
        this.size = Vector.from(size);
        this.array = this.#create2DArray();
    }

    get(position) {
        this.#validatePosition(position);
        return this.array[position.x][position.y];
    }

    set(position, value) {
        this.#validatePosition(position)
        this.array[position.x][position.y] = value;
    }

    delete(position) {
        this.set(position, undefined);
    }

    has(position) {
        return this.get(position) !== undefined;
    }

    move(source, destination) {
        this.set(destination, this.get(source));
        this.delete(source);
    }

    getValues() {
        return this.array.flat().filter((value) => value !== undefined);
    }

    getEmptyPositions() {
        const positions = [];
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const position = Vector.from(x, y);
                if (!this.has(position)) {
                    positions.push(position)
                }
            }
        }
        return positions;
    }

    #create2DArray() {
        return Array.from(
            { length: this.size.x },
            () => Array(this.size.y).fill(undefined)
        );
    }

    #validatePosition(position) {
        if (!(position instanceof Vector)) {
            throw new TypeError(`Expected instance of Vector, got ${typeof position}`)
        }
        if (position.x < 0 || position.x >= this.size.x) {
            throw new RangeError(`Invalid x component: ${position.x}`);
        }
        if (position.y < 0 || position.y >= this.size.y) {
            throw new RangeError(`Invalid y component: ${position.y}`);
        }
    }
}