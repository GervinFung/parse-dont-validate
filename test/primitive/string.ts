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
            const parseString = parseAsString(value);
            expect(parseString.orElseGetEmptyString()).toEqual('');

            const exact = parseString.exactlyAs('12');
            expect(exact.orElseGetEmptyString()).toEqual('');
        });
    });

    describe('Test parse as string get empty string', () => {
        test.each([
            {
                value: '123',
            } as const,
            {
                value: 'Yep',
            } as const,
        ])('data => %p', ({ value }) => {
            const parseString = parseAsString(value);
            expect(parseString.orElseGetEmptyString()).toEqual(value);

            const exact = parseString.exactlyAs(value);
            expect(exact.orElseGetEmptyString()).toEqual(value);
        });
    });
};

export default stringParserTest;
