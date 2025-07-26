import MovableTile from './MovableTile.mjs';
import Vector from '../../helpers/Vector.mjs';

export default class LinearMovableTile extends MovableTile {
    constructor(position, size) {
        super(position, size);
        this.target = Vector.from(position);
        this.velocity = Vector.from(0, 0);
    }

    setTarget(target, durationInSeconds) {
        this.target = Vector.from(target);
        this.velocity = this.target.subtract(this.position).divide(durationInSeconds);
    }

    move(timeDeltaInSeconds) {
        const delta = this.velocity.multiply(timeDeltaInSeconds);
        const boundary = this.target;
        this.position = this.position.clampAdd(delta, boundary);
    }

    hasReachedTarget() {
        return this.position.equals(this.target);
    }
}