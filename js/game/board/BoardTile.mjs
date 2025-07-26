import Tile from "../../core/graphics/Tile.mjs";
import GameStyles from '../GameStyles.mjs';
import Drawing from "../../utils/Drawing.mjs";

export default class BoardTile extends Tile {
    constructor(logicalSize, drawingPosition, drawingSize) {
        super(drawingPosition, drawingSize);
        this.#initDrawingParameters(logicalSize);
    }

    draw(context) {
        context.fillStyle = GameStyles.BoardColor;
        for (let y = this._yStart; y < this._yEnd; y += this._yStep) {
            for (let x = this._xStart; x < this._xEnd; x += this._xStep) {
                Drawing.fillRoundedRect(context, x, y, this._width, this._height, this._radius);
            }
        }
    }

    #initDrawingParameters(logicalSize) {
        const cellDrawingSize = this.drawingSize.divide(logicalSize);

        this._padding = cellDrawingSize.smallestComponent * GameStyles.PADDING_SCALE;
        this._radius = this._padding * 2;

        this._yStart = this.drawingPosition.y + this._padding;
        this._yEnd = this._yStart + this.drawingSize.y;
        this._yStep = cellDrawingSize.y;

        this._xStart = this.drawingPosition.x + this._padding;
        this._xEnd = this._xStart + this.drawingSize.x;
        this._xStep = cellDrawingSize.x;

        const { x, y } = cellDrawingSize.subtract(this._padding * 2);
        this._width = x;
        this._height = y;
    }
}