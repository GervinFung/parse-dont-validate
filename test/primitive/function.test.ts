import parseAsFunction from '../../src/primitive/parseAsFunction';

describe('Test parse as function positive case', () => {
    test.each([
        {
            value: () => 1 + 1,
        },
        {
            value: () => undefined,
        },
        {
            value: function () {},
        },
    ])('data => %p', ({ value }) =>
        expect(parseAsFunction(value).orElseGetUndefined()).toEqual(value)
    );
});

describe('Test parse as boolean negative case, return specified output if not boolean', () => {
    test.each([
        {
            value: {
                test: () => 'test',
            },
            alternative: '',
        },
    ])('data => %p', ({ value, alternative }) =>
        expect(parseAsFunction(value).orElseGet(alternative)).toEqual(
            alternative
        )
    );
});
