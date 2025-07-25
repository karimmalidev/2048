import Vector from "../../helpers/Vector.mjs";
import Tile from "../../engine/tiles/Tile.mjs";
import Styles from '../Styles.mjs';
import BoardMatrix from './BoardMatrix.mjs';
import Drawing from "../../helpers/Drawing.mjs";

export default class Board extends Tile {
    constructor(cellsPerAxis, width, height) {
        const position = Vector.from(0, 0);
        const size = Vector.from(width, height);
        super(position, size);

        this.cellsPerAxis = cellsPerAxis;

        const cellWidth = this.size.x / this.cellsPerAxis;
        const cellHeight = this.size.y / this.cellsPerAxis;
        this.cellSize = Vector.from(cellWidth, cellHeight);

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
        const padding = this.cellSize.smallestComponent * Styles.PADDING_SCALE;
        const { x: width, y: height } = this.cellSize.subtract(padding * 2);
        const radius = padding * 2;

        context.fillStyle = Styles.BoardColor;
        for (let row = 0; row < this.cellsPerAxis; row++) {
            for (let column = 0; column < this.cellsPerAxis; column++) {
                const { x, y } = Vector.from(column, row).multiply(this.cellSize).add(padding);
                Drawing.fillRoundedRect(context, x, y, width, height, radius);
            }
        }
    }
}