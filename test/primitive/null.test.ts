import parseAsNull from '../../src/primitive/parseAsNull';

describe('Test parse as undefined positive case', () => {
    test.each([
        {
            variableValue: null,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNull(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as null negative case, return specified output if not boolean', () => {
    test.each([
        {
            variableValue: {
                t: null,
            },
            variableElse: true,
        },
        {
            variableValue: undefined,
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsNull(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
