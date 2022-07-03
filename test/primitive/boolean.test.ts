import { parseAsBoolean } from '../../src';

describe('Test parse as boolean positive case', () => {
    test.each([
        {
            value: true,
        } as const,
        {
            value: false,
        } as const,
    ])('data => %p', ({ value }) => {
        const parseBoolean = parseAsBoolean(value);
        expect(parseBoolean.orElseGetTrue()).toEqual(value);
        expect(parseBoolean.orElseGetFalse()).toEqual(value);

        const exactly = parseBoolean.exactlyAs(value);
        expect(exactly.orElseGetFalse()).toEqual(value);
        expect(exactly.orElseGetTrue()).toEqual(value);
    });
});

describe('Test parse as boolean negative case, return specified output if not boolean', () => {
    test.each([
        {
            value: {
                t: true,
            },
        },
        {
            value: [
                {
                    t: true,
                },
            ],
        },
    ])('data => %p', ({ value }) => {
        const parseBoolean = parseAsBoolean(value);
        expect(parseBoolean.orElseGetTrue()).toEqual(true);
        expect(parseBoolean.orElseGetFalse()).toEqual(false);

        const exactly = parseBoolean.exactlyAs(true);
        expect(exactly.orElseGetFalse()).toEqual(false);
        expect(exactly.orElseGetTrue()).toEqual(true);
    });
});
