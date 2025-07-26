import Styles from '../Styles.mjs';
import Constants from '../Constants.mjs';
import Drawing from '../../helpers/Drawing.mjs';
import Vector from '../../helpers/Vector.mjs';
import Tile from '../../engine/graphics/Tile.mjs';
import Renderer from '../../engine/graphics/Renderer.mjs';
import MoveTileAnimator from '../../engine/graphics/tile_animator/MoveTileAnimator.mjs';


export default class CellTile extends Tile {
    constructor(renderer, logicalPosition, drawingSize, value) {
        super(Vector.from(logicalPosition).multiply(drawingSize), drawingSize);

        if (!(renderer instanceof Renderer)) {
            throw new TypeError(`Expected instance of Renderer, got ${typeof renderer}`);
        }
        this.renderer = renderer;

        this.logicalPosition = Vector.from(logicalPosition);
        this.value = value;
    }

    equals(cell) {
        return this.value === cell.value;
    }

    setToDouble() {
        this.value *= 2;
    }

    changePosition(logicalPosition) {
        this.renderer.animators.add(
            new MoveTileAnimator(
                this,
                this.logicalPosition.distance(logicalPosition) * Constants.CELL_MOVE_DURATION_IN_SECONDS,
                Vector.from(logicalPosition).multiply(this.drawingSize)
            )
        );
        this.logicalPosition = logicalPosition;
    }

    draw(context) {
        const { x: width, y: height } = this.drawingSize;
        const { x, y } = this.drawingPosition;
        const { BG, FG } = Styles.CellsColors[this.value];

        const PAD = width * 0.05;


        context.shadowColor = "rgba(0, 0, 0, 0.1)";
        context.shadowBlur = PAD * 0.5;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = PAD * 0.5;

        context.fillStyle = BG;
        Drawing.fillRoundedRect(context, x + PAD, y + PAD, width - 2 * PAD, height - 2 * PAD, PAD * 2);


        const text = this.value.toString();

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