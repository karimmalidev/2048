import Constants from './Constants.mjs';

const { MIN_CELL_VALUE, MAX_CELL_VALUE } = Constants;


const GREEN_HUE = 90;
const MAX_HUE = 360;

const Styles = {
    BoardColor: "hsla(0, 0%, 50%, 0.2)",
    CellsColors: [],
    ScoreBar: {
        SCORE_FG: 'hsla(0, 0%, 50%, 0.6)',
        HIGH_FG: 'hsla(0, 0%, 50%, 0.4)',
    },
    PADDING_SCALE: 0.05,
};

function getHueByScale(scale) {
    return (Math.floor(scale * MAX_HUE) + GREEN_HUE) % MAX_HUE;
}

function getScaleByCellValue(value) {
    return (Math.log2(value) - Math.log2(MIN_CELL_VALUE)) / Math.log2(MAX_CELL_VALUE);
}

function getHueByCellValue(value) {
    const scale = getScaleByCellValue(value);
    const hue = getHueByScale(scale);
    return hue;
}

function getColorsByCellValue(value) {
    const hue = getHueByCellValue(value);
    const colors = {
        BG: `hsla(${hue}, 50%, 60%)`,
        FG: `hsla(${hue}, 50%, 90%)`
    };
    return colors;
}

for (let value = MIN_CELL_VALUE; value <= MAX_CELL_VALUE; value *= 2) {
    Styles.CellsColors[value] = getColorsByCellValue(value);
}

export default Styles;