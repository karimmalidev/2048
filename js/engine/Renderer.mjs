import Tile from "./tiles/Tile.mjs";
import MovableTile from "./tiles/MovableTile.mjs";

export default class Renderer {
    constructor(context, tilesParent) {
        this.context = context;
        this.lastRenderTimestamp = performance.now();
        this.tilesParent = tilesParent
    }

    clear() {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);
    }

    start() {
        this._render(performance.now());
    }

    get tiles() {
        return this.tilesParent.tiles;
    }

    get movableTiles() {
        return this.tiles.filter(tile => tile instanceof MovableTile);
    }

    _move(timeDeltaInSeconds) {
        for (const tile of this.movableTiles) {
            tile.move(timeDeltaInSeconds);
        }
    }

    _draw() {
        this.clear();

        for (const tile of this.tiles) {
            tile.draw(this.context);
        }
    }

    _render = (timestamp) => {
        const timeDeltaInMilliseconds = (timestamp - this.lastRenderTimestamp);
        this.lastRenderTimestamp = timestamp;
        const timeDeltaInSeconds = timeDeltaInMilliseconds / 1000;
        this._move(timeDeltaInSeconds);
        this._draw(this.context)
        requestAnimationFrame(this._render);
    }
}
