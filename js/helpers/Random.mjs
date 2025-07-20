export default class Random {
    static sampleOf(array = []) {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }
}