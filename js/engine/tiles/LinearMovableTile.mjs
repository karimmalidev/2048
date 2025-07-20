import MovableTile from './MovableTile.mjs';
import Position from './Position.mjs';
import Tile from './Tile.mjs';

export default class LinearMovableTile extends MovableTile {
    constructor(position, size) {
        super(position, size);
        this._target = position;
        this._velocity = new Position(0, 0);
    }

    setMovement(target, durationInSeconds) {
        this._target = target;
        this._velocity = target.subtract(this.position).scale(1 / durationInSeconds);
    }

    move(timeDeltaInSeconds) {
        const step = this._velocity.scale(timeDeltaInSeconds);
        const limit = this._target;
        this.position = this.position.addWithLimit(step, limit);
    }

    isMoving() {
        return this.position.equals(this._target);
    }
}