import Vector from '../../helpers/Vector.mjs';

export default class Tile {
    constructor(position, size) {
        this.position = Vector.from(position);
        this.size = Vector.from(size);
    }

    draw(context) {
        throw new SyntaxError('Not implemented');
    }
}