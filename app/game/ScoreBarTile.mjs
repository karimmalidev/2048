import Tile from "../core/graphics/Tile.mjs";
import GameStyles from './GameStyles.mjs';

export default class ScoreBar extends Tile {
    constructor(drawingPosition, drawingSize) {
        super(drawingPosition, drawingSize);
        this.score = 0;
        this.high = localStorage.getItem('high') ?? 0;
    }

    resetScore() {
        this.score = 0;
    }

    addToScore(amount) {
        this.score += amount;
        if (this.score > this.high) {
            this.high = this.score;
        }
        localStorage.setItem('high', this.high);
    }

    draw(context = new CanvasRenderingContext2D) {
        const { x, y } = this.drawingPosition;
        const { x: width, y: height } = this.drawingSize;

        const fontSize = height * 0.75;
        context.font = `bold ${fontSize}px sans-serif`;
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        const leftText = `Score: ${this.score}`;
        const rightText = `High: ${this.high}`;
        const leftTextWidth = context.measureText(leftText).width;
        const rightTextWidth = context.measureText(rightText).width;
        const xSpacing = (width - leftTextWidth - rightTextWidth) / 3;

        context.fillStyle = GameStyles.ScoreBar.SCORE_FG;
        context.fillText(leftText, x + xSpacing, y + height / 2);

        context.fillStyle = GameStyles.ScoreBar.HIGH_FG;
        context.fillText(rightText, x + xSpacing + leftTextWidth + xSpacing, y + height / 2);
    }
}