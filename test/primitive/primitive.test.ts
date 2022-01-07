import { createOptionsForPrimitive, createExact } from '../../src/util';

describe('Test createOptionsForPrimitive & creactExact positive case', () => {
    test.each([
        {
            value: 'Who am I',
        } as const,
        {
            value: 'Youtube',
        } as const,
    ])('data => %p', ({ value }) => {
        const parseString = createOptionsForPrimitive(
            value,
            'string',
            'string'
        );
        expect(parseString.orElseGet('no way')).toEqual(value);
        expect(parseString.orElseLazyGet(() => 'no way')).toEqual(value);
        expect(parseString.orElseGetUndefined()).toEqual(value);
        expect(parseString.orElseGetNull()).toEqual(value);
        expect(parseString.orElseThrowDefault('value')).toEqual(value);
        expect(parseString.orElseThrowCustom('value')).toEqual(value);

        const exact = createExact(value, 'string', 'string', value);
        expect(exact.orElseGet('no way')).toEqual(value);
        expect(exact.orElseGetUndefined()).toEqual(value);
        expect(exact.orElseGetNull()).toEqual(value);
        expect(exact.orElseThrowDefault('value')).toEqual(value);
        expect(exact.orElseThrowCustom('value')).toEqual(value);
    });
});

describe('Test createOptionsForPrimitive negative case', () => {
    test.each([
        {
            value: 123,
            alternative: undefined,
        } as const,
        {
            value: '123',
            alternative: '',
        } as const,
    ])('data => %p', ({ value, alternative }) => {
        const u = undefined,
            n = null;

        const parseBoolean = createOptionsForPrimitive(
            value,
            'boolean',
            typeof value
        );
        expect(parseBoolean.orElseGet(alternative)).toEqual(alternative);
        expect(parseBoolean.orElseLazyGet(() => alternative)).toEqual(
            alternative
        );
        expect(parseBoolean.orElseGetUndefined()).toEqual(u);
        expect(parseBoolean.orElseGetNull()).toEqual(n);
        expect(() => parseBoolean.orElseThrowDefault('value')).toThrowError();
        expect(() => parseBoolean.orElseThrowCustom('value')).toThrowError();

        const exact = createExact(value, 'boolean', typeof value, value);
        expect(exact.orElseGet(alternative)).toEqual(alternative);
        expect(exact.orElseGetUndefined()).toEqual(u);
        expect(exact.orElseGetNull()).toEqual(n);
        expect(() => exact.orElseThrowDefault('value')).toThrowError();
        expect(() => exact.orElseThrowCustom('value')).toThrowError();
    });
});
