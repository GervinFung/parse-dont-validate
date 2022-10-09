import { parseAsNumber } from '../../src';

const numberParserTest = () => {
    describe('Test parse as number positive case', () => {
        test.each([
            {
                value: 1.123,
                min: 1.122,
                max: 1.124,
            } as const,
            {
                value: 123,
                min: 123,
                max: 124,
            } as const,
        ])('data => %p', ({ value, min, max }) => {
            const parseNumber = parseAsNumber(value);
            const inRange = parseNumber.inRangeOf(min, max);
            expect(inRange.elseGet(undefined)).toEqual(value);
            expect(inRange.elseThrow('value')).toEqual(value);
            expect(inRange.elseLazyGet(() => 'value')).toEqual(value);
        });
    });

    describe('Test parse as number negative case, return specified output if not number', () => {
        test.each([
            {
                value: '1.123',
            },
            {
                value: { x: 123 },
            },
            {
                value: [],
            },
        ])('data => %p', ({ value }) => {
            const parseNumber = parseAsNumber(value);
            const inRange = parseNumber.inRangeOf(0, 1);
            expect(inRange.elseGet(undefined)).toEqual(undefined);
            expect(() => inRange.elseThrow('value')).toThrowError();
            expect(inRange.elseLazyGet(() => 'value')).toEqual('value');
        });
    });

    describe('Test parse as number negative case', () => {
        test.each([
            {
                value: 1.125,
                min: 1.123,
                max: 1.124,
            },
            {
                value: 123,
                min: 124,
                max: 124,
            },
        ])('data => %p', ({ value, min, max }) => {
            const parseNumber = parseAsNumber(value);
            const inRange = parseNumber.inRangeOf(min, max);
            expect(inRange.elseGet(undefined)).toEqual(undefined);
            expect(() => inRange.elseThrow('value')).toThrowError();
        });
    });

    describe('Test min larger than max && max larger than min', () => {
        test.each([
            {
                max: 1.123,
                min: 1.124,
            },
            {
                max: 122,
                min: 124,
            },
        ])('data => %p', ({ min, max }) =>
            expect(() => parseAsNumber(0).inRangeOf(min, max)).toThrowError()
        );
    });
};

export default numberParserTest;
