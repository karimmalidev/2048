import Tile from "./Tile.mjs";

export default class MovableTile extends Tile {
    move(timeDeltaInSeconds) {
        throw new SyntaxError('Not implemented');
    }
}