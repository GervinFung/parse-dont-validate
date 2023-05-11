import { inRangeOf, isInRangeOf } from '../../../src/parser/helper';
import { describe, it, expect } from 'vitest';

describe('Test helper range function', () => {
    it('should throw error when max is smaller than min and min is larger than max', () => {
        expect(() =>
            inRangeOf({
                max: 5,
                min: 6,
            })
        ).toThrowError();
    });
    it.each([
        {
            max: 5,
            min: 4,
        },
        {
            max: 5,
            min: 4,
        },
    ])(
        'should return the min and max value, when max is "$max" and min is "$min"',
        ({ min, max }) => {
            const range = {
                max,
                min,
            };
            expect(inRangeOf(range)).toStrictEqual(range);
        }
    );
});
describe('Test helper range check is in range function', () => {
    it.each([
        { min: 3, max: 5, value: 4, result: true },
        { min: 4, max: 5, value: 4.5, result: true },
        { min: 5, max: 6, value: 6, result: true },
        { min: 3, max: 5, value: 2.9, result: false },
        { min: 4, max: 5, value: 5.1, result: false },
    ])(
        'should return "$result" when "$value" is between min of "$min" and max of "$max"',
        ({ min, max, value, result }) => {
            expect(
                isInRangeOf({
                    min,
                    max,
                    value,
                })
            ).toBe(result);
        }
    );
});
