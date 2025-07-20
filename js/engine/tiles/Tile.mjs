import Position from './Position.mjs';
import Size from './Size.mjs';


export default class Tile {
    constructor(position = new Position(), size = new Size()) {
        this.position = position;
        this.size = size;
    }

    draw(context) {
        throw new Error('Not implemented');
    }
}