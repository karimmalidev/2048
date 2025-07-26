import Vector from "../../../helpers/Vector.mjs";
import TileAnimator from "./TileAnimator.mjs";

export default class MoveTileAnimator extends TileAnimator {
    constructor(tile, durationInSeconds, drawingTarget) {
        super(tile, durationInSeconds);
        this.drawingTarget = Vector.from(drawingTarget);
        this.drawingVelocity = this.drawingTarget.subtract(
            this.tile.drawingPosition).divide(durationInSeconds);
    }

    isFinished() {
        return this.tile.drawingPosition.equals(this.drawingTarget);
    }

    update(timeDeltaInSeconds) {
        this.tile.drawingPosition = this.tile.drawingPosition.clampAdd(
            this.drawingVelocity.multiply(timeDeltaInSeconds),
            this.drawingTarget
        );
    }
}