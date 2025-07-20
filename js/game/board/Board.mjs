import Position from "../../engine/tiles/Position.mjs";
import Size from "../../engine/tiles/Size.mjs";
import Tile from "../../engine/tiles/Tile.mjs";
import Styles from '../Styles.mjs';
import BoardMatrix from './BoardMatrix.mjs';
import Drawing from "../../helpers/Drawing.mjs";

export default class Board extends Tile {
    constructor(cellsPerAxis, width, height) {
        const position = new Position(0, 0);
        const size = new Size(width, height);
        super(position, size);

        this.cellsPerAxis = cellsPerAxis;

        const cellWidth = this.size.width / this.cellsPerAxis;
        const cellHeight = this.size.height / this.cellsPerAxis;
        this.cellSize = new Size(cellWidth, cellHeight);

        this.matrix = new BoardMatrix(cellsPerAxis, this.cellSize);
    }

    get cells() {
        return this.matrix.getDefinedCells();
    }

    get tiles() {
        return [this, ...this.cells];
    }

    moveInputCallback = (direction) => {
        this.matrix.moveCellsToward(direction);
    }

    draw(context) {
        const padding = this.cellSize.minDimension * Styles.PADDING_SCALE;
        const { width, height } = this.cellSize.subtractPadding(padding);
        const radius = padding * 2;

        context.fillStyle = Styles.BoardColor;
        for (let row = 0; row < this.cellsPerAxis; row++) {
            for (let column = 0; column < this.cellsPerAxis; column++) {
                const { x, y } = Position.fromRowColumn(row, column, this.cellSize).addPadding(padding);
                Drawing.fillRoundedRect(context, x, y, width, height, radius);
            }
        }
    }
}