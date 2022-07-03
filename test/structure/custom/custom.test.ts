import { parseAsCustomType } from '../../../src';

describe('Test parse as custom positive case', () => {
    test('parse as specified string type', () => {
        type Specified = '' | ' ';
        const s = ' ';
        const custom = parseAsCustomType<Specified>(
            s,
            (value) => value === '' || value === ' '
        );
        expect(custom.orElseGetNull()).toBe(s);
        expect(custom.orElseGetUndefined()).toBe(s);
        expect(custom.orElseLazyGet(() => null)).toBe(s);
        expect(custom.orElseGet(null)).toBe(s);
        expect(custom.orElseThrowDefault('s')).toBe(s);
        expect(custom.orElseThrowCustom('s is not Specified')).toBe(s);
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
        expect(custom.orElseGetNull()).toBe(null);
        expect(custom.orElseGetUndefined()).toBe(undefined);
        expect(custom.orElseLazyGet(() => null)).toBe(null);
        expect(custom.orElseGet(null)).toBe(null);
        expect(() => custom.orElseThrowDefault('s')).toThrowError();
        expect(() =>
            custom.orElseThrowCustom('s is not Specified')
        ).toThrowError();
    });
});
