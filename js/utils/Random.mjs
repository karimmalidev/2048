export default class Random {
    static sampleOf(array) {
        if (!(array instanceof Array)) {
            throw new TypeError(`Expected instance of Array, got ${typeof array}`)
        }
        if (array.length === 0) {
            return null;
        }
        return array[Math.floor(Math.random() * array.length)];
    }
}