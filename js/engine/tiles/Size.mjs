export default class Size {
    constructor(width = 1, height = 1) {
        this.width = width;
        this.height = height;
    }

    scale(factor) {
        const width = factor * this.width;
        const height = factor * this.height;
        return new Size(width, height);
    }

    subtractPadding(padding) {
        const width = this.width - 2 * padding;
        const height = this.height - 2 * padding;
        return new Size(width, height);
    }

    get minDimension() {
        return Math.min(this.width, this.height);
    }
}