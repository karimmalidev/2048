import Vector from "../../utils/Vector.mjs";
import Tile from "../../core/graphics/Tile.mjs";
import GameStyles from '../GameStyles.mjs';
import BoardMatrix from './BoardMatrix.mjs';
import Drawing from "../../utils/Drawing.mjs";
import Renderer from "../../core/graphics/Renderer.mjs";

export default class Board extends Tile {
    constructor(renderer, logicalSize, drawingPosition, drawingSize) {
        super(drawingPosition, drawingSize);

        if (!(renderer instanceof Renderer)) {
            throw new TypeError(`Expected instance of Renderer, got ${typeof renderer}`);
        }
        this.renderer = renderer;
        this.renderer.tiles.add(this);

        this.logicalSize = Vector.from(logicalSize);
        this.drawingSize = Vector.from(drawingSize);
        this.cellDrawingSize = this.drawingSize.divide(logicalSize);

        this.matrix = new BoardMatrix(renderer, logicalSize, this.cellDrawingSize);

        this.#initDrawingParameters();
    }

    moveInputCallback = (direction) => {
        this.matrix.moveCellsToward(direction);
    }

    draw(context) {
        context.fillStyle = GameStyles.BoardColor;
        for (let y = this._yStart; y < this._yEnd; y += this._yStep) {
            for (let x = this._xStart; x < this._xEnd; x += this._xStep) {
                Drawing.fillRoundedRect(context, x, y, this._width, this._height, this._radius);
            }
        }
    }

    #initDrawingParameters() {
        this._padding = this.cellDrawingSize.smallestComponent * GameStyles.PADDING_SCALE;
        this._radius = this._padding * 2;

        this._yStart = this.drawingPosition.y + this._padding;
        this._yEnd = this._yStart + this.drawingSize.y;
        this._yStep = this.cellDrawingSize.y;

        this._xStart = this.drawingPosition.x + this._padding;
        this._xEnd = this._xStart + this.drawingSize.x;
        this._xStep = this.cellDrawingSize.x;

        const { x, y } = this.cellDrawingSize.subtract(this._padding * 2);
        this._width = x;
        this._height = y;
    }
}