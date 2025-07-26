import MovableTile from './MovableTile.mjs';
import Vector from '../../helpers/Vector.mjs';

export default class LinearMovableTile extends MovableTile {
    constructor(position, size) {
        super(position, size);
        this.drawingTarget = Vector.from(position);
        this.drawingVelocity = Vector.from(0, 0);
    }

    setTarget(target, durationInSeconds) {
        this.drawingTarget = Vector.from(target);
        this.drawingVelocity = this.drawingTarget.subtract(this.drawingPosition).divide(durationInSeconds);
    }

    move(timeDeltaInSeconds) {
        const delta = this.drawingVelocity.multiply(timeDeltaInSeconds);
        const boundary = this.drawingTarget;
        this.drawingPosition = this.drawingPosition.clampAdd(delta, boundary);
    }

    hasReachedTarget() {
        return this.drawingPosition.equals(this.drawingTarget);
    }
}