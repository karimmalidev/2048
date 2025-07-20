export default class Matrix {
    constructor(numberOfRows, numberOfColumns) {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this._matrix = Array.from(
            { length: numberOfRows },
            () => Array(numberOfColumns).fill(undefined)
        );
    }

    _assertValidRowAndColumn(row, column) {
        if (
            row < 0 || row >= this.numberOfRows ||
            column < 0 || column >= this.numberOfColumns
        ) {
            throw new RangeError(`Invalid indices: row=${row}, column=${column}`);
        }
    }

    getCell(row, column) {
        this._assertValidRowAndColumn(row, column);

        return this._matrix[row][column];
    }

    isDefinedCell(row, column) {
        this._assertValidRowAndColumn(row, column);

        return this._matrix[row][column] !== undefined;
    }

    setCell(row, column, value) {
        this._assertValidRowAndColumn(row, column);
        this._matrix[row][column] = value;
    }

    removeCell(row, column) {
        this._assertValidRowAndColumn(row, column);

        this.setCell(row, column, undefined);
    }

    moveCell(fromRow, fromColumn, toRow, toColumn) {
        if (fromRow === toRow && fromColumn === toColumn) {
            return;
        }

        this._assertValidRowAndColumn(fromRow, fromColumn);
        this._assertValidRowAndColumn(toRow, toColumn);

        const value = this.getCell(fromRow, fromColumn);
        this.setCell(toRow, toColumn, value);
        this.removeCell(fromRow, fromColumn);
    }

    getDefinedCells() {
        return this._matrix.flat().filter((cell) => cell !== undefined);
    }

    getUndefinedCellsRowColumns() {
        const rowsColumns = [];
        const rows = this.numberOfRows;
        const columns = this.numberOfColumns;
        const matrix = this._matrix;

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (!this.isDefinedCell(row, column)) {
                    rowsColumns.push({ row, column });
                }
            }
        }

        return rowsColumns;
    }
}