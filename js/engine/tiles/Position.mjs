import Size from "./Size.mjs";

export default class Position {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static fromRowColumn(row, column, size) {
        const x = column * size.width;
        const y = row * size.height;
        return new Position(x, y);
    }

    equals(position) {
        return this.x === position.x
            && this.y === position.y;
    }


    add(added) {
        const x = this.x + added.x;
        const y = this.y + added.y;
        return new Position(x, y);
    }

    addWithLimit(added, limit) {
        const x = (added.x >= 0 ? Math.min : Math.max)(limit.x, this.x + added.x);
        const y = (added.y >= 0 ? Math.min : Math.max)(limit.y, this.y + added.y);
        return new Position(x, y);
    }

    addPadding(padding) {
        const x = this.x + padding;
        const y = this.y + padding;
        return new Position(x, y);
    }

    subtract(position) {
        const x = this.x - position.x;
        const y = this.y - position.y;
        return new Position(x, y);
    }

    scale(factor = 1) {
        const x = factor * this.x;
        const y = factor * this.y;
        return new Position(x, y);
    }
}