import Vector from "./Vector.mjs";
import { describe, it, expect } from "vitest";

describe('Vector', () => {
    const mockNumberPairs = [[0, 0], [12, 12.5], [-1, -5], [42, 42], [100, 50], [3, 5], [5, 3], [1, 1], [-1, -1]];
    const mockNumbers = [0, 12, 12.5, -1, -5, 42, 100, 50, 1, -1];
    const mockVectors = mockNumberPairs.map(([x, y]) => Vector.from(x, y));

    describe('construction', () => {
        it('can be constructed by number pairs using new', () => {
            for (const [x, y] of mockNumberPairs) {
                const v = new Vector(x, y);
                expect(v.x).toBe(x);
                expect(v.y).toBe(y);
            }
        });
        it('can be constructed from two numbers', () => {
            for (const [x, y] of mockNumberPairs) {
                const v = Vector.from(x, y);
                expect(v.x).toBe(x);
                expect(v.y).toBe(y);
            }
        });
        it('can be constructed from one number', () => {
            for (const num of mockNumbers) {
                const v = Vector.from(num);
                expect(v.x).toBe(num);
                expect(v.y).toBe(num);
            }
        });
        it('can be constructed from another vector', () => {
            for (const mockVector of mockVectors) {
                const v = Vector.from(mockVector);
                expect(v.x).toBe(mockVector.x);
                expect(v.y).toBe(mockVector.y);
            }
        });
    })

    describe('properties', () => {
        it('has writable and readable x and y properties', () => {
            const v = new Vector(0, 0);
            for (const [x, y] of mockNumberPairs) {
                v.x = x;
                v.y = y;
                expect(v.x).toBe(x);
                expect(v.y).toBe(y);
            }
        });
        it('has read-only number properties: smallestComponent, largestComponent, magnitude', () => {
            for (const [x, y] of mockNumberPairs) {
                const v = Vector.from(x, y);
                expect(v.smallestComponent).toBe(Math.min(x, y));
                expect(v.largestComponent).toBe(Math.max(x, y));
                expect(v.magnitude).toBe(Math.hypot(x, y));
            }
        });
    });
    describe('methods', () => {
        it('has equals method, true when they have same x and y', () => {
            for (const v1 of mockVectors) {
                for (const v2 of mockVectors) {
                    expect(v1.equals(v2)).toBe(v2.equals(v1));
                    expect(v1.equals(v2)).toBe(v1.x === v2.x && v1.y === v2.y);
                }
            }
        });
        it('has distance method to calculate Euclidean distance', () => {
            for (const v1 of mockVectors) {
                for (const v2 of mockVectors) {
                    expect(v1.distance(v2)).toBe(v2.distance(v1));
                    expect(v1.distance(v2)).toBe(Math.hypot(v1.x - v2.x, v1.y - v2.y));
                }
            }
        });
        it('has absolute method, componentwise absolute', () => {
            for (const v1 of mockVectors) {
                const v2 = v1.absolute();
                expect(v1.absolute()).toBeInstanceOf(Vector);
                expect(v2.absolute().equals(v1.absolute())).toBeTruthy();
                expect(v2.x).toBe(Math.abs(v1.x));
                expect(v2.y).toBe(Math.abs(v1.y));
            }
        });
        it('has componentwise methods: add, subtract, multiply, divide, clampAdd', () => {
            for (const left of mockVectors) {
                for (const right of mockVectors) {
                    let result;
                    result = left.add(right);
                    expect(result.x).toBe(left.x + right.x);
                    expect(result.y).toBe(left.y + right.y);

                    result = left.subtract(right);
                    expect(result.x).toBe(left.x - right.x);
                    expect(result.y).toBe(left.y - right.y);

                    result = left.multiply(right);
                    expect(result.x).toBe(left.x * right.x);
                    expect(result.y).toBe(left.y * right.y);

                    result = left.divide(right);
                    expect(result.x).toBe(left.x / right.x);
                    expect(result.y).toBe(left.y / right.y);

                    for (const limit of mockVectors) {
                        result = left.clampAdd(right, limit);
                        const fn = (n) => n == 0 ? ((a, b) => a) : n > 0 ? Math.min : Math.max;
                        expect(result.x).toBe(fn(right.x)(left.x + right.x, limit.x));
                        expect(result.y).toBe(fn(right.y)(left.y + right.y, limit.y));
                    }
                }
            }
        });
    });
});