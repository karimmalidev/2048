import Renderer from "../../core/graphics/Renderer.mjs";
import Vector from "../../utils/Vector.mjs";
import BoardLogic from "./BoardLogic.mjs";
import BoardTile from "./BoardTile.mjs";

export default class Board {
    constructor(renderer, logicalSize, drawingPosition, drawingSize) {
        if (!(renderer instanceof Renderer)) {
            throw TypeError;
        }
        if (!(logicalSize instanceof Vector)) {
            throw TypeError;
        }
        if (!(drawingPosition instanceof Vector)) {
            throw TypeError;
        }
        if (!(drawingSize instanceof Vector)) {
            throw TypeError;
        }
        this.renderer = renderer;
        this.boardTile = new BoardTile(logicalSize, drawingPosition, drawingSize);
        this.renderer.tiles.add(this.boardTile);

        const cellDrawingSize = Vector.from(drawingSize).divide(logicalSize);
        this.boardLogic = new BoardLogic(renderer, logicalSize, cellDrawingSize);
        this.moveInputCallback = this.boardLogic.moveCellsToward
    }
}