import { parseAsBoolean } from '../../src';

const booleanParserTest = () => {
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
            expect(parseBoolean.elseGet(true)).toEqual(value);
            expect(parseBoolean.elseGet(false)).toEqual(value);
            expect(parseBoolean.elseLazyGet(() => false)).toEqual(value);
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
            expect(parseBoolean.elseGet(true)).toEqual(true);
            expect(parseBoolean.elseGet(false)).toEqual(false);
            expect(parseBoolean.elseLazyGet(() => false)).toEqual(false);
        });
    });
};

export default booleanParserTest;
