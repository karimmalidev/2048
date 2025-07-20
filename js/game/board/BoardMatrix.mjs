import Matrix from '../../helpers/Matrix.mjs';
import Random from '../../helpers/Random.mjs';
import Cell from './Cell.mjs';
import Direction from '../../engine/Direction.mjs';


function convertMajorMinorToRowColumn(isRowMajor, major, minor) {
    return isRowMajor ? [major, minor] : [minor, major];
}


export default class BoardMatrix extends Matrix {
    constructor(cellsPerAxis, cellSize) {
        super(cellsPerAxis, cellsPerAxis);
        this.cellSize = cellSize;

        this.addCellRandomly();
        this.addCellRandomly();
    }

    addCell(row, column, value) {
        const size = this.cellSize;
        const cell = new Cell(row, column, size, value);
        this.setCell(row, column, cell);
    }

    addCellRandomly(value) {
        if (value === undefined) {
            value = Math.random <= 0.1 ? 4 : 2;
        }
        const freeRowColumnPairs = this.getUndefinedCellsRowColumns();
        if (freeRowColumnPairs.length == 0) {
            return;
        }
        const { row, column } = Random.sampleOf(freeRowColumnPairs);
        this.addCell(row, column, value);
    }


    _getLoopParamsToMoveToward(direction) {
        const rows = this.numberOfRows;
        const columns = this.numberOfColumns;

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
            if (!this.isDefinedCell(row, column)) {
                continue;
            }

            const cell = this.getCell(row, column);

            let targetMinor = undefined;
            let doDouble = false;

            for (let tmpMinor = minor - minorStep; tmpMinor != tmpEnd; tmpMinor -= minorStep) {
                const [tmpRow, tmpColumn] = convertMajorMinorToRowColumn(isRowMajor, major, tmpMinor);
                if (this.isDefinedCell(tmpRow, tmpColumn)) {
                    const tmpCell = this.getCell(tmpRow, tmpColumn);
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
                cell.changeRowAndColumn(targetRow, targetColumn);
                this.moveCell(row, column, targetRow, targetColumn);
                if (doDouble) {
                    cell.setToDouble();
                }
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