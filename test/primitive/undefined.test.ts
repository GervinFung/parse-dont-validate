import parseAsUndefined from '../../src/primitive/parseAsUndefined';

describe('Test parse as undefined positive case', () => {
    test.each([
        {
            variableValue: undefined,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsUndefined(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as null negative case, return specified output if not boolean', () => {
    test.each([
        {
            variableValue: {
                t: true,
            },
            variableElse: true,
        },
        {
            variableValue: null,
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsUndefined(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
