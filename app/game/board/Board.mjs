import Renderer from "../../core/graphics/Renderer.mjs";
import Matrix from "../../utils/Matrix.mjs";
import Vector from "../../utils/Vector.mjs";
import BoardMatrix from "./BoardMatrix.mjs";
import BoardTile from "./BoardTile.mjs";
import CellTile from "./CellTile.mjs";
import MoveTileAnimator from '../../core/graphics/tile_animator/MoveTileAnimator.mjs';
import Constants from "../Constants.mjs";
import ScoreBarTile from "../ScoreBarTile.mjs";

export default class Board {
    constructor(renderer, scoreBarTile, logicalSize, drawingPosition, drawingSize) {
        if (!(renderer instanceof Renderer)) {
            throw TypeError;
        }
        if (!(scoreBarTile instanceof ScoreBarTile)) {
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
        this.scoreBar = scoreBarTile;
        this.logicalSize = logicalSize;
        this.drawingPosition = drawingPosition;
        this.drawingSize = drawingSize;

        this.#init();

        this.addRandomly();
        this.addRandomly();
    }


    moveInputCallback = (direction) => {
        // Block input when animation is running
        if (this.renderer.animators.size !== 0) {
            return;
        }
        const moves = this.boardMatrix.findMoves(direction);
        for (const { source, destination, doDouble } of moves) {
            this.move(source, destination);
            if (doDouble) {
                this.setToDouble(destination);
            }
        }
        if (moves.length > 0) {
            this.addRandomly();
        }
    }

    addRandomly() {
        const position = this.boardMatrix.findRandomEmptyPosition();
        if (position != null) {
            this.add(position, Math.random() < 0.1 ? 4 : 2);
        }
    }

    setToDouble(position) {
        this.tilesMatrix.get(position).drawingValue *= 2;
        const newValue = this.boardMatrix.get(position) * 2;
        this.boardMatrix.set(position, newValue);
        this.scoreBar.addToScore(newValue);
    }

    add(position, value) {
        const cellTile = new CellTile(
            this.#convertIntoDrawingPosition(position),
            this.cellDrawingSize,
            value
        );
        this.renderer.tiles.add(cellTile);
        this.tilesMatrix.set(position, cellTile);
        this.boardMatrix.set(position, value);
    }

    move(source, destination) {
        this.renderer.tiles.delete(this.tilesMatrix.get(destination));
        this.renderer.animators.add(
            new MoveTileAnimator(
                this.tilesMatrix.get(source),
                Vector.from(source).distance(destination) * Constants.CELL_MOVE_DURATION_IN_SECONDS,
                this.#convertIntoDrawingPosition(destination)
            )
        );
        this.tilesMatrix.move(source, destination);
        this.boardMatrix.move(source, destination);
    }


    #convertIntoDrawingPosition(position) {
        return this.drawingPosition.add(this.cellDrawingSize.multiply(position));
    }

    #init() {
        this.cellDrawingSize = Vector.from(this.drawingSize).divide(this.logicalSize);

        this.boardTile = new BoardTile(this.logicalSize, this.drawingPosition, this.drawingSize);
        this.renderer.tiles.add(this.boardTile);

        this.boardMatrix = new BoardMatrix(this.logicalSize);

        this.tilesMatrix = new Matrix(this.logicalSize);
    }

}