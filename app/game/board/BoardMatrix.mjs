import Matrix from '../../utils/Matrix.mjs';
import Random from '../../utils/Random.mjs';
import Direction from '../../core/input/Direction.mjs';
import Vector from '../../utils/Vector.mjs';


export default class BoardMatrix extends Matrix {
    findRandomEmptyPosition() {
        return Random.sampleOf(this.getEmptyPositions());
    }

    findMoves = (direction) => {
        let moves = [];

        const isHorizontal = Direction.isHorizontal(direction);
        const lines = isHorizontal ? this.size.y : this.size.x;

        const copy = this.copy();

        for (let lineIndex = 0; lineIndex < lines; lineIndex++) {
            moves = moves.concat(BoardMatrix.#findMovesInLine(copy, lineIndex, direction));
        }

        return moves;
    }

    static #findMovesInLine(copy, lineIndex, direction) {
        if (!(copy instanceof Matrix)) {
            throw new TypeError(`Expected instance of Matrix, got ${typeof copy}`)
        }

        let moves = [];

        const isHorizontal = Direction.isHorizontal(direction);
        const cellsPerLine = isHorizontal ? copy.size.x : copy.size.y;

        const [begin, end, step] = Direction.isForward(direction) ?
            [cellsPerLine - 1, -1, -1] : [0, cellsPerLine, 1];


        let scanIndexEnd = begin - step;


        for (let sourceCellIndex = begin; sourceCellIndex != end; sourceCellIndex += step) {
            const source = BoardMatrix.#createPosition(isHorizontal, lineIndex, sourceCellIndex);
            if (!copy.has(source)) {
                continue;
            }

            let doDouble = false;
            let destination = null;

            for (let scanCellIndex = sourceCellIndex - step; scanCellIndex != scanIndexEnd; scanCellIndex -= step) {
                const scan = BoardMatrix.#createPosition(isHorizontal, lineIndex, scanCellIndex);
                if (!copy.has(scan)) {
                    destination = scan;
                } else {
                    if (copy.get(source) === copy.get(scan)) {
                        destination = scan;
                        doDouble = true;
                        scanIndexEnd += step;
                    }
                    break;
                }
            }

            if (destination != null) {
                moves.push({ source, destination, doDouble });
                if (doDouble) {
                    copy.set(source, copy.get(source) * 2);
                }
                copy.move(source, destination);
            }
        }

        return moves;
    }

    static #createPosition(isHorizontal, lineIndex, cellIndex) {
        return Vector.from(
            ...(isHorizontal ? [cellIndex, lineIndex] : [lineIndex, cellIndex])
        );
    }
}