import Vector from "../utils/Vector.mjs";

const CELLS_PER_AXIS = 4;
const LONGEST_MOVE_DURATION_IN_SECONDS = 0.1;

const Constants = {
    MIN_CELL_VALUE: 2,
    MAX_CELL_VALUE: 2048,

    BOARD_SIZE: Vector.from(CELLS_PER_AXIS),
    CELL_MOVE_DURATION_IN_SECONDS: LONGEST_MOVE_DURATION_IN_SECONDS / CELLS_PER_AXIS,
};


export default Constants;