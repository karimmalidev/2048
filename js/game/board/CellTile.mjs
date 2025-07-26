import GameStyles from '../GameStyles.mjs';
import Drawing from '../../utils/Drawing.mjs';
import Tile from '../../core/graphics/Tile.mjs';
export default class CellTile extends Tile {
    constructor(drawingPosition, drawingSize, drawingValue) {
        super(drawingPosition, drawingSize);
        this.drawingValue = drawingValue;
    }

    draw(context) {
        const { x: width, y: height } = this.drawingSize;
        const { x, y } = this.drawingPosition;
        const { BG, FG } = GameStyles.CellsColors[this.drawingValue];

        const PAD = width * 0.05;


        context.shadowColor = "rgba(0, 0, 0, 0.1)";
        context.shadowBlur = PAD * 0.5;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = PAD * 0.5;

        context.fillStyle = BG;
        Drawing.fillRoundedRect(context, x + PAD, y + PAD, width - 2 * PAD, height - 2 * PAD, PAD * 2);


        const text = this.drawingValue.toString();

        const scale = text.length <= 2 ? 0.4 : 0.3;
        const fontSize = scale * Math.min(width, height);
        context.font = `bold ${fontSize}px sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = FG;

        const centerX = x + width / 2;
        const centerY = y + height / 2;
        context.fillText(text, centerX, centerY);

        context.shadowColor = 'transparent';
    }
}