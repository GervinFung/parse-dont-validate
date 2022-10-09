import { parseAsString } from '../../src';

const stringParserTest = () => {
    describe('Test parse as string get empty string', () => {
        test.each([
            {
                value: 123,
            } as const,
            {
                value: true,
            } as const,
        ])('data => %p', ({ value }) => {
            expect(parseAsString(value).elseGet('')).toEqual('');
            expect(parseAsString(value).elseLazyGet(() => undefined)).toEqual(
                undefined
            );
        });
    });

    describe('Test parse as string get', () => {
        test.each(['', '1', '2'])('data => %p', (value) => {
            expect(parseAsString(value).elseGet('')).toEqual(value);
            expect(parseAsString(value).elseLazyGet(() => undefined)).toEqual(
                value
            );
        });
    });
};

export default stringParserTest;
