import { describe, it, expect } from "vitest";
import Matrix from "./Matrix.mjs";
import Vector from "./Vector.mjs";

describe("Matrix", () => {
    it("initializes with correct size and empty array", () => {
        const size = new Vector(2, 3);
        const matrix = new Matrix(size);

        expect(matrix.size.x).toBe(2);
        expect(matrix.size.y).toBe(3);

        expect(matrix.getValues()).toEqual([]);
        expect(matrix.getEmptyPositions().length).toBe(2 * 3);
    });

    it("sets and gets values correctly", () => {
        const matrix = new Matrix(new Vector(2, 2));
        const pos = new Vector(0, 1);

        matrix.set(pos, "hello");
        expect(matrix.get(pos)).toBe("hello");
        expect(matrix.has(pos)).toBe(true);
    });

    it("deletes values correctly", () => {
        const matrix = new Matrix(new Vector(2, 2));
        const pos = new Vector(1, 1);

        matrix.set(pos, 123);
        matrix.delete(pos);

        expect(matrix.get(pos)).toBe(undefined);
        expect(matrix.has(pos)).toBe(false);
    });

    it("moves values correctly", () => {
        const matrix = new Matrix(new Vector(2, 2));
        const src = new Vector(0, 0);
        const dest = new Vector(1, 1);

        matrix.set(src, "moved");
        matrix.move(src, dest);

        expect(matrix.get(dest)).toBe("moved");
        expect(matrix.get(src)).toBe(undefined);
    });

    it("returns non-empty values with getValues", () => {
        const matrix = new Matrix(new Vector(2, 2));
        matrix.set(new Vector(0, 0), "a");
        matrix.set(new Vector(1, 1), "b");

        expect(matrix.getValues().sort()).toEqual(["a", "b"]);
    });

    it("returns empty positions correctly", () => {
        const matrix = new Matrix(new Vector(2, 2));
        const filled = new Vector(0, 0);

        matrix.set(filled, "occupied");
        const empty = matrix.getEmptyPositions();

        expect(empty).toHaveLength(3);
        expect(empty.some((pos) => pos.equals(filled))).toBe(false);
    });

    it("creates a deep copy with copy()", () => {
        const matrix = new Matrix(new Vector(2, 2));
        const pos = new Vector(0, 0);

        matrix.set(pos, "original");
        const clone = matrix.copy();

        expect(clone.get(pos)).toBe("original");
        clone.set(pos, "changed");

        expect(matrix.get(pos)).toBe("original"); // deep copy, not reference
    });

    it("throws TypeError if position is not a Vector", () => {
        const matrix = new Matrix(new Vector(2, 2));
        expect(() => matrix.get({ x: 0, y: 0 })).toThrow(TypeError);
    });

    it("throws RangeError for out-of-bounds positions", () => {
        const matrix = new Matrix(new Vector(2, 2));
        expect(() => matrix.get(new Vector(-1, 0))).toThrow(RangeError);
        expect(() => matrix.get(new Vector(2, 0))).toThrow(RangeError);
        expect(() => matrix.get(new Vector(0, 2))).toThrow(RangeError);
    });
});
