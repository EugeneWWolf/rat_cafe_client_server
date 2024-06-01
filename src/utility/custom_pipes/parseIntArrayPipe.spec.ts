import { ParseIntArrayPipe } from "./parseIntArrayPipe.pipe";

describe('ParseIntArrayPipe', () => {
    it('should return null if value is optional and falsy', () => {
        const result = new ParseIntArrayPipe(true).transform('', {type: 'param', data: 'itemIDs'});
        expect(result).toBeFalsy();
    });

    it('should result in error if value is not optional and falsy', () => {
        try {
            new ParseIntArrayPipe(true).transform('', {type: 'param', data: 'itemIDs'});
        } catch (err) {
            expect(err.message).toBe(`Validation failed in itemIDs parameter: string with numbers divided by commas is expected`);
        }
    });

    it('should result in error if cannot transform a string with 1 number and 1 comma', () => {
        try {
            new ParseIntArrayPipe(true).transform('1,', {type: 'param', data: 'itemIDs'});
        } catch (err) {
            expect(err.message).toBe(`Validation failed in itemIDs parameter: unable to get numeric array of indexes`);
        }
    });

    it('should result in error if cannot transform a string with 2 numbers and 2 commas ', () => {
        try {
            new ParseIntArrayPipe(true).transform('1,2,', {type: 'param', data: 'itemIDs'});
        } catch (err) {
            expect(err.message).toBe(`Validation failed in itemIDs parameter: unable to get numeric array of indexes`);
        }
    });

    it('should result in error if cannot transform a string with 2 numbers and 1 other character between them ', () => {
        try {
            new ParseIntArrayPipe(true).transform('1 2', {type: 'param', data: 'itemIDs'});
        } catch (err) {
            expect(err.message).toBe(`Validation failed in itemIDs parameter: unable to get numeric array of indexes`);
        }
    });
});