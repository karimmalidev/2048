import MovableTile from './MovableTile.mjs';

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
        this.#render(performance.now());
    }

    get tiles() {
        return this.tilesParent.tiles;
    }

    get movableTiles() {
        return this.tiles.filter(tile => tile instanceof MovableTile);
    }

    #updatePositions(timeDeltaInSeconds) {
        for (const tile of this.movableTiles) {
            tile.move(timeDeltaInSeconds);
        }
    }

    #draw() {
        this.clear();
        for (const tile of this.tiles) {
            tile.draw(this.context);
        }
    }

    #render = (timestamp) => {
        const timeDeltaInMilliseconds = (timestamp - this.lastRenderTimestamp);
        this.lastRenderTimestamp = timestamp;
        const timeDeltaInSeconds = timeDeltaInMilliseconds / 1000;
        this.#updatePositions(timeDeltaInSeconds);
        this.#draw(this.context)
        requestAnimationFrame(this.#render);
    }
}
