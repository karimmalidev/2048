import Vector from '../helpers/Vector.mjs';
import Direction from './Direction.mjs';
import Swipe from './Swipe.mjs';


export default class MoveInputListener {
    #canvas
    #moveInputCallback
    #start
    #end

    constructor(canvas, moveInputCallback) {
        this.#canvas = canvas;
        this.#moveInputCallback = moveInputCallback;

        this.#start = new Vector(0, 0);
        this.#end = new Vector(0, 0);

        this.#addEventListeners();
    }

    #addEventListeners() {
        window.addEventListener('keydown', this.#onKeyDownCallback);
        window.addEventListener('mousedown', this.#onStartEventCallback);
        window.addEventListener('mouseup', this.#onEndEventCallback);
        this.#canvas.addEventListener('touchstart', this.#onStartEventCallback, { passive: false });
        this.#canvas.addEventListener('touchend', this.#onEndEventCallback, { passive: false });
    }

    #onKeyDownCallback = (event) => {
        for (const [direction, keys] of keyMap.entries()) {
            if (keys.has(event.key)) {
                this.#moveInputCallback(direction);
            }
        }
    }

    #onStartEventCallback = (event) => {
        event.preventDefault();
        this.#updateStart(event);
    }

    #updateStart(event) {
        const { clientX: x, clientY: y } = event.touches ? event.touches[0] : event;
        this.#start = new Vector(x, y);
    }

    #onEndEventCallback = (event) => {
        event.preventDefault();
        this.#updateEnd(event);
        const swipe = new Swipe(this.#start, this.#end);
        if (Direction.isValid(swipe.direction)) {
            this.#moveInputCallback(swipe.direction);
        }
    }

    #updateEnd(event) {
        const { clientX: x, clientY: y } = event.changedTouches ? event.changedTouches[0] : event;
        this.#end = new Vector(x, y);
    }

    destroy() {
        window.removeEventListener('keydown', this.#onKeyDownCallback);
        window.removeEventListener('mousedown', this.#onStartEventCallback);
        window.removeEventListener('mouseup', this.#onEndEventCallback);
        this.#canvas.removeEventListener('touchstart', this.#onStartEventCallback);
        this.#canvas.removeEventListener('touchend', this.#onEndEventCallback);
    }
}

const keyMap = new Map;
keyMap.set(Direction.UP, new Set(['ArrowUp', 'W', 'w', 'K', 'k']));
keyMap.set(Direction.DOWN, new Set(['ArrowDown', 'S', 's', 'J', 'j']));
keyMap.set(Direction.LEFT, new Set(['ArrowLeft', 'A', 'a', 'H', 'h']));
keyMap.set(Direction.RIGHT, new Set(['ArrowRight', 'D', 'd', 'L', 'l']));