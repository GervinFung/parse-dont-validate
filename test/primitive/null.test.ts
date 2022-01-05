import parseAsNull from '../../src/primitive/parseAsNull';

describe('Test parse as undefined positive case', () => {
    test.each([
        {
            value: null,
        },
    ])('data => %p', ({ value }) =>
        expect(parseAsNull(value).orElseGetUndefined()).toEqual(value)
    );
});

describe('Test parse as null negative case, return specified output if not boolean', () => {
    test.each([
        {
            value: {
                t: null,
            },
            alternative: true,
        },
        {
            value: undefined,
            alternative: '',
        },
    ])('data => %p', ({ value, alternative }) =>
        expect(parseAsNull(value).orElseGet(alternative)).toEqual(alternative)
    );
});
