import Vector from '../../helpers/Vector.mjs';

export default class Tile {
    constructor(drawingPosition, drawingSize) {
        this.drawingPosition = Vector.from(drawingPosition);
        this.drawingSize = Vector.from(drawingSize);
    }

    draw(context) {
        throw new SyntaxError('Not implemented');
    }
}