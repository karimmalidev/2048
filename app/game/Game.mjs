import Renderer from './../core/graphics/Renderer.mjs';
import MoveInputListener from './../core/input/MoveInputListener.mjs';
import Board from './board/Board.mjs';
import Constants from './Constants.mjs';
import Vector from '../utils/Vector.mjs';
import ScoreBarTile from './ScoreBarTile.mjs';

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(
            canvas.getContext('2d')
        );

        const scoreBarScale = 0.08;
        const boardSize = Vector.from(Math.min(canvas.width, canvas.height * (1 - scoreBarScale)));
        const scoreBarSize = Vector.from(boardSize.x, canvas.height * scoreBarScale);
        const boardPosition = Vector.from(
            (canvas.width - boardSize.x) / 2,
            canvas.height - boardSize.y
        );
        const scoreBarPosition = Vector.from(boardPosition.x, 0);

        this.scoreBar = new ScoreBarTile(
            scoreBarPosition,
            scoreBarSize
        );
        this.renderer.tiles.add(this.scoreBar);


        this.board = new Board(
            this.renderer,
            this.scoreBar,
            Constants.BOARD_SIZE,
            boardPosition,
            boardSize
        );

        this.moveInputListener = new MoveInputListener(
            canvas,
            this.board.moveInputCallback
        );
    }

    start() {
        this.renderer.start();
    }

    restart() {
        this.scoreBar.resetScore();
        this.board.reset();
    }
}