export default class Vector {
    constructor(x, y) {
        if (!isNumeric(x)) {
            throw new TypeError(`x must be a number, got ${typeof x}`);
        }
        if (!isNumeric(y)) {
            throw new TypeError(`y must be a number, got ${typeof y}`);
        }
        this.x = x;
        this.y = y;
    }

    static from(a, b) {
        if (a instanceof Vector) {
            return new Vector(a.x, a.y);
        }
        if (b === undefined) {
            return new Vector(a, a)
        }
        return new Vector(a, b);
    }

    get smallestComponent() {
        return Math.min(this.x, this.y);
    }

    get largestComponent() {
        return Math.max(this.x, this.y);
    }

    get magnitude() {
        return Math.hypot(this.x, this.y);
    }

    equals(other) {
        const v = Vector.from(other);
        return this.x === v.x && this.y === v.y;
    }

    distance(other) {
        const v = Vector.from(other);
        return Math.hypot(this.x - v.x, this.y - v.y);
    }

    absolute = () => this.applyComponentwise(Math.abs);
    add = (other) => this.applyComponentwise((a, b) => a + b, other);
    subtract = (other) => this.applyComponentwise((a, b) => a - b, other);
    multiply = (other) => this.applyComponentwise((a, b) => a * b, other);
    divide = (other) => this.applyComponentwise((a, b) => a / b, other);
    clampAdd = (other, limit) => this.applyComponentwise(clampAdd, other, limit);

    applyComponentwise(operator, ...operands) {
        const vectors = [this, ...operands.map(a => Vector.from(a))];
        return new Vector(
            operator(...vectors.map(v => v.x)),
            operator(...vectors.map(v => v.y))
        );
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}


function isNumeric(n) {
    return typeof n === 'number' || typeof n === 'bigint';
}

function clampAdd(base, delta, boundary) {
    const clamp = delta > 0 ? Math.min : Math.max;
    return clamp(base + delta, boundary);
}
