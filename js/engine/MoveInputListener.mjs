import Vector from '../helpers/Vector.mjs';
import Direction from './Direction.mjs';

const SWIPE_DISTANCE_THRESHOLD = 30;

export default class MoveInputListener {

    constructor(canvas, moveInputCallback) {
        this.canvas = canvas;
        this._callback = moveInputCallback;

        this.start = new Vector(0, 0);
        this.end = new Vector(0, 0);

        this._addEventListeners();
    }

    _addEventListeners() {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('mousedown', this._onStartEvent);
        window.addEventListener('mouseup', this._onEndEvent);
        this.canvas.addEventListener('touchstart', this._onStartEvent, { passive: false });
        this.canvas.addEventListener('touchend', this._onEndEvent, { passive: false });
    }

    _onKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this._callback(Direction.UP);
                break;
            case 'ArrowDown':
            case 'S':
            case 's':
                this._callback(Direction.DOWN);
                break;
            case 'ArrowLeft':
            case 'A':
            case 'a':
                this._callback(Direction.LEFT);
                break;
            case 'ArrowRight':
            case 'D':
            case 'd':
                this._callback(Direction.RIGHT);
                break;
        }
    }

    _onStartEvent = (e) => {
        e.preventDefault();
        const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
        this.start = new Vector(x, y);
    }

    _onEndEvent = (e) => {
        e.preventDefault();
        const { clientX: x, clientY: y } = e.changedTouches ? e.changedTouches[0] : e;
        this.end = new Vector(x, y);
        this._swipeCallback();
    }

    _swipeDistance() {
        return this.end.subtract(this.start);
    }

    _isHorizontalSwipe(x, y) {
        return Math.abs(x) > Math.abs(y);
    }

    _swipeCallback() {
        const { x, y } = this._swipeDistance();

        if (this._isHorizontalSwipe(x, y)) {
            if (x > SWIPE_DISTANCE_THRESHOLD) this._callback(Direction.RIGHT);
            else if (x < -SWIPE_DISTANCE_THRESHOLD) this._callback(Direction.LEFT);
        } else {
            if (y > SWIPE_DISTANCE_THRESHOLD) this._callback(Direction.DOWN);
            else if (y < -SWIPE_DISTANCE_THRESHOLD) this._callback(Direction.UP);
        }
    }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('mousedown', this._onStartEvent);
        window.removeEventListener('mouseup', this._onEndEvent);
        window.removeEventListener('touchstart', this._onStartEvent);
        window.removeEventListener('touchend', this._onEndEvent);
    }
}
