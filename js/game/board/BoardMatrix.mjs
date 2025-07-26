import Matrix from '../../helpers/Matrix.mjs';
import Random from '../../helpers/Random.mjs';
import CellTile from './CellTile.mjs';
import Direction from '../../engine/control/Direction.mjs';
import Vector from '../../helpers/Vector.mjs';
import Renderer from '../../engine/graphics/Renderer.mjs';

function convertMajorMinorToRowColumn(isRowMajor, major, minor) {
    return isRowMajor ? [major, minor] : [minor, major];
}


export default class BoardMatrix {
    constructor(renderer, logicalSize, cellDrawingSize) {
        this.logicalSize = Vector.from(logicalSize);
        this.cellDrawingSize = Vector.from(cellDrawingSize);
        this.matrix = new Matrix(logicalSize);

        if (!(renderer instanceof Renderer)) {
            throw new TypeError(`Expected instance of Renderer, got ${typeof renderer}`)
        }
        this.renderer = renderer;

        this.addCellRandomly();
        this.addCellRandomly();
    }

    addCell(position, value) {
        const cellTile = new CellTile(this.renderer, position, this.cellDrawingSize, value);
        this.matrix.set(
            position,
            cellTile
        );
        this.renderer.tiles.add(cellTile);
    }

    addCellRandomly(value) {
        if (value === undefined) {
            value = Math.random <= 0.1 ? 4 : 2;
        }
        const emptyPositions = this.matrix.getEmptyPositions();
        if (emptyPositions.length === 0) {
            return;
        }
        this.addCell(Random.sampleOf(emptyPositions), value);
    }


    _getLoopParamsToMoveToward(direction) {
        const rows = this.logicalSize.y;
        const columns = this.logicalSize.x;

        const LoopParams = {
            [Direction.UP]: {
                isRowMajor: false,
                majorParams: [0, columns, 1],
                minorParams: [0, rows, 1]
            },
            [Direction.DOWN]: {
                isRowMajor: false,
                majorParams: [0, columns, 1],
                minorParams: [rows - 1, -1, -1]
            },
            [Direction.LEFT]: {
                isRowMajor: true,
                majorParams: [0, rows, 1],
                minorParams: [0, columns, 1]
            },
            [Direction.RIGHT]: {
                isRowMajor: true,
                majorParams: [0, rows, 1],
                minorParams: [columns - 1, -1, -1]
            }
        };

        return LoopParams[direction];
    }

    _moveCellsInMajor(isRowMajor, major, minorParams) {
        const [minorBegin, minorEnd, minorStep] = minorParams;

        let tmpEnd = minorBegin - minorStep;

        let gotAnyMoves = false;

        for (let minor = minorBegin + minorStep; minor != minorEnd; minor += minorStep) {
            const [row, column] = convertMajorMinorToRowColumn(isRowMajor, major, minor);
            if (!this.matrix.has(Vector.from(column, row))) {
                continue;
            }

            const cell = this.matrix.get(Vector.from(column, row));

            let targetMinor = undefined;
            let doDouble = false;

            for (let tmpMinor = minor - minorStep; tmpMinor != tmpEnd; tmpMinor -= minorStep) {
                const [tmpRow, tmpColumn] = convertMajorMinorToRowColumn(isRowMajor, major, tmpMinor);
                if (this.matrix.has(Vector.from(tmpColumn, tmpRow))) {
                    const tmpCell = this.matrix.get(Vector.from(tmpColumn, tmpRow));
                    if (tmpCell.equals(cell)) {
                        targetMinor = tmpMinor;
                        doDouble = true;
                        tmpEnd += minorStep;
                    }
                    break;
                }
                targetMinor = tmpMinor;
            }

            if (targetMinor !== undefined) {
                const [targetRow, targetColumn] = convertMajorMinorToRowColumn(isRowMajor, major, targetMinor);
                cell.changePosition(Vector.from(targetColumn, targetRow));
                if (doDouble) {
                    this.renderer.tiles.delete(this.matrix.get(Vector.from(targetColumn, targetRow)));
                    cell.setToDouble();
                }
                this.matrix.move(Vector.from(column, row), Vector.from(targetColumn, targetRow));
                gotAnyMoves = true;
            }
        }

        return gotAnyMoves;
    }

    moveCellsToward(direction) {
        const { isRowMajor, majorParams, minorParams } = this._getLoopParamsToMoveToward(direction);
        const [majorBegin, majorEnd, majorStep] = majorParams;

        let gotAnyMoves = false;

        for (let major = majorBegin; major != majorEnd; major += majorStep) {
            gotAnyMoves |= this._moveCellsInMajor(isRowMajor, major, minorParams);
        }

        if (gotAnyMoves) {
            this.addCellRandomly();
        }
    }
}