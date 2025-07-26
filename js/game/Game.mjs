import Renderer from './../core/graphics/Renderer.mjs';
import MoveInputListener from './../core/input/MoveInputListener.mjs';
import Board from './board/Board.mjs';
import Constants from './Constants.mjs';
import Vector from '../utils/Vector.mjs';

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(
            canvas.getContext('2d')
        );

        this.board = new Board(
            this.renderer,
            Constants.BOARD_SIZE,
            Vector.from(0, 0),
            Vector.from(canvas.width, canvas.height)
        );

        this.moveInputListener = new MoveInputListener(
            canvas,
            this.board.moveInputCallback
        );
    }

    start() {
        this.renderer.start();
    }
}