import parseAsSymbol from '../../src/primitive/parseAsSymbol';

describe('Test parse as symbol positive case', () => {
    test.each([
        {
            value: Symbol(123123123),
        },
        {
            value: Symbol('123123123'),
        },
    ])('data => %p', ({ value }) =>
        expect(parseAsSymbol(value).orElseGetUndefined()).toEqual(value)
    );
});

describe('Test parse as object negative case', () => {
    test.each([
        {
            value: '[1, 2, 3, 4, 5, 6]',
        },
        {
            value: Symbol(123123123).description,
        },
        {
            value: true,
        },
    ])('data => %p', ({ value }) =>
        expect(parseAsSymbol(value).orElseGetUndefined()).toEqual(undefined)
    );
});
