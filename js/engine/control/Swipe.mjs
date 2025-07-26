import Vector from "../../helpers/Vector.mjs";
import Direction from "./Direction.mjs";

export default class Swipe {
    #direction;
    static #THRESHOLD = 30;

    constructor(start, end) {
        const difference = Vector.from(end).subtract(start);
        const absolute = difference.absolute();

        if (absolute.largestComponent > Swipe.#THRESHOLD) {
            this.#direction = this.#resolveDirection(difference, absolute);
        }
    }

    #resolveDirection(difference, absolute) {
        if (absolute.x > absolute.y) {
            return difference.x > 0 ? Direction.RIGHT : Direction.LEFT;
        } else {
            return difference.y > 0 ? Direction.DOWN : Direction.UP;
        }
    }

    get direction() {
        return this.#direction;
    }
}
