import { describe, it, expect, vi, beforeEach } from "vitest";
import BoardMatrix from "./BoardMatrix.mjs";
import Matrix from "../../utils/Matrix.mjs";
import Vector from "../../utils/Vector.mjs";
import Direction from "../../core/input/Direction.mjs";
import Random from "../../utils/Random.mjs";

describe("BoardMatrix", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("findRandomEmptyPosition calls Random.sampleOf with empty positions", () => {
        const board = new BoardMatrix(new Vector(2, 2));
        board.set(new Vector(0, 0), 2);

        const empties = board.getEmptyPositions();
        const spy = vi.spyOn(Random, "sampleOf").mockReturnValue(empties[0]);

        const pos = board.findRandomEmptyPosition();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(empties.some((e) => e.equals(pos))).toBe(true);
    });


    describe("findMoves", () => {
        it("returns empty array when no moves available", () => {
            const board = new BoardMatrix(new Vector(2, 2));
            board.set(new Vector(0, 0), 2);
            board.set(new Vector(1, 0), 4);
            board.set(new Vector(0, 1), 8);
            board.set(new Vector(1, 1), 16);

            const moves = board.findMoves(Direction.LEFT);
            expect(moves).toEqual([]);
        });

        it("returns a move when a tile can slide into empty space", () => {
            const board = new BoardMatrix(new Vector(2, 1));
            board.set(new Vector(1, 0), 2);

            const moves = board.findMoves(Direction.LEFT);
            expect(moves).toHaveLength(1);

            const move = moves[0];
            expect(move.source.equals(new Vector(1, 0))).toBe(true);
            expect(move.destination.equals(new Vector(0, 0))).toBe(true);
            expect(move.doDouble).toBe(false);
        });

        it("returns a move when two tiles can merge", () => {
            const board = new BoardMatrix(new Vector(2, 1));
            board.set(new Vector(0, 0), 2);
            board.set(new Vector(1, 0), 2);

            const moves = board.findMoves(Direction.LEFT);
            expect(moves).toHaveLength(1);

            const move = moves[0];
            expect(move.source.equals(new Vector(1, 0))).toBe(true);
            expect(move.destination.equals(new Vector(0, 0))).toBe(true);
            expect(move.doDouble).toBe(true);
        });

        it("supports vertical moves (DOWN)", () => {
            const board = new BoardMatrix(new Vector(1, 2));
            board.set(new Vector(0, 0), 2);

            const moves = board.findMoves(Direction.DOWN);
            expect(moves).toHaveLength(1);

            const move = moves[0];
            expect(move.source.equals(new Vector(0, 0))).toBe(true);
            expect(move.destination.equals(new Vector(0, 1))).toBe(true);
        });

        it("merges only once per line scan", () => {
            const board = new BoardMatrix(new Vector(4, 1));
            board.set(new Vector(0, 0), 2);
            board.set(new Vector(1, 0), 2);
            board.set(new Vector(2, 0), 2);

            const moves = board.findMoves(Direction.LEFT);
            // The first two merge, third slides next to them (not merged again)
            expect(moves.length).toBeGreaterThan(1);
            expect(moves.some((m) => m.doDouble)).toBe(true);
        });
    });
});
