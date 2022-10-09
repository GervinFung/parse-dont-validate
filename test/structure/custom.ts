import { parseAsCustomType } from '../../src';

const customParserTest = () => {
    describe('Test parse as custom positive case', () => {
        test('parse as specified string type', () => {
            type Specified = '' | ' ';
            const s = ' ';
            const custom = parseAsCustomType<Specified>(
                s,
                (value) => value === '' || value === ' '
            );
            expect(custom.elseGet(null)).toBe(s);
            expect(custom.elseThrow('s')).toBe(s);
        });
    });

    describe('Test parse as custom negative case', () => {
        test('failed to parse as specified string type', () => {
            type Specified = '' | ' ';
            const s = 'achu';
            const custom = parseAsCustomType<Specified>(
                s,
                (value) => value === '' || value === ' '
            );
            expect(custom.elseGet(null)).toBe(null);
            expect(() => custom.elseThrow('s')).toThrowError();
        });
    });
};

export default customParserTest;
