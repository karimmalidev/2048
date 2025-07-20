import Renderer from './../engine/Renderer.mjs';
import MoveInputListener from './../engine/MoveInputListener.mjs';
import Board from './board/Board.mjs';
import Constants from './Constants.mjs';

export default class Game {
    constructor(canvas) {
        const { width, height } = canvas;

        this.board = new Board(Constants.CELLS_PER_AXIS, width, height);

        const context = canvas.getContext('2d');
        this.renderer = new Renderer(context, this.board);

        this.moveInputListener = new MoveInputListener(this.board.moveInputCallback);
    }

    start() {
        this.renderer.start();
    }
}