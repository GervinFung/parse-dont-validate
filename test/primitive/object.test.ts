import parseAsObject from '../../src/primitive/parseAsObject';

describe('Test parse as object positive case', () => {
    test.each([
        {
            variableValue: [1, 2, 3, 4, 5, 6],
            variableElse: [1, 2, 3, 4, 5, 6],
        },
        {
            variableValue: {
                x: 123,
                name: 'string',
                age: true,
            },
            variableElse: {
                x: 123,
                name: 'string',
                age: true,
            },
        },
        {
            variableValue: new Map(),
            variableElse: new Map(),
        },
        {
            variableValue: new Boolean(),
            variableElse: new Boolean(),
        },
        {
            variableValue: new RegExp('12'),
            variableElse: new RegExp('12'),
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsObject(variableValue).orElse(undefined)).toEqual(
            variableElse
        );
    });
});

describe('Test parse as object negative case', () => {
    test.each([
        {
            variableValue: '[1, 2, 3, 4, 5, 6]',
        },
        {
            variableValue: 123123,
        },
        {
            variableValue: true,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsObject(variableValue).orElse(undefined)).toEqual(
            undefined
        );
    });
});
