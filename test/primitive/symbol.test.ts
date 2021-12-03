import parseAsSymbol from '../../src/primitive/parseAsSymbol';

describe('Test parse as symbol positive case', () => {
    test.each([
        {
            variableValue: Symbol(123123123),
        },
        {
            variableValue: Symbol('123123123'),
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsSymbol(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as object negative case', () => {
    test.each([
        {
            variableValue: '[1, 2, 3, 4, 5, 6]',
        },
        {
            variableValue: Symbol(123123123).description,
        },
        {
            variableValue: true,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsSymbol(variableValue).orElse(undefined)).toEqual(
            undefined
        );
    });
});
