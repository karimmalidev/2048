import { describe, it, expect, vi } from "vitest";
import Random from "./Random.mjs";

const mockArray = [1, 2, 3, 'hello', { id: 24 }, new Set, true, -1, 40e5];

describe('Random class', () => {
    it('picks and returns an array element randomly', () => {
        for (let mockRandomValue = 0; mockRandomValue < 1; mockRandomValue += 0.01) {
            const spy = vi.spyOn(Math, 'random').mockReturnValue(mockRandomValue);
            const item = Random.sampleOf(mockArray);
            expect(spy).toHaveBeenCalledOnce();
            expect(mockArray).toContain(item);
        }
    });
    it('returns null when array is empty', () => {
        const item = Random.sampleOf([]);
        expect(item).toBeNull();
    });
});