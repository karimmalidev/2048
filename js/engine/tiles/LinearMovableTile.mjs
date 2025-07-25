import MovableTile from './MovableTile.mjs';
import Tile from './Tile.mjs';
import Vector from '../../helpers/Vector.mjs';

export default class LinearMovableTile extends MovableTile {
    constructor(position, size) {
        super(position, size);
        this._target = Vector.from(position);
        this._velocity = Vector.from(0, 0);
    }

    setMovement(target, durationInSeconds) {
        this._target = Vector.from(target);
        this._velocity = this._target.subtract(this.position).divide(durationInSeconds);
    }

    move(timeDeltaInSeconds) {
        const step = this._velocity.multiply(timeDeltaInSeconds);
        const boundary = this._target;
        this.position = this.position.clampAdd(step, boundary);
    }

    isMoving() {
        return this.position.equals(this._target);
    }
}