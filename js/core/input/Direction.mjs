export default class Direction {
    static UP = 'UP';
    static DOWN = 'DOWN';
    static LEFT = 'LEFT';
    static RIGHT = 'RIGHT';

    static validSet = new Set([
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT
    ]);

    static horizontalSet = new Set([Direction.LEFT, Direction.RIGHT]);
    static forwardSet = new Set([Direction.DOWN, Direction.RIGHT]);

    static isValid(direction) {
        return Direction.validSet.has(direction);
    }

    static isHorizontal(direction) {
        return Direction.horizontalSet.has(direction);
    }

    static isForward(direction) {
        return Direction.forwardSet.has(direction);
    }
}