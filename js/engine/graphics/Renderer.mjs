export default class Renderer {
    #context
    #lastTimestamp

    constructor(context) {
        this.#context = context;
        this.#lastTimestamp = 0;
        this.tiles = new Set();
        this.animators = new Set();
    }

    start() {
        this.#lastTimestamp = performance.now();
        this.#render(this.#lastTimestamp);
    }

    #render = (timestamp) => {
        this.#update((timestamp - this.#lastTimestamp) / 1000);
        this.#lastTimestamp = timestamp;
        this.#draw();
        requestAnimationFrame(this.#render);
    }

    #update(timeDeltaInSeconds) {
        for (const animator of this.animators) {
            animator.update(timeDeltaInSeconds);
            if (animator.isFinished()) {
                this.animators.delete(animator);
            }
        }
    }

    #draw() {
        this.#clearCanvas();
        for (const tile of this.tiles) {
            tile.draw(this.#context);
        }
    }

    #clearCanvas() {
        const { width, height } = this.#context.canvas;
        this.#context.clearRect(0, 0, width, height);
    }

}