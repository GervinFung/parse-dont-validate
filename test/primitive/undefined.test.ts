import parseAsUndefined from '../../src/primitive/parseAsUndefined';

describe('Test parse as undefined positive case', () => {
    test('', () =>
        expect(parseAsUndefined(undefined).orElseGet(123)).toEqual(undefined));
});

describe('Test parse as undefined negative case, return null if not undefined', () => {
    test.each([
        {
            value: {
                t: true,
            },
        },
        {
            value: null,
        },
    ])('data => %p', ({ value }) =>
        expect(parseAsUndefined(value).orElseGetNull()).toEqual(null)
    );
});
