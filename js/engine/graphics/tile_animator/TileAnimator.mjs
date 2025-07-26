import Tile from "../Tile.mjs";

export default class TileAnimator {
    constructor(tile, durationInSeconds) {
        if (!(tile instanceof Tile)) {
            throw new TypeError(`Expected instance of Tile, got ${typeof tile}`);
        }
        if (typeof durationInSeconds !== 'number') {
            throw new TypeError(`Expected type of number, got ${typeof durationInSeconds}`);
        }
        this.tile = tile;
        this.durationInSeconds = durationInSeconds;
    }

    isFinished() {
        throw new SyntaxError('Not implemented');
    }

    update(timeDeltaInSeconds) {
        throw new SyntaxError('Not implemented');
    }
}